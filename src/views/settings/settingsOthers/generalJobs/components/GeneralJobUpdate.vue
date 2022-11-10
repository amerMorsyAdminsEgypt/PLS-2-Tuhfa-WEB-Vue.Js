<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="GeneralJobUpdate"
      size="xl"
      :headerText="$t('GeneralJobs.edit')"
      :headerIcon="generalJob.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <GeneralJobForm
        v-if="!isLoading"
        id="update"
        :generalJob="generalJob"
        v-on:submitForm="updateGeneralJob()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="GeneralJobUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import GeneralJobForm from "./GeneralJobForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiGeneralJob from "./../../../../../api/settings/settingsOthers/generalJobs";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    GeneralJobForm,
  },
  props: ["generalJob"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateGeneralJob() {
      this.isLoading = true;
      let formData = objectToFormData(this.generalJob);
      try {
        const response = await apiGeneralJob.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("GeneralJobUpdate");
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
          token: this.generalJob.generalJobToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiGeneralJob.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.generalJob.generalJobImagePath = "";
          this.generalJob.generalJobImageIsDefault = true;
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
