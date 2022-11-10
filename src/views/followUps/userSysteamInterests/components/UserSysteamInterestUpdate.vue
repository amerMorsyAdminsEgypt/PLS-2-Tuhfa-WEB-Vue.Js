<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserSysteamInterestUpdate"
      size="xl"
      :headerText="$t('UserSysteamInterests.edit')"
      :headerIcon="userSysteamInterest.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <UserSysteamInterestForm
        v-if="!isLoading"
        id="update"
        :userSysteamInterest="userSysteamInterest"
        v-on:submitForm="updateUserSysteamInterest()"
        bottomSheetName="UserSysteamInterestUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import UserSysteamInterestForm from "./UserSysteamInterestForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiUserSysteamInterest from "./../../../../api/followUps/userSysteamInterests";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    UserSysteamInterestForm,
  },
  props: ["userSysteamInterest"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateUserSysteamInterest() {
      this.isLoading = true;
      let formData = objectToFormData(this.userSysteamInterest);
      try {
        const response = await apiUserSysteamInterest.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("UserSysteamInterestUpdate");
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
