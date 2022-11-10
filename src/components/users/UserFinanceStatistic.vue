<template>
  <CustomBottomSheet
    :refName="'UserFinanceStatistic'"
    size="xl"
    :headerText="$t('FinanceStatistic.modelName')"
    :headerIcon="defaultImg"
  >
    <div class="row">
      <div
        class="col-3 mt-2"
        v-for="(statistic, index) in getFilteredStatisticTotals"
        :key="index"
      >
        <StatisticsCard
          :title="statistic.title"
          :totalNumber="statistic.value"
          :icon="statistic.icon"
        />
      </div>

      <div class="col-12 mt-2">
        <div class="row">
          <div class="col-md-4">
            <div class="row">
              <div
                class="col-12"
                v-for="(
                  statistic, index
                ) in getFilteredStatisticPercentages.slice(0, 2)"
                :key="index"
              >
                <StatisticsCard
                  :title="statistic.title"
                  :totalNumber="statistic.value"
                  :showPercentage="statistic.showPercentage"
                  :percentage="statistic.percentage"
                />
              </div>
            </div>
          </div>
          <ChartPie
            class="col-md-4"
            :key="token"
            :labels="labels"
            :data="getData"
          />
          <div class="col-md-4">
            <div class="row">
              <div
                class="col-12"
                v-for="(
                  statistic, index
                ) in getFilteredStatisticPercentages.slice(2, 4)"
                :key="index"
              >
                <StatisticsCard
                  :title="statistic.title"
                  :totalNumber="statistic.value"
                  :showPercentage="statistic.showPercentage"
                  :percentage="statistic.percentage"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-md-4">
            <div class="row">
              <div
                class="col-12"
                v-for="(
                  statistic, index
                ) in getFilteredStatisticPercentages.slice(4)"
                :key="index"
              >
                <StatisticsCard
                  :title="statistic.title"
                  :totalNumber="statistic.value"
                  :showPercentage="statistic.showPercentage"
                  :percentage="statistic.percentage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../components/general/CustomBottomSheet.vue";
import ChartPie from "./../../components/general/ChartPie.vue";
import StatisticsCard from "./../../components/general/StatisticsCard.vue";
import { formateDateTimeLang } from "./../../utils/functions";
import defaultImg from "@/assets/images/FinanceStatistic.svg";

export default {
  components: {
    CustomBottomSheet,
    ChartPie,
    StatisticsCard,
  },
  props: ["token", "userFinanceStatistic"],
  data() {
    return {
      defaultImg,
      labels: [
        this.$t("FinanceStatistic.paidPercentage"),
        this.$t("FinanceStatistic.remainderPercentage"),
        this.$t("FinanceStatistic.finishPercentage"),
        this.$t("FinanceStatistic.isHaveSchedulPercentage"),
        this.$t("FinanceStatistic.notHaveSchedulPercentage"),
      ],
      filterUserFinanceStatisticTotals: [],
    };
  },
  computed: {
    getData() {
      return [
        this.userFinanceStatistic.paidPercentage,
        this.userFinanceStatistic.remainderPercentage,
        this.userFinanceStatistic.finishPercentage,
        this.userFinanceStatistic.isHaveSchedulPercentage,
        this.userFinanceStatistic.notHaveSchedulPercentage,
      ];
    },
    getFilteredStatisticTotals() {
      return [
        {
          title: this.$t("FinanceStatistic.totalDebtsMoney"),
          value: this.userFinanceStatistic.totalDebtsMoneyWithCurrency,
          icon: "money.svg",
        },
        {
          title: this.$t("FinanceStatistic.totalPaidMoney"),
          value: this.userFinanceStatistic.totalPaidMoneyWithCurrency,
          icon: "money.svg",
        },
        {
          title: this.$t("FinanceStatistic.totalRemainderMoney"),
          value: this.userFinanceStatistic.totalRemainderMoneyWithCurrency,
          icon: "money.svg",
        },
        {
          title: this.$t("FinanceStatistic.countDebts"),
          value: `${this.userFinanceStatistic.countDebts}`,
          icon: "number.svg",
        },
        {
          title: this.$t("FinanceStatistic.countDebtsFinish"),
          value: `${this.userFinanceStatistic.countDebtsFinish}`,
          icon: "number.svg",
        },
        {
          title: this.$t("FinanceStatistic.countDebtsNotFinish"),
          value: `${this.userFinanceStatistic.countDebtsNotFinish}`,
          icon: "number.svg",
        },
        {
          title: this.$t("FinanceStatistic.countDebtsIsHaveSchedul"),
          value: `${this.userFinanceStatistic.countDebtsIsHaveSchedul}`,
          icon: "number.svg",
        },
        {
          title: this.$t("FinanceStatistic.countDebtsNotHaveSchedul"),
          value: `${this.userFinanceStatistic.countDebtsNotHaveSchedul}`,
          icon: "number.svg",
        },
      ];
    },
    getFilteredStatisticPercentages() {
      return [
        {
          title: this.$t("FinanceStatistic.paidPercentage"),
          value: this.userFinanceStatistic.paidPercentageText,
          icon: "percentage.svg",
          showPercentage: true,
          percentage: {
            value: this.userFinanceStatistic.paidPercentage,
            title: this.userFinanceStatistic.paidPercentageText,
          },
        },
        {
          title: this.$t("FinanceStatistic.remainderPercentage"),
          value: this.userFinanceStatistic.remainderPercentageText,
          icon: "percentage.svg",
          showPercentage: true,
          percentage: {
            value: this.userFinanceStatistic.remainderPercentage,
            title: this.userFinanceStatistic.remainderPercentageText,
          },
        },
        {
          title: this.$t("FinanceStatistic.finishPercentage"),
          value: this.userFinanceStatistic.finishPercentageText,
          icon: "percentage.svg",
          showPercentage: true,
          percentage: {
            value: this.userFinanceStatistic.finishPercentage,
            title: this.userFinanceStatistic.finishPercentageText,
          },
        },
        {
          title: this.$t("FinanceStatistic.isHaveSchedulPercentage"),
          value: this.userFinanceStatistic.isHaveSchedulPercentageText,
          icon: "percentage.svg",
          showPercentage: true,
          percentage: {
            value: this.userFinanceStatistic.isHaveSchedulPercentage,
            title: this.userFinanceStatistic.isHaveSchedulPercentageText,
          },
        },
        {
          title: this.$t("FinanceStatistic.notHaveSchedulPercentage"),
          value: this.userFinanceStatistic.notHaveSchedulPercentageText,
          icon: "percentage.svg",
          showPercentage: true,
          percentage: {
            value: this.userFinanceStatistic.notHaveSchedulPercentage,
            title: this.userFinanceStatistic.notHaveSchedulPercentageText,
          },
        },
      ];
    },
  },
  methods: {
    formateDateTimeLang,
  },
  async created() {},
};
</script>
