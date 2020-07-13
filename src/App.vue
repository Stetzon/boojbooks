<template>
  <div id="app">
    <nav class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/browse">Browse</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('fetchReadingList');
    this.$store.dispatch('fetchBooks');
  }
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  text-align: center;

  a {
    color: $link-color;
    &.router-link-exact-active {
      color: $link-color-active;
      border-bottom: 1px solid $link-color-active;
    }
  }
}
</style>
