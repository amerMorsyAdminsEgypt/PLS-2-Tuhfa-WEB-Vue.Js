import GeneralModel from "./../../../general/GeneralModel";
import Color from "./Color";
import ColorsFilter from "./ColorsFilter";

export default class Colors extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.colorsData = [];
    this.color = new Color();
    this.filterData = new ColorsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.colorsData = data.colorsData || [];
      let filter = {
        ...this.filterData,
        ...data.pagination,
      };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
