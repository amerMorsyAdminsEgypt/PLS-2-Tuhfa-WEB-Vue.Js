<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserQualificationUpdate"
      size="xl"
      :headerText="$t('UserQualifications.edit')"
      :headerIcon="userQualification.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <UserQualificationForm
        v-if="!isLoading"
        id="update"
        :userTypeToken="userQualification.userTypeToken"
        :userQualification="userQualification"
        v-on:submitForm="updateUserQualification()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="UserQualificationUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import UserQualificationForm from "./UserQualificationForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import UserDelete from "./../../../../models/users/UserDelete";
import apiUserQualification from "./../../../../api/usersPersonalData/userQualifications";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    UserQualificationForm,
  },
  props: ["userQualification"],
  data() {
    return {
      model: new UserDelete(),
    };
  },
  methods: {
    async updateUserQualification() {
      this.isLoading = true;
      let formData = objectToFormData(this.userQualification);
      try {
        const response = await apiUserQualification.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("UserQualificationUpdate");
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
          token: this.userQualification.userQualificationToken,
          userTypeToken: this.userQualification.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUserQualification.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.userQualification.userQualificationImagePath = "";
          this.userQualification.userQualificationImageIsDefault = true;
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
