<template>
  <div>
    <DashboardNavbar
      v-on:updateViewType="updateViewType('priceQuotationJobOrders', $event)"
      :viewType="generalSetting.priceQuotationJobOrders.viewType"
      :viewTypeStatus="true"
      :btnAddTitle="$t('PriceQuotationJobOrders.add')"
      :btnAddName="'PriceQuotationJobOrderAdd'"
      :btnAddStatus="checkPrivilege(hasPriceQuotationJobOrderAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <PriceQuotationJobOrderTabs
        :theFilterData="priceQuotationJobOrders.filterData"
        :statistics="priceQuotationJobOrders.priceQuotationJobOrderStatistics"
        v-on:search="search($event)"
        v-on:currentTabUpdated="currentTab = $event"
      />

      <template v-if="hasData">
        <PriceQuotationJobOrderTable
          v-if="
            generalSetting.priceQuotationJobOrders.viewType == VIEW_TYPES.table
          "
          v-on:setPriceQuotationJobOrderData="
            priceQuotationJobOrders.priceQuotationJobOrder.fillData($event)
          "
          :priceQuotationJobOrdersData="
            priceQuotationJobOrders.priceQuotationJobOrdersData
          "
          :defaultImg="
            priceQuotationJobOrders.priceQuotationJobOrder.defaultImg
          "
          :filterData="priceQuotationJobOrders.filterData"
          :hasPriceQuotationJobOrderMoveTo="hasPriceQuotationJobOrderMoveTo"
        />
        <PriceQuotationJobOrderCards
          v-if="
            generalSetting.priceQuotationJobOrders.viewType == VIEW_TYPES.cards
          "
          v-on:setPriceQuotationJobOrderData="
            priceQuotationJobOrders.priceQuotationJobOrder.fillData($event)
          "
          :priceQuotationJobOrdersData="
            priceQuotationJobOrders.priceQuotationJobOrdersData
          "
          :defaultImg="
            priceQuotationJobOrders.priceQuotationJobOrder.defaultImg
          "
          :filterData="priceQuotationJobOrders.filterData"
          :hasPriceQuotationJobOrderMoveTo="hasPriceQuotationJobOrderMoveTo"
        />

        <!-- <ActionsData
          :actionsData="priceQuotationJobOrders.priceQuotationJobOrder"
        /> -->
        <PriceQuotationJobOrderInfo
          :priceQuotationJobOrder="
            priceQuotationJobOrders.priceQuotationJobOrder
          "
        />
        <CustomBottomSheetQRCode
          :refName="'PriceQuotationJobOrderQRCode'"
          :code="priceQuotationJobOrders.priceQuotationJobOrder.fullCode"
          :codeTitle="$t('PriceQuotationJobOrders.code')"
          :name="
            priceQuotationJobOrders.priceQuotationJobOrder
              .priceQuotationJobOrderNameCurrent
          "
          :nameTitle="$t('general.name')"
          :nameIcon="'PriceQuotationJobOrders.svg'"
        />
        <PriceQuotationJobOrderMove
          :currentTab="currentTab"
          :priceQuotationJobOrder="
            priceQuotationJobOrders.priceQuotationJobOrder
          "
          :allawedMoveToTokens="allawedMoveToTokens"
          v-on:refresh="refresh()"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="priceQuotationJobOrders.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <PriceQuotationJobOrderFilter
        :theFilterData="priceQuotationJobOrders.filterData"
        v-on:search="search($event)"
      />

      <PriceQuotationJobOrderAdd
        :priceQuotationJobOrder="priceQuotationJobOrders.priceQuotationJobOrder"
        v-on:refresh="refresh()"
      />
      <PriceQuotationJobOrderUpdate
        :priceQuotationJobOrder="priceQuotationJobOrders.priceQuotationJobOrder"
        v-on:refresh="refresh()"
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
import PriceQuotationJobOrderTabs from "./components/PriceQuotationJobOrderTabs.vue";
import PriceQuotationJobOrderMove from "./components/PriceQuotationJobOrderMove.vue";
import PriceQuotationJobOrderTable from "./components/PriceQuotationJobOrderTable.vue";
import PriceQuotationJobOrderCards from "./components/PriceQuotationJobOrderCards.vue";
import PriceQuotationJobOrderInfo from "./components/PriceQuotationJobOrderInfo.vue";
import PriceQuotationJobOrderFilter from "./components/PriceQuotationJobOrderFilter.vue";
import PriceQuotationJobOrderAdd from "./components/PriceQuotationJobOrderAdd.vue";
import PriceQuotationJobOrderUpdate from "./components/PriceQuotationJobOrderUpdate.vue";
import PriceQuotationJobOrders from "./../../../models/products/priceQuotationJobOrders/PriceQuotationJobOrders";
import apiPriceQuotationJobOrder from "./../../../api/products/priceQuotationJobOrders";
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import { JOB_ORDER_HISTORY_WORK_TYPES } from "./../../../utils/constantLists";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasPriceQuotationJobOrderAdd,
  hasPriceQuotationJobOrderNewlyWanted,
  hasPriceQuotationJobOrderWorkProgres,
  hasPriceQuotationJobOrderFinishNotCustomerReceived,
  hasPriceQuotationJobOrderFinishCustomerReceived,
  hasPriceQuotationJobOrderCanceled,
  hasPriceQuotationJobOrderMoveToNewlyWanted,
  hasPriceQuotationJobOrderMoveToWorkProgres,
  hasPriceQuotationJobOrderMoveToFinishNotCustomerReceived,
  hasPriceQuotationJobOrderMoveToFinishCustomerReceived,
  hasPriceQuotationJobOrderMoveToCanceled,
} from "./../../../utils/privilegeHelper";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    // ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    PriceQuotationJobOrderTabs,
    PriceQuotationJobOrderMove,
    PriceQuotationJobOrderTable,
    PriceQuotationJobOrderCards,
    PriceQuotationJobOrderInfo,
    PriceQuotationJobOrderFilter,
    PriceQuotationJobOrderAdd,
    PriceQuotationJobOrderUpdate,
  },
  computed: {
    hasData() {
      return (
        this.priceQuotationJobOrders.priceQuotationJobOrdersData.length != 0
      );
    },
  },
  props: {},
  data() {
    return {
      currentTab: "",
      VIEW_TYPES,
      allawedMoveToTokens: [],
      hasPriceQuotationJobOrderMoveTo: false,
      priceQuotationJobOrders: new PriceQuotationJobOrders(),
    };
  },
  watch: {
    currentTab(val) {
      if (val) {
        this.setAllawedMoveToTokens();
        this.setHasPriceQuotationJobOrderMoveTo();
      }
    },
  },
  methods: {
    checkPrivilege,
    hasPriceQuotationJobOrderAdd,
    setAllawedMoveToTokens() {
      switch (this.currentTab) {
        case "NewlyWanted":
          this.allawedMoveToTokens = [
            JOB_ORDER_HISTORY_WORK_TYPES.WorkProgres,
            JOB_ORDER_HISTORY_WORK_TYPES.Canceled,
          ];
          break;
        case "WorkProgres":
          this.allawedMoveToTokens = [
            JOB_ORDER_HISTORY_WORK_TYPES.NewlyWanted,
            JOB_ORDER_HISTORY_WORK_TYPES.FinishNotCustomerReceived,
            JOB_ORDER_HISTORY_WORK_TYPES.FinishCustomerReceived,
            JOB_ORDER_HISTORY_WORK_TYPES.Canceled,
          ];
          break;
        case "FinishNotCustomerReceived":
          this.allawedMoveToTokens = [
            JOB_ORDER_HISTORY_WORK_TYPES.FinishCustomerReceived,
            JOB_ORDER_HISTORY_WORK_TYPES.Canceled,
          ];
          break;
        case "FinishCustomerReceived":
          this.allawedMoveToTokens = [];
          break;
        case "Canceled":
          this.allawedMoveToTokens = [];

          break;

        default:
          break;
      }
    },
    setHasPriceQuotationJobOrderMoveTo() {
      switch (this.currentTab) {
        case "NewlyWanted":
          this.hasPriceQuotationJobOrderMoveTo = checkPrivilege(
            hasPriceQuotationJobOrderMoveToWorkProgres() ||
              hasPriceQuotationJobOrderMoveToCanceled()
          );

          break;
        case "WorkProgres":
          this.hasPriceQuotationJobOrderMoveTo = checkPrivilege(
            hasPriceQuotationJobOrderMoveToNewlyWanted() ||
              hasPriceQuotationJobOrderMoveToFinishNotCustomerReceived() ||
              hasPriceQuotationJobOrderMoveToFinishCustomerReceived() ||
              hasPriceQuotationJobOrderMoveToCanceled()
          );
          break;
        case "FinishNotCustomerReceived":
          this.hasPriceQuotationJobOrderMoveTo = checkPrivilege(
            hasPriceQuotationJobOrderMoveToFinishCustomerReceived() ||
              hasPriceQuotationJobOrderMoveToCanceled()
          );
          break;
        case "FinishCustomerReceived":
          this.hasPriceQuotationJobOrderMoveTo = false;
          break;
        case "Canceled":
          this.hasPriceQuotationJobOrderMoveTo = false;

          break;

        default:
          break;
      }
    },
    changePagination(pagination) {
      this.priceQuotationJobOrders.filterData.fillData(pagination);
      this.getAllPriceQuotationJobOrders();
    },
    search(data) {
      this.priceQuotationJobOrders.filterData.fillData(data);
      this.getAllPriceQuotationJobOrders();
    },
    async refresh() {
      await this.setFilter();
      await this.getAllPriceQuotationJobOrders();
    },
    setFilter() {
      //#region check which tab is current
      if (checkPrivilege(hasPriceQuotationJobOrderNewlyWanted())) {
        this.priceQuotationJobOrders.filterData.jobOrderHistoryWorkTypeToken =
          JOB_ORDER_HISTORY_WORK_TYPES.NewlyWanted;
        this.priceQuotationJobOrders.priceQuotationJobOrder.jobOrderHistoryWorkTypeToken =
          JOB_ORDER_HISTORY_WORK_TYPES.NewlyWanted;
      } else if (checkPrivilege(hasPriceQuotationJobOrderWorkProgres())) {
        this.priceQuotationJobOrders.filterData.jobOrderHistoryWorkTypeToken =
          JOB_ORDER_HISTORY_WORK_TYPES.WorkProgres;
        this.priceQuotationJobOrders.priceQuotationJobOrder.jobOrderHistoryWorkTypeToken =
          JOB_ORDER_HISTORY_WORK_TYPES.WorkProgres;
      } else if (
        checkPrivilege(hasPriceQuotationJobOrderFinishNotCustomerReceived())
      ) {
        this.priceQuotationJobOrders.filterData.jobOrderHistoryWorkTypeToken =
          JOB_ORDER_HISTORY_WORK_TYPES.FinishNotCustomerReceived;
        this.priceQuotationJobOrders.priceQuotationJobOrder.jobOrderHistoryWorkTypeToken =
          JOB_ORDER_HISTORY_WORK_TYPES.FinishNotCustomerReceived;
      } else if (
        checkPrivilege(hasPriceQuotationJobOrderFinishCustomerReceived())
      ) {
        this.priceQuotationJobOrders.filterData.jobOrderHistoryWorkTypeToken =
          JOB_ORDER_HISTORY_WORK_TYPES.FinishCustomerReceived;
        this.priceQuotationJobOrders.priceQuotationJobOrder.jobOrderHistoryWorkTypeToken =
          JOB_ORDER_HISTORY_WORK_TYPES.FinishCustomerReceived;
      } else if (checkPrivilege(hasPriceQuotationJobOrderCanceled())) {
        this.priceQuotationJobOrders.filterData.jobOrderHistoryWorkTypeToken =
          JOB_ORDER_HISTORY_WORK_TYPES.Canceled;
        this.priceQuotationJobOrders.priceQuotationJobOrder.jobOrderHistoryWorkTypeToken =
          JOB_ORDER_HISTORY_WORK_TYPES.Canceled;
      } else {
        this.priceQuotationJobOrders.filterData.jobOrderHistoryWorkTypeToken =
          "";
        this.priceQuotationJobOrders.priceQuotationJobOrder.jobOrderHistoryWorkTypeToken =
          "";
      }
      //#endregion check which tab is current
    },

    async getAllPriceQuotationJobOrders() {
      this.isLoading = true;
      this.priceQuotationJobOrders.filterData.priceQuotationInfoDataInclude = true;

      try {
        this.priceQuotationJobOrders.priceQuotationJobOrdersData = [];
        const response = await apiPriceQuotationJobOrder.getAll(
          this.priceQuotationJobOrders.filterData
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
        this.priceQuotationJobOrders.fillData(response.data);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    await this.setFilter();
    await this.getAllPriceQuotationJobOrders();
  },
};
</script>
