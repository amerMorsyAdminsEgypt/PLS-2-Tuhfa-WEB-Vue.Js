<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="GeneralJobAdd"
      size="xl"
      :headerText="$t('GeneralJobs.add')"
      :headerIcon="generalJob.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="generalJob.setInitialValue()"
    >
      <GeneralJobForm
        v-if="!isLoading"
        id="add"
        :generalJob="generalJob"
        v-on:submitForm="addGeneralJob()"
        bottomSheetName="GeneralJobAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="GeneralJobAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import GeneralJobForm from "./GeneralJobForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiGeneralJob from "./../../../../../api/settings/settingsOthers/generalJobs";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    GeneralJobForm,
  },
  props: ["generalJob"],
  methods: {
    async addGeneralJob() {
      this.isLoading = true;
      let formData = objectToFormData(this.generalJob);
      try {
        const response = await apiGeneralJob.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-GeneralJobAdd");
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
          this.generalJob.setInitialValue();
          break;
        case "leave":
          this.generalJob.setInitialValue();
          this.closeBottomSheet("GeneralJobAdd");
          break;
      }
    },
  },
};
</script>
