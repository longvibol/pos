<template>
  <div>
    <div class="row justify-center q-mt-xl">
      <div class="col-12 text-center q-mb-md">
        <q-avatar
          size="100px"
          color="grey"
          text-color="white"
          icon="person"
          class="shadow-3"
        />
      </div>
      <q-card class="col-12 q-pa-sm" style="width: 400px">
        <q-card-section class="text-center">
          <label class="text-center text-h6">User Login</label>
        </q-card-section>
        <q-card-section>
          <q-input outlined v-model="form.username" label="Username" />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="form.password"
            type="password"
            label="Password"
          />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="positive" label="Login" @click="handleLogin" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    handleLogin() {
      Meteor.loginWithPassword(
        this.form.username,
        this.form.password,
        (err) => {
          if (!err) {
            console.log("user:", Meteor.user());
            this.$router.push("/");
          } else {
          }
        }
      );
    },
  },
};
</script>
