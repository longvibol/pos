<template>
  <div class="q-pt-md q-mr-xl q-ml-xl">
    <q-card class="shadow-6">
      <q-card-section class="text-h5 text-center">
        Category Form
      </q-card-section>
      <q-card-section>
        <div class="fit row justify-evenly">
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input square outlined v-model="form.name" label="Name" />
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
          <div class="col-xs-12 col-sm-8 q-ma-sm">
            <q-input
              type="textarea"
              square
              outlined
              v-model="form.description"
              label="Description"
            />
          </div>
        </div>
        <div class="text-center">
          <q-btn
            :color="updateDoc ? `info` : `primary`"
            :label="updateDoc ? `Update` : `Submit`"
            @click="handleSubmit"
          />
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
        date: moment(new Date()).format("YYYY-MM-DD"),
        description: null,
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
      this.form.date = moment(this.form.date, "YYYY-MM-DD").toDate();
      let method = "category.insert";
      if (this.updateDoc) {
        method = "category.update";
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
