<template>
  <b-modal :id="id" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/changePassword.svg" class="icon-lg" />
        {{ $t("changePassword") }}
      </h3>
    </template>
    <div class="row">
      <CustomInputPassword
        :className="'col-12'"
        :id="'userPassword'"
        :value="userPassword"
        v-on:changeValue="userPassword = $event"
        :title="$t('password')"
        :imgName="'passwordlock.svg'"
      />
      <CustomInputPassword
        :className="'col-12'"
        :id="'userPasswordConfirm'"
        :value="userPasswordConfirm"
        v-on:changeValue="userPasswordConfirm = $event"
        :title="$t('passwordConfirm')"
        :imgName="'passwordlock.svg'"
      />
    </div>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="changeUserPassword"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('UserChangePassword')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomInputPassword from "@/components/general/CustomInputPassword.vue";
import { mapGetters } from "vuex";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import generalMixin from "@/utils/generalMixin";

export default {
  name: "UserChangePassword",
  mixins: [generalMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInputPassword,
  },
  computed: {
    ...mapGetters(["userPersonalData"]),
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar-EG",
      userPassword: "User@1234",
      userPasswordConfirm: "User@1234",
      showPassword: true,
      showPasswordConfirm: true,
    };
  },
  methods: {
    async changeUserPassword() {
      this.isLoading = true;
      try {
        // const data = {
        //   language: this.language,
        //   userToken: this.userPersonalData.userToken,
        //   userPassword: this.userPassword,
        // };
        var formData = new FormData();
        formData.append("language", this.language);
        if (this.userToken) {
          formData.append("userToken", this.userToken);
        } else {
          formData.append("userToken", this.userPersonalData.userToken);
        }
        formData.append("userPassword", this.userPassword);

        if (this.userPassword !== this.userPasswordConfirm) {
          this.showMsg(this.$t("twoPasswordsDoesNotMatched"));
        } else {
          try {
            const response = await axios.post(
              `/api/Users/ChangeUserPassword`,
              formData
            );

            if (response.data.status == STATUS.SUCCESS) {
              this.showMsg(response.data.msg, true);
              this.$bvModal.hide("UserChangePassword");
              this.$emit("logout");
            } else if (response.data.status == STATUS.INVALID_TOKEN) {
              this.showMsg(response.data.msg);
              this.$store.dispatch("logoutUser", response.data.msg);
            } else {
              this.showMsg(response.data.msg);
            }
          } catch (e) {
            this.showMsg(this.$t("errorCatch"));
          }
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  props: {
    userToken: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "UserChangePassword",
    },
  },
};
</script>
