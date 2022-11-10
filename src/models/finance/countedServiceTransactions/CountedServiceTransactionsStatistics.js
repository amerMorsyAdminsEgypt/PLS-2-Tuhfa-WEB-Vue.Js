import ActivationStatistics from "./../../general/ActivationStatistics";
import { approximate } from "./../../../utils/functions";

export default class CountedServiceTransactionsStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setCountedServiceTransactionsStatisticsInitialValue();
  }
  setCountedServiceTransactionsStatisticsInitialValue() {
    this.setInitialValue();
    this.totalBoughtCountedServiceTransaction = 0;
    this.totalBoughtCountedServiceTransactionWithCurrency = "";
    this.totalBoughtCountedServiceTransactionMoneyText = "";
    this.totalSoldCountedServiceTransaction = 0;
    this.totalSoldCountedServiceTransactionWithCurrency = "";
    this.totalSoldCountedServiceTransactionMoneyText = "";
    this.totalBoughtRefundCountedServiceTransaction = 0;
    this.totalBoughtRefundCountedServiceTransactionWithCurrency = "";
    this.totalBoughtRefundCountedServiceTransactionMoneyText = "";
    this.totalSoldRefundCountedServiceTransaction = 0;
    this.totalSoldRefundCountedServiceTransactionWithCurrency = "";
    this.totalSoldRefundCountedServiceTransactionMoneyText = "";
    this.countSoldCountedServiceTransaction = 0;
    this.countSoldRefundCountedServiceTransaction = 0;
    this.countBoughtCountedServiceTransaction = 0;
    this.countBoughtRefundCountedServiceTransaction = 0;

    // #region add by me
    this.boughtsWithSoldsPercentageBoughts = 0;
    this.boughtsWithSoldsPercentageBoughtsText = "";
    this.boughtsWithSoldsPercentageSolds = 0;
    this.boughtsWithSoldsPercentageSoldsText = "";

    this.boughtsWithRefundedPercentageBoughts = 0;
    this.boughtsWithRefundedPercentageBoughtsText = "";
    this.boughtsWithRefundedPercentageRefunded = 0;
    this.boughtsWithRefundedPercentageRefundedText = "";

    this.soldsWithRefundedPercentageSolds = 0;
    this.soldsWithRefundedPercentageSoldsText = "";
    this.soldsWithRefundedPercentageRefunded = 0;
    this.soldsWithRefundedPercentageRefundedText = "";
    // #endregion add by me
  }
  fillCountedServiceTransactionsStatisticsData(data) {
    if (data) {
      this.fillData(data);
      this.totalBoughtCountedServiceTransaction =
        data.totalBoughtCountedServiceTransaction ?? 0;
      this.totalBoughtCountedServiceTransactionWithCurrency =
        data.totalBoughtCountedServiceTransactionWithCurrency ?? "";
      this.totalBoughtCountedServiceTransactionMoneyText =
        data.totalBoughtCountedServiceTransactionMoneyText ?? "";
      this.totalSoldCountedServiceTransaction =
        data.totalSoldCountedServiceTransaction ?? 0;
      this.totalSoldCountedServiceTransactionWithCurrency =
        data.totalSoldCountedServiceTransactionWithCurrency ?? "";
      this.totalSoldCountedServiceTransactionMoneyText =
        data.totalSoldCountedServiceTransactionMoneyText ?? "";
      this.totalBoughtRefundCountedServiceTransaction =
        data.totalBoughtRefundCountedServiceTransaction ?? 0;
      this.totalBoughtRefundCountedServiceTransactionWithCurrency =
        data.totalBoughtRefundCountedServiceTransactionWithCurrency ?? "";
      this.totalBoughtRefundCountedServiceTransactionMoneyText =
        data.totalBoughtRefundCountedServiceTransactionMoneyText ?? "";
      this.totalSoldRefundCountedServiceTransaction =
        data.totalSoldRefundCountedServiceTransaction ?? 0;
      this.totalSoldRefundCountedServiceTransactionWithCurrency =
        data.totalSoldRefundCountedServiceTransactionWithCurrency ?? "";
      this.totalSoldRefundCountedServiceTransactionMoneyText =
        data.totalSoldRefundCountedServiceTransactionMoneyText ?? "";
      this.countSoldCountedServiceTransaction =
        data.countSoldCountedServiceTransaction ?? 0;
      this.countSoldRefundCountedServiceTransaction =
        data.countSoldRefundCountedServiceTransaction ?? 0;
      this.countBoughtCountedServiceTransaction =
        data.countBoughtCountedServiceTransaction ?? 0;
      this.countBoughtRefundCountedServiceTransaction =
        data.countBoughtRefundCountedServiceTransaction ?? 0;

      // #region add by me
      let boughtsWithSolds =
        data.countBoughtCountedServiceTransaction +
        data.countSoldCountedServiceTransaction;
      let boughtsWithSoldsPercentageBoughts = approximate(
        (data.countBoughtCountedServiceTransaction / boughtsWithSolds) * 100
      );
      let boughtsWithSoldsPercentageSolds = approximate(
        (data.countSoldCountedServiceTransaction / boughtsWithSolds) * 100
      );
      this.boughtsWithSoldsPercentageBoughts =
        boughtsWithSoldsPercentageBoughts;
      this.boughtsWithSoldsPercentageBoughtsText = `${boughtsWithSoldsPercentageBoughts} %`;
      this.boughtsWithSoldsPercentageSolds = boughtsWithSoldsPercentageSolds;
      this.boughtsWithSoldsPercentageSoldsText = `${boughtsWithSoldsPercentageSolds} %`;

      let boughtsWithRefunded =
        data.countBoughtCountedServiceTransaction +
        data.countBoughtRefundCountedServiceTransaction;
      let boughtsWithRefundedPercentageBoughts = approximate(
        (data.countBoughtCountedServiceTransaction / boughtsWithRefunded) * 100
      );
      let boughtsWithRefundedPercentageRefunded = approximate(
        (data.countBoughtRefundCountedServiceTransaction /
          boughtsWithRefunded) *
          100
      );
      this.boughtsWithRefundedPercentageBoughts =
        boughtsWithRefundedPercentageBoughts;
      this.boughtsWithRefundedPercentageBoughtsText = `${boughtsWithRefundedPercentageBoughts} %`;
      this.boughtsWithRefundedPercentageRefunded =
        boughtsWithRefundedPercentageRefunded;
      this.boughtsWithRefundedPercentageRefundedText = `${boughtsWithRefundedPercentageRefunded} %`;

      let soldsWithRefunded =
        data.countBoughtCountedServiceTransaction +
        data.countSoldCountedServiceTransaction;
      let soldsWithRefundedPercentageSolds = approximate(
        (data.countBoughtCountedServiceTransaction / soldsWithRefunded) * 100
      );
      let soldsWithRefundedPercentageRefunded = approximate(
        (data.countSoldCountedServiceTransaction / soldsWithRefunded) * 100
      );
      this.soldsWithRefundedPercentageSolds = soldsWithRefundedPercentageSolds;
      this.soldsWithRefundedPercentageSoldsText = `${soldsWithRefundedPercentageSolds} %`;
      this.soldsWithRefundedPercentageRefunded =
        soldsWithRefundedPercentageRefunded;
      this.soldsWithRefundedPercentageRefundedText = `${soldsWithRefundedPercentageRefunded} %`;
      // #endregion add by me
    } else {
      this.setCountedServiceTransactionsStatisticsInitialValue();
    }
  }
}
