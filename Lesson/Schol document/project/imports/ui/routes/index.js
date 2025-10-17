import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
let routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../pages/User.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/customer",
    name: "Customer",
    component: () => import("../pages/Customer.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("../pages/Category.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/item",
    name: "Item",
    component: () => import("../pages/Item.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/supplier",
    name: "Supplier",
    component: () => import("../pages/Supplier.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/purchase",
    name: "Purchase",
    component: () => import("../pages/Purchase.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/sale",
    component: () => import("../pages/Sale.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/import",
    name: "Import",
    component: () => import("../pages/Import.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/export",
    name: "Export",
    component: () => import("../pages/Export.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    component: () => import("../pages/Login.vue"),
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!Meteor.userId()) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
