<template>
  <div>
    <DashboardNavbar />
    <PreLoader v-if="isLoading" />

    <div class="app-content">
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />

      <UserAppSettingForm
        v-if="!isLoading"
        :userAppSetting="userAppSetting"
        v-on:submitForm="updateUserAppSetting()"
        :submitName="$t('edit')"
      />
    </div>
  </div>
</template>

<script>
import { STATUS } from "./../../utils/constants";
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import { objectToFormData } from "./../../utils/functions";
import UserAppSettingForm from "./components/UserAppSettingForm.vue";
import UserAppSetting from "./../../models/userAppSettings/UserAppSetting";
import apiUserAppSettings from "./../../api/userAppSettings";
import generalMixin from "./../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    UserAppSettingForm,
  },
  data() {
    return {
      userAppSetting: new UserAppSetting(),
    };
  },
  methods: {
    async getUserAppSettingDetails() {
      this.isLoading = true;
      try {
        this.userAppSetting.setInitialValue();
        const response = await apiUserAppSettings.get();
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
        this.userAppSetting.fillData(response.data.userAppSetting);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async updateUserAppSetting() {
      this.isLoading = true;
      try {
        let formData = objectToFormData(this.userAppSetting);
        const response = await apiUserAppSettings.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.$store.dispatch(
            "updateUserAuthorizeToken",
            response.data.userAuthorizeToken
          );
          this.showMsg(response.data.msg, true);
          this.getUserAppSettingDetails();
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getUserAppSettingDetails();
  },
};
</script>
