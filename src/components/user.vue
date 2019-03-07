<template>
  <div id="app">
    <v-app id="inspire">
      <v-container>
        <v-alert :value="alert" color="error" icon="new_releases">no posts found</v-alert>
        <div class="text-xs-center">
          <v-progress-circular
            v-if="loading"
            :size="70"
            :width="7"
            color="green lighten-1"
            indeterminate
          ></v-progress-circular>
        </div>
        <div v-if="!loading">
          <v-layout align-space-between justify-start column>
            <div class="text-xs-start"></div>
            <v-list>
              <v-list-tile v-for="item of items" :key="item._id">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <v-icon>fas fa-folder</v-icon>
                    {{item.name}}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <small>{{item.description}} by: {{item.author}}</small>
                  </v-list-tile-sub-title>

                  <!-- <v-list-tile-sub-title v-html="item.author"></v-list-tile-sub-title> -->
                </v-list-tile-content>
                <v-btn :href="item.Dlink" small flat color="green lighten-1">Download</v-btn>
              </v-list-tile>
            </v-list>
          </v-layout>
        </div>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [],
    url: "https://uoitc-test-server.herokuapp.com/posts",
    topSecret: localStorage.getItem("topSecret"),
    loading: true,
    alert: false
  }),

  computed: {
    isMe: function() {
      return localStorage.getItem("id") == this.$route.params.id;
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        console.log(this.name, this.pass);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    showItem(elt) {
      console.log(elt._id);
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async load() {
      var self = this;
      self.loading = true;
      await fetch(
        "https://uoitc-test-server.herokuapp.com/users/" +
          self.$route.params.id,
        {
          method: "GET",
          headers: {
            Authorization: "bearer " + localStorage.getItem("token")
          }
        }
      )
        .then(function(response) {
          // Examine the text in the response
          self.loading = false;
          if (response.status == 200)
            response.json().then(function(data) {
              console.log(data);
              if (data.length == 0) self.alert = true;
              console.log(self.$route.params.id);
              self.items = data;
            });
          else {
            self.$router.push("/notFound");
          }
        })
        .catch(function(err) {
          self.loading = false;
          console.log("Fetch Error :-S", err);
        });
    },
    async delElt() {
      console.log("deleting..." + this.$route.params.id);
      var self = this;
      self.loading = true;
      await fetch(
        "https://uoitc-test-server.herokuapp.com/posts/" +
          self.$route.params.id,
        {
          method: "DELETE",
          headers: {
            Authorization: "bearer " + localStorage.getItem("token")
          }
        }
      )
        .then(function(response) {
          // Examine the text in the response
          self.loading = false;
          if (response.status == 200)
            response.json().then(function(data) {
              console.log("deleted");
            });
          else {
            console.log("an error occured");
          }
        })
        .catch(function(err) {
          self.loading = false;
          console.log("Fetch Error :-S", err);
        });
    }
  },
  async mounted() {
    //console.log(this.$route.params);
    console.log(localStorage.getItem("id") == this.$route.params.id);
    this.load();
  }
};
</script>

<style>
</style>
