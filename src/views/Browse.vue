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
      <div class="columns is-marginless">
        <div class="column is-8-mobile is-3-tablet is-offset-2-mobile is-offset-1-tablet">
          <b-field>
            <b-input
              placeholder="Search list"
              v-model="search"
              type="text"
              icon-right="times"
              :icon-right-clickable="search.length > 0"
              @icon-right-click="search = ''"
            >
            </b-input>
          </b-field>
        </div>
        <div class="column is-7">
          <div class="level is-mobile">
            <p class="level-item"><strong>Sort</strong></p>
            <div class="level-item">
              <b-button type="is-text" :icon-left="getSortIcon(sortRank)" @click="sortByRank()"
                >Rank</b-button
              >
            </div>
            <div class="level-item">
              <b-button type="is-text" :icon-left="getSortIcon(sortRankLw)" @click="sortByRankLw()"
                >Rank Last Week</b-button
              >
            </div>
            <div class="level-item">
              <b-button type="is-text" :icon-left="getSortIcon(sortWoL)" @click="sortByWol()"
                >Weeks on List</b-button
              >
            </div>
          </div>
        </div>
      </div>
      <books v-if="!loading"></books>
      <b-loading :active="loading" :is-full-page="false"></b-loading>
    </section>
  </div>
</template>

<script>
import Books from '../components/Books';
import { mapState } from 'vuex';

export default {
  name: 'Browse',
  components: { Books },
  data() {
    return {
      search: ''
    };
  },
  computed: {
    ...mapState({
      books: state => state.books,
      loading: state => state.loading,
      sortRank: state => state.sort.rank,
      sortRankLw: state => state.sort.rankLw,
      sortWoL: state => state.sort.wol
    })
  },
  methods: {
    getSortIcon(field) {
      return field === true ? 'angle-up' : field === false ? 'angle-down' : '';
    },
    sortByRank() {
      this.$store.dispatch('sortRank', !this.sortRank);
    },
    sortByRankLw() {
      this.$store.dispatch('sortRankLw', !this.sortRankLw);
    },
    sortByWol() {
      this.$store.dispatch('sortByWol', !this.sortByWol);
    }
  },
  watch: {
    search(val) {
      this.$store.dispatch('search', val);
    }
  }
};
</script>

<style lang="scss" scoped>
section.books {
  position: relative;
  min-height: 100vh;
}
.level {
  border-bottom: 2px solid $link-color-hover;

  > p {
    color: $link-color-hover;
  }

  .level-item {
    &:not(:first-child) {
      margin-right: 0;
    }
  }

  button {
    text-decoration: none;
    color: $link-color;
    &:hover {
      background-color: inherit;
      color: $link-color-hover;
    }
    &:focus {
      background-color: inherit;
      box-shadow: none;
    }
    ::v-deep span.icon {
      margin: 0;
      position: absolute;
      left: -0.5em;
    }
  }
}
</style>
