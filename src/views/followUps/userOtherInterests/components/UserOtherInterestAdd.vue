<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserOtherInterestAdd"
      size="xl"
      :headerText="$t('UserOtherInterests.add')"
      :headerIcon="userOtherInterest.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="userOtherInterest.setInitialValue()"
    >
      <UserOtherInterestForm
        v-if="!isLoading"
        id="add"
        :userOtherInterest="userOtherInterest"
        v-on:submitForm="addUserOtherInterest()"
        bottomSheetName="UserOtherInterestAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="UserOtherInterestAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import UserOtherInterestForm from "./UserOtherInterestForm.vue";
import { STATUS } from "./../../../../utils/constants";
import apiUserOtherInterest from "./../../../../api/followUps/userOtherInterests";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    UserOtherInterestForm,
  },
  props: ["userOtherInterest"],
  methods: {
    async addUserOtherInterest() {
      this.isLoading = true;
      try {
        const response = await apiUserOtherInterest.add(this.userOtherInterest);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-UserOtherInterestAdd");
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
          this.userOtherInterest.setInitialValue();
          break;
        case "leave":
          this.userOtherInterest.setInitialValue();
          this.closeBottomSheet("UserOtherInterestAdd");
          break;
      }
    },
  },
};
</script>
