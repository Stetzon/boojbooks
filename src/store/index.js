import Vue from 'vue';
import Vuex from 'vuex';
import API from '../lib/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    books: [],
    error: false
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
    }
  }
});
