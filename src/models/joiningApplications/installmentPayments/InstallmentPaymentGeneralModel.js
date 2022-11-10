import GeneralModelResponse from "./../../general/GeneralModelResponse";
import InstallmentPaymentStatistics from "./InstallmentPaymentStatistics";

export default class InstallmentPaymentGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.installmentPaymentStatistics = new InstallmentPaymentStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.installmentPaymentStatistics.fillInstallmentPaymentStatisticsData(
        data.installmentPaymentStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
