import GeneralModelResponse from "./../../general/GeneralModelResponse";
import RevenuesStatistics from "./RevenuesStatistics";

export default class RevenueGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.revenuesStatistics = new RevenuesStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.revenuesStatistics.fillRevenuesStatisticsData(
        data.revenuesStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
