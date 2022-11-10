import Vue from "vue";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";
import VueI18n from "vue-i18n";
import { LANGUAGES } from "./../utils/constants";
// import { getLanguage } from "./../utils/functions";

Vue.use(VueI18n);

const messages = {
  [LANGUAGES.arEG]: ar,
  [LANGUAGES.enUS]: en,
  [LANGUAGES.und]: ar,
};

export default new VueI18n({
  locale: localStorage.getItem("userLanguage") || LANGUAGES.default,
  // locale: getLanguage(),
  messages: messages,
});
