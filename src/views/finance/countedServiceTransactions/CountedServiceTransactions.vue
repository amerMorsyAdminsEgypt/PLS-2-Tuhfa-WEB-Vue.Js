<template>
  <div class="">
    <DashboardNavbar
      :btnAddTitle="$t('CountedServiceTransactions.add')"
      :btnAddName="'CountedServiceTransactionAdd'"
      :btnAddStatus="
        checkPrivilege(hasCountedServiceTransactionMakeAction()) &&
        currentTab != 'refunded'
      "
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <CountedServiceTransactionTabs
        :theFilterData="countedServiceTransactions.filterData"
        v-on:search="search($event)"
        v-on:currentTabUpdated="currentTab = $event"
      />

      <template v-if="hasData">
        <CountedServiceTransactionStatistics
          :statistics="
            countedServiceTransactions.countedServiceTransactionsStatistics
          "
        />
        <CountedServiceTransactionTable
          v-on:setCountedServiceTransactionData="
            countedServiceTransactions.countedServiceTransaction.fillData(
              $event
            )
          "
          :countedServiceTransactionsData="
            countedServiceTransactions.countedServiceTransactionsData
          "
          :defaultImg="
            countedServiceTransactions.countedServiceTransaction.defaultImg
          "
          :filterData="countedServiceTransactions.filterData"
          :currentTab="currentTab"
        />

        <ActionsData
          :actionsData="countedServiceTransactions.countedServiceTransaction"
        />
        <CountedServiceTransactionInfo
          :countedServiceTransaction="
            countedServiceTransactions.countedServiceTransaction
          "
        />

        <CustomBottomSheetQRCode
          :refName="'CountedServiceTransactionQRCode'"
          :code="countedServiceTransactions.countedServiceTransaction.fullCode"
          :codeTitle="$t('CountedServiceTransactions.code')"
          :name="
            countedServiceTransactions.countedServiceTransaction
              .countedServiceTransactionDescriptionCurrent
          "
          :nameTitle="$t('CountedServiceTransactions.name')"
          :nameIcon="'countedServiceTransactions.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="countedServiceTransactions.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <CountedServiceTransactionFilter
        :theFilterData="countedServiceTransactions.filterData"
        v-on:search="search($event)"
        v-on:isLoading="isLoading = $event"
      />

      <CountedServiceTransactionAdd
        :countedServiceTransaction="
          countedServiceTransactions.countedServiceTransaction
        "
        :currentTab="currentTab"
        v-on:refresh="getAllCountedServiceTransactions()"
      />

      <CountedServiceTransactionRefund
        :countedServiceTransaction="
          countedServiceTransactions.countedServiceTransaction
        "
        v-on:refresh="getAllCountedServiceTransactions()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS } from "./../../../utils/constants";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import CountedServiceTransactionStatistics from "./components/CountedServiceTransactionStatistics.vue";
import CountedServiceTransactionTabs from "./components/CountedServiceTransactionTabs.vue";
import CountedServiceTransactionAdd from "./components/CountedServiceTransactionAdd.vue";
import CountedServiceTransactionRefund from "./components/CountedServiceTransactionRefund.vue";
import CountedServiceTransactionTable from "./components/CountedServiceTransactionTable.vue";
import CountedServiceTransactionInfo from "./components/CountedServiceTransactionInfo.vue";
import CountedServiceTransactionFilter from "./components/CountedServiceTransactionFilter.vue";
import CountedServiceTransactions from "./../../../models/finance/countedServiceTransactions/CountedServiceTransactions";
import apiCountedServiceTransaction from "./../../../api/finance/countedServiceTransactions";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  COUNTED_SERVICE_TRANSACTION_TYPES,
  REFUND_TYPE_TOKENS,
} from "./../../../utils/constantLists";
import {
  hasCountedServiceTransactionMakeAction,
  hasCountedServiceTransactionViewBuy,
  hasCountedServiceTransactionViewSell,
  hasCountedServiceTransactionViewRefund,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    CountedServiceTransactionStatistics,
    CountedServiceTransactionTabs,
    CountedServiceTransactionAdd,
    CountedServiceTransactionRefund,
    CountedServiceTransactionTable,
    CountedServiceTransactionInfo,
    CountedServiceTransactionFilter,
  },
  computed: {
    hasData() {
      return (
        this.countedServiceTransactions.countedServiceTransactionsData.length !=
        0
      );
    },
  },
  data() {
    return {
      currentTab: "",
      countedServiceTransactions: new CountedServiceTransactions(),
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasCountedServiceTransactionMakeAction,

    changePagination(pagination) {
      this.countedServiceTransactions.filterData.fillData(pagination);
      this.getAllCountedServiceTransactions();
    },

    search(data) {
      this.countedServiceTransactions.filterData.fillData(data);
      this.getAllCountedServiceTransactions();
    },
    async getAllCountedServiceTransactions() {
      this.isLoading = true;
      try {
        this.countedServiceTransactions.countedServiceTransactionsData = [];

        this.countedServiceTransactions.filterData.countedServiceInfoDataInclude = true;
        this.countedServiceTransactions.filterData.accountInfoDataInclude = true;
        this.countedServiceTransactions.filterData.studentUserInfoDataInclude = true;
        this.countedServiceTransactions.filterData.paymentMethodInfoDataInclude = true;
        this.countedServiceTransactions.filterData.refundUserInfoDataInclude = true;
        this.countedServiceTransactions.filterData.refundPaymentMethodInfoDataInclude = true;

        const response = await apiCountedServiceTransaction.getAll(
          this.countedServiceTransactions.filterData
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
        this.countedServiceTransactions.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    //#region check which tab is current
    if (checkPrivilege(hasCountedServiceTransactionViewBuy())) {
      this.countedServiceTransactions.filterData.countedServiceTransactionTypeToken =
        COUNTED_SERVICE_TRANSACTION_TYPES.Buy;
      this.countedServiceTransactions.filterData.countedServiceTransactionRefundTypeToken =
        REFUND_TYPE_TOKENS.NotRefunded;
    } else if (checkPrivilege(hasCountedServiceTransactionViewSell())) {
      this.countedServiceTransactions.filterData.countedServiceTransactionTypeToken =
        COUNTED_SERVICE_TRANSACTION_TYPES.Sell;
      this.countedServiceTransactions.filterData.countedServiceTransactionRefundTypeToken =
        REFUND_TYPE_TOKENS.NotRefunded;
    } else if (checkPrivilege(hasCountedServiceTransactionViewRefund())) {
      this.countedServiceTransactions.filterData.countedServiceTransactionTypeToken =
        "";
      this.countedServiceTransactions.filterData.countedServiceTransactionRefundTypeToken =
        REFUND_TYPE_TOKENS.Refunded;
    }
    //#endregion check which tab is current
    await this.getAllCountedServiceTransactions();
  },
};
</script>
