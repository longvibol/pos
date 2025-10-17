<template>
  <div class="q-ma-md">
    <form>
      <q-card>
        <q-card-section class="text-h5 text-center"> Form Sale </q-card-section>
        <q-card-section>
          <div class="row items-center">
            <div class="col-md-8 col-xs-12">
              <!-- Invoice Number -->
              <div class="col-xs-12 col-sm-4 q-ma-sm">
                <q-input
                  outlined
                  type="number"
                  readonly
                  v-model.number="form.invoiceNumber"
                  label="Invoice Number"
                />
              </div>

              <!-- Date with q-date picker -->
              <div class="col-xs-12 col-sm-4 q-ma-sm">
                <q-input outlined v-model="form.date" label="Date" readonly>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="form.date" mask="YYYY-MM-DD" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <!-- Customer -->
              <div class="col-xs-12 col-sm-4 q-ma-sm">
                <q-select
                  outlined
                  v-model="form.customerId"
                  :options="customerOpts"
                  label="Customer"
                  map-options
                  emit-value
                  option-label="name"
                  option-value="_id"
                />
              </div>

              <!-- Item -->
              <div class="col-xs-12 col-sm-4 q-ma-sm">
                <q-select
                  outlined
                  v-model="form.itemId"
                  :options="itemOpts"
                  label="Item"
                  map-options
                  emit-value
                  option-label="name"
                  option-value="_id"
                  @update:model-value="handleChangeItem"
                />
              </div>
            </div>

            <!-- Total -->
            <div class="col-md-4 col-xs-12">
              <div class="q-pa-xl">
                <div class="text-h5 text-center">Total 5500</div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      item: null,
      form: {
        invoiceNumber: null,
        date: moment(new Date()).format("YYYY-MM-DD"), // default today
        customerId: null,
        itemId: null,
        items: [],
      },
      itemOpts: [],
      customerOpts: [],
    };
  },
  mounted() {
    this.getCustomer();
    this.getPurchase();
  },
  methods: {
    handleChangeItem(val) {
      console.log("Selected item:", val);
    },

    getPurchase() {
      this.itemOpts = [
        {
          _id: "01",
          itemId: "01",
          name: "Coca",
          price: 5500,
          qty: 15,
        },
        {
          _id: "02",
          itemId: "02",
          name: "Spy",
          price: 6000,
          qty: 12,
        },
      ];
    },
    getCustomer() {
      this.customerOpts = [
        {
          _id: "01",
          name: "Sopheak Chan",
        },
        {
          _id: "02",
          name: "Leakena",
        },
      ];
    },
  },
};
</script>
