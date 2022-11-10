import ActivationStatistics from "./../../general/ActivationStatistics";

export default class DebtsStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setInstallmentPaymentStatisticsInitialValue();
  }
  setInstallmentPaymentStatisticsInitialValue() {
    this.setInitialValue();
    this.totalCount = "";
    this.totalPaymentMoney = "";
    this.totalPaymentMoneyWithCurrency = "";
    this.totalPaymentMoneyText = "";
    this.totalRefundPaymentMoney = "";
    this.totalRefundPaymentMoneyWithCurrency = "";
    this.totalRefundPaymentMoneyMoneyText = "";
    this.totalDifferenceInstallmentsMoney = "";
    this.totalDifferenceInstallmentsMoneyWithCurrency = "";
    this.totalDifferenceInstallmentsMoneyText = "";
    this.accrualPaymentsMoneyPercentage = "";
    this.accrualPaymentsMoneyPercentageText = "";
    this.refundPaymentsMoneyPercentage = "";
    this.refundPaymentsMoneyPercentageText = "";
    this.differenceInstallmentsMoneyPercentage = "";
    this.differenceInstallmentsMoneyPercentageText = "";
    this.countPayments = "";
    this.countRefundPaymentsMoney = "";
  }
  fillInstallmentPaymentStatisticsData(data) {
    if (data) {
      this.fillData(data);
      this.totalCount = data.totalCount ?? "";
      this.totalPaymentMoney = data.totalPaymentMoney ?? "";
      this.totalPaymentMoneyWithCurrency =
        data.totalPaymentMoneyWithCurrency ?? "";
      this.totalPaymentMoneyText = data.totalPaymentMoneyText ?? "";
      this.totalRefundPaymentMoney = data.totalRefundPaymentMoney ?? "";
      this.totalRefundPaymentMoneyWithCurrency =
        data.totalRefundPaymentMoneyWithCurrency ?? "";
      this.totalRefundPaymentMoneyMoneyText =
        data.totalRefundPaymentMoneyMoneyText ?? "";
      this.totalDifferenceInstallmentsMoney =
        data.totalDifferenceInstallmentsMoney ?? "";
      this.totalDifferenceInstallmentsMoneyWithCurrency =
        data.totalDifferenceInstallmentsMoneyWithCurrency ?? "";
      this.totalDifferenceInstallmentsMoneyText =
        data.totalDifferenceInstallmentsMoneyText ?? "";
      this.accrualPaymentsMoneyPercentage =
        data.accrualPaymentsMoneyPercentage ?? "";
      this.accrualPaymentsMoneyPercentageText =
        data.accrualPaymentsMoneyPercentageText ?? "";
      this.refundPaymentsMoneyPercentage =
        data.refundPaymentsMoneyPercentage ?? "";
      this.refundPaymentsMoneyPercentageText =
        data.refundPaymentsMoneyPercentageText ?? "";
      this.differenceInstallmentsMoneyPercentage =
        data.differenceInstallmentsMoneyPercentage ?? "";
      this.differenceInstallmentsMoneyPercentageText =
        data.differenceInstallmentsMoneyPercentageText ?? "";
      this.countPayments = data.countPayments ?? "";
      this.countRefundPaymentsMoney = data.countRefundPaymentsMoney ?? "";
    } else {
      this.setInstallmentPaymentStatisticsInitialValue();
    }
  }
}
