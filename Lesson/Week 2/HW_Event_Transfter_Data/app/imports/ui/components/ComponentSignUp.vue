<template>
  <div class="my-table">
    <form>
      <label for="username">Username:</label>
      <input
        type="text"
        id="username"
        v-model="username"
        @input="username = username.toUpperCase()"
        placeholder="Enter your username"
      /><br /><br />
      <label for="password">Password:</label>
      <input
        type="text"
        id="password"
        v-model="password"
        placeholder="Enter your password"
      /><br /><br />

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

      <input type="checkbox" id="hiking" value="Hiking" v-model="habits" />
      <label for="hiking">Hiking</label>

      <input type="checkbox" id="football" value="Football" v-model="habits" />
      <label for="football">Football</label>

      <input type="checkbox" id="reading" value="Reading" v-model="habits" />
      <label for="reading">Reading</label>

      <input type="checkbox" id="eating" value="Eating" v-model="habits" />
      <label for="eating">Eating</label>

      <input type="checkbox" id="hangout" value="Hangout" v-model="habits" />
      <label for="hangout">Hangout</label><br /><br />

      <div class="button-group">
        <button @click.prevent="handleSignUp">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      gender: null,
      habits: [],
    };
  },

  methods: {
    handleSignUp() {
      let doc = {
        username: this.username,
        password: this.password,
        gender: this.gender,
        habits: this.habits,
      };
      this.$emit("submit", doc);
    },
  },
};
</script>

<style></style>
