<template>
  <div>
    <form-search-by-date @searchByDate="searchByDate" />
    <div class="q-mt-md">
      <q-btn icon="print" @click="handlePrint" />
      <q-markup-table id="print" :dense="dense">
        <thead>
          <tr>
            <th class="text-left">No</th>
            <th class="text-left">Date</th>
            <th class="text-left">Company</th>
            <th class="text-left">Item</th>
            <th class="text-left">Remains</th>
            <th class="text-left">Cost</th>
            <th class="text-left">Price</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td class="text-left">{{ index + 1 }}</td>
            <td class="text-left">{{ item.date | toDate }}</td>
            <td class="text-left">{{ item.company }}</td>
            <td class="text-left">{{ item.name }}</td>
            <td class="text-left">{{ item.remains }}</td>
            <td class="text-left">{{ item.cost }}</td>
            <td class="text-left">{{ item.price }}</td>
            <td class="text-left">{{ item.qty }}</td>
            <td class="text-left">{{ item.status }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import FormSearchByDate from "../components/FormSearchByDate.vue";
import printJS from "print-js";
export default {
  components: { FormSearchByDate },
  data() {
    return {
      items: [],
      dense: false,
    };
  },
  filters: {
    toDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
  },
  methods: {
    searchByDate(date) {
      console.log("date", date);
      Meteor.call("import.findByDate", date, (err, result) => {
        if (result) {
          this.items = result;
        }
      });
    },
    handlePrint() {
      this.dense = true;
      setTimeout(() => {
        printJS({
          printable: "print",
          type: "html",
          targetStyles: ["*"],
        });
        this.dense = false;
      });
    },
  },
};
</script>
