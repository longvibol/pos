<template>
  <div>
    <div class="row justify-around q-ma-sm">
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="form.username" label=" Username" />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="form.email" label=" Email" />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="form.phone" label=" Phone" />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-select
          outlined
          v-model="form.role"
          :options="roles"
          label="Role"
          map-options
          emit-value
          option-value="value"
        />
      </div>
      <div class="col-10 q-ma-md" v-if="updateDoc">
        <q-checkbox v-model="reset" label="Reset Password" />
      </div>
    </div>
    <div class="row justify-around q-ma-sm" v-if="!updateDoc || reset">
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input
          outlined
          v-model="form.password"
          type="password"
          label="Password"
        />
      </div>
      <div class="col-md-5 col-xs-12 col-sm-4 q-ma-md">
        <q-input outlined v-model="confirm" type="password" label="Confirm" />
      </div>
    </div>
    <div class="q-ma-md text-center">
      <q-btn
        :color="updateDoc ? `info` : `primary`"
        :label="updateDoc ? `Update` : `Submit`"
        @click="handleSubmit()"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    updateDoc: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      form: {
        username: "",
        email: "",
        phone: "",
        role: "",
        password: "",
      },
      reset: false,
      confirm: null,
      roles: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Sale",
          value: "sale",
        },
      ],
    };
  },
  mounted() {
    if (this.updateDoc) {
      this.form = this.updateDoc;
    }
  },
  methods: {
    handleSubmit() {
      let method = "user.create";
      if (this.form.password == this.confirm && this.form.password != null) {
        if (this.reset) {
          method = "user.update";
          this.form.reset = this.reset;
        }
      }
      if (this.updateDoc) {
        method = "user.update";
      }
      Meteor.call(method, this.form, (error, result) => {
        if (result) {
          this.$emit("close");
        } else {
          console.log("err:", error);
        }
      });
    },
  },
};
</script>

<style></style>
