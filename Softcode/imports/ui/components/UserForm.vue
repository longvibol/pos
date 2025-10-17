<template>
  <div>
    <div class="row justify-around q-ma-sm">
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="form.username" label="Username" />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="form.email" label="Email" />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="form.phone" label="Phone" />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-select
          outlined
          v-model="form.role"
          :options="roles"
          label="Role"
          map-options
          emit-value
          option-value="value"
        />
      </div>
      <div class="col-10 q-ma-md" v-if="updateDoc">
        <q-checkbox v-model="reset" label="Reset Password" />
      </div>
    </div>

    <div class="row justify-around q-ma-sm" v-if="!updateDoc || reset">
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input
          outlined
          v-model="form.password"
          type="password"
          label="Password"
        />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="confirm" type="password" label="Confirm" />
      </div>
    </div>

    <!-- 📥 Excel Upload + Download -->
    <div v-if="!updateDoc">
      <div class="q-ma-md text-center">
        <q-btn
          label="Download Template"
          color="secondary"
          icon="download"
          href="/template.xlsx"
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
            username: row.Username || "",
            email: row.Email || "",
            phone: row.Phone || "",
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
        }
      };

      reader.readAsArrayBuffer(file);
    },
  },
};
</script>
