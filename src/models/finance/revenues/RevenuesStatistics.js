import ActivationStatistics from "./../../general/ActivationStatistics";

export default class RevenuesStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setRevenuesStatisticsInitialValue();
  }
  setRevenuesStatisticsInitialValue() {
    this.setInitialValue();
    this.totalAccrualRevenues = 0;
    this.totalAccuralRevenuesWithCurrency = "";
    this.totalAccrualRevenuesMoneyText = "";
    this.totalRefundRevenues = 0;
    this.totalRefundRevenuesWithCurrency = "";
    this.totalRefundRevenuesMoneyText = "";
    this.totalDifferenceRevenues = 0;
    this.totalDifferenceRevenuesWithCurrency = "";
    this.totalDifferenceRevenuesMoneyText = "";
    this.accrualRevenuesPercentage = 0;
    this.accrualRevenuesPercentageText = "";
    this.refundRevenuesPercentage = 0;
    this.refundRevenuesPercentageText = "";
    this.differenceRevenuesPercentage = 0;
    this.differenceRevenuesPercentageText = "";
    this.countAccrualRevenues = 0;
    this.countRefundRevenues = 0;
  }
  fillRevenuesStatisticsData(data) {
    if (data) {
      this.fillData(data);
      this.totalAccrualRevenues = data.totalAccrualRevenues ?? 0;
      this.totalAccuralRevenuesWithCurrency =
        data.totalAccuralRevenuesWithCurrency ?? "";
      this.totalAccrualRevenuesMoneyText =
        data.totalAccrualRevenuesMoneyText ?? "";
      this.totalRefundRevenues = data.totalRefundRevenues ?? 0;
      this.totalRefundRevenuesWithCurrency =
        data.totalRefundRevenuesWithCurrency ?? "";
      this.totalRefundRevenuesMoneyText =
        data.totalRefundRevenuesMoneyText ?? "";
      this.totalDifferenceRevenues = data.totalDifferenceRevenues ?? 0;
      this.totalDifferenceRevenuesWithCurrency =
        data.totalDifferenceRevenuesWithCurrency ?? "";
      this.totalDifferenceRevenuesMoneyText =
        data.totalDifferenceRevenuesMoneyText ?? "";
      this.accrualRevenuesPercentage = data.accrualRevenuesPercentage ?? 0;
      this.accrualRevenuesPercentageText =
        data.accrualRevenuesPercentageText ?? "";
      this.refundRevenuesPercentage = data.refundRevenuesPercentage ?? 0;
      this.refundRevenuesPercentageText =
        data.refundRevenuesPercentageText ?? "";
      this.differenceRevenuesPercentage =
        data.differenceRevenuesPercentage ?? 0;
      this.differenceRevenuesPercentageText =
        data.differenceRevenuesPercentageText ?? "";
      this.countAccrualRevenues = data.countAccrualRevenues ?? 0;
      this.countRefundRevenues = data.countRefundRevenues ?? 0;
    } else {
      this.setRevenuesStatisticsInitialValue();
    }
  }
}
