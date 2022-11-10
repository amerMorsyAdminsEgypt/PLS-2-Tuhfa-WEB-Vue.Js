<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="RevenueRefund"
      size="xl"
      :headerText="$t('Revenues.refund')"
      :headerIcon="revenue.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <RevenueFormRefund
        v-if="!isLoading"
        id="refund"
        :revenue="revenue"
        v-on:submitForm="refundRevenue()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="RevenueRefund"
        :submitName="$t('refund')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import RevenueFormRefund from "./RevenueFormRefund.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import Revenue from "./../../../../models/finance/revenues/Revenue";
import apiRevenue from "./../../../../api/finance/revenues";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    RevenueFormRefund,
  },
  props: ["revenue"],
  data() {
    return {
      model: new Revenue(),
    };
  },
  methods: {
    async refundRevenue() {
      this.isLoading = true;
      this.revenue.token = this.revenue.revenuesToken;

      let formData = objectToFormData(this.revenue);

      try {
        const response = await apiRevenue.refund(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("RevenueRefund");
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
          token: this.revenue.revenueToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiRevenue.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.revenue.revenueImagePath = "";
          this.revenue.revenueImageIsDefault = true;
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
