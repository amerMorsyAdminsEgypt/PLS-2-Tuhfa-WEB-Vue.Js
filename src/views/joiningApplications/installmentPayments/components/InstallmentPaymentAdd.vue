<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="InstallmentPaymentAdd"
      size="xl"
      :headerText="$t('InstallmentPayments.add')"
      :headerIcon="installmentPayment.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <!-- @opened="handelOpen()" -->
      <InstallmentPaymentForm
        v-if="!isLoading"
        id="add"
        :installmentPayment="installmentPayment"
        v-on:submitForm="addInstallmentPayment()"
        bottomSheetName="InstallmentPaymentAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="InstallmentPaymentAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import InstallmentPaymentForm from "./InstallmentPaymentForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiInstallmentPayment from "./../../../../api/joiningApplications/installmentPayments";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    InstallmentPaymentForm,
  },
  props: ["installmentPayment"],
  methods: {
    // handelOpen() {
    //   // this.installmentPayment.setInitialValue();
    //   // console.log(this.installmentPayment);
    // },
    async addInstallmentPayment() {
      this.isLoading = true;
      let formData = objectToFormData(this.installmentPayment);
      try {
        const response = await apiInstallmentPayment.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-InstallmentPaymentAdd");
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
    response(data) {
      this.$emit("refresh");
      switch (data) {
        case "yes":
          this.installmentPayment.setInitialValue();
          break;
        case "leave":
          this.installmentPayment.setInitialValue();
          this.closeBottomSheet("InstallmentPaymentAdd");
          break;
      }
    },
  },
  async created() {},
};
</script>
