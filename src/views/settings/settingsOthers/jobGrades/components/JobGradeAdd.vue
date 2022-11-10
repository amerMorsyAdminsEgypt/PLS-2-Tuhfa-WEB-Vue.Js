<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="JobGradeAdd"
      size="xl"
      :headerText="$t('JobGrades.add')"
      :headerIcon="jobGrade.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="jobGrade.setInitialValue()"
    >
      <JobGradeForm
        v-if="!isLoading"
        id="add"
        :jobGrade="jobGrade"
        v-on:submitForm="addJobGrade()"
        bottomSheetName="JobGradeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="JobGradeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import JobGradeForm from "./JobGradeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiJobGrade from "./../../../../../api/settings/settingsOthers/jobGrades";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    JobGradeForm,
  },
  props: ["jobGrade"],
  methods: {
    async addJobGrade() {
      this.isLoading = true;
      let formData = objectToFormData(this.jobGrade);
      try {
        const response = await apiJobGrade.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-JobGradeAdd");
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
          this.jobGrade.setInitialValue();
          break;
        case "leave":
          this.jobGrade.setInitialValue();
          this.closeBottomSheet("JobGradeAdd");
          break;
      }
    },
  },
};
</script>
