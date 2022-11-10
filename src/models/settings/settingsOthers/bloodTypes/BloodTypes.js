import GeneralModel from "./../../../general/GeneralModel";
import BloodType from "./BloodType";
import BloodTypesFilter from "./BloodTypesFilter";

export default class BloodTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.bloodTypesData = [];
    this.bloodType = new BloodType();
    this.filterData = new BloodTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.bloodTypesData = data.bloodTypesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
