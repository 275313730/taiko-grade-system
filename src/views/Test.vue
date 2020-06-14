<template>
  <div class="about">
    <button @click="Get()">Get</button>
    <button @click="Post()">Post</button>
  </div>
</template>

<script>
export default {
  methods: {
    Get() {
      this.$axios({
        method: "GET",
        url: "/get"
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    Post() {
      this.$axios({
        method: "POST",
        url: "/post"
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
