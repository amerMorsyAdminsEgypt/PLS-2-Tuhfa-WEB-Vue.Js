<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserOperationUpdate"
      size="xl"
      :headerText="$t('UserOperations.edit')"
      :headerIcon="userOperation.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <UserOperationForm
        v-if="!isLoading"
        id="update"
        :userTypeToken="userOperation.userTypeToken"
        :userOperation="userOperation"
        v-on:submitForm="updateUserOperation()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="UserOperationUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import UserOperationForm from "./UserOperationForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import UserDelete from "./../../../../models/users/UserDelete";
import apiUserOperation from "./../../../../api/usersPersonalData/userOperations";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    UserOperationForm,
  },
  props: ["userOperation"],
  data() {
    return {
      model: new UserDelete(),
    };
  },
  methods: {
    async updateUserOperation() {
      this.isLoading = true;
      let formData = objectToFormData(this.userOperation);
      try {
        const response = await apiUserOperation.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("UserOperationUpdate");
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
          token: this.userOperation.userOperationToken,
          userTypeToken: this.userOperation.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUserOperation.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.userOperation.userOperationImagePath = "";
          this.userOperation.userOperationImageIsDefault = true;
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
