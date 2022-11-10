<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserOperationAdd"
      size="xl"
      :headerText="$t('UserOperations.add')"
      :headerIcon="userOperation.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="userOperation.setInitialValue()"
    >
      <UserOperationForm
        v-if="!isLoading"
        id="add"
        :userOperation="userOperation"
        v-on:submitForm="addUserOperation()"
        bottomSheetName="UserOperationAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="UserOperationAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import UserOperationForm from "./UserOperationForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiUserOperation from "./../../../../api/usersPersonalData/userOperations";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    UserOperationForm,
  },
  props: ["userOperation", "userToken", "userTypeToken"],
  methods: {
    async addUserOperation() {
      this.isLoading = true;
      this.userOperation.userToken = this.userToken;
      this.userOperation.userTypeToken = this.userTypeToken;
      let formData = objectToFormData(this.userOperation);
      try {
        const response = await apiUserOperation.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-UserOperationAdd");
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
          this.userOperation.setInitialValue();
          break;
        case "leave":
          this.userOperation.setInitialValue();
          this.closeBottomSheet("UserOperationAdd");
          break;
      }
    },
  },
};
</script>
