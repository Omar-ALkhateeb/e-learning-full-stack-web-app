<template>
  <div id="app">
    <v-app id="inspire">
      <!-- <v-container> -->
      <!-- <v-layout align-space-between justify-start column> -->
      <br>
      <div class="text-xs-center">
        <v-alert :value="alert" color="error" icon="new_releases">{{err}}</v-alert>
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          color="green lighten-1"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-if="!loading">
        <v-toolbar color="grey lighten-4" tabs>
          <div class="text-xs">
            <v-btn v-if="isLoggedIn" @click="logout">log out</v-btn>
            <v-btn :to="{name:'me',params:{id:id}}">my profile</v-btn>
            <v-btn v-if="topSecret=='true'" :to="{name:'addAccount'}">add users</v-btn>
          </div>
          <v-tabs slot="extension" v-model="tabs" centered color="transparent" slider-color="white">
            <v-tab>teachers</v-tab>
            <v-tab v-if="topSecret=='true'">students</v-tab>
          </v-tabs>
        </v-toolbar>

        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-card>
              <v-card-text>
                <v-list v-for="item of items" :key="item._id" v-if="item.job!='student'">
                  <v-list-tile v-if="item.job!='student'">
                    <v-list-tile-content>
                      <v-list-tile-title>
                        <v-icon color="blue-grey darken-2" class="icon">fas fa-user</v-icon>
                        {{item.username}}
                      </v-list-tile-title>
                      <v-list-tile-sub-title>
                        <small>
                          <strong>({{item.job}})</strong>
                          {{item.description}}
                          <!-- <strong>({{item.job}})</strong> -->
                        </small>
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <!-- <v-btn v-if="topSecret=='true'" @click="delElt" small flat>delete</v-btn> -->
                    <!-- <v-list-tile-sub-title v-html="item.author"></v-list-tile-sub-title> -->
                  </v-list-tile>
                  <v-btn
                    color="green lighten-1"
                    v-if="item.job!='student'"
                    :to="{name:'user',params:{id:item._id}}"
                    small
                    flat
                  >Show posts</v-btn>
                  <v-btn
                    color="error"
                    v-if="(item.job!='admin'&&item.job!='suAdmin'&&topSecret=='true')||job=='suAdmin'"
                    @click="delElt(item._id)"
                    small
                    flat
                  >Delete user</v-btn>
                </v-list>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card>
              <v-card-text>
                <v-list v-for="item of items" :key="item._id" v-if="item.job=='student'">
                  <v-list-tile v-if="item.job=='student'">
                    <v-list-tile-content>
                      <v-list-tile-title>
                        <v-icon class="icon" color="blue-grey darken-2">fas fa-user</v-icon>
                        {{item.name}}
                      </v-list-tile-title>
                      <v-list-tile-sub-title>
                        <small>
                          <strong>({{item.username}})</strong>
                          {{item.description}}
                        </small>
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <!-- <v-btn v-if="topSecret=='true'" @click="delElt" small flat>delete</v-btn> -->
                    <!-- <v-list-tile-sub-title v-html="item.author"></v-list-tile-sub-title> -->
                  </v-list-tile>
                  <v-btn
                    color="error"
                    v-if="topSecret=='true'&&item.job=='student'"
                    @click="delElt(item._id)"
                    small
                    flat
                    dark
                  >Delete user</v-btn>
                </v-list>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
      <!-- <v-layout xs12> -->
      <!-- </v-layout> -->
      <!-- <v-content> -->
      <!-- <v-list>
            <v-list-tile v-for="item of items" :key="item._id">
              <v-list-tile-content>
                <v-list-tile-title>{{item.name}}</v-list-tile-title>
                <v-list-tile-sub-title>
                  <small>
                    {{item.description}}
                    <strong>({{item.job}})</strong>
                    ({{item.username}})
                  </small>
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-btn :to="{name:'user',params:{id:item._id}}" small flat>Download</v-btn>
              <v-btn v-if="topSecret=='true'" @click="delElt" small flat>Delete user</v-btn>
            </v-list-tile>
      </v-list>-->
      <!-- </v-layout> -->
      <!-- </v-container> -->
      <!-- </v-content> -->
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [],
    url: "https://uoitc-test-server.herokuapp.com/posts",
    isLoggedIn: localStorage.getItem("token") != "null",
    secret: localStorage.getItem("secret"),
    topSecret: localStorage.getItem("topSecret"),
    name: localStorage.getItem("name"),
    tabs: null,
    id: localStorage.getItem("id"),
    loading: true,
    job: localStorage.getItem("job"),
    err: "",
    alert: false
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
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async load() {
      var self = this;
      self.loading = true;
      self.alert = false;
      await fetch("https://uoitc-test-server.herokuapp.com/users", {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.getItem("token")
        }
      })
        .then(function(response) {
          self.loading = false;
          // Examine the text in the response
          if (response.status == 200)
            response.json().then(function(data) {
              console.log(data);
              console.log(self.items);
              self.items = data;
              console.log(self.items);
            });
          else {
            throw console.error("an error occured");
          }
        })
        .catch(function(err) {
          console.log("Fetch Error :-S", err);
          self.alert = true;
          self.err = err;
          self.loading = false;
        });
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
      localStorage.removeItem("secret");
      localStorage.removeItem("topSecret");
      this.isLoggedIn = false;
      this.$router.push("/login");
    },
    upload() {
      console.log("uploading in process");
    },
    async delElt(id) {
      console.log("deleting..." + id);
      var self = this;
      self.loading = true;
      await fetch("https://uoitc-test-server.herokuapp.com/users/" + id, {
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
    }
  },
  async mounted() {
    this.isLoggedIn = localStorage.getItem("token") != "null";
    this.secret = localStorage.getItem("secret");
    this.topSecret = localStorage.getItem("topSecret");
    this.name = localStorage.getItem("name");
    console.log("mounted");
    // console.log(this.$props);
    this.load();
    // await fetch("http://localhost:3313/users", {
    //   method: "GET",
    //   headers: {
    //     Authorization: "bearer " + localStorage.getItem("token")
    //   }
    // })
    //   .then(function(response) {
    //     // Examine the text in the response
    //     response.json().then(function(data) {
    //       console.log(data);
    //       console.log(vm.items);
    //       vm.items = data;
    //     });
    //   })
    //   .catch(function(err) {
    //     console.log("Fetch Error :-S", err);
    //   });
    // .catch(err => {
    //   console.log(err);
    // });
  }
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
.icon {
  padding-right: 5px;
}
.desc {
  padding-bottom: 4px;
}
</style>
