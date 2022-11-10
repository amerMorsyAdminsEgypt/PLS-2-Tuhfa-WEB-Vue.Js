import ActivationStatistics from "./../../general/ActivationStatistics";

export default class DebtsStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setDebtsStatisticsInitialValue();
  }
  setDebtsStatisticsInitialValue() {
    this.setInitialValue();
    this.totalDebtsMoney = "";
    this.totalDebtsMoneyWithCurrency = "";
    this.totalDebtsMoneyText = "";
    this.totalPaidMoney = "";
    this.totalPaidMoneyWithCurrency = "";
    this.totalPaidMoneyMoneyText = "";
    this.totalRemainderMoney = "";
    this.totalRemainderMoneyWithCurrency = "";
    this.totalRemainderMoneyMoneyText = "";
    this.paidPercentage = "";
    this.paidPercentageText = "";
    this.remainderPercentage = "";
    this.remainderPercentageText = "";
    this.finishPercentage = "";
    this.finishPercentageText = "";
    this.notFinishPercentage = "";
    this.notFinishPercentageText = "";
    this.isHaveSchedulPercentage = "";
    this.isHaveSchedulPercentageText = "";
    this.notHaveSchedulPercentage = "";
    this.notHaveSchedulPercentageText = "";
    this.countDebtsFinish = "";
    this.countDebtsNotFinish = "";
    this.countDebtsIsHaveSchedul = "";
    this.countDebtsNotHaveSchedul = "";
  }
  fillDebtsStatisticsData(data) {
    if (data) {
      this.fillData(data);
      this.totalDebtsMoney = data.totalDebtsMoney ?? "";
      this.totalDebtsMoneyWithCurrency = data.totalDebtsMoneyWithCurrency ?? "";
      this.totalDebtsMoneyText = data.totalDebtsMoneyText ?? "";
      this.totalPaidMoney = data.totalPaidMoney ?? "";
      this.totalPaidMoneyWithCurrency = data.totalPaidMoneyWithCurrency ?? "";
      this.totalPaidMoneyMoneyText = data.totalPaidMoneyMoneyText ?? "";
      this.totalRemainderMoney = data.totalRemainderMoney ?? "";
      this.totalRemainderMoneyWithCurrency =
        data.totalRemainderMoneyWithCurrency ?? "";
      this.totalRemainderMoneyMoneyText =
        data.totalRemainderMoneyMoneyText ?? "";
      this.paidPercentage = data.paidPercentage ?? "";
      this.paidPercentageText = data.paidPercentageText ?? "";
      this.remainderPercentage = data.remainderPercentage ?? "";
      this.remainderPercentageText = data.remainderPercentageText ?? "";
      this.finishPercentage = data.finishPercentage ?? "";
      this.finishPercentageText = data.finishPercentageText ?? "";
      this.notFinishPercentage = data.notFinishPercentage ?? "";
      this.notFinishPercentageText = data.notFinishPercentageText ?? "";
      this.isHaveSchedulPercentage = data.isHaveSchedulPercentage ?? "";
      this.isHaveSchedulPercentageText = data.isHaveSchedulPercentageText ?? "";
      this.notHaveSchedulPercentage = data.notHaveSchedulPercentage ?? "";
      this.notHaveSchedulPercentageText =
        data.notHaveSchedulPercentageText ?? "";
      this.countDebtsFinish = data.countDebtsFinish ?? "";
      this.countDebtsNotFinish = data.countDebtsNotFinish ?? "";
      this.countDebtsIsHaveSchedul = data.countDebtsIsHaveSchedul ?? "";
      this.countDebtsNotHaveSchedul = data.countDebtsNotHaveSchedul ?? "";
    } else {
      this.setDebtsStatisticsInitialValue();
    }
  }
}
