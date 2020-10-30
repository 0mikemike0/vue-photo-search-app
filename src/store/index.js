import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    markedImages: [],
    queries: {
      imagesPerPage: 18,
    },
    fails: {
      loadingFail: false,
      addingFail: false,
      loading: false,
    },
  },
  mutations: {
    addMarkToImage(state, payload) {
      state.markedImages.push(payload);
      localStorage.markedImages = JSON.stringify(state.markedImages);
    },
    removeMarkFromImage(state, payload) {
      state.markedImages.splice(payload, 1);
      localStorage.markedImages = JSON.stringify(state.markedImages);
    },
    updateMarkImages(state) {
      if (localStorage.markedImages) {
        state.markedImages = JSON.parse(localStorage.markedImages);
      }
    },
    createQueryImages(state, payload) {
      Vue.set(state.queries, payload.query, {});
      Vue.set(state.queries[payload.query], 'photos', payload.photos);
      Vue.set(state.queries[payload.query], 'total', payload.total);
      Vue.set(state.queries[payload.query], 'nextPage', payload.nextPage);
    },
    updateQueryImages(state, payload) {
      state.queries[payload.query].photos = payload.photos;
    },
    addQueryImages(state, payload) {
      state.queries[payload.query].photos
        .splice((state.queries[payload.query].photos.length), 0, ...payload.photos);
    },
    updateQueryTotal(state, payload) {
      state.queries[payload.query].total = payload.total;
    },
    updateQueryNextPage(state, payload) {
      state.queries[payload.query].nextPage = payload.nextPage;
    },
    updateQueryPosition(state, payload) {
      state.queries[payload.query].position = payload.position;
    },
    updateLoadingFail(state) {
      state.fails.loadingFail = true;
    },
    updateAddingFail(state) {
      state.fails.addingFail = true;
    },
    updateLoading(state) {
      state.fails.loading = true;
    },
    clearLoadingFail(state) {
      state.fails.loadingFail = false;
    },
    clearAddingFail(state) {
      state.fails.addingFail = false;
    },
    clearLoading(state) {
      state.fails.loading = false;
    },
  },
  getters: {
    getPhotos: (state) => (query) => state.queries[query],
    getFails: (state) => state.fails,
  },
  actions: {
    loadImages(context, query) {
      context.commit('clearLoadingFail');
      context.commit('updateLoading');
      const api = axios.create({
        baseURL: 'https://api.pexels.com/v1',
        crossDomain: true,
        responseType: 'json',
        headers: {
          Authorization: '563492ad6f91700001000001c6bcce7f3549472d9f001e36d532ad09',
        },
      });
      api.get('https://api.pexels.com/v1/search/', {
        params: {
          // page: this.page,
          per_page: this.state.queries.imagesPerPage,
          query,
        },
      })
        .then((response) => {
          if (context.state.queries[query]) {
            context.commit('updateQueryImages', {
              query,
              photos: response.data.photos,
              total: response.data.total_results,
              nextPage: response.data.next_page,
            });
          } else {
            context.commit('createQueryImages', {
              query,
              photos: response.data.photos,
              total: response.data.total_results,
              nextPage: response.data.next_page,
            });
          }
        })
        .catch(() => context.commit('updateLoadingFail'))
        .then(() => context.commit('clearLoading'));
    },
    gotoNextPage(context, query) {
      context.commit('clearAddingFail');
      const api = axios.create({
        baseURL: 'https://api.pexels.com/v1',
        crossDomain: true,
        responseType: 'json',
        headers: {
          Authorization: '563492ad6f91700001000001c6bcce7f3549472d9f001e36d532ad09',
        },
      });
      api.get(`${context.state.queries[query].nextPage}`)
        .catch(() => context.commit('updateAddingFail'))
        .then((response) => {
          context.commit('addQueryImages', { query, photos: response.data.photos });
          context.commit('updateQueryNextPage', { query, nextPage: response.data.next_page });
        });
    },
  },
});
