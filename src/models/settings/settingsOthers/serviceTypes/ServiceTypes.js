import GeneralModel from "./../../../general/GeneralModel";
import ServiceType from "./ServiceType";
import ServiceTypesFilter from "./ServiceTypesFilter";

export default class ServiceTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.serviceTypesData = [];
    this.serviceType = new ServiceType();
    this.filterData = new ServiceTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.serviceTypesData = data.serviceTypesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
