<template>
  <div id="books">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Book Details
          </h1>
        </div>
      </div>
    </section>
    <section class="books">
      <div class="columns is-marginless">
        <div class="column is-10-mobile is-offset-1-mobile is-offset-1 is-8-tablet is-6-desktop">
          <book v-if="book" :details="book" :detailPage="true"></book>
          <p class="is-2" v-else v-show="!loading">
            Sorry, we cannot find the book you are looking for.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Book from '../components/Book';
import { mapState } from 'vuex';

export default {
  name: 'Browse',
  components: { Book },
  data() {
    return {
      book: null
    };
  },
  mounted() {
    if (this.books.length) {
      this.findBook();
    }
  },
  computed: {
    ...mapState({
      books: state => state.ogBooks,
      loading: state => state.loading
    })
  },
  methods: {
    findBook() {
      this.book = this.books.find(book => {
        return book.primary_isbn10 === this.$route.params.isbn;
      });
    }
  },
  watch: {
    books() {
      this.findBook();
    }
  }
};
</script>

<style lang="scss" scoped></style>
