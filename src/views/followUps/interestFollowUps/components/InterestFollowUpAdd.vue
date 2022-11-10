<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="InterestFollowUpAdd"
      size="xl"
      :headerText="$t('InterestFollowUps.add')"
      :headerIcon="interestFollowUp.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="
        interestFollowUp.setInitialValue({
          mainToken: interestFollowUp.mainToken,
          followUpTypeToken: interestFollowUp.followUpTypeToken,
        })
      "
    >
      <InterestFollowUpForm
        v-if="!isLoading"
        id="add"
        :interestFollowUp="interestFollowUp"
        v-on:submitForm="addInterestFollowUp()"
        bottomSheetName="InterestFollowUpAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="InterestFollowUpAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import InterestFollowUpForm from "./InterestFollowUpForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiInterestFollowUp from "./../../../../api/followUps/interestFollowUps";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    InterestFollowUpForm,
  },
  props: {
    interestFollowUp: {
      type: Object,
    },
  },
  methods: {
    async addInterestFollowUp() {
      this.isLoading = true;
      let formData = objectToFormData(this.interestFollowUp);
      try {
        const response = await apiInterestFollowUp.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-InterestFollowUpAdd");
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
      if (data) this.interestFollowUp.setInitialValue();
    },
  },
  created() {},
};
</script>
