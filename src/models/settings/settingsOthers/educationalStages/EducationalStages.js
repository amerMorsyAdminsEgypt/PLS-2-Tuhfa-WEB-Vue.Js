import GeneralModel from "./../../../general/GeneralModel";
import EducationalStage from "./EducationalStage";
import EducationalStagesFilter from "./EducationalStagesFilter";

export default class EducationalStages extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalStagesData = [];
    this.educationalStage = new EducationalStage();
    this.filterData = new EducationalStagesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalStagesData = data.educationalStagesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
