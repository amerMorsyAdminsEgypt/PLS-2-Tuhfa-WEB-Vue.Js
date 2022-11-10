<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="OperationTypeUpdate"
      size="xl"
      :headerText="$t('OperationTypes.edit')"
      :headerIcon="operationType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <OperationTypeForm
        v-if="!isLoading"
        id="update"
        :operationType="operationType"
        v-on:submitForm="updateOperationType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="OperationTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import OperationTypeForm from "./OperationTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiOperationType from "./../../../../../api/settings/settingsOthers/operationTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    OperationTypeForm,
  },
  props: ["operationType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateOperationType() {
      this.isLoading = true;
      let formData = objectToFormData(this.operationType);
      try {
        const response = await apiOperationType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("OperationTypeUpdate");
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
          token: this.operationType.operationTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiOperationType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.operationType.operationTypeImagePath = "";
          this.operationType.operationTypeImageIsDefault = true;
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
