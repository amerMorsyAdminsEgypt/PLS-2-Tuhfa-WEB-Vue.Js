import ActivationStatistics from "./../../general/ActivationStatistics";

export default class AccountTransactionsStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setAccountTransactionsStatisticsInitialValue();
  }
  setAccountTransactionsStatisticsInitialValue() {
    this.setInitialValue();
    this.totalDepositeMoney = 0;
    this.totalDepositeMoneyWithCurrency = "";
    this.totalDepositeMoneyText = "";
    this.totalDropDownMoney = 0;
    this.totalDropDownMoneyWithCurrency = "";
    this.totalDropDownMoneyText = "";
    this.totalPaidExpensesMoney = 0;
    this.totalPaidExpensesMoneyWithCurrency = "";
    this.totalPaidExpensesMoneyText = "";
    this.totalRefundedExpensesMoney = 0;
    this.totalRefundedExpensesMoneyWithCurrency = "";
    this.totalRefundedExpensesMoneyText = "";
    this.totalAccrualRevenuesMoney = 0;
    this.totalAccrualRevenuesMoneyWithCurrency = "";
    this.totalAccrualRevenuesMoneyText = "";
    this.totalRefundedRevenuesMoney = 0;
    this.totalRefundedRevenuesMoneyWithCurrency = "";
    this.totalRefundedRevenuesMoneyText = "";
    this.countDepositeTransations = 0;
    this.countDropDownTransations = 0;
    this.countPaidExpensesTransations = 0;
    this.countRefundedExpensesTransations = 0;
    this.countAccrualRevenuesTransations = 0;
    this.countRefundedRevenuesTransations = 0;
    this.depositePercentage = 0;
    this.depositePercentageText = "";
    this.dropDownPercentage = 0;
    this.dropDownPercentageText = "";
    this.paidExpensesPercentage = 0;
    this.paidExpensesPercentageText = "";
    this.refundedExpensesPercentage = 0;
    this.refundedExpensesPercentageText = "";
    this.accrualRevenuesPercentage = 0;
    this.accrualRevenuesPercentageText = "";
    this.refundedRevenuesPercentage = 0;
    this.refundedRevenuesPercentageText = "";
  }
  fillAccountTransactionsStatisticsData(data) {
    if (data) {
      this.fillData(data);
      this.totalDepositeMoney = data.totalDepositeMoney ?? 0;
      this.totalDepositeMoneyWithCurrency =
        data.totalDepositeMoneyWithCurrency ?? "";
      this.totalDepositeMoneyText = data.totalDepositeMoneyText ?? "";
      this.totalDropDownMoney = data.totalDropDownMoney ?? 0;
      this.totalDropDownMoneyWithCurrency =
        data.totalDropDownMoneyWithCurrency ?? "";
      this.totalDropDownMoneyText = data.totalDropDownMoneyText ?? "";
      this.totalPaidExpensesMoney = data.totalPaidExpensesMoney ?? 0;
      this.totalPaidExpensesMoneyWithCurrency =
        data.totalPaidExpensesMoneyWithCurrency ?? "";
      this.totalPaidExpensesMoneyText = data.totalPaidExpensesMoneyText ?? "";
      this.totalRefundedExpensesMoney = data.totalRefundedExpensesMoney ?? 0;
      this.totalRefundedExpensesMoneyWithCurrency =
        data.totalRefundedExpensesMoneyWithCurrency ?? "";
      this.totalRefundedExpensesMoneyText =
        data.totalRefundedExpensesMoneyText ?? "";
      this.totalAccrualRevenuesMoney = data.totalAccrualRevenuesMoney ?? 0;
      this.totalAccrualRevenuesMoneyWithCurrency =
        data.totalAccrualRevenuesMoneyWithCurrency ?? "";
      this.totalAccrualRevenuesMoneyText =
        data.totalAccrualRevenuesMoneyText ?? "";
      this.totalRefundedRevenuesMoney = data.totalRefundedRevenuesMoney ?? 0;
      this.totalRefundedRevenuesMoneyWithCurrency =
        data.totalRefundedRevenuesMoneyWithCurrency ?? "";
      this.totalRefundedRevenuesMoneyText =
        data.totalRefundedRevenuesMoneyText ?? "";
      this.countDepositeTransations = data.countDepositeTransations ?? 0;
      this.countDropDownTransations = data.countDropDownTransations ?? 0;
      this.countPaidExpensesTransations =
        data.countPaidExpensesTransations ?? 0;
      this.countRefundedExpensesTransations =
        data.countRefundedExpensesTransations ?? 0;
      this.countAccrualRevenuesTransations =
        data.countAccrualRevenuesTransations ?? 0;
      this.countRefundedRevenuesTransations =
        data.countRefundedRevenuesTransations ?? 0;
      this.depositePercentage = data.depositePercentage ?? 0;
      this.depositePercentageText = data.depositePercentageText ?? "";
      this.dropDownPercentage = data.dropDownPercentage ?? 0;
      this.dropDownPercentageText = data.dropDownPercentageText ?? "";
      this.paidExpensesPercentage = data.paidExpensesPercentage ?? 0;
      this.paidExpensesPercentageText = data.paidExpensesPercentageText ?? "";
      this.refundedExpensesPercentage = data.refundedExpensesPercentage ?? 0;
      this.refundedExpensesPercentageText =
        data.refundedExpensesPercentageText ?? "";
      this.accrualRevenuesPercentage = data.accrualRevenuesPercentage ?? 0;
      this.accrualRevenuesPercentageText =
        data.accrualRevenuesPercentageText ?? "";
      this.refundedRevenuesPercentage = data.refundedRevenuesPercentage ?? 0;
      this.refundedRevenuesPercentageText =
        data.refundedRevenuesPercentageText ?? "";
    } else {
      this.setAccountTransactionsStatisticsInitialValue();
    }
  }
}
