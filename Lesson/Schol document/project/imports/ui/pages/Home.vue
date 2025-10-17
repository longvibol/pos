<template>
  <div>
    <q-dialog
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
      v-model="dialog"
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
    <div class="absolute-full text-subtitle2 flex flex-center q-mb-xl q-pb-xl">
      <div class="text-center items-center">
        <q-img src="img/logo.png" width="720px" />
      </div>
      <div class="full-width row wrap justify-center items-start content-start">
        <div class="q-ma-lg" v-for="(list, index) in lists" :key="index">
          <q-btn
            class="btn"
            :color="list.background"
            @click="handleEnter(list.path)"
          >
            <q-icon class="col-12" left :name="list.icon" size="10rem" />
            <div class="col-12 text-h4">{{ list.label }}</div>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PurchaseForm from "../components/PurchaseForm.vue";
export default {
  components: { PurchaseForm },
  data() {
    return {
      dialog: false,

      lists: [
        {
          path: "user",
          icon: "person",
          label: "User",
          background: "blue-6",
        },
        {
          path: "customer",
          icon: "groups",
          label: "Customer",
          background: "red-6",
        },
        {
          path: "supplier",
          icon: "maps_home_work",
          label: "Supplier",
          background: "amber-6",
        },
        {
          path: "category",
          icon: "backup_table",
          label: "Category",
          background: "green-6",
        },
        {
          path: "item",
          icon: "dns",
          label: "Item",
          background: "blue-6",
        },
        {
          path: "purchase",
          icon: "inventory",
          label: "Purchase",
          background: "red-6",
        },
        {
          path: "sale",
          icon: "add_shopping_cart",
          label: "Quick Sale",
          background: "amber-6",
        },
        {
          path: false,
          icon: "arrow_circle_down",
          label: "Quick Purchase",
          background: "green-6",
        },
      ],
    };
  },
  mounted() {},

  methods: {
    handleEnter(path) {
      if (path) {
        this.$router.push(path);
      } else {
        this.dialog = true;
      }
    },
    close() {
      this.dialog = false;
      this.getData();
    },
  },
};
</script>
<style>
.btn :hover {
  transform: scale(0.98);
  transition: transform 0.4s;
}
.btn {
  width: 350px;
  height: 250px;
  font-size: 20px;
}
.slide-fade-enter-active {
  transition: all 1.5s ease;
}
.slide-fade-leave-active {
  transition: all 1.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
