import GeneralModel from "./../../../general/GeneralModel";
import PersonalCardType from "./PersonalCardType";
import PersonalCardTypesFilter from "./PersonalCardTypesFilter";

export default class PersonalCardTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.personalCardTypesData = [];
    this.personalCardType = new PersonalCardType();
    this.filterData = new PersonalCardTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.personalCardTypesData = data.personalCardTypesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
