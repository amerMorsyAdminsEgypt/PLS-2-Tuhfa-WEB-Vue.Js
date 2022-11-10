<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserLoginCodeUpdate"
      size="xl"
      :headerText="$t('UserLoginCodes.edit')"
      :headerIcon="userLoginCode.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <UserLoginCodeForm
        v-if="!isLoading"
        id="update"
        :userLoginCode="userLoginCode"
        :userTypeToken="userTypeToken"
        v-on:submitForm="updateUserLoginCode()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="UserLoginCodeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import UserLoginCodeForm from "./UserLoginCodeForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import UserLoginCodeDelete from "./../../../../models/settings/userLoginCodes/UserLoginCodeDelete";
import apiUserLoginCode from "./../../../../api/settings/userLoginCode";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    UserLoginCodeForm,
  },
  props: ["userLoginCode", "userTypeToken"],
  data() {
    return {
      model: new UserLoginCodeDelete(),
    };
  },
  methods: {
    async updateUserLoginCode() {
      this.isLoading = true;
      let formData = objectToFormData(this.userLoginCode);
      try {
        const response = await apiUserLoginCode.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("UserLoginCodeUpdate");
          this.$emit("refresh");
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
    async deleteFile() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token: this.userLoginCode.userLoginCodeToken,
          userTypeToken: this.userLoginCode.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUserLoginCode.deleteImage(formData);
        console.log(response);
        if (response.data.status == STATUS.SUCCESS) {
          this.userLoginCode.userLoginCodeImagePath = "";
          this.userLoginCode.userLoginCodeImageIsDefault = true;
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
};
</script>
