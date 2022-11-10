<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserUpdate"
      size="xl"
      :headerText="$t('Users.edit')"
      :headerIcon="userModel.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="getUserDetails()"
    >
      <UserForm
        v-if="!isLoading"
        :id="`${userModel.userTypeToken}Update`"
        :user="userModel"
        :userTypeToken="userTypeToken"
        v-on:submitForm="updateUser()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="UserUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../components/general/CustomBottomSheet.vue";
import UserForm from "./UserForm.vue";
import { STATUS } from "./../../utils/constants";
import { objectToFormData } from "./../../utils/functions";
import UserDelete from "./../../models/users/UserDelete";
import apiUser from "./../../api/user";
// import generalMixin from "./../../utils/generalMixin";
import userDetailsMixin from "./userDetailsMixin";

export default {
  mixins: [userDetailsMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    UserForm,
  },
  props: ["userToken", "userTypeToken"],
  data() {
    return {
      model: new UserDelete(),
    };
  },
  methods: {
    async updateUser() {
      this.isLoading = true;
      let formData = objectToFormData(this.userModel);
      try {
        const response = await apiUser.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("UserUpdate");
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
          token: this.userModel.userToken,
          userTypeToken: this.userModel.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUser.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.userModel.userImagePath = "";
          this.userModel.userImageIsDefault = true;
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
