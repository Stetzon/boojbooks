<template>
  <div class="columns is-multiline is-marginless">
    <template v-if="showReadingList">
      <div
        class="column is-10-mobile is-offset-1-mobile is-6-tablet is-5-desktop"
        v-for="(book, index) in readingList"
        :key="book.primary_isbn10"
        :class="[index % 2 === 0 ? 'is-offset-1-desktop' : 'is-offset-0-desktop']"
      >
        <book :details="book" :reading-list-page="true" @move-book="moveBook"></book>
      </div>
    </template>
    <template v-else>
      <div
        class="column is-10-tablet is-offset-1-tablet is-5-desktop"
        v-for="(book, index) in books"
        :key="book.primary_isbn10"
        :class="[index % 2 === 0 ? 'is-offset-1-desktop' : 'is-offset-0-desktop']"
      >
        <book :details="book"></book>
      </div>
    </template>
  </div>
</template>

<script>
import Book from './Book';
import { mapState } from 'vuex';
import Vue from 'vue';

export default {
  name: 'Books',
  components: {
    Book
  },
  props: {
    showReadingList: {
      required: false,
      default: false
    }
  },
  data() {
    return {
      readingList: []
    };
  },
  mounted() {
    Vue.nextTick(() => {
      this.readingList = [...this.$store.getters.readingListAsArray];
    });
  },
  computed: {
    ...mapState({
      books: state => state.books
    })
  },
  methods: {
    moveBook(event) {
      const index = this.readingList.findIndex(book => {
        return book.primary_isbn10 === event.book.primary_isbn10;
      });
      if (event.direction === 'up' && index > 0) {
        this.readingList.splice(index, 1);
        this.readingList.splice(index - 1, 0, event.book);
      } else if (event.direction === 'down' && index < this.readingList.length) {
        this.readingList.splice(index, 1);
        this.readingList.splice(index + 1, 0, event.book);
      }
      // this.$store.dispatch('updateReadingList', this.readingList);
    }
  }
};
</script>
