<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="InstallmentAdd"
      size="xl"
      :headerText="$t('Installments.add')"
      :headerIcon="installment.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="installment.setInitialValue()"
    >
      <InstallmentForm
        v-if="!isLoading"
        id="add"
        :installment="installment"
        v-on:submitForm="addInstallment()"
        bottomSheetName="InstallmentAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="InstallmentAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import InstallmentForm from "./InstallmentForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiInstallment from "./../../../../api/joiningApplications/installments";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    InstallmentForm,
  },
  props: ["installment"],
  methods: {
    async addInstallment() {
      this.isLoading = true;
      this.installment.installmentScheduleTimesData =
        this.installment.installmentScheduleTimesInfoData;

      let formData = objectToFormData(this.installment);
      try {
        const response = await apiInstallment.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-InstallmentAdd");
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
          this.installment.setInitialValue();
          break;
        case "leave":
          this.installment.setInitialValue();
          this.closeBottomSheet("InstallmentAdd");
          break;
      }
    },
  },
};
</script>
