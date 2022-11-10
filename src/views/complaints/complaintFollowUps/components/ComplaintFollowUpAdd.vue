<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ComplaintFollowUpAdd"
      size="xl"
      :headerText="$t('ComplaintFollowUps.add')"
      :headerIcon="complaintFollowUp.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="
        complaintFollowUp.setInitialValue();
        setComplaintFollowUpData(complaint);
      "
    >
      <ComplaintFollowUpForm
        v-if="!isLoading"
        id="add"
        :complaintFollowUp="complaintFollowUp"
        v-on:submitForm="addComplaintFollowUp()"
        bottomSheetName="ComplaintFollowUpAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ComplaintFollowUpAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import ComplaintFollowUpForm from "./ComplaintFollowUpForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiComplaintFollowUp from "./../../../../api/complaintFollowUp/complaintFollowUps";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ComplaintFollowUpForm,
  },
  props: ["complaint", "complaintFollowUp"],

  methods: {
    setComplaintFollowUpData(complaint) {
      let complaintInfoData = {
        complaintToken: complaint.complaintToken,
        fullCode: complaint.fullCode,
        complaintTitleCurrent: complaint.complaintTitleCurrent,
        complaintDescriptionCurrent: complaint.complaintDescriptionCurrent,
        complaintNotes: complaint.complaintNotes,
        complaintStatusTypeToken: complaint.complaintStatusTypeToken,
        complaintStatusTypeNameCurrent:
          complaint.complaintStatusTypeNameCurrent,
        complaintMediaIsDefault: complaint.complaintMediaIsDefault,
        complaintMediaPath: complaint.complaintMediaPath,
        complaintMediaSizeBytes: complaint.complaintMediaSizeBytes,
        complaintMediaSizeTextCurrent: complaint.complaintMediaSizeTextCurrent,
      };
      let dataInt = {
        complaintToken: complaintInfoData.complaintToken,
        complaintTypeToken: complaint.complaintTypeToken,
        complaintSectorToken: complaint.complaintSectorToken,
        complaintInfoData: complaintInfoData,
        complaintTypeInfoData: complaint.complaintTypeInfoData,
        complaintSectorInfoData: complaint.complaintSectorInfoData,
      };

      this.$emit("setComplaintFollowUpData", dataInt);
    },
    async addComplaintFollowUp() {
      this.isLoading = true;
      let formData = objectToFormData(this.complaintFollowUp);
      try {
        const response = await apiComplaintFollowUp.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ComplaintFollowUpAdd");
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
      if (data) this.complaintFollowUp.setInitialValue();
    },
  },
  created() {
    console.log(this.complaint);
  },
};
</script>
