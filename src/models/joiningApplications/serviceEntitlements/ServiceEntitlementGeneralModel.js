import GeneralModelResponse from "./../../general/GeneralModelResponse";
import ServiceEntitlementStatistics from "./ServiceEntitlementStatistics";

export default class ServiceEntitlementGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.serviceEntitlementStatistics = new ServiceEntitlementStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.serviceEntitlementStatistics.fillServiceEntitlementStatisticsData(
        data.serviceEntitlementStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
