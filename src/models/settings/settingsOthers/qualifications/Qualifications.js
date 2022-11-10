import GeneralModel from "./../../../general/GeneralModel";
import Qualification from "./Qualification";
import QualificationsFilter from "./QualificationsFilter";

export default class Qualifications extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.qualificationsData = [];
    this.qualification = new Qualification();
    this.filterData = new QualificationsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.qualificationsData = data.qualificationsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
