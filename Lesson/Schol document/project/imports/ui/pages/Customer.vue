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
        <customer-form :updateDoc="updateDoc" @close="close" />
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
    <customer-table
      @edit="handleEdit"
      @delete="handleDelete"
      :customers="customers"
    />
  </div>
</template>

<script>
import moment from "moment";
import CustomerForm from "../components/CustomerForm.vue";
import CustomerTable from "../components/CustomerTable.vue";
export default {
  components: {
    CustomerForm,
    CustomerTable,
  },
  data() {
    return {
      dialog: false,
      updateDoc: null,
      customers: [],
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
      Meteor.call("customer.remove", id, (err, result) => {
        if (result) {
          this.getData();
        }
      });
    },
    handleEdit(doc) {
      this.updateDoc = Object.assign({}, doc);
      this.updateDoc.dob = moment(doc.dob).format("YYYY-MM-DD");
      this.dialog = true;
    },
    handleAdd() {
      this.dialog = true;
    },
    getData() {
      Meteor.call("customer.find", (err, result) => {
        if (result) {
          this.customers = result;
        }
      });
    },
  },
};
</script>
