<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <div class="text-xs-center">
          <v-progress-circular v-if="loading" :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
        </div>
        <div v-if="!loading">
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar>
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-alert :value="alert" color="error" icon="new_releases">wrong info.</v-alert>
                    <v-text-field
                      prepend-icon="person"
                      v-model="name"
                      type="text"
                      :counter="10"
                      :rules="nameRules"
                      label="Name"
                      required
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      v-model="pass"
                      id="password"
                      type="password"
                      :counter="10"
                      :rules="passRules"
                      required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :disabled="!valid" color="success" @click="validate">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import sharedData from "@/sharedData";

export default {
  data: () => ({
    valid: true,
    name: "",
    pass: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    passRules: [
      v => !!v || "password is required",
      v => (v && v.length <= 10) || "password must be less than 10 characters"
    ],
    alert: false,
    loading: false
  }),

  methods: {
    async validate() {
      var self = this;
      if (this.$refs.form.validate()) {
        self.loading = true;
        this.snackbar = true;
        console.log(this.name, this.pass);
        await fetch("https://uoitc-test-server.herokuapp.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: "" + this.name,
            password: "" + this.pass
          })
        })
          .then(function(response) {
            if (response.status !== 200) {
              console.log(
                "Looks like there was a problem. Status Code: " +
                  response.status
              );
              self.alert = true;
              self.loading = false;
              self.reset();
              return;
            }

            // Examine the text in the response
            if (response.status == 200)
              response.json().then(function(data) {
                console.log(data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("name", data.data.name);
                localStorage.setItem("id", data.data._id);
                localStorage.setItem("job", data.data.job);
                localStorage.setItem("secret", data.permission[0]);
                localStorage.setItem("topSecret", data.permission[1]);
                self.$router.push({
                  name: "dashboard"
                });
                sharedData.data.isLoggedIn = true;
                //console.log(sharedData.data.isLoggedIn);
              });
          })
          .catch(function(err) {
            console.log("Fetch Error :-S", err);
            console.log(self.name, self.pass);
            console.log(
              "error occured wile trying to connect refresh to continue"
            );
            self.alert = true;
            self.loading = false;
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style>
</style>
