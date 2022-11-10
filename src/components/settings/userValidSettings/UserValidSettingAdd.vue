<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserValidSettingAdd"
      size="xl"
      :headerText="$t('UserValidSettings.add')"
      :headerIcon="userValidSetting.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="userValidSetting.setInitialValue(userValidSetting.userTypeToken)"
    >
      <UserValidSettingForm
        v-if="!isLoading"
        id="add"
        :userValidSetting="userValidSetting"
        v-on:submitForm="addUserValidSetting()"
        bottomSheetName="UserValidSettingAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="UserValidSettingAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
import UserValidSettingForm from "./UserValidSettingForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiUserValidSetting from "./../../../api/settings/userValidSetting";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    UserValidSettingForm,
  },
  props: ["userValidSetting", "userTypeToken"],
  methods: {
    async addUserValidSetting() {
      this.isLoading = true;
      let formData = objectToFormData(this.userValidSetting);
      try {
        const response = await apiUserValidSetting.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-UserValidSettingAdd");
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

    response(data) {
      this.$emit("refresh");
      switch (data) {
        case "yes":
          this.userValidSetting.setInitialValue();
          break;
        case "leave":
          this.userValidSetting.setInitialValue();
          this.closeBottomSheet("UserValidSettingAdd");
          break;
      }
    },
  },
};
</script>
