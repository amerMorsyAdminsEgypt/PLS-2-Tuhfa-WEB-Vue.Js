<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="InstallmentBatchTypeAdd"
      size="xl"
      :headerText="$t('InstallmentBatchTypes.add')"
      :headerIcon="installmentBatchType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="installmentBatchType.setInitialValue()"
    >
      <InstallmentBatchTypeForm
        v-if="!isLoading"
        id="add"
        :installmentBatchType="installmentBatchType"
        v-on:submitForm="addInstallmentBatchType()"
        bottomSheetName="InstallmentBatchTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="InstallmentBatchTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import InstallmentBatchTypeForm from "./InstallmentBatchTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiInstallmentBatchType from "./../../../../../api/settings/settingsOthers/installmentBatchTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    InstallmentBatchTypeForm,
  },
  props: ["installmentBatchType"],
  methods: {
    async addInstallmentBatchType() {
      this.isLoading = true;
      let formData = objectToFormData(this.installmentBatchType);
      try {
        const response = await apiInstallmentBatchType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-InstallmentBatchTypeAdd");
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
          this.installmentBatchType.setInitialValue();
          break;
        case "leave":
          this.installmentBatchType.setInitialValue();
          this.closeBottomSheet("InstallmentBatchTypeAdd");
          break;
      }
    },
  },
};
</script>
