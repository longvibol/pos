<template>
  <div>
    <h1>This is from SignUp</h1>
    <ComponentSignUp @submit="handleSignUp" />
    <MyTableVue :users="users" />
    
  </div>
</template>

<script>
import ComponentSignUp from "./components/ComponentSignUp.vue";
import MyTableVue from './components/MyTable.vue';

export default {
  components: {
    ComponentSignUp,
    MyTableVue
  },

  data() {
    return {
      users: [],
    };
  },

  methods: {
    handleSignUp(doc) {
      this.users.push(doc);
      // console.log('user:', this.users);
    },
  },
};
</script>

<style></style>
