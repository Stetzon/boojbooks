import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from '@/App.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('App', () => {
  const actions = {
    fetchReadingList: jest.fn(),
    fetchBooks: jest.fn()
  };
  const store = new Vuex.Store({
    actions
  });

  shallowMount(App, { store, localVue });

  it('has a mounted hook', () => {
    expect(typeof App.mounted).toBe('function');
  });

  it('fetches reading list', () => {
    expect(actions.fetchReadingList).toHaveBeenCalled();
  });

  it('fetches books', () => {
    expect(actions.fetchBooks).toHaveBeenCalled();
  });
});
