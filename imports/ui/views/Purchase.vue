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

        <purchase-form
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
      <q-tooltip class="bg-white text-primary"> Add (Ctrl + A) </q-tooltip>
    </q-btn>

    <purchase-table :items="items" @delete="handleDelete" @edit="handleEdit" />
  </div>
</template>

<script>
import PurchaseForm from "../components/PurchaseForm.vue";
import PurchaseTable from "../components/PurchaseTable.vue";

export default {
  components: { PurchaseForm, PurchaseTable },
  data() {
    return {
      items: [],
      dialog: false,
      updateDoc: null,
    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
    this.getData();
  },
  methods: {
    getData() {
      this.items = [
        {
          _id: "01",
          supplierId: "កូការ",
          itemId: "01",
          name: "Pizza",
          cost: "1300",
          price: "2000",
          qty: "42",
          date: new Date(),
          status: "active",
        },
      ];
    },
    handleAdd() {
      this.dialog = true;
      console.log("button add show");
    },

    handleDelete(id) {
      let index = this.items.findIndex((doc) => {
        return doc._id == id;
      });
      this.items.splice(index, 1);
    },

    handleEdit(item) {
      console.log("Edit item:", item);
      this.updateDoc = item;
      this.dialog = true;
    },

    handleBatchImport({ items, source }) {
      const enriched = items.map((item, index) => ({
        ...item,
        _id: `imported-${Date.now()}-${index}`,
      }));
      this.items = [...this.items, ...enriched];

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
      const index = this.items.findIndex((obj) => obj._id === doc._id);
      if (index !== -1) {
        this.items.splice(index, 1, doc); // update existing
      } else {
        this.items.push(doc); // insert new
      }

      this.dialog = false;
      this.updateDoc = null;

      this.$q.notify({
        type: "positive",
        message: `Submit success! Name: ${doc.name}`,
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

  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>

<style></style>
