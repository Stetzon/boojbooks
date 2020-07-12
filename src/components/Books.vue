<template>
  <div class="columns is-multiline is-marginless">
    <div
      class="column is-10-tablet is-offset-1-tablet is-5-desktop"
      v-for="(book, index) in books"
      :key="book.primary_isbn10"
      :class="[index % 2 === 0 ? 'is-offset-1-desktop' : 'is-offset-0-desktop']"
    >
      <book :details="book"></book>
    </div>
  </div>
</template>

<script>
import Book from './Book';
import { mapState } from 'vuex';

export default {
  name: 'Books',
  components: {
    Book
  },
  computed: mapState({
    books: state => state.books
  })
};
</script>
