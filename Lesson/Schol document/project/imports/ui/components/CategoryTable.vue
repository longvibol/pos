<template>
  <div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Name</th>
          <th class="text-left">Date</th>
          <th class="text-left">Description</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in categories" :key="index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ item.name }}</td>
          <td class="text-left">{{ item.date | toDate }}</td>
          <td class="text-left">{{ item.description }}</td>
          <td class="text-center">
            <q-btn
              icon="delete"
              dense
              rounded
              color="red"
              flat
              @click="handleDelete(item._id)"
            />
            <q-btn
              icon="edit"
              dense
              rounded
              color="info"
              flat
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
    categories: {
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
      this.$emit("edit", doc);
    },
  },
};
</script>
