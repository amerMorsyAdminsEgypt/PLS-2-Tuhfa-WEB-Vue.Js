import GeneralModelResponse from "./../../general/GeneralModelResponse";
import DebtsStatistics from "./DebtsStatistics";

export default class DebtGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.debtStatistics = new DebtsStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.debtStatistics.fillDebtsStatisticsData(data.debtStatistics);
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
