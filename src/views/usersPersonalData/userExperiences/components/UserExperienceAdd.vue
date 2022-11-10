<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserExperienceAdd"
      size="xl"
      :headerText="$t('UserExperiences.add')"
      :headerIcon="userExperience.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="userExperience.setInitialValue()"
    >
      <UserExperienceForm
        v-if="!isLoading"
        id="add"
        :userExperience="userExperience"
        v-on:submitForm="addUserExperience()"
        bottomSheetName="UserExperienceAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="UserExperienceAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import UserExperienceForm from "./UserExperienceForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiUserExperience from "./../../../../api/usersPersonalData/userExperiences";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    UserExperienceForm,
  },
  props: ["userExperience", "userToken", "userTypeToken"],
  methods: {
    async addUserExperience() {
      this.isLoading = true;
      this.userExperience.userToken = this.userToken;
      this.userExperience.userTypeToken = this.userTypeToken;
      let formData = objectToFormData(this.userExperience);
      try {
        const response = await apiUserExperience.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-UserExperienceAdd");
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
          this.userExperience.setInitialValue();
          break;
        case "leave":
          this.userExperience.setInitialValue();
          this.closeBottomSheet("UserExperienceAdd");
          break;
      }
    },
  },
};
</script>
