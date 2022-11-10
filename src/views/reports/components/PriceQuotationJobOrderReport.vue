<template>
  <CustomBottomSheet
    :refName="'PriceQuotationJobOrderReport'"
    size="xl"
    :headerText="$t('Reports.PriceQuotationJobOrdersReport')"
    :headerIcon="priceQuotationJobOrders.priceQuotationJobOrder.icon"
  >
    <div class="row">
      <CustomInput
        :className="'col-md-12'"
        :id="`PriceQuotationJobOrders-report-sendTo`"
        :value="priceQuotationJobOrders.filterData.sendTo"
        v-on:changeValue="priceQuotationJobOrders.filterData.sendTo = $event"
        :title="$t('Reports.sendTo')"
        :imgName="'email.svg'"
      />
    </div>

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="getReport">
        <img
          src="@/assets/images/check-icon.svg"
          :title="$t('Reports.print')"
        />
      </div>

      <div
        @click.prevent="closeBottomSheet('PriceQuotationJobOrderReport')"
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import { STATUS } from "./../../../utils/constants";
import { viewFileFromServer } from "./../../../utils/functions";
import PriceQuotationJobOrders from "./../../../models/products/priceQuotationJobOrders/PriceQuotationJobOrders";
import apiPriceQuotationJobOrder from "./../../../api/products/priceQuotationJobOrders";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  data() {
    return {
      priceQuotationJobOrders: new PriceQuotationJobOrders(),
    };
  },
  components: {
    CustomBottomSheet,
    CustomInput,
  },
  methods: {
    async getReport() {
      this.$emit("isLoading", true);
      try {
        const response = await apiPriceQuotationJobOrder.getReport(
          this.priceQuotationJobOrders.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("PriceQuotationJobOrderReport");
          viewFileFromServer(response.data.reportPath);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.$emit("isLoading", false);
    },
  },
};
</script>
