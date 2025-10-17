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

        <category-form
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

    <category-table
      :items="categorys"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</template>

<script>
import CategoryForm from "../components/CategoryForm.vue";
import CategoryTable from "../components/CategoryTable.vue";

export default {
  components: { CategoryForm, CategoryTable },
  data() {
    return {
      categorys: [],
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
      this.categorys = [
        {
          _id: "01",
          name: "Jame",
          date: new Date(),
          description: "Food",
        },
        {
          _id: "02",
          name: "Dara",
          date: new Date(),
          description: "Soft-drink",
        },
      ];
    },

    handleAdd() {
      this.updateDoc = null;
      this.dialog = true;
    },

    handleDelete(id) {
      const index = this.categorys.findIndex((doc) => doc._id === id);
      if (index !== -1) {
        this.categorys.splice(index, 1);
      }
    },

    handleEdit(doc) {
      this.updateDoc = { ...doc };
      this.dialog = true;
    },

handleBatchImport({ categories = [], source }) {
  if (!Array.isArray(categories) || categories.length === 0) {
    this.$q.notify({
      type: "warning",
      message: "No valid categories found in the uploaded file.",
      timeout: 3000,
      position: "top",
    });
    return;
  }

  const enriched = categories.map((cat, index) => ({
    ...cat,
    _id: `imported-${Date.now()}-${index}`,
  }));

  this.categorys = [...this.categorys, ...enriched];

  this.$q.notify({
    type: "info",
    message:
      source === "template"
        ? `${enriched.length} categories imported by template.`
        : `${enriched.length} categories imported.`,
    timeout: 4000,
    position: "top",
  });
},

    handleSubmit({ doc, source }) {
      const index = this.categorys.findIndex((obj) => obj._id === doc._id);
      if (index !== -1) {
        this.categorys[index] = { ...doc };
      } else {
        const newUser = { ...doc, _id: `manual-${Date.now()}` };
        this.categorys.push(newUser);
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