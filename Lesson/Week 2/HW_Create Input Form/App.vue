<template>
  <div>
    <form action="/submit">
      <label for="username">Username:</label>
      <input
        type="text"
        id="username"
        v-model="username"
        @input="username = username.toUpperCase()"
        placeholder="Enter your username"
      /><br /><br />
      <label for="password">Password:</label>
      <div class="password-field">
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="password"
          placeholder="Enter your password"
        />
        <button
          type="button"
          class="toggle-password"
          @click="showPassword = !showPassword"
        >
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </button>
      </div>

      <br /><br />

      <label>Gender:</label>
      <input
        type="radio"
        id="male"
        :value="'Male'"
        v-model="gender"
        name="gender"
      />
      <label for="male">Male</label>

      <input
        type="radio"
        id="female"
        :value="'Female'"
        v-model="gender"
        name="gender"
      />
      <label for="female">Female</label>

      <br /><br />

      <label>Habits:</label>

      <input type="checkbox" id="hiking" value="hiking" v-model="habits" />
      <label for="hiking">Hiking</label>

      <input type="checkbox" id="football" value="football" v-model="habits" />
      <label for="football">Football</label>

      <input type="checkbox" id="reading" value="reading" v-model="habits" />
      <label for="reading">Reading</label>

      <input type="checkbox" id="eating" value="eating" v-model="habits" />
      <label for="eating">Eating</label>

      <input type="checkbox" id="hangout" value="hangout" v-model="habits" />
      <label for="hangout">Hangout</label><br /><br />

      <div class="button-group">
        <button @click.prevent="handleSubmit">Sign Up</button>
        <button @click.prevent="handleHideTable">Close Table</button>
        <button @click.prevent="activeTable = true">Show Table</button>
        <button class="delete" @click="deleteUser(index)">Delete All</button>
      </div>
    </form>

    <div v-if="activeTable && users.length">
      <h2>Users List:</h2>
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Gender</th>
            <th>Habits</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in paginatedUsers" :key="index">
            <td>{{ (currentPage - 1) * usersPerPage + index + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.habits.join(", ") }}</td>
            <td>
              <button class="delete" @click="deleteUserByReversedIndex(index)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="totalPages > 1" class="pagination">
        <button @click="currentPage--" :disabled="currentPage === 1">
          Prev
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTable: true,
      username: null,
      password: null,
      gender: null,
      habits: [],
      users: [], // This will store all submitted users
      currentPage: 1,
      usersPerPage: 3, // You can adjust this number
      showPassword: false,
    };
  },

  computed: {
    paginatedUsers() {
      const reversed = [...this.users].reverse(); // clone and reverse
      const start = (this.currentPage - 1) * this.usersPerPage;
      const end = start + this.usersPerPage;
      return reversed.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.users.length / this.usersPerPage);
    },
  },

  methods: {
    handleSubmit() {
      const newUser = {
        username: this.username,
        password: this.password,
        gender: this.gender,
        habits: [...this.habits], // Clone the array to avoid reference issues
      };

      this.users.push(newUser); // Save the user to the array
      this.activeTable = true;

      // Optional: Reset form fields
      this.username = null;
      this.password = null;
      this.gender = null;
      this.habits = [];
    },

    handleHideTable() {
      this.activeTable = false;
      console.log("Table hidden:", this.activeTable);
    },

    capitalizeFirst(value) {
      if (!value) return "";
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },

    deleteUser(index) {
      this.users.splice(index, 1);
    },

    deleteUserByReversedIndex(index) {
      const reversedIndex =
        this.users.length -
        1 -
        ((this.currentPage - 1) * this.usersPerPage + index);
      this.users.splice(reversedIndex, 1);
    },
  },
};
</script>

<style>
</style>