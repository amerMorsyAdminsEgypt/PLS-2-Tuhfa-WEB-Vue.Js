<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="GradingPlanAdd"
      size="xl"
      :headerText="$t('GradingPlans.add')"
      :headerIcon="gradingPlan.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="gradingPlan.setInitialValue()"
    >
      <GradingPlanForm
        v-if="!isLoading"
        id="add"
        :gradingPlan="gradingPlan"
        v-on:submitForm="addGradingPlan()"
        bottomSheetName="GradingPlanAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="GradingPlanAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import GradingPlanForm from "./GradingPlanForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiGradingPlan from "./../../../../../api/settings/settingsOthers/gradingPlans";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    GradingPlanForm,
  },
  props: ["gradingPlan"],
  methods: {
    async addGradingPlan() {
      this.isLoading = true;
      let formData = objectToFormData(this.gradingPlan);
      try {
        const response = await apiGradingPlan.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-GradingPlanAdd");
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
          this.gradingPlan.setInitialValue();
          break;
        case "leave":
          this.gradingPlan.setInitialValue();
          this.closeBottomSheet("GradingPlanAdd");
          break;
      }
    },
  },
};
</script>
