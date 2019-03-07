<template>
  <v-container>
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
      <v-alert :value="alert" color="error" icon="new_releases">an error occured.</v-alert>
      <v-layout align-space-between justify-start column>
        <v-text-field v-model="name" type="text" label="Name"></v-text-field>
        <v-text-field v-model="description" type="text" label="description"></v-text-field>
        <input id="file" type="file" accept="*">
        <v-btn @click="upload()">send</v-btn>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    description: "",
    name: "",
    alert: false,
    loading: false
  }),
  methods: {
    upload() {
      console.log("uploaded");
      this.load();
    },
    async load() {
      var self = this;
      self.loading = true;
      var file = document.getElementById("file").files[0];
      if (!file || !this.name || !this.description) {
        this.alert = true;
        self.loading = false;
      } else {
        this.alert = false;
        let formData = new FormData();
        formData.append("fileName", this.name);
        formData.append("description", this.description);
        formData.append("thumbnail", file);
        await fetch("https://uoitc-test-server.herokuapp.com/upload", {
          method: "POST",
          headers: {
            Authorization: "bearer " + localStorage.getItem("token")
          },
          body: formData
        })
          .then(function(response) {
            // Examine the text in the response
            if (response.status == 201)
              response.json().then(function(data) {
                console.log(data);
                self.loading = false;
                self.$router.push({
                  name: "me"
                });
              });
            else {
              throw console.error("an error occured");
              self.loading = false;
              this.alert = true;
            }
          })
          .catch(function(err) {
            console.log("Fetch Error :-S", err);
          });
      }
    }
  }
};
</script>



<style scoped>
.v-progress-circular {
  margin: 1rem;
}

#file {
  padding: 2%;
}
</style>