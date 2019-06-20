export const namespaced = true;

export const state = {
  types: ["main", "newdeath", "donation"],
  loading: {
    // main - loading on fetching
    main: 0,
    // newdeath - loading when adding new death
    newdeath: 0,
    // donation - loading when new transaction
    donation: 0
  }
};

export const mutations = {
  LOADING_START(state, type) {
    state.loading[type]++;
  },
  LOADING_END(state, type) {
    state.loading[type]--;
  }
};

export const actions = {
  lstart({ commit, state }, type) {
    if (state.types.includes(type)) {
      commit("LOADING_START", type);
    }
  },
  lend({ commit, state }, type) {
    if (state.types.includes(type)) {
      commit("LOADING_END", type);
    }
  }
};

export const getters = {
  isLoading: state => {
    return !!state.loading.main > 0;
  },
  isLoadingNewDeath: state => {
    return !!state.loading.newdeath > 0;
  },
  isLoadingDonation: state => {
    return !!state.loading.donation > 0;
  }
};
