import GeneralModel from "./../../../general/GeneralModel";
import Religion from "./Religion";
import ReligionsFilter from "./ReligionsFilter";

export default class Religions extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.religionsData = [];
    this.religion = new Religion();
    this.filterData = new ReligionsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.religionsData = data.religionsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
