import ActivationStatistics from "./../../general/ActivationStatistics";

export default class DebtsStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setInstallmentsStatisticsInitialValue();
  }
  setInstallmentsStatisticsInitialValue() {
    this.setInitialValue();
    this.totalScheduleInstallmentMoney = "";
    this.totalScheduleInstallmentMoneyWithCurrency = "";
    this.totalScheduleInstallmentMoneyText = "";
    this.totalScheduleIPaidMoney = "";
    this.totalScheduleIPaidMoneyWithCurrency = "";
    this.totalScheduleIPaidMoneyMoneyText = "";
    this.totalScheduleRemainderMoney = "";
    this.totalScheduleRemainderMoneyWithCurrency = "";
    this.totalScheduleRemainderMoneyMoneyText = "";
    this.paidPercentage = "";
    this.paidPercentageText = "";
    this.remainderPercentage = "";
    this.remainderPercentageText = "";
    this.finishPercentage = "";
    this.finishPercentageText = "";
    this.notFinishPercentage = "";
    this.notFinishPercentageText = "";
    this.countInstallmentFinish = "";
    this.countInstallmentNotFinish = "";
  }
  fillInstallmentsStatisticsData(data) {
    if (data) {
      this.fillData(data);
      this.totalScheduleInstallmentMoney =
        data.totalScheduleInstallmentMoney ?? "";
      this.totalScheduleInstallmentMoneyWithCurrency =
        data.totalScheduleInstallmentMoneyWithCurrency ?? "";
      this.totalScheduleInstallmentMoneyText =
        data.totalScheduleInstallmentMoneyText ?? "";
      this.totalScheduleIPaidMoney = data.totalScheduleIPaidMoney ?? "";
      this.totalScheduleIPaidMoneyWithCurrency =
        data.totalScheduleIPaidMoneyWithCurrency ?? "";
      this.totalScheduleIPaidMoneyMoneyText =
        data.totalScheduleIPaidMoneyMoneyText ?? "";
      this.totalScheduleRemainderMoney = data.totalScheduleRemainderMoney ?? "";
      this.totalScheduleRemainderMoneyWithCurrency =
        data.totalScheduleRemainderMoneyWithCurrency ?? "";
      this.totalScheduleRemainderMoneyMoneyText =
        data.totalScheduleRemainderMoneyMoneyText ?? "";
      this.paidPercentage = data.paidPercentage ?? "";
      this.paidPercentageText = data.paidPercentageText ?? "";
      this.remainderPercentage = data.remainderPercentage ?? "";
      this.remainderPercentageText = data.remainderPercentageText ?? "";
      this.finishPercentage = data.finishPercentage ?? "";
      this.finishPercentageText = data.finishPercentageText ?? "";
      this.notFinishPercentage = data.notFinishPercentage ?? "";
      this.notFinishPercentageText = data.notFinishPercentageText ?? "";
      this.countInstallmentFinish = data.countInstallmentFinish ?? "";
      this.countInstallmentNotFinish = data.countInstallmentNotFinish ?? "";
    } else {
      this.setInstallmentsStatisticsInitialValue();
    }
  }
}
