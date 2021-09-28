import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  getters: {
  },
  actions: {
    async register({ commit }, payload) {
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password,
      );

      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      await userCred.user.updateProfile({
        displayName: payload.name,
      });

      commit('toggleAuth');
    },

    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);

      commit('toggleAuth');
    },

    init_login({ commit }) {
      // 1. retrive current authentication status from firebase
      const user = auth.currentUser;

      // 2. check if they are login based on value retrive from '1'
      if (user) {
        commit('toggleAuth');
      }
    },

    async signout({ commit }) {
      await auth.signOut();

      commit('toggleAuth');
    },
  },
});
