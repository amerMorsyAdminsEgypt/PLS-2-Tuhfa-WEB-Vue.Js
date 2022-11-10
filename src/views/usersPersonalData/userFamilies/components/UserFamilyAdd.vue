<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserFamilyAdd"
      size="xl"
      :headerText="$t('UserFamilies.add')"
      :headerIcon="userFamily.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="userFamily.setInitialValue()"
    >
      <UserFamilyForm
        v-if="!isLoading"
        id="add"
        :userFamily="userFamily"
        v-on:submitForm="addUserFamily()"
        bottomSheetName="UserFamilyAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="UserFamilyAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import UserFamilyForm from "./UserFamilyForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiUserFamily from "./../../../../api/usersPersonalData/userFamilies";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    UserFamilyForm,
  },
  props: ["userFamily", "userToken", "userTypeToken"],
  methods: {
    async addUserFamily() {
      this.isLoading = true;
      this.userFamily.userToken = this.userToken;
      this.userFamily.userTypeToken = this.userTypeToken;
      let formData = objectToFormData(this.userFamily);
      try {
        const response = await apiUserFamily.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-UserFamilyAdd");
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
          this.userFamily.setInitialValue();
          break;
        case "leave":
          this.userFamily.setInitialValue();
          this.closeBottomSheet("UserFamilyAdd");
          break;
      }
    },
  },
};
</script>
