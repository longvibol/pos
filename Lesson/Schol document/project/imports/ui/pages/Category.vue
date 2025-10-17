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
        <category-form :updateDoc="updateDoc" @close="close" />
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
    <category-table
      @edit="handleEdit"
      @delete="handleDelete"
      :categories="categories"
    />
  </div>
</template>

<script>
import moment from "moment";
import CategoryForm from "../components/CategoryForm.vue";
import CategoryTable from "../components/CategoryTable.vue";
export default {
  components: { CategoryForm, CategoryTable },
  data() {
    return {
      dialog: false,
      updateDoc: null,
      categories: [],
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
      Meteor.call("category.remove", id, (err, result) => {
        if (result) {
          this.getData();
        }
      });
    },
    handleEdit(doc) {
      console.log("category:", doc);
      this.updateDoc = Object.assign({}, doc);
      this.updateDoc.date = moment(doc.date).format("YYYY-MM-DD");
      this.dialog = true;
    },
    handleAdd() {
      this.dialog = true;
    },
    getData() {
      Meteor.call("category.find", (err, result) => {
        if (result) {
          this.categories = result;
        }
      });
    },
  },
};
</script>
