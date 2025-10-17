<template>
  <component :is="currentLayout" />
</template>

<script>
import AdminLayout from "./layouts/AdminLayout.vue";
import PublicLayout from "./layouts/PublicLayout.vue";
export default {
  components: {
    AdminLayout,
    PublicLayout,
  },
  data() {
    return {
      currentLayout: null,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue.meta.requiresAuth && newValue.name !== "Home") {
          this.currentLayout = "AdminLayout";
        } else {
          this.currentLayout = "PublicLayout";
        }
      },
    },
  },
};
</script>
