export default {
  state: {
    isBtnBgColorGreen: [],
    functionsAllCheckedStatus: [],
  },
  getters: {
    isBtnBgColorGreen: (state) => state.isBtnBgColorGreen,
    functionsAllCheckedStatus: (state) => state.functionsAllCheckedStatus,
  },
  mutations: {
    SET_IS_BTN_BG_COLOR_GREEN: (state, arr) => {
      state.isBtnBgColorGreen = [];
      state.isBtnBgColorGreen = arr;
    },
    UPDATE_All_FUNCTIONS_CHECKED_STATUS: (state, arr) => {
      state.functionsAllCheckedStatus = [];
      state.functionsAllCheckedStatus = arr;
    },
  },
  actions: {
    setIsBtnBgColorGreen(context, arr) {
      context.commit("SET_IS_BTN_BG_COLOR_GREEN", arr);
    },
    updateAllFunctionCkeckedStaus(context, arr) {
      context.commit("UPDATE_All_FUNCTIONS_CHECKED_STATUS", arr);
    },
  },
  modules: {},
};
