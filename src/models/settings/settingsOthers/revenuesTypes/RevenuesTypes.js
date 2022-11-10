import GeneralModel from "./../../../general/GeneralModel";
import RevenuesType from "./RevenuesType";
import RevenuesTypesFilter from "./RevenuesTypesFilter";

export default class RevenuesTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.revenuesTypesData = [];
    this.revenuesType = new RevenuesType();
    this.filterData = new RevenuesTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.revenuesTypesData = data.revenuesTypesData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
