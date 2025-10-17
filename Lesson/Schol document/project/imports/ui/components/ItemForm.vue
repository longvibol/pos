<template>
  <div class="q-pt-md q-mr-xl q-ml-xl">
    <q-card class="shadow-6">
      <q-card-section class="text-h5 text-center"> Item Form </q-card-section>
      <q-card-section>
        <div class="fit row justify-evenly">
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input square outlined v-model="form.name" label="Name" />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-select
              square
              outlined
              v-model="form.categoryId"
              label="Category"
              :options="categoryOpts"
              emit-value
              map-options
              option-label="name"
              option-value="_id"
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
            <q-input
              type="textarea"
              square
              outlined
              v-model="form.description"
              label="Description"
              autogrow
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <fieldset>
              <label class="text-grey text-subtitle1">Status</label>
              <q-radio v-model="form.status" val="active" label="Active" />
              <q-radio v-model="form.status" val="inactive" label="Inactive" />
            </fieldset>
          </div>
        </div>
        <div class="text-center">
          <q-btn color="primary" label="Submit" @click="handleSubmit" />
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
        categoryId: null,
        date: moment(new Date()).format("YYYY-MM-DD"),
        description: null,
        status: "active",
      },
      categoryOpts: [],
    };
  },
  created() {
    this.getCategory();
    if (this.updateDoc) {
      this.form = this.updateDoc;
    }
  },
  methods: {
    getCategory() {
      Meteor.call("category.find", (err, result) => {
        if (result) {
          this.categoryOpts = result;
        }
      });
    },

    handleSubmit() {
      this.form.date = moment(this.form.date, "YYYY-MM-DD").toDate();
      let method = "item.insert";
      if (this.updateDoc) {
        method = "item.update";
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
