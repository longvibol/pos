<template>
  <div>
    <q-layout view="hHr LpR lfr">
      <q-header class="bg-primary text-white" elevated>
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Master IT Shop</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" content-class="bg-grey-3" show-if-above>
        <q-scroll-area class="fit">
          <q-list class="menu">
            <q-item class="item" clickable v-ripple exact to="/">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section> Home </q-item-section>
            </q-item>
            <q-item class="item" clickable v-ripple exact to="/user">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section> User </q-item-section>
            </q-item>
            <q-item class="item" clickable v-ripple to="/customer">
              <q-item-section avatar>
                <q-icon name="groups" />
              </q-item-section>
              <q-item-section> Customer </q-item-section>
            </q-item>
            <q-item class="item" clickable v-ripple to="/category">
              <q-item-section avatar>
                <q-icon name="backup_table" />
              </q-item-section>
              <q-item-section> Category </q-item-section>
            </q-item>
            <q-item class="item" clickable v-ripple to="/item">
              <q-item-section avatar>
                <q-icon name="dns" />
              </q-item-section>
              <q-item-section> Item </q-item-section>
            </q-item>
            <q-item class="item" clickable v-ripple to="/supplier">
              <q-item-section avatar>
                <q-icon name="maps_home_work" />
              </q-item-section>
              <q-item-section> Supplier </q-item-section>
            </q-item>
            <q-item class="item" clickable v-ripple to="/purchase">
              <q-item-section avatar>
                <q-icon name="inventory" />
              </q-item-section>
              <q-item-section> Purchase </q-item-section>
            </q-item>
            <q-separator />
            <q-item class="item" clickable v-ripple to="/sale">
              <q-item-section avatar>
                <q-icon name="chrome_reader_mode" />
              </q-item-section>
              <q-item-section> Sale </q-item-section>
            </q-item>
            <q-list bordered class="item">
              <q-expansion-item icon="report" label="Report">
                <q-item class="item" clickable v-ripple to="import">
                  <q-item-section avatar>
                    <q-icon name="arrow_circle_down" />
                  </q-item-section>
                  <q-item-section> Import </q-item-section>
                </q-item>
                <q-item class="item" clickable v-ripple to="export">
                  <q-item-section avatar>
                    <q-icon name="arrow_circle_up" />
                  </q-item-section>
                  <q-item-section> Export </q-item-section>
                </q-item>
              </q-expansion-item>
            </q-list>
            <q-item class="item" clickable v-ripple @click="handleLogout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section> Logout </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page class="q-mt-md q-ml-md q-mr-md">
          <div class="text-center text-h5">{{ $route.name }}</div>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    handleLogout() {
      Meteor.logout(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>
<style>
.menu :hover.item {
  transform: scale(1.15);
  transition: transform 0.2s;
  background: rgb(245, 245, 245);
  margin-left: 20px;
  color: rgb(1, 98, 255);
}
.menu .item {
  transform: scale(1);
  transition: transform 1s;
}
</style>
