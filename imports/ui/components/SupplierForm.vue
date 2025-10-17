<template>
  <div>
    <div class="row justify-around q-ma-sm">
      <h5>Supplier Form</h5>
    </div>
    <div class="row justify-around q-ma-sm">
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="form.company" label="Company" />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="form.ownerName" label="Owner Name" />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="form.phone" label="Phone" />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="form.address" label="Address" />
      </div>

      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <fieldset>
          <label class="text-grey text-subtitle1">Status</label>
          <q-radio v-model="form.status" val="active" label="Active" />
          <q-radio v-model="form.status" val="inactive" label="Inactive" />
        </fieldset>
      </div>
    </div>

    <!-- 📥 Excel Upload + Download -->
    <div v-if="!updateDoc">
      <div class="q-ma-md text-center">
        <q-btn
          label="Download Template"
          color="secondary"
          icon="download"
          href="/suppliertemplate.xlsx"
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

    <div class="q-ma-md text-center">
      <q-btn
        :color="updateDoc ? 'info' : 'primary'"
        :label="updateDoc ? 'Update' : 'Submit'"
        @click="handleSubmit"
      >
        <q-tooltip class="bg-white text-primary">(Ctrl + S)</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  props: {
    updateDoc: {
      type: Object,
      default: null,
    },
    allowImport: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: this.updateDoc
        ? { ...this.updateDoc }
        : { username: "", email: "", phone: "", role: "" },

      reset: false,
      confirm: null,
      roles: [
        { label: "Admin", value: "admin" },
        { label: "Sale", value: "sale" },
        { label: "User", value: "user" },
      ],
    };
  },
  mounted() {
    if (this.updateDoc) {
      this.form = this.updateDoc;
    }
    window.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", { doc: this.form, source: "manual" });

      if (this.form.password === this.confirm && this.form.password != null) {
        if (this.reset) {
          this.form.reset = this.reset;
        }
      }

      if (this.updateDoc) {
        // code update
      }

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
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);

        const validStatus = ["active", "inactive"];
        const importedSuppliers = [];

        json.forEach((row, index) => {
          const status = row.Status?.toLowerCase();
          if (!validStatus.includes(status)) {
            this.$q.notify({
              type: "negative",
              message: `Row ${index + 2}: Invalid status "${row.Status}"`,
              timeout: 3000,
              position: "top",
            });
            return;
          }

          importedSuppliers.push({
            company: row.Company || "",
            ownerName: row["Owner Name"] || "",
            phone: row.Phone || "",
            address: row.Address || "",
            status,
          });
        });

        if (importedSuppliers.length > 0) {
          this.$emit("batch-import", {
            items: importedSuppliers,
            source: "template",
          });

          this.$q.notify({
            type: "info",
            message: `${importedSuppliers.length} suppliers imported. Please review in the table below.`,
            timeout: 4000,
            position: "top",
          });
        }
      };

      reader.readAsArrayBuffer(file);
    },
  },
};
</script>
