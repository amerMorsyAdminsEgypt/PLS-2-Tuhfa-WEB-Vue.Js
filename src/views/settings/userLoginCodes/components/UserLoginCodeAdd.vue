<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserLoginCodeAdd"
      size="xl"
      :headerText="$t('UserLoginCodes.add')"
      :headerIcon="userLoginCode.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="
        userLoginCode.setInitialValue(
          userLoginCode.userTypeToken,
          userLoginCode.userToken
        )
      "
      @closed="userLoginCode.setInitialValue()"
    >
      <UserLoginCodeForm
        v-if="!isLoading"
        id="add"
        :userLoginCode="userLoginCode"
        :userTypeToken="userTypeToken"
        v-on:submitForm="addUserLoginCode()"
        bottomSheetName="UserLoginCodeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="UserLoginCodeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import UserLoginCodeForm from "./UserLoginCodeForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiUserLoginCode from "./../../../../api/settings/userLoginCode";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    UserLoginCodeForm,
  },
  props: ["userLoginCode", "userTypeToken", "userToken"],
  methods: {
    async addUserLoginCode() {
      this.isLoading = true;
      let formData = objectToFormData(this.userLoginCode);
      try {
        const response = await apiUserLoginCode.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-UserLoginCodeAdd");
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
          this.userLoginCode.setInitialValue();
          break;
        case "leave":
          this.userLoginCode.setInitialValue();
          this.closeBottomSheet("UserLoginCodeAdd");
          break;
      }
    },
  },
};
</script>
