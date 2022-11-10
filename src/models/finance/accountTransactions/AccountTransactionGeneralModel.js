import GeneralModelResponse from "./../../general/GeneralModelResponse";
import AccountTransactionsStatistics from "./AccountTransactionsStatistics";

export default class AccountTransactionGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.accountTransactionsStatistics = new AccountTransactionsStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.accountTransactionsStatistics.fillAccountTransactionsStatisticsData(
        data.accountTransactionsStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
