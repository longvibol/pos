<template>
  <div class="my-table-show">
    <div>
      <h2>Users List:</h2>
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Gender</th>
            <th>Habits</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.habits.join(", ") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      default: null,
      type: Array,
    },
  },
};
</script>

<style></style>
