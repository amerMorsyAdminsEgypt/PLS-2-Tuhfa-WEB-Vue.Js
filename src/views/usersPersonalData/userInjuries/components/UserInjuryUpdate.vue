<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserInjuryUpdate"
      size="xl"
      :headerText="$t('UserInjuries.edit')"
      :headerIcon="userInjury.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <UserInjuryForm
        v-if="!isLoading"
        id="update"
        :userTypeToken="userInjury.userTypeToken"
        :userInjury="userInjury"
        v-on:submitForm="updateUserInjury()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="UserInjuryUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import UserInjuryForm from "./UserInjuryForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import UserDelete from "./../../../../models/users/UserDelete";
import apiUserInjury from "./../../../../api/usersPersonalData/userInjuries";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    UserInjuryForm,
  },
  props: ["userInjury"],
  data() {
    return {
      model: new UserDelete(),
    };
  },
  methods: {
    async updateUserInjury() {
      this.isLoading = true;
      let formData = objectToFormData(this.userInjury);
      try {
        const response = await apiUserInjury.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("UserInjuryUpdate");
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
          token: this.userInjury.userInjuryToken,
          userTypeToken: this.userInjury.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUserInjury.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.userInjury.userInjuryImagePath = "";
          this.userInjury.userInjuryImageIsDefault = true;
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
