<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="InstallmentPaymentRefund"
      size="xl"
      :headerText="$t('InstallmentPayments.refund')"
      :headerIcon="installmentPayment.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <InstallmentPaymentForm
        v-if="!isLoading"
        id="refund"
        :installmentPayment="installmentPayment"
        v-on:submitForm="RefundInstallmentPayment()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="InstallmentPaymentRefund"
        :submitName="$t('refund')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import InstallmentPaymentForm from "./InstallmentPaymentForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiInstallmentPayment from "./../../../../api/joiningApplications/installmentPayments";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    InstallmentPaymentForm,
  },
  props: ["installmentPayment"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async RefundInstallmentPayment() {
      this.isLoading = true;
      this.installmentPayment.token =
        this.installmentPayment.installmentPaymentToken;
      let formData = objectToFormData(this.installmentPayment);
      try {
        const response = await apiInstallmentPayment.refund(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("InstallmentPaymentRefund");
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
          token: this.installmentPayment.installmentPaymentToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiInstallmentPayment.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.installmentPayment.installmentPaymentImagePath = "";
          this.installmentPayment.installmentPaymentImageIsDefault = true;
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
