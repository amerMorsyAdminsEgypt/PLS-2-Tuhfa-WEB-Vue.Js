import { getLinkTarget } from "./functions";

export default {
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      linkTarget: getLinkTarget(),
    };
  },
  methods: {
    showMsg(msg = "", isSuccess = false) {
      let variant = isSuccess ? "success" : "danger";
      this.$bvToast.toast(`${msg}`, {
        title: this.$t("alert"),
        variant: variant,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 5000,
      });
    },
    openBottomSheet(bottomSheet) {
      this.$root.$emit("openBottomSheet", bottomSheet);
    },
    closeBottomSheet(bottomSheet) {
      this.$root.$emit("closeBottomSheet", bottomSheet);
    },
  },
};
