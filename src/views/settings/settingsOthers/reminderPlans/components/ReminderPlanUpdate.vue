<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ReminderPlanUpdate"
      size="xl"
      :headerText="$t('ReminderPlans.edit')"
      :headerIcon="reminderPlan.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <ReminderPlanForm
        v-if="!isLoading"
        id="update"
        :reminderPlan="reminderPlan"
        v-on:submitForm="updateReminderPlan()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="ReminderPlanUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ReminderPlanForm from "./ReminderPlanForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiReminderPlan from "./../../../../../api/settings/settingsOthers/reminderPlans";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ReminderPlanForm,
  },
  props: ["reminderPlan"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateReminderPlan() {
      this.isLoading = true;
      let formData = objectToFormData(this.reminderPlan);
      try {
        const response = await apiReminderPlan.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ReminderPlanUpdate");
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
          token: this.reminderPlan.reminderPlanToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiReminderPlan.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.reminderPlan.reminderPlanImagePath = "";
          this.reminderPlan.reminderPlanImageIsDefault = true;
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
