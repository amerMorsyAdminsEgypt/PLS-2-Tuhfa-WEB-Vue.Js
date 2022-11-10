<template>
  <div class="">
    <DashboardNavbar
      :btnAddTitle="$t('QuotationPriceHistories.add')"
      :btnAddName="'QuotationPriceHistoryAdd'"
      :btnAddStatus="checkPrivilege(hasQuotationPriceHistoryAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <PriceQuotationDetailsData :priceQuotation="priceQuotation" />

        <QuotationPriceHistoryTable
          v-on:setQuotationPriceHistoryData="
            quotationPriceHistories.quotationPriceHistory.fillData($event)
          "
          :quotationPriceHistoriesData="
            quotationPriceHistories.quotationPriceHistoriesData
          "
          :filterData="quotationPriceHistories.filterData"
        />

        <QuotationPriceHistoryInfo
          :quotationPriceHistory="quotationPriceHistories.quotationPriceHistory"
        />
        <QuotationPriceHistoryDelete
          :quotationPriceHistory="quotationPriceHistories.quotationPriceHistory"
          v-on:refresh="getAllQuotationPriceHistories()"
        />

        <ActionsData
          :actionsData="quotationPriceHistories.quotationPriceHistory"
        />
        <CustomBottomSheetQRCode
          :refName="'QuotationPriceHistoryQRCode'"
          :code="quotationPriceHistories.quotationPriceHistory.fullCode"
          :codeTitle="$t('QuotationPriceHistories.code')"
          :name="
            quotationPriceHistories.quotationPriceHistory
              .totalItemsAmountWithCurrency
          "
          :nameTitle="$t('StoreItems.price.totalPrice')"
          :nameIcon="'money.svg'"
        />
      </template>

      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />

      <QuotationPriceHistoryAdd
        :priceQuotationDetailsToken="priceQuotationDetailsToken"
        :quotationPriceHistory="
          quotationPriceHistories.quotationPriceHistoryModel
        "
        v-on:refresh="getAllQuotationPriceHistories()"
      />
      <QuotationPriceHistoryUpdate
        :token="
          quotationPriceHistories.quotationPriceHistory
            .quotationPriceHistoryToken
        "
        v-on:refresh="getAllQuotationPriceHistories()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS } from "./../../../utils/constants";
import DashboardNavbar from "../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "../../../components/general/PreLoader.vue";
import ExceptionWithImg from "../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import PriceQuotationDetailsData from "./components/PriceQuotationDetailsData.vue";
import QuotationPriceHistoryTable from "./components/QuotationPriceHistoryTable.vue";
import QuotationPriceHistoryInfo from "./components/QuotationPriceHistoryInfo.vue";
import QuotationPriceHistoryDelete from "./components/QuotationPriceHistoryDelete.vue";
import QuotationPriceHistoryAdd from "./components/QuotationPriceHistoryAdd.vue";
import QuotationPriceHistoryUpdate from "./components/QuotationPriceHistoryUpdate.vue";
import PriceQuotationDetail from "./../../../models/products/priceQuotationDetails/PriceQuotationDetail";
import apiPriceQuotationDetails from "./../../../api/products/priceQuotationDetails";
import QuotationPriceHistories from "./../../../models/products/quotationPriceHistories/QuotationPriceHistories";
import apiQuotationPriceHistories from "./../../../api/products/quotationPriceHistories";
import { checkPrivilege } from "./../../../utils/functions";
import { hasQuotationPriceHistoryAdd } from "./../../../utils/privilegeHelper";
import generalMixin from "../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    PriceQuotationDetailsData,
    QuotationPriceHistoryTable,
    QuotationPriceHistoryInfo,
    QuotationPriceHistoryDelete,
    QuotationPriceHistoryAdd,
    QuotationPriceHistoryUpdate,
  },
  props: ["priceQuotationDetailsToken"],
  computed: {
    hasData() {
      return (
        this.quotationPriceHistories.quotationPriceHistoriesData.length != 0
      );
    },
  },
  data() {
    return {
      priceQuotation: new PriceQuotationDetail(),
      quotationPriceHistories: new QuotationPriceHistories(),
    };
  },
  methods: {
    async getDetails() {
      this.isLoading = true;
      try {
        let filter = { token: this.priceQuotationDetailsToken };
        this.priceQuotation.setInitialValue();
        const response = await apiPriceQuotationDetails.getDetails(filter);
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.priceQuotation.fillData(response.data.priceQuotation);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async getAllQuotationPriceHistories() {
      this.isLoading = true;
      try {
        this.quotationPriceHistories.quotationPriceHistoriesData = [];
        this.quotationPriceHistories.filterData.placeInfoDataInclude = true;
        this.quotationPriceHistories.filterData.priceQuotationDetailsInfoDataInclude = true;

        const response = await apiQuotationPriceHistories.getAll(
          this.quotationPriceHistories.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.quotationPriceHistories.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    checkPrivilege,
    hasQuotationPriceHistoryAdd,
  },
  async created() {
    await this.getDetails();
    this.quotationPriceHistories.filterData.priceQuotationDetailsToken =
      this.priceQuotationDetailsToken;
    await this.getAllQuotationPriceHistories();
  },
};
</script>
