<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <router-link to="/" @click="getlink()">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/me" @click="getlink()">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <!-- <v-btn ref="log" v-if="IsloggedIn" @click="logout">log out</v-btn>
        <router-link to="/login">
          <v-btn v-if="!IsloggedIn">log in</v-btn>
        </router-link>-->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<style>
router-link > a {
  text-decoration: none;
  color: rgb(11, 151, 11) !important;
}
</style>




<script>
import sharedData from "@/sharedData";

export default {
  data: () => ({
    drawer: null,
    link: ""
    // loggedIn: sharedData.data.isLoggedIn
  }),
  props: {
    source: String
  },
  mounted() {
    console.log(this.$router.history.current.path);
    this.link = this.$router.history.current.name;
  },
  methods: {
    logout() {
      localStorage.setItem("token", null);
      sharedData.data.isLoggedIn = false;
      this.$router.push("/login");
    },
    getlink() {
      console.log(this.$router.history.current.path);
      this.link = this.$router.history.current.name;
    }
  },
  computed: {
    IsloggedIn: function() {
      return sharedData.data.isLoggedIn;
    }
  }
};
</script>


