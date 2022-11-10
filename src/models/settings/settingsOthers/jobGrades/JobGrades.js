import GeneralModel from "./../../../general/GeneralModel";
import JobGrade from "./JobGrade";
import JobGradesFilter from "./JobGradesFilter";

export default class JobGrades extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.jobGradesData = [];
    this.jobGrade = new JobGrade();
    this.filterData = new JobGradesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.jobGradesData = data.jobGradesData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
