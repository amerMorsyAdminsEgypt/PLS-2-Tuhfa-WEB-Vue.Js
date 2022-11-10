import { STATUS } from "./../../utils/constants";
import apiUser from "./../../api/user";
import User from "./../../models/users/User";
import UserModel from "./../../models/users/UserModel";
import generalMixin from "./../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  data() {
    return {
      isAllDataLoaded: false,
      user: new User(),
      userModel: new UserModel(),
    };
  },
  props: ["userToken"],
  methods: {
    async getUserDetails() {
      this.isLoading = true;
      try {
        this.user.setInitialValue();
        this.userModel.setInitialValue();
        const response = await apiUser.getDetails({
          token: this.userToken,
        });
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.user.fillData(response.data.user);
        this.userModel.fillData(response.data.user);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
};
