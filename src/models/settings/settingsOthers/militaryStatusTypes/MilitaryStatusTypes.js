import GeneralModel from "./../../../general/GeneralModel";
import MilitaryStatusType from "./MilitaryStatusType";
import MilitaryStatusTypesFilter from "./MilitaryStatusTypesFilter";

export default class MilitaryStatusTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.militaryStatusTypesData = [];
    this.militaryStatusType = new MilitaryStatusType();
    this.filterData = new MilitaryStatusTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.militaryStatusTypesData = data.militaryStatusTypesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
