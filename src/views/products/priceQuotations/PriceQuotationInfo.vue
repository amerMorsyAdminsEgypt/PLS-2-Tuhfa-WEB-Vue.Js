<template>
  <div class="">
    <DashboardNavbar />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <template v-else>
        <PriceQuotationInfoData :priceQuotation="priceQuotation" />

        <PriceQuotationInfoTable
          v-on:setStoreItemData="priceQuotationDetail.fillData($event)"
          :priceQuotationDetails="priceQuotation.priceQuotationDetails"
          :defaultImg="priceQuotation.defaultImg"
        />

        <PriceQuotationInfoPropertyTypesInfo
          :priceQuotationDetail="priceQuotationDetail"
        />
      </template>

      <QuotationPriceHistoryAdd
        :priceQuotationDetailsToken="
          priceQuotationDetail.priceQuotationDetailsToken
        "
        :quotationPriceHistory="quotationPriceHistoryModel"
        v-on:refresh="getDetails()"
      />
    </div>
  </div>
</template>

<script>
import DashboardNavbar from "../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "../../../components/general/PreLoader.vue";
import ExceptionWithImg from "../../../components/general/ExceptionWithImg.vue";
import PriceQuotationInfoData from "./components/PriceQuotationInfoData.vue";
import PriceQuotationInfoTable from "./components/PriceQuotationInfoTable.vue";
import PriceQuotationInfoPropertyTypesInfo from "./components/PriceQuotationInfoPropertyTypesInfo.vue";
import QuotationPriceHistoryAdd from "./../quotationPriceHistories/components/QuotationPriceHistoryAdd.vue";
import PriceQuotationDetail from "./../../../models/products/priceQuotationDetails/PriceQuotationDetail";
import QuotationPriceHistoryModel from "./../../../models/products/quotationPriceHistories/QuotationPriceHistoryModel";
import generalMixin from "../../../utils/generalMixin";
import PriceQuotationMixin from "./components/PriceQuotationMixin";

export default {
  mixins: [generalMixin, PriceQuotationMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    PriceQuotationInfoData,
    PriceQuotationInfoTable,
    PriceQuotationInfoPropertyTypesInfo,
    QuotationPriceHistoryAdd,
  },
  data() {
    return {
      priceQuotationDetail: new PriceQuotationDetail(),
      quotationPriceHistoryModel: new QuotationPriceHistoryModel(),
    };
  },
  async created() {
    this.getDetails();
  },
};
</script>
