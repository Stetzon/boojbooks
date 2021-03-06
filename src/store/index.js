import Vue from 'vue';
import Vuex from 'vuex';
import API from '../lib/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    books: [],
    ogBooks: [],
    error: false,
    sort: {
      rank: true,
      rankLw: null,
      wol: null
    },
    readingList: {}
  },
  mutations: {
    FETCHING(state) {
      state.loading = true;
      state.error = false;
      state.ogBooks = [];
      state.books = [];
    },
    FETCHED(state, books) {
      state.loading = false;
      state.books = books;
      state.ogBooks = books;
    },
    ERROR(state) {
      state.loading = false;
      state.error = true;
      state.books = [];
      state.ogBooks = [];
    },
    SORT_RANK(state) {
      state.sort.rank = !state.sort.rank;
      state.sort.rankLw = null;
      state.sort.wol = null;

      state.books.sort((a, b) => {
        return state.sort.rank ? a.rank - b.rank : b.rank - a.rank;
      });
      state.ogBooks = [...this.state.books];
    },
    SORT_RANK_LW(state) {
      state.sort.rank = null;
      state.sort.rankLw = !state.sort.rankLw;
      state.sort.wol = null;

      state.books.sort((a, b) => {
        return state.sort.rankLw
          ? a.rank_last_week - b.rank_last_week
          : b.rank_last_week - a.rank_last_week;
      });
      state.ogBooks = [...this.state.books];
    },
    SORT_WOL(state) {
      state.sort.rank = null;
      state.sort.rankLw = null;
      state.sort.wol = !state.sort.wol;

      state.books.sort((a, b) => {
        return state.sort.wol
          ? a.weeks_on_list - b.weeks_on_list
          : b.weeks_on_list - a.weeks_on_list;
      });
      state.ogBooks = [...this.state.books];
    },
    SEARCH(state, keywords) {
      this.state.books = state.ogBooks.filter(book => {
        return book.title.includes(keywords.toUpperCase());
      });
    },
    ADD_TO_READING_LIST(state, book) {
      Vue.set(state.readingList, book.primary_isbn10, book);
      localStorage.setItem('readingList', JSON.stringify(state.readingList));
    },
    REMOVE_FROM_READING_LIST(state, book) {
      Vue.delete(state.readingList, book.primary_isbn10);
      localStorage.setItem('readingList', JSON.stringify(state.readingList));
    },
    SET_READING_LIST(state, list) {
      state.readingList = list;
    }
  },
  actions: {
    async fetchBooks({ commit }) {
      commit('FETCHING');
      try {
        const { data } = await API.getBestSellersList();
        commit('FETCHED', data.results.books);
      } catch (error) {
        commit('ERROR', error.response.data);
      }
    },
    fetchReadingList({ commit }) {
      let list = localStorage.getItem('readingList');
      list = list ? JSON.parse(list) : {};
      commit('SET_READING_LIST', list);
    },
    sortRank({ commit }) {
      commit('SORT_RANK');
    },
    sortRankLw({ commit }) {
      commit('SORT_RANK_LW');
    },
    sortByWol({ commit }) {
      commit('SORT_WOL');
    },
    search({ commit }, keywords) {
      commit('SEARCH', keywords);
    },
    removeFromReadingList({ commit }, book) {
      commit('REMOVE_FROM_READING_LIST', book);
    },
    addToReadingList({ commit }, book) {
      commit('ADD_TO_READING_LIST', book);
    }
  },
  getters: {
    bookOnReadingList: state => book => {
      return Object.prototype.hasOwnProperty.call(state.readingList, book.primary_isbn10);
    },
    readingListAsArray: state => {
      return Object.values(state.readingList);
    }
  }
});
