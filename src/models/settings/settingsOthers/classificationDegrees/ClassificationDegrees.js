import GeneralModel from "./../../../general/GeneralModel";
import ClassificationDegree from "./ClassificationDegree";
import ClassificationDegreesFilter from "./ClassificationDegreesFilter";

export default class ClassificationDegrees extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.classificationDegreesData = [];
    this.classificationDegree = new ClassificationDegree();
    this.filterData = new ClassificationDegreesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.classificationDegreesData = data.classificationDegreesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
