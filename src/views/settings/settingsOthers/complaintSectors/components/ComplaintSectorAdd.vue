<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ComplaintSectorAdd"
      size="xl"
      :headerText="$t('ComplaintSectors.add')"
      :headerIcon="complaintSector.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="complaintSector.setInitialValue()"
    >
      <ComplaintSectorForm
        v-if="!isLoading"
        id="add"
        :complaintSector="complaintSector"
        v-on:submitForm="addComplaintSector()"
        bottomSheetName="ComplaintSectorAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ComplaintSectorAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import ComplaintSectorForm from "./ComplaintSectorForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiComplaintSector from "./../../../../../api/settings/settingsOthers/complaintSectors";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ComplaintSectorForm,
  },
  props: ["complaintSector"],
  methods: {
    async addComplaintSector() {
      this.isLoading = true;
      let formData = objectToFormData(this.complaintSector);
      try {
        const response = await apiComplaintSector.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ComplaintSectorAdd");
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
          this.complaintSector.setInitialValue();
          break;
        case "leave":
          this.complaintSector.setInitialValue();
          this.closeBottomSheet("ComplaintSectorAdd");
          break;
      }
    },
  },
};
</script>
