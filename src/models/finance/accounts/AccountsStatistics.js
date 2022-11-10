import ActivationStatistics from "./../../general/ActivationStatistics";

export default class AccountsStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setAccountsStatisticsInitialValue();
  }
  setAccountsStatisticsInitialValue() {
    this.setInitialValue();
    this.totalAccountsMoneyBalances = 0;
  }
  fillAccountsStatisticsData(data) {
    if (data) {
      this.fillData(data);
      this.totalAccountsMoneyBalances = data.totalAccountsMoneyBalances ?? 0;
    } else {
      this.setAccountsStatisticsInitialValue();
    }
  }
}
