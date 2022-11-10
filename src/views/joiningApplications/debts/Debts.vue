<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('debts', $event)"
      :viewType="generalSetting.debts.viewType"
      :viewTypeStatus="true"
      :btnAddTitle="$t('ServiceEntitlements.addAsDebt')"
      :btnAddName="'ServiceEntitlementAddAsDebt'"
      :btnAddStatus="
        checkPrivilege(hasServiceEntitlementAddServiceEntitlementAsDept())
      "
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <DebtTabs />

      <template v-if="hasData">
        <div v-if="filterDebtStatistics" class="statistics">
          <b-button v-b-toggle.statistics class="btn btn-lg btn-collapse">
            {{ $t("Debts.statistics.modelName") }}
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </b-button>
          <b-collapse id="statistics">
            <div class="row">
              <div
                v-for="(statistic, index) in filterDebtStatistics"
                :key="index"
                class="col-md-4"
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
        <DebtTable
          v-if="generalSetting.debts.viewType == VIEW_TYPES.table"
          v-on:setDebtData="debts.debt.fillData($event)"
          :debtsData="debts.debtsData"
          :defaultImg="debts.debt.defaultImg"
          :filterData="debts.filterData"
        />

        <DebtCards
          v-else-if="generalSetting.debts.viewType == VIEW_TYPES.cards"
          v-on:setDebtData="debts.debt.fillData($event)"
          :debtsData="debts.debtsData"
          :defaultImg="debts.debt.defaultImg"
          :filterData="debts.filterData"
        />

        <ActionsData :actionsData="debts.debt" />
        <DebtInfo :debt="debts.debt" />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="debts.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <DebtFilter
        :theFilterData="debts.filterData"
        v-on:search="search($event)"
      />
      <ServiceEntitlementAddAsDebt
        :serviceEntitlement="serviceEntitlements.serviceEntitlement"
        v-on:refresh="getAllDebts()"
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
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import DebtCards from "./components/DebtCards.vue";
import DebtTable from "./components/DebtTable.vue";
import DebtTabs from "./components/DebtTabs.vue";
import DebtInfo from "./components/DebtInfo.vue";
import ServiceEntitlementAddAsDebt from "./../serviceEntitlements/components/ServiceEntitlementAddAsDebt.vue";
import DebtFilter from "./components/DebtFilter.vue";
import Debts from "./../../../models/joiningApplications/debts/Debts";
import ServiceEntitlements from "./../../../models/joiningApplications/serviceEntitlements/ServiceEntitlements";
import apiDebt from "./../../../api/joiningApplications/debts";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import { hasServiceEntitlementAddServiceEntitlementAsDept } from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    StatisticsCard,
    ExceptionWithImg,
    ActionsData,
    CustomPagination,
    DebtCards,
    DebtTable,
    DebtTabs,
    DebtInfo,
    ServiceEntitlementAddAsDebt,
    DebtFilter,
  },
  computed: {
    hasData() {
      return this.debts.debtsData.length != 0;
    },
  },
  data() {
    return {
      debts: new Debts(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      filterDebtStatistics: [],
      serviceEntitlements: new ServiceEntitlements(),
    };
  },
  props: {
    userToken: {
      type: String,
      default: "",
    },
  },
  methods: {
    checkPrivilege,
    hasServiceEntitlementAddServiceEntitlementAsDept,
    setFilteredStatistics() {
      let statistic = this.debts.debtStatistics;

      this.filterDebtStatistics = [
        {
          title: this.$t("Debts.statistics.totalDebtsMoney"),
          value: statistic.totalDebtsMoneyWithCurrency,
          icon: "money.svg",
          showPercentage: false,
          percentage: {
            value: 0,
            title: "",
          },
        },
        {
          title: this.$t("Debts.statistics.totalPaidMoney"),
          value: statistic.totalPaidMoneyWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.paidPercentage,
            title: statistic.paidPercentageText,
          },
        },
        {
          title: this.$t("Debts.statistics.totalRemainderMoney"),
          value: statistic.totalRemainderMoneyWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.remainderPercentage,
            title: statistic.remainderPercentageText,
          },
        },
      ];
    },
    changePagination(pagination) {
      this.debts.filterData.fillData(pagination);
      this.getAllDebts();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("debts", data);
      this.debts.filterData.activationTypeTokens = data;
      this.getAllDebts();
    },
    search(data) {
      this.debts.filterData.fillData(data);
      this.getAllDebts();
    },
    async getAllDebts() {
      this.isLoading = true;
      try {
        this.debts.debtsData = [];
        const response = await apiDebt.getAll(this.debts.filterData);
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
        this.debts.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.debts.filterData.userToken = this.userToken;
    await this.getAllDebts();
    await this.setFilteredStatistics();
  },
};
</script>
