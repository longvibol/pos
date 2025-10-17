<template>
  <div class="q-pr-xl q-pl-xl q-pt-md q-mr-xl q-ml-xl">
    <h4>Purchase Form</h4>
    <div class="row justify-around q-ma-sm">
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-select
          outlined
          v-model="form.supplierId"
          label="Supplier"
          :options="supplierOpts"
          map-options
          emit-value
          option-value="_id"
          option-label="company"
        />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-select
          outlined
          v-model="form.itemId"
          label="Item"
          :options="itemOpts"
          map-options
          emit-value
          option-value="_id"
          option-label="name"
        />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input
          outlined
          v-model="form.cost"
          label="Cost"
          type="number"         
        />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input
          outlined
          v-model="form.price"
          label="Price"
          type="number"         
        />
      </div>

      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="form.qty" label="Quantity" type="number"/>
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
        <fieldset>
          <label class="text-grey text-subtitle1">Status</label>
          <q-radio v-model="form.status" val="active" label="Active" />
          <q-radio v-model="form.status" val="inactive" label="Inactive" />
        </fieldset>
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

    <div v-if="!updateDoc && allowImport">
      <div class="q-ma-md text-center">
        <q-btn
          label="Download Template"
          color="secondary"
          icon="download"
          href="/itemtemplate.xlsx"
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
        supplierId: doc.supplierId || "",
        itemId: doc.itemId || "",
        cost: doc.cost || "",
        price: doc.price || "",
        qty: doc.qty || "",
        date: dateString,
        status: doc.status || "",
      },
      supplierOpts: [],
      itemOpts: [],
    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
    this.getSupplier();
    this.getItems();
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    getSupplier() {
      this.supplierOpts = [
        {
          _id: "01",
          company: "Cambodia Soft-Drink",
          ownerName: "Chetra",
          phone: "0102020202",
          address: "Battambang",
          status: "active",
        },
        {
          _id: "02",
          company: "F&B",
          ownerName: "Chetra",
          phone: "0102020202",
          address: "Battambang",
          status: "active",
        },
      ];
    },
    getItems() {
      this.itemOpts = [
        {
          _id: "01",
          name: "Coca",
          categoryName: "Drink",
          categoryId: "01",
          date: new Date(),
          description: "Coca 1.25L",
          status: "active",
        },
        {
          _id: "02",
          name: "Spy",
          categoryName: "Drink",
          categoryId: "01",
          date: new Date(),
          description: "Spy 1.25L",
          status: "active",
        },
      ];
    },

    handleSubmit() {
      const formattedDate = moment(this.form.date, "YYYY-MM-DD").toDate();
      const payload = {
        ...this.form,
        date: formattedDate,
        _id: this.form._id || `manual-${Date.now()}`, // safer fallback
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
      try {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet, { raw: false });

            console.log("Parsed rows:", rows);

            const importedItems = [];

            rows.forEach((row, index) => {
              const name = row.Name || row.name;
              const category = row.Category || row.category;
              const rawDate = row.Date || row.date;
              const description = row.Description || row.description;
              const status = row.Status || row.status;

              if (!name || !category || !rawDate || !description || !status) {
                this.$q.notify({
                  type: "warning",
                  message: `Row ${index + 2}: Missing required fields.`,
                  timeout: 3000,
                  position: "top",
                });
                return;
              }

              const parsedDate = moment(rawDate, "YYYY-MM-DD", true).isValid()
                ? moment(rawDate, "YYYY-MM-DD").toDate()
                : null;

              if (!parsedDate) {
                this.$q.notify({
                  type: "warning",
                  message: `Row ${index + 2}: Invalid date format.`,
                  timeout: 3000,
                  position: "top",
                });
                return;
              }

              importedItems.push({
                name,
                category,
                date: parsedDate,
                description,
                status,
                _id: `${Date.now()}-${index}`,
              });
            });

            if (importedItems.length > 0) {
              this.$emit("batch-import", {
                items: importedItems,
                source: "template",
              });

              this.$q.notify({
                type: "info",
                message: `${importedItems.length} items imported. Please review in the table below.`,
                timeout: 4000,
                position: "top",
              });
            } else {
              this.$q.notify({
                type: "warning",
                message: "No valid items found in the uploaded file.",
                timeout: 3000,
                position: "top",
              });
            }
          } catch (innerError) {
            console.error("Error processing file:", innerError);
            this.$q.notify({
              type: "negative",
              message: "Failed to process the uploaded file.",
              timeout: 3000,
              position: "top",
            });
          }
        };

        reader.readAsArrayBuffer(file);
      } catch (outerError) {
        console.error("File upload error:", outerError);
        this.$q.notify({
          type: "negative",
          message: "Unexpected error during file upload.",
          timeout: 3000,
          position: "top",
        });
      }
    },
  },
};
</script>
