import GeneralModel from "./../../../general/GeneralModel";
import InjuryType from "./InjuryType";
import InjuryTypesFilter from "./InjuryTypesFilter";

export default class InjuryTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.injuryTypesData = [];
    this.injuryType = new InjuryType();
    this.filterData = new InjuryTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.injuryTypesData = data.injuryTypesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
