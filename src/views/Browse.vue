<template>
  <div id="books">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            NYT Current Best Sellers
          </h1>
        </div>
      </div>
    </section>
    <section class="books">
      <books :books="books"></books>
    </section>
  </div>
</template>

<script>
import API from '../lib/api';
import Books from '../components/Books';

export default {
  name: 'Browse',
  components: { Books },
  data() {
    return {
      books: []
    };
  },
  async mounted() {
    const { data } = await API.getBestSellersList();
    this.books = data.results.books;
  }
};
</script>
