<template>
  <div class="q-pr-xl q-pl-xl q-pt-md q-mr-xl q-ml-xl">
    <h4>Customer Form</h4>
    <div class="row justify-around q-ma-sm">
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input square outlined v-model="form.name" label="Name" />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <fieldset>
          <label class="text-grey text-subtitle1">Gender</label>
          <q-radio v-model="form.gender" val="male" label="Male" />
          <q-radio v-model="form.gender" val="female" label="Female" />
        </fieldset>
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input
          type="date"
          square
          outlined
          v-model="form.dob"
          label="Date Of Birth"
          hint="MM/DD/YYYY"
        />
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
          href="/customerteamplate.xlsx"
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
    const dobString = doc.dob ? moment(doc.dob).format("YYYY-MM-DD") : "";

    return {
      form: {
        name: doc.name || "",
        gender: doc.gender || "",
        dob: dobString,
        phone: doc.phone || "",
        address: doc.address || "",
        status: doc.status || "",
        _id: doc._id || null,
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
      const dobDate = moment(this.form.dob, "YYYY-MM-DD").toDate();
      const payload = {
        ...this.form,
        dob: dobDate,
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
          const json = XLSX.utils.sheet_to_json(sheet);

          const validRoles = ["admin", "sale", "user"];
          const importedUsers = [];

          json.forEach((row, index) => {
            const role = row.Role?.toLowerCase();
            if (!validRoles.includes(role)) {
              this.$q.notify({
                type: "negative",
                message: `Row ${index + 2}: Invalid role "${row.Role}"`,
                timeout: 3000,
                position: "top",
              });
              return;
            }

            importedUsers.push({
              name: row.Name || "",
              gender: row.Gender || "",
              dob: row.Dob ? moment(row.Dob, "YYYY-MM-DD").toDate() : null,
              phone: row.Phone || "",
              address: row.Address || "",
              status: row.Status || "active",
              username: row.Username || "",
              email: row.Email || "",
              role,
              password: row.Password || "",
            });
          });

          if (importedUsers.length > 0) {
            this.$emit("batch-import", {
              users: importedUsers,
              source: "template",
            });

            this.$q.notify({
              type: "info",
              message: `${importedUsers.length} users imported. Please review in the table below.`,
              timeout: 4000,
              position: "top",
            });
          } else {
            this.$q.notify({
              type: "warning",
              message: "No valid users found in the uploaded file.",
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