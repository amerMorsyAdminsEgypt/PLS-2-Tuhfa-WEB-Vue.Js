<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="GradingPlanUpdate"
      size="xl"
      :headerText="$t('GradingPlans.edit')"
      :headerIcon="gradingPlan.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <GradingPlanForm
        v-if="!isLoading"
        id="update"
        :gradingPlan="gradingPlan"
        v-on:submitForm="updateGradingPlan()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="GradingPlanUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import GradingPlanForm from "./GradingPlanForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiGradingPlan from "./../../../../../api/settings/settingsOthers/gradingPlans";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    GradingPlanForm,
  },
  props: ["gradingPlan"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateGradingPlan() {
      this.isLoading = true;
      let formData = objectToFormData(this.gradingPlan);
      try {
        const response = await apiGradingPlan.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("GradingPlanUpdate");
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
          token: this.gradingPlan.gradingPlanToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiGradingPlan.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.gradingPlan.gradingPlanImagePath = "";
          this.gradingPlan.gradingPlanImageIsDefault = true;
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
