import { DEFAULT_PAGES } from "./../../utils/constants";
import router from "./../../router";

export default {
  state: {
    userAuthorizeToken: null,
    loginStatus: false,
    userPersonalData: null,
    constantsListsData: null,
    usersPrivilegeData: null,
    userHomePage: "",
  },
  getters: {
    userAuthorizeToken: (state) => state.userAuthorizeToken,
    loginStatus: (state) => state.loginStatus,
    userPersonalData: (state) => state.userPersonalData,
    constantsListsData: (state) => state.constantsListsData,
    usersPrivilegeData: (state) => state.usersPrivilegeData,
    userHomePage: (state) => state.userHomePage,
  },
  mutations: {
    UPDATE_USER_DATA: (state, data) => {
      state.userAuthorizeToken = data.userAuthorizeToken || null;
      state.userPersonalData = data.userPersonalDataObject || null;
      state.constantsListsData = data.constantsListsData || null;
      state.usersPrivilegeData = data.usersPrivilegeData || null;
    },
    LOGOUT_USER: (state) => {
      state.userAuthorizeToken = null;
      state.loginStatus = false;
      state.userPersonalData = null;
      state.constantsListsData = null;
      state.usersPrivilegeData = null;
      state.userHomePage = "";
    },
    UPDATE_USER_AUTHORIZE_TOKEN: (state, userAuthorizeToken) => {
      state.userAuthorizeToken = userAuthorizeToken || null;
    },
    UPDATE_LOGIN_STATUS: (state, loginStatus) => {
      state.loginStatus = loginStatus;
    },
    SET_USER_HOME_PAGE: (state, userHomePage) => {
      state.userHomePage = userHomePage;
    },
  },
  actions: {
    loginUser(context, data) {
      context.commit("UPDATE_USER_DATA", data);
    },
    logoutUser(context, message = "Logout") {
      context.commit("LOGOUT_USER");
      context.commit("SET_GENERAL_SETTING", null);
      context.commit("ADD_ALERT", { type: "danger", message });
      router.push({ name: DEFAULT_PAGES.notLoggedIn }).catch(() => {});
    },
    updateUserAuthorizeToken(context, token) {
      context.commit("UPDATE_USER_AUTHORIZE_TOKEN", token);
    },
    updateLoginStatus(context, status) {
      context.commit("UPDATE_LOGIN_STATUS", status);
    },
    setUserHomePage(context, userHomePage) {
      context.commit("SET_USER_HOME_PAGE", userHomePage);
    },
  },
  modules: {},
};
