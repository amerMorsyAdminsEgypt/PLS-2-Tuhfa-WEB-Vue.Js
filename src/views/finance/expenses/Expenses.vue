<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('expenses', $event)"
      :viewType="generalSetting.expenses.viewType"
      :viewTypeStatus="true"
      :btnAddTitle="$t('Expenses.pay')"
      :btnAddName="'ExpensePay'"
      :btnAddStatus="checkPrivilege(hasExpensePay())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <ExpenseTabs />

      <template v-if="hasData">
        <div v-if="filterExpenseStatistics" class="statistics">
          <b-button v-b-toggle.statistics class="btn btn-lg btn-collapse">
            {{ $t("Expenses.statistics.modelName") }}
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </b-button>
          <b-collapse id="statistics">
            <div class="row">
              <div
                v-for="(statistic, index) in filterExpenseStatistics"
                :key="index"
                class="col-md-3"
              >
                <StatisticsCard
                  :title="statistic.title"
                  :totalNumber="statistic.value"
                  :icon="statistic.icon"
                  :showPercentage="statistic.showPercentage"
                  :percentage="statistic.percentage"
                />
              </div>
            </div>
          </b-collapse>
        </div>
        <ExpenseTable
          v-if="generalSetting.expenses.viewType == VIEW_TYPES.table"
          v-on:setExpenseData="expenses.expense.fillData($event)"
          :expensesData="expenses.expensesData"
          :defaultImg="expenses.expense.defaultImg"
          :filterData="expenses.filterData"
        />

        <ExpenseCards
          v-else-if="generalSetting.expenses.viewType == VIEW_TYPES.cards"
          v-on:setExpenseData="expenses.expense.fillData($event)"
          :expensesData="expenses.expensesData"
          :defaultImg="expenses.expense.defaultImg"
          :filterData="expenses.filterData"
        />

        <ActionsData :actionsData="expenses.expense" />
        <ExpenseInfo :expense="expenses.expense" />

        <CustomBottomSheetQRCode
          :refName="'ExpenseQRCode'"
          :code="expenses.expense.fullCode"
          :codeTitle="$t('Expenses.code')"
          :name="expenses.expense.expenseNameCurrent"
          :nameTitle="$t('Expenses.name')"
          :nameIcon="'expenses.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="expenses.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ExpenseFilter
        :theFilterData="expenses.filterData"
        v-on:search="search($event)"
      />

      <ExpensePay :expense="expenses.expense" v-on:refresh="getAllExpenses()" />
      <ExpenseRefund
        :expense="expenses.expense"
        v-on:refresh="getAllExpenses()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import StatisticsCard from "./../../../components/general/StatisticsCard.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import ExpensePay from "./components/ExpensePay.vue";
import ExpenseRefund from "./components/ExpenseRefund.vue";
import ExpenseCards from "./components/ExpenseCards.vue";
import ExpenseTable from "./components/ExpenseTable.vue";
import ExpenseTabs from "./components/ExpenseTabs.vue";
import ExpenseInfo from "./components/ExpenseInfo.vue";
import ExpenseFilter from "./components/ExpenseFilter.vue";
import Expenses from "./../../../models/finance/expenses/Expenses";
import apiExpense from "./../../../api/finance/expenses";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import { hasExpensePay } from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    StatisticsCard,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    ExpensePay,
    ExpenseRefund,
    ExpenseCards,
    ExpenseTable,
    ExpenseTabs,
    ExpenseInfo,
    ExpenseFilter,
  },
  computed: {
    hasData() {
      return this.expenses.expensesData.length != 0;
    },
  },
  data() {
    return {
      expenses: new Expenses(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      filterExpenseStatistics: [],
    };
  },
  methods: {
    checkPrivilege,
    hasExpensePay,
    setFilteredStatistics() {
      let statistic = this.expenses.expensesStatistics;

      this.filterExpenseStatistics = [
        {
          title: this.$t("Expenses.statistics.totalPaidExpenses"),
          value: statistic.totalPaidExpensesWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.paidExpensesPercentage,
            title: statistic.paidExpensesPercentageText,
          },
        },
        {
          title: this.$t("Expenses.statistics.totalRefundExpenses"),
          value: statistic.totalRefundExpensesWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.refundExpensesPercentage,
            title: statistic.refundExpensesPercentageText,
          },
        },
        {
          title: this.$t("Expenses.statistics.countPaidExpenses"),
          value: `${statistic.countPaidExpenses}`,
          icon: "number.svg",
          showPercentage: false,
          percentage: {
            value: 0,
            title: "",
          },
        },
        {
          title: this.$t("Expenses.statistics.countRefundExpenses"),
          value: `${statistic.countRefundExpenses}`,
          icon: "number.svg",
          showPercentage: false,
          percentage: {
            value: 0,
            title: "",
          },
        },
      ];
    },
    changePagination(pagination) {
      this.expenses.filterData.fillData(pagination);
      this.getAllExpenses();
    },

    search(data) {
      this.expenses.filterData.fillData(data);
      this.getAllExpenses();
    },
    async getAllExpenses() {
      this.isLoading = true;
      try {
        this.expenses.expensesData = [];
        const response = await apiExpense.getAll(this.expenses.filterData);
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
        this.expenses.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    await this.getAllExpenses();
    await this.setFilteredStatistics();
  },
};
</script>
