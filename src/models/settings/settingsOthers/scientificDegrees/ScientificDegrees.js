import GeneralModel from "./../../../general/GeneralModel";
import ScientificDegree from "./ScientificDegree";
import ScientificDegreesFilter from "./ScientificDegreesFilter";

export default class ScientificDegrees extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.scientificDegreesData = [];
    this.scientificDegree = new ScientificDegree();
    this.filterData = new ScientificDegreesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.scientificDegreesData = data.scientificDegreesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
