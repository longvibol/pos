<template>
  <div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Name</th>
          <th class="text-left">Gender</th>
          <th class="text-left">Dob</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Address</th>
          <th class="text-left">Status</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customers" :key="index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ customer.name }}</td>
          <td class="text-left">{{ customer.gender }}</td>
          <td class="text-left">{{ customer.dob | toDate }}</td>
          <td class="text-left">{{ customer.phone }}</td>
          <td class="text-left">{{ customer.address }}</td>
          <td class="text-left">{{ customer.status }}</td>
          <td class="text-center">
            <q-btn
              icon="delete"
              dense
              rounded
              color="red"
              flat
              @click="handleDelete(customer._id)"
            />
            <q-btn
              icon="edit"
              dense
              rounded
              color="info"
              flat
              @click="handleEdit(customer)"
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
    customers: {
      type: Array,
      default: null,
    },
  },
  filters: {
    toDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
  },
  methods: {
    handleDelete(id) {
      this.$emit("delete", id);
    },
    handleEdit(doc) {
      this.$emit("edit", Object.assign({}, doc));
    },
  },
};
</script>
