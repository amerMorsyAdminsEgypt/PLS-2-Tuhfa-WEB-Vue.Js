<template>
  <div v-if="statistics" class="statistics">
    <b-button v-b-toggle.statistics class="btn btn-lg btn-collapse">
      {{ $t("JoiningApplicationSubscriptions.statistics") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="statistics">
      <div class="row">
        <StatisticsCardMultiple
          class="col-md-6"
          :itemsList="itemsListMoney"
          :percentageList="percentageListMoney"
        />
        <StatisticsCardMultiple
          class="col-md-6"
          :itemsList="itemsListCount"
          :percentageList="percentageListCount"
        />
      </div>
    </b-collapse>
  </div>
</template>

<script>
import StatisticsCardMultiple from "./../../../../components/general/StatisticsCardMultiple.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "JoiningApplicationSubscriptionStatistics",
  mixins: [generalMixin],
  components: { StatisticsCardMultiple },
  props: ["statistics"],
  computed: {
    itemsListMoney() {
      return [
        {
          title: this.$t("statistics.totalDebts"),
          value: this.statistics.totalDebtsMoneyWithCurrency,
        },
        {
          title: this.$t("statistics.totalPaid"),
          value: this.statistics.totalPaidMoneyWithCurrency,
        },
        {
          title: this.$t("statistics.totalRemainder"),
          value: this.statistics.totalRemainderMoneyWithCurrency,
        },
      ];
    },
    percentageListMoney() {
      return [
        {
          title: this.$t("statistics.totalPaid"),
          label: this.statistics.paidPercentageText,
          value: this.statistics.paidPercentage,
        },
        {
          title: this.$t("statistics.totalRemainder"),
          label: this.statistics.remainderPercentageText,
          value: this.statistics.remainderPercentage,
        },
      ];
    },
    itemsListCount() {
      return [
        {
          title: this.$t("statistics.totalCount"),
          value: this.statistics.totalCount,
        },
        {
          title: this.$t("statistics.countDebtsNotFinish"),
          value: this.statistics.countDebtsNotFinish,
        },
        {
          title: this.$t("statistics.countDebtsFinish"),
          value: this.statistics.countDebtsFinish,
        },
      ];
    },
    percentageListCount() {
      return [
        {
          title: this.$t("statistics.countDebtsNotFinish"),
          label: this.statistics.notFinishPercentageText,
          value: this.statistics.notFinishPercentage,
        },
        {
          title: this.$t("statistics.countDebtsFinish"),
          label: this.statistics.finishPercentageText,
          value: this.statistics.finishPercentage,
        },
      ];
    },
  },
};
</script>
