<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ReminderAdd"
      size="xl"
      :headerText="$t('Reminders.add')"
      :headerIcon="reminder.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="reminder.setInitialValue()"
    >
      <ReminderForm
        v-if="!isLoading"
        id="add"
        :reminder="reminder"
        v-on:submitForm="addReminder()"
        bottomSheetName="ReminderAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ReminderAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
import ReminderForm from "./ReminderForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiReminder from "./../../../api/reminder";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ReminderForm,
  },
  props: ["reminder"],
  methods: {
    async addReminder() {
      this.isLoading = true;
      let formData = objectToFormData(this.reminder);
      try {
        const response = await apiReminder.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ReminderAdd");
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
          this.reminder.setInitialValue();
          break;
        case "leave":
          this.reminder.setInitialValue();
          this.closeBottomSheet("ReminderAdd");
          break;
      }
    },
  },
};
</script>
