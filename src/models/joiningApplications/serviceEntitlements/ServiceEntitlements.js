import ServiceEntitlementGeneralModel from "./ServiceEntitlementGeneralModel";
import ServiceEntitlement from "./ServiceEntitlement";
import ServiceEntitlementsFilter from "./ServiceEntitlementsFilter";

export default class ServiceEntitlements extends ServiceEntitlementGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.serviceEntitlementsData = [];
    this.serviceEntitlement = new ServiceEntitlement();
    this.filterData = new ServiceEntitlementsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.serviceEntitlementsData = data.serviceEntitlementData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
