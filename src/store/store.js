import Vue from 'vue';
import Vuex from 'vuex';
import { startOfMinute, differenceInMilliseconds } from 'date-fns';
import { getCurrentWeatherConditions, getLocation } from './../currentWeather';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    now: new Date(),
    location: {},
    realConditions: {}
  },
  getters: {
    location: state => {
      return state.location;
    },
    realWeatherSummary: state => {
      return state.realConditions.summary;
    }
  },

  // actions: {
  //   async actionA ({ commit }) {
  //     commit('gotData', await getData())
  //   },
  //   async actionB ({ dispatch, commit }) {
  //     await dispatch('actionA') // wait for `actionA` to finish
  //     commit('gotOtherData', await getOtherData())
  //   }
  // }

  actions: {
    start({ dispatch, commit }) {
      // track current time
      const now = new Date();
      const nextMinute = startOfMinute(now);
      differenceInMilliseconds(now, nextMinute);
      setTimeout(function() {
        setInterval(() => {
          commit('updateTime');
        }, 1000 * 60);
      }, differenceInMilliseconds(now, nextMinute));
      commit('updateTime');

      dispatch('getLocation').then(() => {
        dispatch('getWeatherConditions');
      });
    },
    // get location
    async getLocation({ commit }) {
      commit('setLocation', await getLocation());
    },

    // get weather conditions
    // getUser ({ commit, state }, payload) {
    async getWeatherConditions({ commit, state }) {
      commit(
        'setRealConditions',
        await getCurrentWeatherConditions(state.location)
      );
    }
  },
  mutations: {
    updateTime(state) {
      state.now = new Date();
    },
    setLocation(state, location) {
      state.location = location;
    },
    setRealConditions(state, conditions) {
      state.realConditions = conditions;
    }
  }
});
