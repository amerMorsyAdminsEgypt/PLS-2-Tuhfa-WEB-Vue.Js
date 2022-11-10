import GeneralModelResponse from "./../../general/GeneralModelResponse";
import InstallmentsStatistics from "./InstallmentsStatistics";

export default class InstallmentGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.installmentsStatistics = new InstallmentsStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.installmentsStatistics.fillInstallmentsStatisticsData(
        data.installmentsStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
