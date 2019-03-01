<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <router-link to="/">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/me">
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
      <v-toolbar-title>application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import sharedData from "@/sharedData";

export default {
  data: () => ({
    drawer: null
    // loggedIn: sharedData.data.isLoggedIn
  }),
  props: {
    source: String
  },
  methods: {
    logout() {
      localStorage.setItem("token", null);
      sharedData.data.isLoggedIn = false;
      this.$router.push("/login");
    }
  },
  computed: {
    IsloggedIn: function() {
      return sharedData.data.isLoggedIn;
    }
  }
};
</script>


