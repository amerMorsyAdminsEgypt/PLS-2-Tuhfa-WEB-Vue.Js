<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="InstallmentBatchTypeUpdate"
      size="xl"
      :headerText="$t('InstallmentBatchTypes.edit')"
      :headerIcon="installmentBatchType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <InstallmentBatchTypeForm
        v-if="!isLoading"
        id="update"
        :installmentBatchType="installmentBatchType"
        v-on:submitForm="updateInstallmentBatchType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="InstallmentBatchTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import InstallmentBatchTypeForm from "./InstallmentBatchTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiInstallmentBatchType from "./../../../../../api/settings/settingsOthers/installmentBatchTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    InstallmentBatchTypeForm,
  },
  props: ["installmentBatchType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateInstallmentBatchType() {
      this.isLoading = true;
      let formData = objectToFormData(this.installmentBatchType);
      try {
        const response = await apiInstallmentBatchType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("InstallmentBatchTypeUpdate");
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
          token: this.installmentBatchType.installmentBatchTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiInstallmentBatchType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.installmentBatchType.installmentBatchTypeImagePath = "";
          this.installmentBatchType.installmentBatchTypeImageIsDefault = true;
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
