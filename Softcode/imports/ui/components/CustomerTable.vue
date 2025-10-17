<template>
  <div>
    <q-markup-table>
      <thead class="bg-primary text-white">
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Name</th>
          <th class="text-left">Gender</th>
          <th class="text-left">Dob</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Address</th>
          <th class="text-left">Status</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item._id || index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ item.name }}</td>
          <td class="text-left">{{ item.gender }}</td>
          <td class="text-left">{{ formatDate(item.dob) }}</td>
          <td class="text-left">{{ item.phone }}</td>
          <td class="text-left">{{ item.address }}</td>
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