<template>
  <div>
    <DashboardNavbar
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <PriceQuotationDetailTabs
        :theFilterData="priceQuotationDetails.filterData"
        :statistics="priceQuotationDetails.priceQuotationDetailsStatistics"
        v-on:search="search($event)"
        v-on:currentTabUpdated="currentTab = $event"
      />

      <template v-if="hasData">
        <PriceQuotationDetailTable
          v-on:setPriceQuotationDetailData="
            priceQuotationDetails.priceQuotationDetail.fillData($event)
          "
          :priceQuotationDetailsData="
            priceQuotationDetails.priceQuotationDetailsData
          "
          :defaultImg="priceQuotationDetails.priceQuotationDetail.defaultImg"
          :filterData="priceQuotationDetails.filterData"
          :hasPriceQuotationDetailMoveTo="hasPriceQuotationDetailMoveTo"
        />

        <!-- <ActionsData
          :actionsData="priceQuotationDetails.priceQuotationDetail"
        /> -->
        <PriceQuotationDetailInfo
          :token="
            priceQuotationDetails.priceQuotationDetail
              .priceQuotationDetailsToken
          "
        />
        <CustomBottomSheetQRCode
          :refName="'PriceQuotationDetailQRCode'"
          :code="priceQuotationDetails.priceQuotationDetail.fullCode"
          :codeTitle="$t('PriceQuotationDetails.code')"
          :name="
            priceQuotationDetails.priceQuotationDetail
              .quotationDetailsHistoryWorkTypeNameCurrent
          "
          :nameTitle="$t('general.type')"
          :nameIcon="'PriceQuotationDetails.svg'"
        />
        <PriceQuotationDetailMove
          :currentTab="currentTab"
          :priceQuotationDetail="priceQuotationDetails.priceQuotationDetail"
          :allawedMoveToTokens="allawedMoveToTokens"
          v-on:refresh="getAllPriceQuotationDetails()"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="priceQuotationDetails.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <PriceQuotationDetailFilter
        :theFilterData="priceQuotationDetails.filterData"
        v-on:search="search($event)"
      />
    </div>
  </div>
</template>

<script>
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
// import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import PriceQuotationDetailTabs from "./components/PriceQuotationDetailTabs.vue";
import PriceQuotationDetailMove from "./components/PriceQuotationDetailMove.vue";
import PriceQuotationDetailTable from "./components/PriceQuotationDetailTable.vue";
import PriceQuotationDetailInfo from "./components/PriceQuotationDetailInfo.vue";
import PriceQuotationDetailFilter from "./components/PriceQuotationDetailFilter.vue";
import PriceQuotationDetails from "./../../../models/products/priceQuotationDetails/PriceQuotationDetails";
import apiPriceQuotationDetail from "./../../../api/products/priceQuotationDetails";
import { STATUS } from "./../../../utils/constants";
import { QUOTATION_DETAILS_HISTORY_WORK_TYPES } from "./../../../utils/constantLists";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasPriceQuotationDetailNewlyWanted,
  hasPriceQuotationDetailWorkProgres,
  hasPriceQuotationDetailReviewedByCustomer,
  hasPriceQuotationDetailRejectedByCustomer,
  hasPriceQuotationDetailWaitingForQuotes,
  hasPriceQuotationDetailCanceledbyCustomer,
  hasPriceQuotationDetailMoveToNewlyWanted,
  hasPriceQuotationDetailMoveToWorkProgres,
  hasPriceQuotationDetailMoveToReviewedByCustomer,
  hasPriceQuotationDetailMoveToRejectedByCustomer,
  hasPriceQuotationDetailMoveToWaitingForQuotes,
  hasPriceQuotationDetailMoveToCanceledbyCustomer,
} from "./../../../utils/privilegeHelper";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    // ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    PriceQuotationDetailTabs,
    PriceQuotationDetailMove,
    PriceQuotationDetailTable,
    PriceQuotationDetailInfo,
    PriceQuotationDetailFilter,
  },
  computed: {
    hasData() {
      return this.priceQuotationDetails.priceQuotationDetailsData.length != 0;
    },
  },
  props: {},
  data() {
    return {
      currentTab: "",
      allawedMoveToTokens: [],
      hasPriceQuotationDetailMoveTo: false,
      priceQuotationDetails: new PriceQuotationDetails(),
    };
  },
  watch: {
    currentTab(val) {
      if (val) {
        this.setAllawedMoveToTokens();
        this.setHasPriceQuotationDetailMoveTo();
      }
    },
  },
  methods: {
    setAllawedMoveToTokens() {
      switch (this.currentTab) {
        case "NewlyWanted":
          this.allawedMoveToTokens = [
            QUOTATION_DETAILS_HISTORY_WORK_TYPES.WorkProgres,
            QUOTATION_DETAILS_HISTORY_WORK_TYPES.CanceledbyCustomer,
          ];
          break;
        case "WorkProgres":
          this.allawedMoveToTokens = [
            QUOTATION_DETAILS_HISTORY_WORK_TYPES.ReviewedByCustomer,
            QUOTATION_DETAILS_HISTORY_WORK_TYPES.NewlyWanted,
            QUOTATION_DETAILS_HISTORY_WORK_TYPES.CanceledbyCustomer,
          ];
          break;
        case "ReviewedByCustomer":
          this.allawedMoveToTokens = [
            QUOTATION_DETAILS_HISTORY_WORK_TYPES.RejectedByCustomer,
            QUOTATION_DETAILS_HISTORY_WORK_TYPES.WaitingForQuotes,
            QUOTATION_DETAILS_HISTORY_WORK_TYPES.CanceledbyCustomer,
          ];
          break;
        case "RejectedByCustomer":
          this.allawedMoveToTokens = [
            QUOTATION_DETAILS_HISTORY_WORK_TYPES.WorkProgres,
            QUOTATION_DETAILS_HISTORY_WORK_TYPES.CanceledbyCustomer,
          ];
          break;
        case "WaitingForQuotes":
          this.allawedMoveToTokens = [];
          break;
        case "CanceledbyCustomer":
          this.allawedMoveToTokens = [];
          break;

        default:
          break;
      }
    },
    setHasPriceQuotationDetailMoveTo() {
      switch (this.currentTab) {
        case "NewlyWanted":
          this.hasPriceQuotationDetailMoveTo = checkPrivilege(
            hasPriceQuotationDetailMoveToWorkProgres() ||
              hasPriceQuotationDetailMoveToCanceledbyCustomer()
          );

          break;
        case "WorkProgres":
          this.hasPriceQuotationDetailMoveTo = checkPrivilege(
            hasPriceQuotationDetailMoveToReviewedByCustomer() ||
              hasPriceQuotationDetailMoveToNewlyWanted() ||
              hasPriceQuotationDetailMoveToCanceledbyCustomer()
          );
          break;
        case "ReviewedByCustomer":
          this.hasPriceQuotationDetailMoveTo = checkPrivilege(
            hasPriceQuotationDetailMoveToRejectedByCustomer() ||
              hasPriceQuotationDetailMoveToWaitingForQuotes() ||
              hasPriceQuotationDetailMoveToCanceledbyCustomer()
          );
          break;
        case "RejectedByCustomer":
          this.hasPriceQuotationDetailMoveTo = checkPrivilege(
            hasPriceQuotationDetailMoveToWorkProgres() ||
              hasPriceQuotationDetailMoveToCanceledbyCustomer()
          );
          break;
        case "WaitingForQuotes":
          this.hasPriceQuotationDetailMoveTo = false;
          break;
        case "CanceledbyCustomer":
          this.hasPriceQuotationDetailMoveTo = false;
          break;

        default:
          break;
      }
    },
    changePagination(pagination) {
      this.priceQuotationDetails.filterData.fillData(pagination);
      this.getAllPriceQuotationDetails();
    },
    search(data) {
      this.priceQuotationDetails.filterData.fillData(data);
      this.getAllPriceQuotationDetails();
    },

    async getAllPriceQuotationDetails() {
      this.isLoading = true;
      this.priceQuotationDetails.filterData.priceQuotationInfoDataInclude = true;
      this.priceQuotationDetails.filterData.storeItemInfoDataInclude = true;

      try {
        this.priceQuotationDetails.priceQuotationDetailsData = [];
        const response = await apiPriceQuotationDetail.getAll(
          this.priceQuotationDetails.filterData
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
        this.priceQuotationDetails.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    //#region check which tab is current
    if (checkPrivilege(hasPriceQuotationDetailNewlyWanted())) {
      this.priceQuotationDetails.filterData.quotationDetailsHistoryWorkTypeToken =
        QUOTATION_DETAILS_HISTORY_WORK_TYPES.NewlyWanted;
    } else if (checkPrivilege(hasPriceQuotationDetailWorkProgres())) {
      this.priceQuotationDetails.filterData.quotationDetailsHistoryWorkTypeToken =
        QUOTATION_DETAILS_HISTORY_WORK_TYPES.WorkProgres;
    } else if (checkPrivilege(hasPriceQuotationDetailReviewedByCustomer())) {
      this.priceQuotationDetails.filterData.quotationDetailsHistoryWorkTypeToken =
        QUOTATION_DETAILS_HISTORY_WORK_TYPES.ReviewedByCustomer;
    } else if (checkPrivilege(hasPriceQuotationDetailRejectedByCustomer())) {
      this.priceQuotationDetails.filterData.quotationDetailsHistoryWorkTypeToken =
        QUOTATION_DETAILS_HISTORY_WORK_TYPES.RejectedByCustomer;
    } else if (checkPrivilege(hasPriceQuotationDetailWaitingForQuotes())) {
      this.priceQuotationDetails.filterData.quotationDetailsHistoryWorkTypeToken =
        QUOTATION_DETAILS_HISTORY_WORK_TYPES.WaitingForQuotes;
    } else if (checkPrivilege(hasPriceQuotationDetailCanceledbyCustomer())) {
      this.priceQuotationDetails.filterData.quotationDetailsHistoryWorkTypeToken =
        QUOTATION_DETAILS_HISTORY_WORK_TYPES.CanceledbyCustomer;
    } else {
      this.priceQuotationDetails.filterData.quotationDetailsHistoryWorkTypeToken =
        "";
    }
    //#endregion check which tab is current

    this.getAllPriceQuotationDetails();
  },
};
</script>
