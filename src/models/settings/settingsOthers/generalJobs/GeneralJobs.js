import GeneralModel from "./../../../general/GeneralModel";
import GeneralJob from "./GeneralJob";
import GeneralJobsFilter from "./GeneralJobsFilter";

export default class GeneralJobs extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.generalJobsData = [];
    this.generalJob = new GeneralJob();
    this.filterData = new GeneralJobsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.generalJobsData = data.generalJobsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
