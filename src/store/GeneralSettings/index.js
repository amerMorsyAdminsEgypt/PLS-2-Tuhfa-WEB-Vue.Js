import GeneralSetting from "./../../models/general/generalSettings/GeneralSetting";
import {
  setGeneralSetting,
  toggleSidebarStatus,
  togglePaginationStatus,
} from "./../store-types";

export default {
  state: {
    generalSetting: null,
    sidebarIsClosed: false,
    paginationIsClosed: false,
  },
  getters: {
    generalSetting: (state) => state.generalSetting || new GeneralSetting(),
    sidebarIsClosed: (state) => state.sidebarIsClosed,
    paginationIsClosed: (state) => state.paginationIsClosed,
  },
  mutations: {
    [setGeneralSetting]: (state, generalSetting) => {
      // state.generalSetting = new GeneralSetting();
      state.generalSetting = generalSetting;
    },
    [toggleSidebarStatus]: (state) => {
      state.sidebarIsClosed = !state.sidebarIsClosed;
    },
    [togglePaginationStatus]: (state) => {
      state.paginationIsClosed = !state.paginationIsClosed;
    },
  },
  actions: {
    setGeneralSetting(context, generalSetting) {
      context.commit(setGeneralSetting, generalSetting);
    },
    toggleSidebarStatus(context) {
      context.commit(toggleSidebarStatus);
    },
    togglePaginationStatus(context) {
      context.commit(togglePaginationStatus);
    },
  },
  modules: {},
};
