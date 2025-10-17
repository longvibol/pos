import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import User from "./views/User.vue";
import Customer from "./views/Customer.vue";
import Category from "./views/Category.vue";
import Item from "./views/Item.vue";
import Supplier from "./views/Supplier.vue";
import Purchase from "./views/Purchase.vue";
import Sale from "./views/Sale.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/user",
      name: "User",
      component: User,
    },
    {
      path: "/customer",
      name: "Customer",
      component: Customer,
    },
    {
      path: "/category",
      name: "Category",
      component: Category,
    },
    {
      path: "/item",
      name: "Item",
      component: Item,
    },
    {
      path: "/supplier",
      name: "supplier",
      component: Supplier,
    },
    {
      path: "/purchase",
      name: "purchase",
      component: Purchase,
    },
     {
      path: "/sale",
      name: "sale",
      component: Sale,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});
