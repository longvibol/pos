<template>
  <div>
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar>
          <q-space />
          <q-btn
            dense
            flat
            icon="close"
            color="white"
            class="bg-red shadow-4"
            rounded
            v-close-popup
          >
            <q-tooltip content-class="bg-white text-primary ">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <supplier-form :updateDoc="updateDoc" @close="close" />
      </q-card>
    </q-dialog>
    <q-btn
      icon="add"
      class="q-mb-sm"
      dense
      color="primary"
      rounded
      @click="handleAdd"
    />
    <supplier-table
      @edit="handleEdit"
      @delete="handleDelete"
      :suppliers="suppliers"
    />
  </div>
</template>

<script>
import SupplierForm from "../components/SupplierForm.vue";
import SupplierTable from "../components/SupplierTable.vue";
export default {
  components: {
    SupplierForm,
    SupplierTable,
  },
  data() {
    return {
      dialog: false,
      updateDoc: null,
      suppliers: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    close() {
      this.getData();
      this.updateDoc = null;
      this.dialog = false;
    },
    handleDelete(id) {
      Meteor.call("item.remove", id, (error, success) => {
        if (error) {
          console.log("error", error);
        }
        if (success) {
          this.getData();
        }
      });
    },
    handleEdit(doc) {
      console.log("supplier:", doc);
      this.updateDoc = Object.assign({}, doc);
      this.dialog = true;
    },
    handleAdd() {
      this.dialog = true;
    },
    getData() {
      Meteor.call("supplier.find", (error, success) => {
        if (success) {
          this.suppliers = success;
        } else {
          console.log("error", error);
        }
      });
    },
  },
};
</script>
