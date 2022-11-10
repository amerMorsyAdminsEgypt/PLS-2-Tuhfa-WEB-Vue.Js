export default class UserFinanceStatisticData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalDebtsMoney = 0;
    this.totalDebtsMoneyWithCurrency = "";
    this.totalDebtsMoneyText = "";
    this.totalPaidMoney = 0;
    this.totalPaidMoneyWithCurrency = "";
    this.totalPaidMoneyMoneyText = "";
    this.totalRemainderMoney = 0;
    this.totalRemainderMoneyWithCurrency = "";
    this.totalRemainderMoneyMoneyText = "";
    this.paidPercentage = 0;
    this.paidPercentageText = "";
    this.remainderPercentage = 0;
    this.remainderPercentageText = "";
    this.finishPercentage = 0;
    this.finishPercentageText = "";
    this.isHaveSchedulPercentage = 0;
    this.isHaveSchedulPercentageText = "";
    this.notHaveSchedulPercentage = 0;
    this.notHaveSchedulPercentageText = "";
    this.countDebts = 0;
    this.countDebtsFinish = 0;
    this.countDebtsNotFinish = 0;
    this.countDebtsIsHaveSchedul = 0;
    this.countDebtsNotHaveSchedul = 0;
    this.lastUpdateStatisticsDateTime = null;
    this.lastUpdateStatisticsDateTimeCustomized = "";
    this.lastUpdateStatisticsDate = "";
    this.lastUpdateStatisticsTime = "";
    this.lastUpdateStatisticsFromText = "";
  }
  fillData(data) {
    if (data) {
      this.totalDebtsMoney = data.totalDebtsMoney ?? 0;
      this.totalDebtsMoneyWithCurrency = data.totalDebtsMoneyWithCurrency ?? "";
      this.totalDebtsMoneyText = data.totalDebtsMoneyText ?? "";
      this.totalPaidMoney = data.totalPaidMoney ?? 0;
      this.totalPaidMoneyWithCurrency = data.totalPaidMoneyWithCurrency ?? "";
      this.totalPaidMoneyMoneyText = data.totalPaidMoneyMoneyText ?? "";
      this.totalRemainderMoney = data.totalRemainderMoney ?? 0;
      this.totalRemainderMoneyWithCurrency =
        data.totalRemainderMoneyWithCurrency ?? "";
      this.totalRemainderMoneyMoneyText =
        data.totalRemainderMoneyMoneyText ?? "";
      this.paidPercentage = data.paidPercentage ?? 0;
      this.paidPercentageText = data.paidPercentageText ?? "";
      this.remainderPercentage = data.remainderPercentage ?? 0;
      this.remainderPercentageText = data.remainderPercentageText ?? "";
      this.finishPercentage = data.finishPercentage ?? 0;
      this.finishPercentageText = data.finishPercentageText ?? "";
      this.isHaveSchedulPercentage = data.isHaveSchedulPercentage ?? 0;
      this.isHaveSchedulPercentageText = data.isHaveSchedulPercentageText ?? "";
      this.notHaveSchedulPercentage = data.notHaveSchedulPercentage ?? 0;
      this.notHaveSchedulPercentageText =
        data.notHaveSchedulPercentageText ?? "";
      this.countDebts = data.countDebts ?? 0;
      this.countDebtsFinish = data.countDebtsFinish ?? 0;
      this.countDebtsNotFinish = data.countDebtsNotFinish ?? 0;
      this.countDebtsIsHaveSchedul = data.countDebtsIsHaveSchedul ?? 0;
      this.countDebtsNotHaveSchedul = data.countDebtsNotHaveSchedul ?? 0;
      this.lastUpdateStatisticsDateTime =
        data.lastUpdateStatisticsDateTime ?? null;
      this.lastUpdateStatisticsDateTimeCustomized =
        data.lastUpdateStatisticsDateTimeCustomized ?? "";
      this.lastUpdateStatisticsDate = data.lastUpdateStatisticsDate ?? "";
      this.lastUpdateStatisticsTime = data.lastUpdateStatisticsTime ?? "";
      this.lastUpdateStatisticsFromText =
        data.lastUpdateStatisticsFromText ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
