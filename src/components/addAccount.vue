<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
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
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar>
                  <v-toolbar-title>Signup form</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-alert
                      :value="alert"
                      color="error"
                      icon="new_releases"
                    >wrong info or username already used.</v-alert>
                    <v-alert :value="alert2" color="success" icon="new_releases">created successfuly</v-alert>
                    <v-text-field
                      prepend-icon="person"
                      v-model="name"
                      type="text"
                      :counter="10"
                      :rules="nameRules"
                      label="UserName"
                      required
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="person"
                      v-model="name2"
                      type="text"
                      :counter="10"
                      :rules="nameRules"
                      label="Name"
                      required
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="person"
                      v-model="job"
                      type="text"
                      :counter="10"
                      :rules="nameRules"
                      label="Job Title"
                      required
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="person"
                      v-model="description"
                      type="text"
                      :counter="10"
                      :rules="noRules"
                      label="Description"
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
    name2: "",
    job: "",
    alert2: false,
    description: "",
    nameRules: [
      v => !!v || "field is required",
      v => (v && v.length <= 10) || "field must be less than 10 characters"
    ],
    noRules: [
      v => !!v || "field is required",
      v => (v && v.length <= 20) || "field cant be more than 20 characters"
    ],
    passRules: [
      v => !!v || "password is required",
      v =>
        (v && v.length <= 8 && v.length >= 6) ||
        "password must be less than 9 characters and longer than 5"
    ],
    alert: false,
    loading: false
  }),

  methods: {
    async validate() {
      var self = this;
      if (this.$refs.form.validate()) {
        self.loading = true;
        self.alert2 = false;
        this.snackbar = true;
        console.log(this.name, this.pass);
        await fetch("https://uoitc-test-server.herokuapp.com/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify({
            username: "" + this.name,
            password: "" + this.pass,
            name: "" + this.name2,
            job: "" + this.job,
            description: "" + this.description
          })
        })
          .then(function(response) {
            if (response.status !== 201) {
              console.log(
                "Looks like there was a problem. Status Code: " +
                  response.status
              );
              self.alert = true;
              self.loading = false;
              //self.reset();
              return;
            }

            // Examine the text in the response
            if (response.status == 201)
              response.json().then(function(data) {
                console.log(data);
                // localStorage.setItem("token", data.token);
                // localStorage.setItem("name", data.data.name);
                // localStorage.setItem("id", data.data._id);
                // localStorage.setItem("secret", data.permission[0]);
                // localStorage.setItem("topSecret", data.permission[1]);
                // self.$router.push({
                //   name: "dashboard"
                // });
                // sharedData.data.isLoggedIn = true;
                //console.log(sharedData.data.isLoggedIn);
                self.loading = false;
                self.alert2 = true;
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
