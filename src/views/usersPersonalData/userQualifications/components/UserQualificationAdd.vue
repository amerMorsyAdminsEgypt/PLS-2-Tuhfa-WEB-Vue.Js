<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserQualificationAdd"
      size="xl"
      :headerText="$t('UserQualifications.add')"
      :headerIcon="userQualification.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="userQualification.setInitialValue()"
    >
      <UserQualificationForm
        v-if="!isLoading"
        id="add"
        :userQualification="userQualification"
        v-on:submitForm="addUserQualification()"
        bottomSheetName="UserQualificationAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="UserQualificationAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import UserQualificationForm from "./UserQualificationForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiUserQualification from "./../../../../api/usersPersonalData/userQualifications";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    UserQualificationForm,
  },
  props: ["userQualification", "userToken", "userTypeToken"],
  methods: {
    async addUserQualification() {
      this.isLoading = true;
      this.userQualification.userToken = this.userToken;
      this.userQualification.userTypeToken = this.userTypeToken;
      let formData = objectToFormData(this.userQualification);
      try {
        const response = await apiUserQualification.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-UserQualificationAdd");
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
          this.userQualification.setInitialValue();
          break;
        case "leave":
          this.userQualification.setInitialValue();
          this.closeBottomSheet("UserQualificationAdd");
          break;
      }
    },
  },
};
</script>
