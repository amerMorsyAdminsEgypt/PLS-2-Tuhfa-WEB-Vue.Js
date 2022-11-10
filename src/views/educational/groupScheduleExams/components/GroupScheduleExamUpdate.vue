<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="GroupScheduleExamUpdate"
      size="xl"
      :headerText="$t('GroupScheduleExams.edit')"
      :headerIcon="groupScheduleExam.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <GroupScheduleExamForm
        v-if="!isLoading"
        id="update"
        :groupScheduleExam="groupScheduleExam"
        v-on:submitForm="updateGroupScheduleExam()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="GroupScheduleExamUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import GroupScheduleExamForm from "./GroupScheduleExamForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiGroupScheduleExam from "./../../../../api/educational/groupScheduleExams";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    GroupScheduleExamForm,
  },
  props: ["groupScheduleExam"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateGroupScheduleExam() {
      this.isLoading = true;
      let formData = objectToFormData(this.groupScheduleExam);
      try {
        const response = await apiGroupScheduleExam.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("GroupScheduleExamUpdate");
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
          token: this.groupScheduleExam.groupScheduleExamToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiGroupScheduleExam.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.groupScheduleExam.groupScheduleExamImagePath = "";
          this.groupScheduleExam.groupScheduleExamImageIsDefault = true;
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
