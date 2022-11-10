<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ComplaintTypeAdd"
      size="xl"
      :headerText="$t('ComplaintTypes.add')"
      :headerIcon="complaintType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="complaintType.setInitialValue()"
    >
      <ComplaintTypeForm
        v-if="!isLoading"
        id="add"
        :complaintType="complaintType"
        v-on:submitForm="addComplaintType()"
        bottomSheetName="ComplaintTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ComplaintTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import ComplaintTypeForm from "./ComplaintTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiComplaintType from "./../../../../../api/settings/settingsOthers/complaintTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ComplaintTypeForm,
  },
  props: ["complaintType"],
  methods: {
    async addComplaintType() {
      this.isLoading = true;
      let formData = objectToFormData(this.complaintType);
      try {
        const response = await apiComplaintType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ComplaintTypeAdd");
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
          this.complaintType.setInitialValue();
          break;
        case "leave":
          this.complaintType.setInitialValue();
          this.closeBottomSheet("ComplaintTypeAdd");
          break;
      }
    },
  },
};
</script>
