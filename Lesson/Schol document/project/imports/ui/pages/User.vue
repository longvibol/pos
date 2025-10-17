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
        <q-card-section>
          <user-form :updateDoc="updateDoc" @close="close" />
        </q-card-section>
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
    <user-table :users="users" @delete="handleDelete" @edit="handleEdit" />
  </div>
</template>

<script>
import UserForm from "../components/UserForm.vue";
import UserTable from "../components/UserTable.vue";
export default {
  components: { UserTable, UserForm },
  data() {
    return {
      dialog: false,
      updateDoc: null,

      users: [],
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
      this.dialog = false;
      this.updateDoc = null;
      this.getData();
    },
    getData() {
      Meteor.call("user.find", (error, result) => {
        if (error) {
          console.log("error", error);
        }
        if (result) {
          this.users = result;
        }
      });
    },
    handleDelete(id) {
      Meteor.call("user.remove", id, (err, result) => {
        if (result) {
          this.getData();
        }
      });
    },
    handleEdit(doc) {
      this.updateDoc = Object.assign({}, doc);
      this.dialog = true;
      console.log("doc", doc);
    },
  },
};
</script>
