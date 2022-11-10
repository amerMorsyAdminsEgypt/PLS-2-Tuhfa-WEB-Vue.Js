<template>
  <div class="home">
    <PreLoader v-if="isLoading" />

    <LoginForm v-on:login="login()" :userLogin="userLogin" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { STATUS } from "./../../utils/constants";
import {
  CODE_IN_LOGIN_TYPE_TOKENS,
  AUTHENTICATION_LOGIN_TYPE_TOKENS,
} from "./../../utils/constantLists";
import PreLoader from "./../../components/general/PreLoader.vue";
import UserLogin from "./../../models/users/UserLogin";
import LoginForm from "./../../components/users/LoginForm.vue";
import generalMixin from "./../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    LoginForm,
  },
  data() {
    return {
      isLoading: false,
      userLogin: new UserLogin(),
    };
  },
  computed: {
    ...mapGetters(["userHomePage", "invalidLoginCodeStatus"]),
  },
  watch: {},
  methods: {
    async login() {
      this.isLoading = true;
      try {
        let response = await this.userLogin.login();
        if (response.data.status == STATUS.SUCCESS) {
          this.saveUserData(response.data.apiAppData);
        } else if (response.data.status == STATUS.INVALID_LOGIN_CODE) {
          let codeInLoginTypeToken =
            response.data.apiAppData.userData.establishmentRoleData
              .codeInLoginTypeToken;

          let authenticationLoginTypeToken =
            response.data.apiAppData.userData.establishmentRoleData
              .authenticationLoginTypeToken;

          if (
            codeInLoginTypeToken == CODE_IN_LOGIN_TYPE_TOKENS.DeviceGenerated &&
            (authenticationLoginTypeToken ==
              AUTHENTICATION_LOGIN_TYPE_TOKENS.Option_1 ||
              authenticationLoginTypeToken ==
                AUTHENTICATION_LOGIN_TYPE_TOKENS.Option_3)
          ) {
            // logout
            this.showMsg(this.$t("UserLoginCodes.canNotLoginToThisPlatFrom"));
            setTimeout(function () {
              this.$store.dispatch("logoutUser", response.data.msg);
            }, 2000);
          } else if (
            codeInLoginTypeToken == CODE_IN_LOGIN_TYPE_TOKENS.DeviceGenerated &&
            (authenticationLoginTypeToken ==
              AUTHENTICATION_LOGIN_TYPE_TOKENS.Option_2 ||
              authenticationLoginTypeToken ==
                AUTHENTICATION_LOGIN_TYPE_TOKENS.Option_4)
          ) {
            // login
            // console.log("Login case 1 - login");
            this.saveUserData(response.data.apiAppData);
          } else if (
            codeInLoginTypeToken == CODE_IN_LOGIN_TYPE_TOKENS.SystemGenerated
          ) {
            // get code
            // console.log("Login case 2 - get code");
            this.$store.dispatch("updateLoginCodeStatus", true);
            this.$store.dispatch("updateLoginCodeMessage", response.data.msg);
            this.saveUserData(response.data.apiAppData);
          } else {
            // console.log("Login case 3 - else");
            this.showMsg(response.data.msg);
          }
        } else {
          this.$store.dispatch("updateLoginCodeStatus", false);
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async saveUserData(apiAppData) {
      if (apiAppData) {
        let response = await this.userLogin.saveUserData(apiAppData);

        if (response.status == STATUS.SUCCESS) {
          this.showMsg(response.msg, true);

          this.$router.push({ name: this.userHomePage }).catch(() => {});
        } else {
          this.showMsg(response.msg);
        }
      } else {
        this.showMsg(this.$t("Login.noData"));
      }
    },
  },
};
</script>
