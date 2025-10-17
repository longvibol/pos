<template>
  <div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Company Name</th>
          <th class="text-left">Owner Name</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Address</th>
          <th class="text-left">Status</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in suppliers" :key="index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ customer.company }}</td>
          <td class="text-left">{{ customer.ownerName }}</td>
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
export default {
  props: {
    suppliers: {
      type: Array,
      default: null,
    },
  },
  methods: {
    handleDelete(id) {
      this.$emit("delete", id);
    },
    handleEdit(doc) {
      this.$emit("edit", doc);
    },
  },
};
</script>
