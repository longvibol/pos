<template>
  <div class="q-pr-xl q-pl-xl q-pt-md q-mr-xl q-ml-xl">
    <q-card class="shadow-6">
      <q-card-section class="text-h5 text-center">
        Supplier Form
      </q-card-section>
      <q-card-section>
        <div class="fit row justify-evenly">
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input
              square
              outlined
              v-model="form.company"
              label="Company Name"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input
              square
              outlined
              v-model="form.ownerName"
              label="Owner Name"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input
              square
              outlined
              v-model="form.phone"
              label="Phone Number"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input
              square
              outlined
              v-model="form.address"
              label="Address"
              autogrow
              hint="Country/Province/District/Village"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <fieldset>
              <label class="text-grey text-subtitle1">Status</label>
              <q-radio v-model="form.status" val="active" label="Active" />
              <q-radio v-model="form.status" val="inactive" label="Inactive" />
            </fieldset>
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm"></div>
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
        company: null,
        ownerName: null,
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
      let method = this.updateDoc ? `supplier.update` : `supplier.insert`;
      Meteor.call(method, this.form, (error, success) => {
        if (error) {
          console.log("error", error);
        }
        if (success) {
          this.$emit("close");
        }
      });
    },
  },
};
</script>

<style></style>
