import GeneralModelResponse from "./../../general/GeneralModelResponse";
import ActivationStatistics from "./../../general/ActivationStatistics";

export default class PriceQuotationAffiliateOperationGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.activationStatistics = new ActivationStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.activationStatistics.fillData(data.activationStatistics);
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
