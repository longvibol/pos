<template>
  <fieldset>
    <legend>Search By Date</legend>
    <div class="row justify-center items-center">
      <div class="col-md-4 col-xs-12 q-pa-sm">
        <q-input outlined dense v-model="form.fromDate">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date mask="DD-MM-YYYY" v-model="form.fromDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-md-4 col-xs-12 q-pa-sm">
        <q-input outlined dense v-model="form.toDate">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date mask="DD-MM-YYYY" v-model="form.toDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-md-2 col-xs-12">
        <q-btn label="Search" @click="findByDate()" />
      </div>
    </div>
  </fieldset>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        fromDate: moment(new Date()).startOf("month").format("DD-MM-YYYY"),
        toDate: moment(new Date()).format("DD-MM-YYYY"),
      },
    };
  },
  mounted() {
    this.findByDate();
  },
  methods: {
    findByDate() {
      this.$emit("searchByDate", this.form);
    },
  },
};
</script>
