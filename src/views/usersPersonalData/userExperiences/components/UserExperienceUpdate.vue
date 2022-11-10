<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserExperienceUpdate"
      size="xl"
      :headerText="$t('UserExperiences.edit')"
      :headerIcon="userExperience.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <UserExperienceForm
        v-if="!isLoading"
        id="update"
        :userTypeToken="userExperience.userTypeToken"
        :userExperience="userExperience"
        v-on:submitForm="updateUserExperience()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="UserExperienceUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import UserExperienceForm from "./UserExperienceForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import UserDelete from "./../../../../models/users/UserDelete";
import apiUserExperience from "./../../../../api/usersPersonalData/userExperiences";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    UserExperienceForm,
  },
  props: ["userExperience"],
  data() {
    return {
      model: new UserDelete(),
    };
  },
  methods: {
    async updateUserExperience() {
      this.isLoading = true;
      let formData = objectToFormData(this.userExperience);
      try {
        const response = await apiUserExperience.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("UserExperienceUpdate");
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
          token: this.userExperience.userExperienceToken,
          userTypeToken: this.userExperience.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUserExperience.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.userExperience.userExperienceImagePath = "";
          this.userExperience.userExperienceImageIsDefault = true;
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
