<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ComplaintAdd"
      size="xl"
      :headerText="$t('Complaints.add')"
      :headerIcon="complaint.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="complaint.setInitialValue()"
    >
      <ComplaintForm
        v-if="!isLoading"
        id="add"
        :complaint="complaint"
        v-on:submitForm="addComplaint()"
        bottomSheetName="ComplaintAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ComplaintAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import ComplaintForm from "./ComplaintForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiComplaint from "./../../../../api/complaint/complaints";
import generalMixin from "./../../../../utils/generalMixin";
// import mediaMixin from "./../../../../utils/mediaMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ComplaintForm,
  },
  props: ["complaint"],
  methods: {
    async addComplaint() {
      this.isLoading = true;
      let formData = objectToFormData(this.complaint);
      try {
        const response = await apiComplaint.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ComplaintAdd");
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
          this.complaint.setInitialValue();
          break;
        case "leave":
          this.complaint.setInitialValue();
          this.closeBottomSheet("ComplaintAdd");
          break;
      }
    },
  },
};
</script>
