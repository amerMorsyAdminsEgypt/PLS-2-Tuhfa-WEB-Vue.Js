<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ReminderPlanAdd"
      size="xl"
      :headerText="$t('ReminderPlans.add')"
      :headerIcon="reminderPlan.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="reminderPlan.setInitialValue()"
    >
      <ReminderPlanForm
        v-if="!isLoading"
        id="add"
        :reminderPlan="reminderPlan"
        v-on:submitForm="addReminderPlan()"
        bottomSheetName="ReminderPlanAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ReminderPlanAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import ReminderPlanForm from "./ReminderPlanForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiReminderPlan from "./../../../../../api/settings/settingsOthers/reminderPlans";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ReminderPlanForm,
  },
  props: ["reminderPlan"],
  methods: {
    async addReminderPlan() {
      this.isLoading = true;
      let formData = objectToFormData(this.reminderPlan);
      try {
        const response = await apiReminderPlan.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ReminderPlanAdd");
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
          this.reminderPlan.setInitialValue();
          break;
        case "leave":
          this.reminderPlan.setInitialValue();
          this.closeBottomSheet("ReminderPlanAdd");
          break;
      }
    },
  },
};
</script>
