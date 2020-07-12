import Vue from 'vue';
import Vuex from 'vuex';
import API from '../lib/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    books: [],
    error: false,
    sort: {
      rank: true,
      rankLw: null,
      wol: null
    }
  },
  mutations: {
    FETCHING(state) {
      state.loading = true;
      state.error = false;
      state.books = [];
    },
    FETCHED(state, books) {
      state.loading = false;
      state.books = books;
    },
    ERROR(state) {
      state.loading = false;
      state.error = true;
      state.books = [];
    },
    SORT_RANK(state) {
      state.sort.rank = !state.sort.rank;
      state.sort.rankLw = null;
      state.sort.wol = null;

      state.books.sort((a, b) => {
        return state.sort.rank ? a.rank - b.rank : b.rank - a.rank;
      });
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
    sortRank({ commit }) {
      commit('SORT_RANK');
    },
    sortRankLw({ commit }) {
      commit('SORT_RANK_LW');
    },
    sortByWol({ commit }) {
      commit('SORT_WOL');
    }
  }
});
