<template>
  <div>
    <q-markup-table>
      <thead class="bg-primary text-white">
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Company Name</th>
          <th class="text-left">Owner Name</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Address</th>
          <th class="text-left">Status</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for:="(supply, index) in supplier" :key="index">
          <td class="text-left">{{ index+1 }}</td>
          <td class="text-left">{{supply.company}}</td>
          <td class="text-left">{{supply.ownerName}}</td>
          <td class="text-left">{{supply.phone}}</td>
          <td class="text-left">{{supply.address}}</td>
          <td class="text-left">{{supply.status}}</td>

          <td class="text-left">
            <q-btn
              color="red"
              dense
              icon="delete"
              round
              @click="handleDelete(supply._id)"
            />
            <q-btn
              color="info"
              dense
              icon="edit"
              class="q-ml-sm"
              round
              @click="habndleEdit(supply)"
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
    supplier: {
      type: Array,
      default: null,
      required: true,
    },

    updateDoc: {
      type: Object,
      default: null,
    },
  },

  mounted() {
    if (this.updateDoc) {
      this.form = this.updateDoc;
    }
  },
  methods: {
    handleDelete(id) {
      this.$emit("delete", id);
    },
    habndleEdit(supply) {
      this.$emit("edit", supply);
    },
  },
};
</script>

<style></style>
 