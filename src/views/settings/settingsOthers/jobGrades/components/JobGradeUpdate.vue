<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="JobGradeUpdate"
      size="xl"
      :headerText="$t('JobGrades.edit')"
      :headerIcon="jobGrade.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <JobGradeForm
        v-if="!isLoading"
        id="update"
        :jobGrade="jobGrade"
        v-on:submitForm="updateJobGrade()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="JobGradeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import JobGradeForm from "./JobGradeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiJobGrade from "./../../../../../api/settings/settingsOthers/jobGrades";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    JobGradeForm,
  },
  props: ["jobGrade"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateJobGrade() {
      this.isLoading = true;
      let formData = objectToFormData(this.jobGrade);
      try {
        const response = await apiJobGrade.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("JobGradeUpdate");
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
          token: this.jobGrade.jobGradeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiJobGrade.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.jobGrade.jobGradeImagePath = "";
          this.jobGrade.jobGradeImageIsDefault = true;
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
