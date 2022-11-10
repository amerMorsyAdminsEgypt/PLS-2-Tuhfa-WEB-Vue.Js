<template>
  <div v-if="statistics" class="statistics">
    <b-button v-b-toggle.statistics class="btn btn-lg btn-collapse">
      {{ $t("CountedServiceTransactions.statistics.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="statistics">
      <div class="row">
        <StatisticsCardMultiple
          class="col-md-12"
          :itemsList="itemsListBoughtsWithSolds"
          :percentageList="percentageListBoughtsWithSolds"
        />
        <StatisticsCardMultiple
          class="col-md-6"
          :itemsList="itemsListBoughtsWithRefunded"
          :percentageList="percentageListBoughtsWithRefunded"
        />
        <StatisticsCardMultiple
          class="col-md-6"
          :itemsList="itemsListSoldsWithRefunded"
          :percentageList="percentageListSoldsWithRefunded"
        />
      </div>
    </b-collapse>
  </div>
</template>

<script>
import StatisticsCardMultiple from "./../../../../components/general/StatisticsCardMultiple.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: { StatisticsCardMultiple },
  props: ["statistics"],
  computed: {
    itemsListBoughtsWithSolds() {
      return [
        {
          title: this.$t("CountedServiceTransactions.statistics.total"),
          value:
            this.statistics.countBoughtCountedServiceTransaction +
            this.statistics.countSoldCountedServiceTransaction,
        },
        {
          title: this.$t("CountedServiceTransactions.statistics.totalBoughts"),
          value: `${this.statistics.countBoughtCountedServiceTransaction} (${this.statistics.totalBoughtCountedServiceTransactionWithCurrency})`,
        },
        {
          title: this.$t("CountedServiceTransactions.statistics.totalSolds"),
          value: `${this.statistics.countSoldCountedServiceTransaction} (${this.statistics.totalSoldCountedServiceTransactionWithCurrency})`,
        },
      ];
    },
    percentageListBoughtsWithSolds() {
      return [
        {
          title: this.$t("CountedServiceTransactions.statistics.totalBoughts"),
          label: this.statistics.boughtsWithSoldsPercentageBoughtsText,
          value: this.statistics.boughtsWithSoldsPercentageBoughts,
        },
        {
          title: this.$t("CountedServiceTransactions.statistics.totalSolds"),
          label: this.statistics.boughtsWithSoldsPercentageSoldsText,
          value: this.statistics.boughtsWithSoldsPercentageSolds,
        },
      ];
    },

    itemsListBoughtsWithRefunded() {
      return [
        {
          title: this.$t("CountedServiceTransactions.statistics.total"),
          value:
            this.statistics.countBoughtCountedServiceTransaction +
            this.statistics.countBoughtRefundCountedServiceTransaction,
        },
        {
          title: this.$t("CountedServiceTransactions.statistics.totalBoughts"),
          value: `${this.statistics.countBoughtCountedServiceTransaction} (${this.statistics.totalBoughtCountedServiceTransactionWithCurrency})`,
        },
        {
          title: this.$t(
            "CountedServiceTransactions.statistics.totalBoughtsRefunded"
          ),
          value: `${this.statistics.countBoughtRefundCountedServiceTransaction} (${this.statistics.totalBoughtRefundCountedServiceTransactionWithCurrency})`,
        },
      ];
    },
    percentageListBoughtsWithRefunded() {
      return [
        {
          title: this.$t("CountedServiceTransactions.statistics.totalBoughts"),
          label: this.statistics.boughtsWithRefundedPercentageBoughtsText,
          value: this.statistics.boughtsWithRefundedPercentageBoughts,
        },
        {
          title: this.$t(
            "CountedServiceTransactions.statistics.totalBoughtsRefunded"
          ),
          label: this.statistics.boughtsWithRefundedPercentageRefundedText,
          value: this.statistics.boughtsWithRefundedPercentageRefunded,
        },
      ];
    },

    itemsListSoldsWithRefunded() {
      return [
        {
          title: this.$t("CountedServiceTransactions.statistics.total"),
          value:
            this.statistics.countSoldCountedServiceTransaction +
            this.statistics.countSoldRefundCountedServiceTransaction,
        },
        {
          title: this.$t("CountedServiceTransactions.statistics.totalSolds"),
          value: `${this.statistics.countSoldCountedServiceTransaction} (${this.statistics.totalSoldCountedServiceTransactionWithCurrency})`,
        },
        {
          title: this.$t(
            "CountedServiceTransactions.statistics.totalSoldsRefunded"
          ),
          value: `${this.statistics.countSoldRefundCountedServiceTransaction} (${this.statistics.totalSoldRefundCountedServiceTransactionWithCurrency})`,
        },
      ];
    },
    percentageListSoldsWithRefunded() {
      return [
        {
          title: this.$t("CountedServiceTransactions.statistics.totalSolds"),
          label: this.statistics.soldsWithRefundedPercentageSoldsText,
          value: this.statistics.soldsWithRefundedPercentageSolds,
        },
        {
          title: this.$t(
            "CountedServiceTransactions.statistics.totalSoldsRefunded"
          ),
          label: this.statistics.soldsWithRefundedPercentageRefundedText,
          value: this.statistics.soldsWithRefundedPercentageRefunded,
        },
      ];
    },
  },
};
</script>
