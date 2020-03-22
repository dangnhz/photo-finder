import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
import Unsplash, {toJson} from 'unsplash-js';

Vue.use(Vuex);

const accessKey = "1qoTJ5tg8MAI9rZm3COB96M4o779MkrUk21I2K3uu3A";
const secretKey = 'BNehdr5gW12s7IBmSnKGm5sOpLGOr4qZlT3u0zE6Agw'
const unsplash = new Unsplash({
  accessKey: accessKey,
  secretKey: secretKey
});

const state = {
  searchTerm: "",
  currentPage: 1,
  perPage: 20,
  listPhotos:[],
  showLoading: false,
  searchResult: {
    totalPhotos: null,
    totalPages: null,
    photos: []
  },
  randomImage: null,
  showLightBox: false,
  imageIndex: null
};

const getters = {
  listPhotos: state => {
    return state.listPhotos;
  },
  currentPage: state => {
    return state.currentPage;
  },
  searchResult: state => {
    return state.searchResult;
  }
  ,
  showLoading: state => {
    return state.showLoading;
  },
  randomImage: state => {
    return state.randomImage
  },
  showLightBox: state => {
    return state.showLightBox
  },
  imageIndex: state => {
    return state.imageIndex
  }
};

const mutations = {
  setSearchTerm(state, searchTerm) {
    state.searchTerm = searchTerm;
  },
  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage;
  },
  setListPhotos(state, payload) {
    payload.forEach(photo => {
      state.listPhotos.push(photo)
    })
  },
  toggleLoading(state) {
    state.showLoading = !state.showLoading;
  },
  setSearchResult (state, payload) {
    state.searchResult.totalPhotos = payload.totalPhotos;
    state.searchResult.totalPages = payload.totalPages;
    if (state.currentPage == 1) {
      state.searchResult.photos = []
      payload.photos.forEach(photo => {
        state.searchResult.photos.push(photo)
      })
    } else if (state.currentPage >= 2) {
      payload.photos.forEach(photo => {
        state.searchResult.photos.push(photo)
      })
    }
  },
  setRandomImage (state, data) {
    state.randomImage = data
  },
  toggleLightBox (state) {
    state.showLightBox = !state.showLightBox
  },
  imageIndex (state, index) {
    state.imageIndex = index
  }
};

const actions = {
  setSearchTerm(context, searchTerm) {
    context.commit("setSearchTerm", searchTerm);
  },
  setCurrentPage(context, currentPage) {
    context.commit("setCurrentPage", currentPage);
  },
  async searchImages(context) {
    let searchTerm = context.state.searchTerm;
    let currentPage = context.state.currentPage;
    let perPage = context.state.perPage;
    if (searchTerm && currentPage && perPage) {
      try {
        //using unspash library
        await unsplash.search.photos(searchTerm, currentPage, perPage)
          .then(toJson)
          .then(json => {
            let payload = {
              totalPhotos: json.total,
              totalPages: json.total_pages,
              photos: json.results
            }
            context.commit('setSearchResult', payload);
            context.commit("toggleLoading");
          })

      } catch (err) {
        console.log(err);
      }
    }
  },
  async randomImage (context) {
    try {
      unsplash.photos.getRandomPhoto({ freatured: true })
      .then(toJson)
      .then(json => {
        context.commit('setRandomImage', json)
      });
    }
    catch (err) {
      console.log(err)
    }
  },
  async listPhotos (context) {
    let currentPage = context.state.currentPage;
    let perPage = context.state.perPage;
    try {
      await unsplash.photos.listPhotos(currentPage, perPage, "latest")
      .then(toJson)
      .then(json => {
        context.commit('setListPhotos', json)
      });
    }
    catch (err){
      console.log(err)
    }
  },
  toggleLightBox (context) {
    context.commit('toggleLightBox')
  },
  setImageIndex (context, index) {
    context.commit('imageIndex', index)
  }
};
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});