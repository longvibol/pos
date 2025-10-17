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
        <item-form :updateDoc="updateDoc" @close="close" />
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
    <item-table @edit="handleEdit" @delete="handleDelete" :items="items" />
  </div>
</template>

<script>
import moment from "moment";
import ItemForm from "../components/ItemForm.vue";
import ItemTable from "../components/ItemTable.vue";

export default {
  components: { ItemForm, ItemTable },
  data() {
    return {
      dialog: false,
      updateDoc: null,
      items: [],
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
      Meteor.call("item.remove", id, (err, result) => {
        if (result) {
          this.getData();
        }
      });
    },
    handleEdit(doc) {
      console.log("customer:", doc);
      this.updateDoc = Object.assign({}, doc);
      this.updateDoc.date = moment(doc.date).format("YYYY-MM-DD");
      this.dialog = true;
    },
    handleAdd() {
      this.dialog = true;
    },
    getData() {
      Meteor.call("item.find", (err, result) => {
        if (result) {
          this.items = result;
        }
      });
    },
  },
};
</script>
