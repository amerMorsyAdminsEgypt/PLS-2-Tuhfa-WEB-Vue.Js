<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="@/assets/images/illustrator-login.svg" alt="IMG" />
        </div>

        <form
          class="login100-form validate-form"
          method="post"
          @submit.prevent="loginSubmit"
        >
          <div class="container-logo">
            <img src="@/assets/images/logo.png" alt="LOGO" class="logo" />
          </div>

          <div class="row">
            <CustomInput
              className="col-12"
              id="userNameOrPhoneOrEmail"
              :errors="errors_user"
              :value="userLogin.user"
              v-on:changeValue="
                userLogin.user = $event;
                $v.userLogin.user.$touch();
              "
              :title="$t('userNameOrPhoneOrEmail')"
              :imgName="'man.svg'"
            />

            <CustomInputPassword
              className="col-12"
              id="userPassword"
              :errors="errors_userPassword"
              :value="userLogin.userPassword"
              v-on:changeValue="
                userLogin.userPassword = $event;
                $v.userLogin.userPassword.$touch();
              "
              :title="$t('password')"
              :imgName="'passwordlock.svg'"
            />
          </div>

          <div class="rememberMe-forgotPassword"></div>

          <div class="container-login100-form-btn">
            <button name="login" type="submit" class="login100-form-btn">
              {{ $t("login") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/general/CustomInput.vue";
import CustomInputPassword from "@/components/general/CustomInputPassword.vue";
import { isValidPassword } from "@/utils/validationHelper";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  components: {
    CustomInput,
    CustomInputPassword,
  },
  props: ["userLogin"],
  data() {
    return {};
  },
  validations: {
    userLogin: {
      user: { required },
      userPassword: { isValidPassword },
    },
  },
  computed: {
    errors_user() {
      let errors = [];
      if (this.$v.userLogin.user.$error) {
        if (!this.$v.userLogin.user.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userPassword() {
      let errors = [];
      if (this.$v.userLogin.userPassword.$error) {
        if (!this.$v.userLogin.userPassword.isValidPassword)
          errors.push(this.$t("validation.passwordIsNotValid"));
      }
      return errors;
    },
  },
  methods: {
    // async loginSubmit() {
    //   this.$emit("login");
    // },
    async loginSubmit() {
      // bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.userLogin.user.required &&
        this.$v.userLogin.userPassword.isValidPassword
      ) {
        this.$emit("login");
      }
    },
  },
};
</script>
