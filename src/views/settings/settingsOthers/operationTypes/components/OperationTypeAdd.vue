<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="OperationTypeAdd"
      size="xl"
      :headerText="$t('OperationTypes.add')"
      :headerIcon="operationType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="operationType.setInitialValue()"
    >
      <OperationTypeForm
        v-if="!isLoading"
        id="add"
        :operationType="operationType"
        v-on:submitForm="addOperationType()"
        bottomSheetName="OperationTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="OperationTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import OperationTypeForm from "./OperationTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiOperationType from "./../../../../../api/settings/settingsOthers/operationTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    OperationTypeForm,
  },
  props: ["operationType"],
  methods: {
    async addOperationType() {
      this.isLoading = true;
      let formData = objectToFormData(this.operationType);
      try {
        const response = await apiOperationType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-OperationTypeAdd");
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
          this.operationType.setInitialValue();
          break;
        case "leave":
          this.operationType.setInitialValue();
          this.closeBottomSheet("OperationTypeAdd");
          break;
      }
    },
  },
};
</script>
