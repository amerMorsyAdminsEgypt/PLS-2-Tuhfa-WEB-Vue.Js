import GeneralModelResponse from "./../../general/GeneralModelResponse";
import CountedServiceTransactionsStatistics from "./CountedServiceTransactionsStatistics";

export default class CountedServiceTransactionGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.countedServiceTransactionsStatistics =
      new CountedServiceTransactionsStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.countedServiceTransactionsStatistics.fillCountedServiceTransactionsStatisticsData(
        data.countedServiceTransactionsStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
