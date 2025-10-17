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

        <user-form
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

    <user-table :users="users" @delete="handleDelete" @edit="handleEdit" />
  </div>
</template>

<script>
import UserForm from "../components/UserForm.vue";
import UserTable from "../components/UserTable.vue";

export default {
  components: { UserForm, UserTable },
  data() {
    return {
      users: [],
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
      this.users = [
        {
          _id: "01",
          username: "john_doe",
          email: "john@gmial.com",
          phone: "0123456789",
          role: "admin",
        },
        {
          _id: "02",
          username: "dara",
          email: "dara@gmial.com",
          phone: "0123456789",
          role: "admin",
        },
        {
          _id: "03",
          username: "vibol",
          email: "vibol@gmial.com",
          phone: "0123456789",
          role: "admin",
        },
      ];
    },
    handleAdd() {
      this.dialog = true;
      console.log("button add show");
    },

    handleDelete(id) {
      let index = this.users.findIndex((doc) => {
        return doc._id == id;
      });
      this.users.splice(index, 1);
    },

    handleEdit(user) {
      console.log("Edit user:", user);
      this.updateDoc = user;
      this.dialog = true;
    },

    handleBatchImport({ users, source }) {
      const enriched = users.map((user, index) => ({
        ...user,
        _id: `imported-${Date.now()}-${index}`,
      }));
      this.users = [...this.users, ...enriched];

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
      if (doc._id) {
        // Update existing user
        const index = this.users.findIndex((obj) => obj._id === doc._id);
        if (index !== -1) {
          this.users[index] = { ...doc }; // Replace with updated doc
        }
      } else {
        // Create new user
        const newUser = {
          ...doc,
          _id: `manual-${Date.now()}`,
        };
        this.users.push(newUser);
      }

      this.dialog = false;
      this.updateDoc = null;

      this.$q.notify({
        type: "positive",
        message:
          source === "manual"
            ? `Submit success! Username: ${doc.username}`
            : `Submit by template successful! Username: ${doc.username}`,
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
