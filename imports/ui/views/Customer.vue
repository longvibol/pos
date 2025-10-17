<template>
  <div class="q-pa-md">
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white">
        <q-bar>
          <q-space />
          <q-btn
            dense
            flat
            icon="close"
            class="text-white bg-red"
            @click="dialog = false"
            round
          >
            <q-tooltip class="bg-white text-primary">Close (ESC)</q-tooltip>
          </q-btn>
        </q-bar>

        <customer-form
          :updateDoc="updateDoc"
          :allowImport="!updateDoc"
          @batch-import="handleBatchImport"
          @submit="handleSubmit"
        />
      </q-card>
    </q-dialog>

    <q-btn
      dense
      icon="add"
      color="primary"
      round
      class="q-mb-sm"
      @click="handleAdd"
    >
      <q-tooltip class="bg-white text-primary">Add (Ctrl + A)</q-tooltip>
    </q-btn>

    <customer-table
      :items="customers"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</template>

<script>
import CustomerForm from "../components/CustomerForm.vue";
import CustomerTable from "../components/CustomerTable.vue";

export default {
  components: { CustomerForm, CustomerTable },
  data() {
    return {
      customers: [],
      dialog: false,
      updateDoc: null,
    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
    this.getData();
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    getData() {
      this.customers = [
        {
          _id: "01",
          name: "Jame",
          gender: "male",
          dob: new Date(),
          phone: "010202022",
          address: "Battambang",
          status: "active",
        },
        {
          _id: "02",
          name: "Dara",
          gender: "male",
          dob: new Date(),
          phone: "01099998888",
          address: "Phnom Penh",
          status: "active",
        },
      ];
    },

    handleAdd() {
      this.updateDoc = null;
      this.dialog = true;
    },

    handleDelete(id) {
      const index = this.customers.findIndex((doc) => doc._id === id);
      if (index !== -1) {
        this.customers.splice(index, 1);
      }
    },

    handleEdit(doc) {
      this.updateDoc = { ...doc };
      this.dialog = true;
    },

    handleBatchImport({ users = [], source }) {
      if (!Array.isArray(users) || users.length === 0) {
        this.$q.notify({
          type: "warning",
          message: "No valid users found in the uploaded file.",
          timeout: 3000,
          position: "top",
        });
        return;
      }

      const enriched = users.map((user, index) => ({
        ...user,
        _id: `imported-${Date.now()}-${index}`,
      }));

      this.customers = [...this.customers, ...enriched];

      this.$q.notify({
        type: "info",
        message:
          source === "template"
            ? `${enriched.length} users imported by template.`
            : `${enriched.length} users imported.`,
        timeout: 4000,
        position: "top",
      });
    },

    handleSubmit({ doc, source }) {
      const index = this.customers.findIndex((obj) => obj._id === doc._id);
      if (index !== -1) {
        this.customers[index] = { ...doc };
      } else {
        const newUser = { ...doc, _id: `manual-${Date.now()}` };
        this.customers.push(newUser);
      }

      this.dialog = false;
      this.updateDoc = null;

      this.$q.notify({
        type: "positive",
        message:
          source === "manual"
            ? `Submit success! ${
                doc.username ? `Username: ${doc.username}` : "Customer saved"
              }`
            : `Submit by template successful! ${
                doc.username ? `Username: ${doc.username}` : "Customer imported"
              }`,
        timeout: 3000,
        position: "top",
      });
    },

    handleKeydown(event) {
      if (event.key === "Escape" && this.dialog) {
        this.dialog = false;
      }
      if (event.ctrlKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        this.handleAdd();
      }
    },
  },
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>