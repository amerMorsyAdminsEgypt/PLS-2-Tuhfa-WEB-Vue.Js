import ActivationStatistics from "./../../general/ActivationStatistics";

export default class ExpensesStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setExpensesStatisticsInitialValue();
  }
  setExpensesStatisticsInitialValue() {
    this.setInitialValue();
    this.totalPaidExpenses = 0;
    this.totalRefundExpenses = 0;
    this.totalPaidExpensesWithCurrency = "";
    this.totalRefundExpensesWithCurrency = "";
    this.paidExpensesPercentage = 0;
    this.paidExpensesPercentageText = "";
    this.refundExpensesPercentage = 0;
    this.refundExpensesPercentageText = "";
    this.countPaidExpenses = 0;
    this.countRefundExpenses = 0;
  }
  fillExpensesStatisticsData(data) {
    if (data) {
      this.fillData(data);
      this.totalPaidExpenses = data.totalPaidExpenses ?? 0;
      this.totalRefundExpenses = data.totalRefundExpenses ?? 0;
      this.totalPaidExpensesWithCurrency =
        data.totalPaidExpensesWithCurrency ?? "";
      this.totalRefundExpensesWithCurrency =
        data.totalRefundExpensesWithCurrency ?? "";
      this.paidExpensesPercentage = data.paidExpensesPercentage ?? 0;
      this.paidExpensesPercentageText = data.paidExpensesPercentageText ?? "";
      this.refundExpensesPercentage = data.refundExpensesPercentage ?? 0;
      this.refundExpensesPercentageText =
        data.refundExpensesPercentageText ?? "";
      this.countPaidExpenses = data.countPaidExpenses ?? 0;
      this.countRefundExpenses = data.countRefundExpenses ?? 0;
    } else {
      this.setExpensesStatisticsInitialValue();
    }
  }
}
