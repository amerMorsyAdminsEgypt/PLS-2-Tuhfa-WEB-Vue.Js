<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('accountTransactions', $event)"
      :viewType="generalSetting.accountTransactions.viewType"
      :viewTypeStatus="true"
      :btnAddTitle="$t('AccountTransactions.add')"
      :btnAddName="'AccountTransactionAdd'"
      :btnAddStatus="checkPrivilege(hasAccountTransactionAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <AccountTabs />

      <template v-if="hasData">
        <div v-if="filterAccountTransactionStatistics" class="statistics">
          <b-button v-b-toggle.statistics class="btn btn-lg btn-collapse">
            {{ $t("AccountTransactions.statistics.modelName") }}
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </b-button>
          <b-collapse id="statistics">
            <div class="row">
              <div
                v-for="(statistic, index) in filterAccountTransactionStatistics"
                :key="index"
                class="col-md-4"
              >
                <StatisticsCard
                  :title="statistic.title"
                  :totalNumber="statistic.value"
                  :icon="statistic.icon"
                />
              </div>
            </div>
          </b-collapse>
        </div>
        <AccountTransactionTable
          v-if="generalSetting.accountTransactions.viewType == VIEW_TYPES.table"
          v-on:setAccountTransactionData="
            accountTransactions.accountTransaction.fillData($event);
            accountTransactions.filterData.token =
              $event.accountTransactionToken;
          "
          :accountTransactionsData="accountTransactions.accountTransactionsData"
          :defaultImg="accountTransactions.accountTransaction.defaultImg"
          :filterData="accountTransactions.filterData"
        />

        <AccountTransactionCards
          v-else-if="
            generalSetting.accountTransactions.viewType == VIEW_TYPES.cards
          "
          v-on:setAccountTransactionData="
            accountTransactions.accountTransaction.fillData($event);
            accountTransactions.filterData.token =
              $event.accountTransactionToken;
          "
          :accountTransactionsData="accountTransactions.accountTransactionsData"
          :defaultImg="accountTransactions.accountTransaction.defaultImg"
          :filterData="accountTransactions.filterData"
        />
        <AccountTransactionReportFilter
          :filterReport="accountTransactions.filterData"
          :isGeneral="false"
          v-on:isLoading="isLoading = $event"
        />

        <ActionsData :actionsData="accountTransactions.accountTransaction" />
        <AccountTransactionInfo
          :accountTransaction="accountTransactions.accountTransaction"
        />

        <CustomBottomSheetQRCode
          :refName="'AccountTransactionQRCode'"
          :code="accountTransactions.accountTransaction.fullCode"
          :codeTitle="$t('AccountTransactions.code')"
          :name="
            accountTransactions.accountTransaction.accountTransactionNameCurrent
          "
          :nameTitle="$t('AccountTransactions.name')"
          :nameIcon="'accountTransactions.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="accountTransactions.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <AccountTransactionFilter
        :theFilterData="accountTransactions.filterData"
        v-on:search="search($event)"
        v-on:isLoading="isLoading = $event"
      />

      <AccountTransactionAdd
        :accountTransaction="accountTransactions.accountTransaction"
        v-on:refresh="getAllAccountTransactions()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import StatisticsCard from "./../../../components/general/StatisticsCard.vue";
import AccountTransactionAdd from "./components/AccountTransactionAdd.vue";
import AccountTransactionCards from "./components/AccountTransactionCards.vue";
import AccountTransactionTable from "./components/AccountTransactionTable.vue";
import AccountTransactionInfo from "./components/AccountTransactionInfo.vue";
import AccountTransactionFilter from "./components/AccountTransactionFilter.vue";
import AccountTabs from "./../accounts/components/AccountTabs.vue";
import AccountTransactions from "./../../../models/finance/accountTransactions/AccountTransactions";
import apiAccountTransaction from "./../../../api/finance/accountTransactions";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import AccountTransactionReportFilter from "./../../../views/reports/components/AccountTransactionReportFilter.vue";
import { hasAccountTransactionAdd } from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    StatisticsCard,
    AccountTransactionAdd,
    AccountTransactionCards,
    AccountTransactionTable,
    AccountTransactionInfo,
    AccountTransactionFilter,
    AccountTabs,
    AccountTransactionReportFilter,
  },
  computed: {
    hasData() {
      return this.accountTransactions.accountTransactionsData.length != 0;
    },
  },
  data() {
    return {
      accountTransactions: new AccountTransactions(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      filterAccountTransactionStatistics: [],
    };
  },
  methods: {
    checkPrivilege,
    hasAccountTransactionAdd,

    setFilteredStatistics() {
      let statistic = this.accountTransactions.accountTransactionsStatistics;

      this.filterAccountTransactionStatistics = [
        {
          title: this.$t("AccountTransactions.statistics.totalDepositeMoney"),
          value: statistic.totalDepositeMoneyWithCurrency,
          icon: "money.svg",
        },
        {
          title: this.$t("AccountTransactions.statistics.totalDropDownMoney"),
          value: statistic.totalDropDownMoneyWithCurrency,
          icon: "money.svg",
        },
        {
          title: this.$t(
            "AccountTransactions.statistics.totalPaidExpensesMoney"
          ),
          value: statistic.totalPaidExpensesMoneyWithCurrency,
          icon: "money.svg",
        },
        {
          title: this.$t(
            "AccountTransactions.statistics.totalRefundedExpensesMoney"
          ),
          value: statistic.totalRefundedExpensesMoneyWithCurrency,
          icon: "money.svg",
        },
        {
          title: this.$t(
            "AccountTransactions.statistics.totalAccrualRevenuesMoney"
          ),
          value: statistic.totalAccrualRevenuesMoneyWithCurrency,
          icon: "money.svg",
        },
        {
          title: this.$t(
            "AccountTransactions.statistics.totalRefundedRevenuesMoney"
          ),
          value: statistic.totalRefundedRevenuesMoneyWithCurrency,
          icon: "money.svg",
        },
      ];
    },
    changePagination(pagination) {
      this.accountTransactions.filterData.fillData(pagination);
      this.getAllAccountTransactions();
    },

    search(data) {
      this.accountTransactions.filterData.fillData(data);
      this.getAllAccountTransactions();
    },
    async getAllAccountTransactions() {
      this.isLoading = true;
      try {
        this.accountTransactions.accountTransactionsData = [];
        const response = await apiAccountTransaction.getAll(
          this.accountTransactions.filterData
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
        this.accountTransactions.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    await this.getAllAccountTransactions();
    await this.setFilteredStatistics();
  },
};
</script>
