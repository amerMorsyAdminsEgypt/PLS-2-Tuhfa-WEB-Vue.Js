<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ServiceEntitlementRefund"
      size="xl"
      :headerText="$t('ServiceEntitlements.refund')"
      :headerIcon="refundImg"
      :clickToClose="false"
      :swipeAble="false"
    >
      <ServiceEntitlementForm
        v-if="!isLoading"
        id="refund"
        :serviceEntitlement="serviceEntitlement"
        v-on:submitForm="refundServiceEntitlement()"
        bottomSheetName="ServiceEntitlementRefund"
        :submitName="$t('refund')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ServiceEntitlementForm from "./ServiceEntitlementForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiServiceEntitlement from "./../../../../api/joiningApplications/serviceEntitlements";
import generalMixin from "./../../../../utils/generalMixin";
import refundImg from "@/assets/images/refund.svg";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ServiceEntitlementForm,
  },
  props: ["serviceEntitlement"],
  data() {
    return {
      model: new GeneralDelete(),
      refundImg,
    };
  },
  methods: {
    async refundServiceEntitlement() {
      this.isLoading = true;
      this.serviceEntitlement.token =
        this.serviceEntitlement.serviceEntitlementToken;
      let formData = objectToFormData(this.serviceEntitlement);
      try {
        const response = await apiServiceEntitlement.refund(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ServiceEntitlementRefund");
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
  },
};
</script>
