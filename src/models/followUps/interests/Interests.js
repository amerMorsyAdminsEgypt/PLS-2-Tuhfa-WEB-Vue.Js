import GeneralModel from "./../../general/GeneralModel";
import Interest from "./Interest";
import InterestsFilter from "./InterestsFilter";

export default class Interests extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.interestsData = [];
    this.interest = new Interest();
    this.filterData = new InterestsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.interestsData = data.interestsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
