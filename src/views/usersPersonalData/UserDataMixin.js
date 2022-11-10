import { STATUS } from "./../../utils/constants";
import User from "./../../models/users/User";
import UserDelete from "./../../models/users/UserDelete";
import apiUser from "./../../api/user";

export default {
  data() {
    return {
      user: new User(),
      model: new UserDelete(),
      requiedTokensExist: false,
      userDetailsLoaded: false,
    };
  },
  methods: {
    async getUserDetails() {
      if (this.requiedTokensExist) {
        this.isLoading = true;
        try {
          this.model.fillData({
            token: this.userToken,
          });
          this.user.setInitialValue();
          const response = await apiUser.getDetails(this.model);
          if (response.data.status == STATUS.SUCCESS) {
            this.userDetailsLoaded = true;
            this.exceptionMsg = null;
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
        } catch (e) {
          this.exceptionMsg = this.$t("errorCatch");
          this.exceptionImg = null;
        }
        this.isLoading = false;
      } else {
        this.exceptionMsg = this.$t("general.pleaseSelectUser");
      }
    },
    async checkTokensExist() {
      let userTypeToken =
        this.userTypeToken || this.$route.params.userTypeToken;
      let userToken = this.userToken || this.$route.params.userToken;

      this.requiedTokensExist = userTypeToken && userToken;
    },
  },
  async created() {
    await this.checkTokensExist();
    this.getUserDetails();
  },
};
