<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('revenues', $event)"
      :viewType="generalSetting.revenues.viewType"
      :viewTypeStatus="true"
      :btnAddTitle="$t('Revenues.accrual')"
      :btnAddName="'RevenueAccrual'"
      :btnAddStatus="checkPrivilege(hasRevenueAccrual())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <RevenueTabs />

      <template v-if="hasData">
        <div v-if="filterRevenueStatistics" class="statistics">
          <b-button v-b-toggle.statistics class="btn btn-lg btn-collapse">
            {{ $t("Revenues.statistics.modelName") }}
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </b-button>
          <b-collapse id="statistics">
            <div class="row">
              <div
                v-for="(statistic, index) in filterRevenueStatistics"
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
        <RevenueTable
          v-if="generalSetting.revenues.viewType == VIEW_TYPES.table"
          v-on:setRevenueData="revenues.revenue.fillData($event)"
          :revenuesData="revenues.revenuesData"
          :defaultImg="revenues.revenue.defaultImg"
          :filterData="revenues.filterData"
        />

        <RevenueCards
          v-else-if="generalSetting.revenues.viewType == VIEW_TYPES.cards"
          v-on:setRevenueData="revenues.revenue.fillData($event)"
          :revenuesData="revenues.revenuesData"
          :defaultImg="revenues.revenue.defaultImg"
          :filterData="revenues.filterData"
        />

        <ActionsData :actionsData="revenues.revenue" />
        <RevenueInfo :revenue="revenues.revenue" />

        <CustomBottomSheetQRCode
          :refName="'RevenueQRCode'"
          :code="revenues.revenue.fullCode"
          :codeTitle="$t('Revenues.code')"
          :name="revenues.revenue.revenueNameCurrent"
          :nameTitle="$t('Revenues.name')"
          :nameIcon="'revenues.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="revenues.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <RevenueFilter
        :theFilterData="revenues.filterData"
        v-on:search="search($event)"
      />

      <RevenueAccrual
        :revenue="revenues.revenue"
        v-on:refresh="getAllRevenues()"
      />
      <RevenueRefund
        :revenue="revenues.revenue"
        v-on:refresh="getAllRevenues()"
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
import RevenueAccrual from "./components/RevenueAccrual.vue";
import RevenueRefund from "./components/RevenueRefund.vue";
import RevenueCards from "./components/RevenueCards.vue";
import RevenueTable from "./components/RevenueTable.vue";
import RevenueTabs from "./components/RevenueTabs.vue";
import RevenueInfo from "./components/RevenueInfo.vue";
import RevenueFilter from "./components/RevenueFilter.vue";
import Revenues from "./../../../models/finance/revenues/Revenues";
import apiRevenue from "./../../../api/finance/revenues";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import { hasRevenueAccrual } from "./../../../utils/privilegeHelper";

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
    RevenueAccrual,
    RevenueRefund,
    RevenueCards,
    RevenueTable,
    RevenueTabs,
    RevenueInfo,
    RevenueFilter,
  },
  computed: {
    hasData() {
      return this.revenues.revenuesData.length != 0;
    },
  },
  data() {
    return {
      revenues: new Revenues(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      filterRevenueStatistics: [],
    };
  },
  methods: {
    checkPrivilege,
    hasRevenueAccrual,
    setFilteredStatistics() {
      let statistic = this.revenues.revenuesStatistics;

      this.filterRevenueStatistics = [
        {
          title: this.$t("Revenues.statistics.totalAccrualRevenues"),
          value: statistic.totalAccuralRevenuesWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.accrualRevenuesPercentage,
            title: statistic.accrualRevenuesPercentageText,
          },
        },
        {
          title: this.$t("Revenues.statistics.totalRefundRevenues"),
          value: statistic.totalRefundRevenuesWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.refundRevenuesPercentage,
            title: statistic.refundRevenuesPercentageText,
          },
        },
        {
          title: this.$t("Revenues.statistics.totalDifferenceRevenues"),
          value: statistic.totalDifferenceRevenuesWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.differenceRevenuesPercentage,
            title: statistic.differenceRevenuesPercentageText,
          },
        },
        {
          title: this.$t("Revenues.statistics.countAccrualRevenues"),
          value: `${statistic.countAccrualRevenues}`,
          icon: "number.svg",
          showPercentage: false,
          percentage: {
            value: 0,
            title: "",
          },
        },
        {
          title: this.$t("Revenues.statistics.countRefundRevenues"),
          value: `${statistic.countRefundRevenues}`,
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
      this.revenues.filterData.fillData(pagination);
      this.getAllRevenues();
    },

    search(data) {
      this.revenues.filterData.fillData(data);
      this.getAllRevenues();
    },
    async getAllRevenues() {
      this.isLoading = true;
      try {
        this.revenues.revenuesData = [];
        const response = await apiRevenue.getAll(this.revenues.filterData);
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
        this.revenues.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    await this.getAllRevenues();
    await this.setFilteredStatistics();
  },
};
</script>
