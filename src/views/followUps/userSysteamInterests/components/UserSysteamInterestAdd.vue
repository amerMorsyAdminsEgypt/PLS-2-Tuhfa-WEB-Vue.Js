<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserSysteamInterestAdd"
      size="xl"
      :headerText="$t('UserSysteamInterests.add')"
      :headerIcon="userSysteamInterest.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="userSysteamInterest.setInitialValue()"
    >
      <UserSysteamInterestForm
        v-if="!isLoading"
        id="add"
        :userSysteamInterest="userSysteamInterest"
        v-on:submitForm="addUserSysteamInterest()"
        bottomSheetName="UserSysteamInterestAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="UserSysteamInterestAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import UserSysteamInterestForm from "./UserSysteamInterestForm.vue";
import { STATUS } from "./../../../../utils/constants";
import apiUserSysteamInterest from "./../../../../api/followUps/userSysteamInterests";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    UserSysteamInterestForm,
  },
  props: ["userSysteamInterest"],
  methods: {
    async addUserSysteamInterest() {
      this.isLoading = true;
      try {
        const response = await apiUserSysteamInterest.add(
          this.userSysteamInterest
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-UserSysteamInterestAdd");
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
          this.userSysteamInterest.setInitialValue();
          break;
        case "leave":
          this.userSysteamInterest.setInitialValue();
          this.closeBottomSheet("UserSysteamInterestAdd");
          break;
      }
    },
  },
};
</script>
