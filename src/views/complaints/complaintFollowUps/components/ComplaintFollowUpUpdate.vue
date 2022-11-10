<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ComplaintFollowUpUpdate"
      size="xl"
      :headerText="$t('ComplaintFollowUps.edit')"
      :headerIcon="complaintFollowUp.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <ComplaintFollowUpForm
        v-if="!isLoading"
        id="update"
        :complaintFollowUp="complaintFollowUp"
        v-on:submitForm="updateComplaintFollowUp()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="ComplaintFollowUpUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ComplaintFollowUpForm from "./ComplaintFollowUpForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiComplaintFollowUp from "./../../../../api/complaintFollowUp/complaintFollowUps";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ComplaintFollowUpForm,
  },
  props: ["complaintFollowUp"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateComplaintFollowUp() {
      this.isLoading = true;
      let formData = objectToFormData(this.complaintFollowUp);
      try {
        const response = await apiComplaintFollowUp.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ComplaintFollowUpUpdate");
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
          token: this.complaintFollowUp.complaintFollowUpToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiComplaintFollowUp.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.complaintFollowUp.complaintFollowUpMediaPath = "";
          this.complaintFollowUp.complaintFollowUpImageIsDefault = true;
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
