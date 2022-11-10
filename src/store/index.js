import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persist-indexeddb";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

import UserData from "./UserData";
import GeneralSettings from "./GeneralSettings";
import ModulePrivilege from "./ModulePrivilege";
import LoginCode from "./LoginCode";
import MediaPackage from "./MediaPackage";
import Alerts from "./Alerts";

const ls = new SecureLS({ isCompression: false });
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    UserData,
    GeneralSettings,
    ModulePrivilege,
    LoginCode,
    MediaPackage,
    Alerts,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
