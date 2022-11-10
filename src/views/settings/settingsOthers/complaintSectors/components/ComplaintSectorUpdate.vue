<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ComplaintSectorUpdate"
      size="xl"
      :headerText="$t('ComplaintSectors.edit')"
      :headerIcon="complaintSector.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <ComplaintSectorForm
        v-if="!isLoading"
        id="update"
        :complaintSector="complaintSector"
        v-on:submitForm="updateComplaintSector()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="ComplaintSectorUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ComplaintSectorForm from "./ComplaintSectorForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiComplaintSector from "./../../../../../api/settings/settingsOthers/complaintSectors";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ComplaintSectorForm,
  },
  props: ["complaintSector"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateComplaintSector() {
      this.isLoading = true;
      let formData = objectToFormData(this.complaintSector);
      try {
        const response = await apiComplaintSector.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ComplaintSectorUpdate");
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
          token: this.complaintSector.complaintSectorToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiComplaintSector.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.complaintSector.complaintSectorImagePath = "";
          this.complaintSector.complaintSectorImageIsDefault = true;
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
