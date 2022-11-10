<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserValidSettingUpdate"
      size="xl"
      :headerText="$t('UserValidSettings.edit')"
      :headerIcon="userValidSetting.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <UserValidSettingForm
        v-if="!isLoading"
        id="update"
        :userValidSetting="userValidSetting"
        v-on:submitForm="updateUserValidSetting()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="UserValidSettingUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import UserValidSettingForm from "./UserValidSettingForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import UserValidSettingDelete from "./../../../models/settings/userValidSettings/UserValidSettingDelete";
import apiUserValidSetting from "./../../../api/settings/userValidSetting";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    UserValidSettingForm,
  },
  props: ["userValidSetting"],
  data() {
    return {
      model: new UserValidSettingDelete(),
    };
  },
  methods: {
    async updateUserValidSetting() {
      this.isLoading = true;
      let formData = objectToFormData(this.userValidSetting);
      try {
        const response = await apiUserValidSetting.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("UserValidSettingUpdate");
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
          token: this.userValidSetting.userValidSettingToken,
          userTypeToken: this.userValidSetting.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUserValidSetting.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.userValidSetting.userValidSettingImagePath = "";
          this.userValidSetting.userValidSettingImageIsDefault = true;
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
