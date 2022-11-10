import GeneralModel from "./../../../general/GeneralModel";
import CountedServiceType from "./CountedServiceType";
import CountedServiceTypesFilter from "./CountedServiceTypesFilter";

export default class CountedServiceTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.countedServiceTypesData = [];
    this.countedServiceType = new CountedServiceType();
    this.filterData = new CountedServiceTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.countedServiceTypesData = data.countedServiceTypesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
