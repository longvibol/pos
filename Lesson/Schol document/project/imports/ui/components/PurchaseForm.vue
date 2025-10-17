<template>
  <div class="q-pt-md q-mr-xl q-ml-xl">
    <q-card class="shadow-6">
      <q-card-section class="text-h5 text-center">
        Purchase Form
      </q-card-section>
      <q-card-section>
        <div class="fit row justify-evenly">
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-select
              square
              outlined
              v-model="form.supplierId"
              label="Supplier"
              :options="supplierOpts"
              emit-value
              map-options
              option-label="company"
              option-value="_id"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-select
              square
              outlined
              v-model="form.itemId"
              label="Item"
              :options="itemOpts"
              emit-value
              map-options
              option-label="name"
              option-value="_id"
            />
          </div>

          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input
              square
              outlined
              v-model.number="form.cost"
              label="Cost "
              type="number"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input
              square
              outlined
              v-model.number="form.price"
              label="Price"
              type="number"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input
              square
              outlined
              v-model.number="form.qty"
              label="Quantity"
              type="number"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input
              type="date"
              square
              outlined
              v-model="form.date"
              label="Date "
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
            <q-btn color="primary" label="Submit" @click="handleSubmit" />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm"></div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { Notify } from "quasar";
import moment from "moment";
export default {
  data() {
    return {
      form: {
        supplierId: null,
        itemId: null,
        cost: null,
        price: null,
        qty: null,
        date: moment(new Date()).format("YYYY-MM-DD"),
        status: "active",
      },
      itemOpts: [],
      supplierOpts: [],
    };
  },
  mounted() {
    this.getItem();
    this.getSupplier();
  },
  methods: {
    handleSubmit() {
      let valid = false;
      for (const doc in this.form) {
        if (this.form[doc] == null) {
          valid = true;
        }
      }
      if (!valid) {
        this.form.date = moment(this.form.date, "YYYY-MM-DD").toDate();
        Meteor.call("purchase.add", this.form, (err, result) => {
          if (result) {
            this.$emit("close");
          } else {
            console.log("err", err);
          }
        });
      } else {
        Notify.create({
          message: "Please fill the form ",
          color: "negative",
          type: "negative",
          position: "top",
        });
      }
    },
    getItem() {
      Meteor.call("item.find", (err, result) => {
        if (result) {
          this.itemOpts = result;
        }
      });
    },
    getSupplier() {
      Meteor.call("supplier.find", (err, result) => {
        if (result) {
          console.log("result", result);
          this.supplierOpts = result;
        } else {
          console.log("err", err);
        }
      });
    },
  },
};
</script>
