<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserOtherInterestUpdate"
      size="xl"
      :headerText="$t('UserOtherInterests.edit')"
      :headerIcon="userOtherInterest.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <UserOtherInterestForm
        v-if="!isLoading"
        id="update"
        :userOtherInterest="userOtherInterest"
        v-on:submitForm="updateUserOtherInterest()"
        bottomSheetName="UserOtherInterestUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import UserOtherInterestForm from "./UserOtherInterestForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiUserOtherInterest from "./../../../../api/followUps/userOtherInterests";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    UserOtherInterestForm,
  },
  props: ["userOtherInterest"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateUserOtherInterest() {
      this.isLoading = true;
      let formData = objectToFormData(this.userOtherInterest);
      try {
        const response = await apiUserOtherInterest.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("UserOtherInterestUpdate");
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
  },
};
</script>
