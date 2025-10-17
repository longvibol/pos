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
        <purchase-form @close="close" />
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
    <purchase-table :items="items" />
  </div>
</template>

<script>
import PurchaseForm from "../components/PurchaseForm.vue";
import PurchaseTable from "../components/PurchaseTable.vue";
export default {
  components: { PurchaseTable, PurchaseForm },
  data() {
    return {
      dialog: false,
      items: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleAdd() {
      this.dialog = true;
    },
    close() {
      this.getData();
      this.dialog = false;
    },
    getData() {
      Meteor.call("purchase.find", (error, result) => {
        if (result) {
          this.items = result;
        } else {
          console.log("err", error);
        }
      });
    },
  },
};
</script>
