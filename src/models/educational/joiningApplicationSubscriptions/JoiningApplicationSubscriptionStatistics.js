import ActivationStatistics from "./../../general/ActivationStatistics";

export default class JoiningApplicationSubscriptionStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setJoiningApplicationSubscriptionStatisticsInitialValue();
  }
  setJoiningApplicationSubscriptionStatisticsInitialValue() {
    this.setInitialValue();
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
    this.notFinishPercentage = 0;
    this.notFinishPercentageText = "";
    this.countDebtsFinish = 0;
    this.countDebtsNotFinish = 0;
    this.totalCount = 0;
    this.totalActiveCount = 0;
    this.totalArchivedCount = 0;
    this.totalBlockedCount = 0;
    this.totalActivePercentage = 0;
    this.totalActivePercentageText = "";
    this.totalArchivedPercentage = 0;
    this.totalArchivedPercentageText = "";
    this.totalBlockedPercentage = 0;
    this.totalBlockedPercentageText = "";
  }
  fillJoiningApplicationSubscriptionStatisticsData(data) {
    if (data) {
      this.fillData(data);
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
      this.notFinishPercentage = data.notFinishPercentage ?? 0;
      this.notFinishPercentageText = data.notFinishPercentageText ?? "";
      this.countDebtsFinish = data.countDebtsFinish ?? 0;
      this.countDebtsNotFinish = data.countDebtsNotFinish ?? 0;
      this.totalCount = data.totalCount ?? 0;
      this.totalActiveCount = data.totalActiveCount ?? 0;
      this.totalArchivedCount = data.totalArchivedCount ?? 0;
      this.totalBlockedCount = data.totalBlockedCount ?? 0;
      this.totalActivePercentage = data.totalActivePercentage ?? 0;
      this.totalActivePercentageText = data.totalActivePercentageText ?? "";
      this.totalArchivedPercentage = data.totalArchivedPercentage ?? 0;
      this.totalArchivedPercentageText = data.totalArchivedPercentageText ?? "";
      this.totalBlockedPercentage = data.totalBlockedPercentage ?? 0;
      this.totalBlockedPercentageText = data.totalBlockedPercentageText ?? "";
    } else {
      this.setJoiningApplicationSubscriptionStatisticsInitialValue();
    }
  }
}
