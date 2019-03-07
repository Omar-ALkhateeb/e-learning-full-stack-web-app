<template>
  <div id="app">
    <v-app id="inspire">
      <v-container>
        <v-alert :value="alert" color="error" icon="new_releases">no posts found</v-alert>
        <v-alert :value="alerterr" color="error" icon="new_releases">{{err}}</v-alert>
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
            <div class="text-xs-start">
              <!-- <v-btn v-if="topSecret=='true'" @click="delElt" small flat>delete</v-btn> -->
              <v-btn v-if="secret=='true'" @click="upload">add a post</v-btn>
            </div>
            <v-list v-for="item of items" :key="item._id">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <v-icon>fas fa-folder</v-icon>
                    {{item.name}}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <small>{{item.description}} by: {{item.author}}(me)</small>
                  </v-list-tile-sub-title>
                  <!-- <v-list-tile-sub-title v-html="item.author"></v-list-tile-sub-title> -->
                </v-list-tile-content>
              </v-list-tile>
              <v-btn :href="item.Dlink" small flat color="green lighten-1">Download</v-btn>
              <v-btn @click="delElt(item._id)" small flat color="error">remove</v-btn>
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
    secret: localStorage.getItem("secret"),
    topSecret: localStorage.getItem("topSecret"),
    loading: true,
    alert: false,
    alerterr: false,
    err: ""
  }),

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
      self.alert = false;
      self.alerterr = false;
      await fetch(
        "https://uoitc-test-server.herokuapp.com/users/" +
          localStorage.getItem("id"),
        {
          method: "GET",
          headers: {
            Authorization: "bearer " + localStorage.getItem("token")
          }
        }
      )
        .then(function(response) {
          self.loading = false;
          // Examine the text in the response
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
          console.log("Fetch Error :-S", err);
          self.alerterr = true;
          self.loading = false;
          self.err = err;
        });
    },
    async delElt(id) {
      console.log("deleting..." + id);
      var self = this;
      self.loading = true;
      await fetch("https://uoitc-test-server.herokuapp.com/posts/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "bearer " + localStorage.getItem("token")
        }
      })
        .then(function(response) {
          // Examine the text in the response
          //self.loading = false;
          self.load();
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
    },
    upload() {
      console.log("uploading in process");
      this.$router.push("/upload");
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
