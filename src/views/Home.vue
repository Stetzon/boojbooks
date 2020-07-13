<template>
  <div id="home">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Booj Books
          </h1>
          <h2 class="subtitle" v-html="subtitle"></h2>
        </div>
      </div>
    </section>
    <section class="reading-list">
      <books :show-reading-list="true"></books>
    </section>
  </div>
</template>

<script>
import Books from '../components/Books';
import { mapState } from 'vuex';

export default {
  components: {
    Books
  },
  computed: {
    readingListEmpty() {
      return Object.keys(this.readingList).length < 1;
    },
    subtitle() {
      return this.readingListEmpty
        ? 'Start browsing to add books to your reading list!'
        : 'Your reading list';
    },
    ...mapState({
      readingList: state => state.readingList
    })
  }
};
</script>
