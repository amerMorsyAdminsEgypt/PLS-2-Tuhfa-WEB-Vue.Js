<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PaymentMethodAdd"
      size="xl"
      :headerText="$t('PaymentMethods.add')"
      :headerIcon="paymentMethod.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="paymentMethod.setInitialValue()"
    >
      <PaymentMethodForm
        v-if="!isLoading"
        id="add"
        :paymentMethod="paymentMethod"
        v-on:submitForm="addPaymentMethod()"
        bottomSheetName="PaymentMethodAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="PaymentMethodAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import PaymentMethodForm from "./PaymentMethodForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiPaymentMethod from "./../../../../../api/settings/settingsOthers/paymentMethods";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    PaymentMethodForm,
  },
  props: ["paymentMethod"],
  methods: {
    async addPaymentMethod() {
      this.isLoading = true;
      let formData = objectToFormData(this.paymentMethod);
      try {
        const response = await apiPaymentMethod.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-PaymentMethodAdd");
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
          this.paymentMethod.setInitialValue();
          break;
        case "leave":
          this.paymentMethod.setInitialValue();
          this.closeBottomSheet("PaymentMethodAdd");
          break;
      }
    },
  },
};
</script>
