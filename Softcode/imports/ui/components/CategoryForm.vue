<template>
  <div class="q-pr-xl q-pl-xl q-pt-md q-mr-xl q-ml-xl">
    <h4>Category Form</h4>
    <div class="row justify-around q-ma-sm">
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input square outlined v-model="form.name" label="Name" />
      </div>

      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input
          type="date"
          square
          outlined
          v-model="form.date"
          label="Date"
          hint="MM/DD/YYYY"
        />
      </div>

      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="form.description" label="Description" />
      </div>
    </div>

    <div class="q-ma-md text-center">
      <q-btn
        :color="updateDoc ? 'info' : 'primary'"
        :label="updateDoc ? 'Update' : 'Submit'"
        @click="handleSubmit"
      >
        <q-tooltip class="bg-white text-primary">(Ctrl + S)</q-tooltip>
      </q-btn>
    </div>

    <div v-if="!updateDoc">
      <div class="q-ma-md text-center">
        <q-btn
          label="Download Template"
          color="secondary"
          icon="download"
          href="/categoryteamplate.xlsx"
          target="_blank"
        />
      </div>

      <div class="q-ma-md text-center">
        <q-uploader
          label="Upload Excel"
          accept=".xlsx"
          :auto-upload="false"
          @added="handleFileUpload"
          class="q-mt-md"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import moment from "moment";

export default {
  props: {
    updateDoc: { type: Object, default: null },
    allowImport: { type: Boolean, default: false },
  },
  data() {
    const doc = this.updateDoc || {};
    const dateString = doc.date
  ? moment(doc.date).format("YYYY-MM-DD")
  : moment().format("YYYY-MM-DD");

    return {
      form: {
        _id: doc._id || null,
        name: doc.name || "",
        date: dateString,
        description: doc.description || "",
      },
    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    handleSubmit() {
      const formattedDate = moment(this.form.date, "YYYY-MM-DD").toDate();
      const payload = {
        ...this.form,
        date: formattedDate,
        _id: this.form._id || Date.now().toString(),
      };
      this.$emit("submit", { doc: payload, source: "manual" });
      this.$emit("close");
    },
    handleKeydown(event) {
      if (event.ctrlKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        this.handleSubmit();
      }
    },
    handleFileUpload(files) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];

          // Validate headers
          const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const headers = raw[0].map(h => h.toLowerCase());
          const required = ["name", "date", "description"];
          const missing = required.filter(h => !headers.includes(h));

          if (missing.length > 0) {
            this.$q.notify({
              type: "negative",
              message: `Missing required columns: ${missing.join(", ")}`,
              timeout: 4000,
              position: "top",
            });
            return;
          }

          // Parse rows
          const rows = XLSX.utils.sheet_to_json(sheet);
          const importedCategories = [];

          rows.forEach((row, index) => {
            const name = row.Name || row.name;
            const rawDate = row.Date || row.date;
            const description = row.Description || row.description;

            if (!name || !rawDate || !description) {
              this.$q.notify({
                type: "warning",
                message: `Row ${index + 2}: Missing required fields.`,
                timeout: 3000,
                position: "top",
              });
              return;
            }

            // Handle Excel date formats (numbers or strings)
            let parsedDate = null;
            if (typeof rawDate === "number") {
              parsedDate = XLSX.SSF.parse_date_code(rawDate);
              parsedDate = new Date(parsedDate.y, parsedDate.m - 1, parsedDate.d);
            } else {
              parsedDate = moment(rawDate, "YYYY-MM-DD", true).isValid()
                ? moment(rawDate, "YYYY-MM-DD").toDate()
                : null;
            }

            if (!parsedDate) {
              this.$q.notify({
                type: "warning",
                message: `Row ${index + 2}: Invalid date format.`,
                timeout: 3000,
                position: "top",
              });
              return;
            }

            importedCategories.push({
              name,
              date: parsedDate,
              description,
              _id: `${Date.now()}-${index}`,
            });
          });

          if (importedCategories.length > 0) {
            this.$emit("batch-import", {
              categories: importedCategories,
              source: "template",
            });

            this.$q.notify({
              type: "info",
              message: `${importedCategories.length} categories imported. Please review in the table below.`,
              timeout: 4000,
              position: "top",
            });
          } else {
            this.$q.notify({
              type: "warning",
              message: "No valid categories found in the uploaded file.",
              timeout: 3000,
              position: "top",
            });
          }
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Failed to process the uploaded file.",
            timeout: 3000,
            position: "top",
          });
        }
      };

      reader.readAsArrayBuffer(file);
    },
  },
};
</script>