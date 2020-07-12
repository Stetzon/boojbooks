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
      <div class="columns">
        <div class="column is-5 is-offset-1-tablet">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Find a post" />
            </p>
            <p class="control">
              <button class="button">
                Search
              </button>
            </p>
          </div>
        </div>
        <div class="column is-5">
          <div class="level">
            <p class="level-item"><strong>Sort</strong></p>
            <p class="level-item"><a>Rank</a></p>
            <p class="level-item"><a>Rank Last Week</a></p>
            <p class="level-item"><a>Weeks on List</a></p>
          </div>
        </div>
      </div>
      <books v-if="!loading"></books>
      <b-loading :active="loading" :is-full-page="false"></b-loading>
    </section>
  </div>
</template>

<script>
import API from '../lib/api';
import Books from '../components/Books';
import { mapState } from 'vuex';

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
  },
  computed: mapState({
    loading: state => state.loading
  })
};
</script>

<style lang="scss" scoped>
section.books {
  position: relative;
  min-height: 100vh;
}
</style>
