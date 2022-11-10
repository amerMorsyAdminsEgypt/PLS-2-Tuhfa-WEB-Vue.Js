<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="GroupScheduleExamAdd"
      size="xl"
      :headerText="$t('GroupScheduleExams.add')"
      :headerIcon="groupScheduleExam.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="groupScheduleExam.setInitialValue()"
    >
      <GroupScheduleExamForm
        v-if="!isLoading"
        id="add"
        :groupScheduleExam="groupScheduleExam"
        v-on:submitForm="addGroupScheduleExam()"
        bottomSheetName="GroupScheduleExamAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="GroupScheduleExamAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import GroupScheduleExamForm from "./GroupScheduleExamForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiGroupScheduleExam from "./../../../../api/educational/groupScheduleExams";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    GroupScheduleExamForm,
  },
  props: ["groupScheduleExam"],
  methods: {
    async addGroupScheduleExam() {
      this.isLoading = true;
      let formData = objectToFormData(this.groupScheduleExam);
      try {
        const response = await apiGroupScheduleExam.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-GroupScheduleExamAdd");
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
          this.groupScheduleExam.setInitialValue();
          break;
        case "leave":
          this.groupScheduleExam.setInitialValue();
          this.closeBottomSheet("GroupScheduleExamAdd");
          break;
      }
    },
  },
};
</script>
