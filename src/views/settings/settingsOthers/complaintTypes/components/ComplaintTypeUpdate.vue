<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ComplaintTypeUpdate"
      size="xl"
      :headerText="$t('ComplaintTypes.edit')"
      :headerIcon="complaintType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <ComplaintTypeForm
        v-if="!isLoading"
        id="update"
        :complaintType="complaintType"
        v-on:submitForm="updateComplaintType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="ComplaintTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ComplaintTypeForm from "./ComplaintTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiComplaintType from "./../../../../../api/settings/settingsOthers/complaintTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ComplaintTypeForm,
  },
  props: ["complaintType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateComplaintType() {
      this.isLoading = true;
      let formData = objectToFormData(this.complaintType);
      try {
        const response = await apiComplaintType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ComplaintTypeUpdate");
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
          token: this.complaintType.complaintTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiComplaintType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.complaintType.complaintTypeImagePath = "";
          this.complaintType.complaintTypeImageIsDefault = true;
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
