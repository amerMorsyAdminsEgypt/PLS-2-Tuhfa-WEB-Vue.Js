import GeneralModelResponse from "./../../general/GeneralModelResponse";
import AccountsStatistics from "./AccountsStatistics";

export default class AccountGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.accountsStatistics = new AccountsStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.accountsStatistics.fillAccountsStatisticsData(
        data.accountsStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
