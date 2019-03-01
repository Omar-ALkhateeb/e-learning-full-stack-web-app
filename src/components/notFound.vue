<template>
  <div id="app">
    <v-app id="inspire">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title class="red darken-3 white--text subheading" primary-title>
                <span class="title">Oops!</span>
              </v-card-title>
              <v-card-text>
                Looks like you're in uncharted territory. We don't know about this page yet.
                Luckily, we know the way back.
              </v-card-text>
              <v-card-actions>
                <v-btn flat class="red darken-3 white--text" to="/">Back</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    //
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
    }
  }
};
</script>

<style>
</style>