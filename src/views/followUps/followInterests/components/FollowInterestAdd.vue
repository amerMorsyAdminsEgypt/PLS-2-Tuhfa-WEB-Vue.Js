<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="FollowInterestAdd"
      size="xl"
      :headerText="$t('FollowInterests.add')"
      :headerIcon="followInterest.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="followInterest.setInitialValue()"
    >
      <FollowInterestForm
        v-if="!isLoading"
        id="add"
        :followInterest="followInterest"
        v-on:submitForm="addFollowInterest()"
        bottomSheetName="FollowInterestAdd"
        :submitName="$t('add')"
        :userToken="userToken"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="FollowInterestAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import FollowInterestForm from "./FollowInterestForm.vue";
import { STATUS } from "./../../../../utils/constants";
import apiFollowInterest from "./../../../../api/followUps/followInterests";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    FollowInterestForm,
  },
  props: {
    followInterest: { type: Object },
    userToken: { type: String, default: "" },
  },
  methods: {
    async addFollowInterest() {
      this.isLoading = true;
      try {
        const response = await apiFollowInterest.add(this.followInterest);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-FollowInterestAdd");
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
          this.followInterest.setInitialValue();
          break;
        case "leave":
          this.followInterest.setInitialValue();
          this.closeBottomSheet("FollowInterestAdd");
          break;
      }
    },
  },
};
</script>
