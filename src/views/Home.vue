<template>
  <section id="home" class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Booj Books
        </h1>
        <h2 class="subtitle">
          Generate your reading list!
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import API from '../lib/api';

export default {
  name: 'Home',
  data() {
    return {
      books: []
    };
  },
  mounted() {
    this.books = API.getBestSellersList();
  }
};
</script>
