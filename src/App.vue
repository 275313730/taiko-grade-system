<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  updated() {
    this.getAuthor();
  },
  methods: {
    getAuthor() {
      this.$axios({
        method: "POST",
        url: "/getAuthor",
        data: { url: this.$route.path }
      })
        .then(res => {
          if (!res.data) {
            this.$router.push("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("./assets/bg.jpg");
}
</style>
