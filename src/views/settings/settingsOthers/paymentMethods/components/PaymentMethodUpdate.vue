<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PaymentMethodUpdate"
      size="xl"
      :headerText="$t('PaymentMethods.edit')"
      :headerIcon="paymentMethod.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <PaymentMethodForm
        v-if="!isLoading"
        id="update"
        :paymentMethod="paymentMethod"
        v-on:submitForm="updatePaymentMethod()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="PaymentMethodUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import PaymentMethodForm from "./PaymentMethodForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiPaymentMethod from "./../../../../../api/settings/settingsOthers/paymentMethods";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    PaymentMethodForm,
  },
  props: ["paymentMethod"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updatePaymentMethod() {
      this.isLoading = true;
      let formData = objectToFormData(this.paymentMethod);
      try {
        const response = await apiPaymentMethod.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("PaymentMethodUpdate");
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
          token: this.paymentMethod.paymentMethodToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiPaymentMethod.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.paymentMethod.paymentMethodImagePath = "";
          this.paymentMethod.paymentMethodImageIsDefault = true;
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
