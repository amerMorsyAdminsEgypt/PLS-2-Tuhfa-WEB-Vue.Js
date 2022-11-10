import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "@/utils/functions"; //must move to App
import "@/utils/axios";
import i18n from "@/i18n/index";
import firebase from "firebase/app";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import VueFileAgent from "vue-file-agent";
import VueFileAgentStyles from "vue-file-agent/dist/vue-file-agent.css";
import VueCountdownTimer from "vuejs-countdown-timer";
import VCalendar from "v-calendar";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "vue-multiselect/dist/vue-multiselect.min.css";
import "pretty-checkbox/dist/pretty-checkbox.min.css";
import "@/assets/css/app.scss";
import "@/assets/css/main.css";

Vue.use(VueFileAgent);
Vue.use(VueFileAgentStyles);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueBottomSheet);
Vue.use(VueCountdownTimer);
Vue.use(VCalendar);
Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYGcGkDoM7dAiP0-IMvYELKPdqs5S5YLo",
  authDomain: "pls-learning.firebaseapp.com",
  projectId: "pls-learning",
  storageBucket: "pls-learning.appspot.com",
  messagingSenderId: "469303462310",
  appId: "1:469303462310:web:89e20786a03cacfe932767",
  measurementId: "G-VVMRY70BFF",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
