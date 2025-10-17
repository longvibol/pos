<template>
  <div class="q-pr-xl q-pl-xl q-pt-md q-mr-xl q-ml-xl">
    <q-card class="shadow-6">
      <q-card-section class="text-h5 text-center">
        Customer Form
      </q-card-section>
      <q-card-section>
        <div class="fit row justify-evenly">
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input square outlined v-model="form.name" label="Name" />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <fieldset>
              <label class="text-grey text-subtitle1">Gender</label>
              <q-radio v-model="form.gender" val="male" label="Male" />
              <q-radio v-model="form.gender" val="female" label="Female" />
            </fieldset>
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input
              type="date"
              square
              outlined
              v-model="form.dob"
              label="Date Of Birth"
              hint="MM/DD/YYYY"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input square outlined v-model="form.phone" label="Phone" />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input square outlined v-model="form.address" label="Address" />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <fieldset>
              <label class="text-grey text-subtitle1">Status</label>
              <q-radio v-model="form.status" val="active" label="Active" />
              <q-radio v-model="form.status" val="inactive" label="Inactive" />
            </fieldset>
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-btn
              :color="updateDoc ? `info` : `primary`"
              :label="updateDoc ? `Update` : `Submit`"
              @click="handleSubmit"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm"></div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    updateDoc: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        name: null,
        gender: "male",
        dob: moment(new Date()).subtract(18, "years").format("YYYY-MM-DD"),
        phone: null,
        address: null,
        status: "active",
      },
    };
  },
  created() {
    if (this.updateDoc) {
      this.form = this.updateDoc;
    }
  },
  methods: {
    handleSubmit() {
      this.form.dob = moment(this.form.dob, "YYYY-MM-DD").toDate();
      let method = "customer.insert";
      if (this.updateDoc) {
        method = "customer.update";
      }
      Meteor.call(method, this.form, (err, result) => {
        if (result) {
          this.$emit("close");
        }
      });
    },
  },
};
</script>
