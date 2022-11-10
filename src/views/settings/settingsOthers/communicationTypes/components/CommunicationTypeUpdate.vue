<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="CommunicationTypeUpdate"
      size="xl"
      :headerText="$t('CommunicationTypes.edit')"
      :headerIcon="communicationType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <CommunicationTypeForm
        v-if="!isLoading"
        id="update"
        :communicationType="communicationType"
        v-on:submitForm="updateCommunicationType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="CommunicationTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import CommunicationTypeForm from "./CommunicationTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiCommunicationType from "./../../../../../api/settings/settingsOthers/communicationTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    CommunicationTypeForm,
  },
  props: ["communicationType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateCommunicationType() {
      this.isLoading = true;
      let formData = objectToFormData(this.communicationType);
      try {
        const response = await apiCommunicationType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("CommunicationTypeUpdate");
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
          token: this.communicationType.communicationTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiCommunicationType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.communicationType.communicationTypeImagePath = "";
          this.communicationType.communicationTypeImageIsDefault = true;
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
