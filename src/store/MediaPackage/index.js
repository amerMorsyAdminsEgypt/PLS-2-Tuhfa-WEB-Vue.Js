import {
  updateEmmitSharedMediaDataListStatus,
  updateMediaPackageContainerSharedMediaTokens,
} from "./../store-types";

export default {
  state: {
    emmitSharedMediaDataListStatus: true,
    containerSharedMediaTokens: [],
  },
  getters: {
    emmitSharedMediaDataListStatus: (state) =>
      state.emmitSharedMediaDataListStatus,
    containerSharedMediaTokens: (state) => state.containerSharedMediaTokens,
  },
  mutations: {
    [updateEmmitSharedMediaDataListStatus]: (state, status) => {
      state.emmitSharedMediaDataListStatus = status;
    },
    [updateMediaPackageContainerSharedMediaTokens]: (state, list) => {
      state.containerSharedMediaTokens = [];
      state.containerSharedMediaTokens = list;
    },
  },
  actions: {
    updateEmmitSharedMediaDataListStatus(context, status) {
      context.commit(updateEmmitSharedMediaDataListStatus, status);
    },
    updateMediaPackageContainerSharedMediaTokens(context, status, list) {
      context.commit(
        updateMediaPackageContainerSharedMediaTokens,
        status,
        list
      );
    },
  },
  modules: {},
};
