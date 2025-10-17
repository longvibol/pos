<template>
  <div>
    <h4>Purchase Table</h4>
    <q-markup-table>
      <thead class="bg-primary text-white">
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Name</th>
          <th class="text-left">Cost</th>
          <th class="text-left">Price</th>
          <th class="text-left">Quantity</th>
          <th class="text-left">Date</th>
          <th class="text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item._id || index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ item.name }}</td>
          <td class="text-left">{{ item.cost }}</td>
          <td class="text-left">{{ item.qty }}</td>
          <td class="text-left">{{ formatDate(item.date) }}</td>
          <td class="text-left">{{ item.status }}</td>
          <td class="text-left">
            <q-btn
              color="red"
              dense
              icon="delete"
              round
              @click="handleDelete(item._id)"
            />
            <q-btn
              color="info"
              dense
              icon="edit"
              class="q-ml-sm"
              round
              @click="handleEdit(item)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return date ? moment(date).format("DD-MM-YYYY") : "-";
    },
    handleDelete(id) {
      this.$emit("delete", id);
    },
    handleEdit(doc) {
      this.$emit("edit", doc);
    },
  },
};
</script>
