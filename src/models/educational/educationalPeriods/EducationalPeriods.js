import GeneralModel from "./../../general/GeneralModel";
import EducationalPeriod from "./EducationalPeriod";
import EducationalPeriodsFilter from "./EducationalPeriodsFilter";

export default class EducationalPeriods extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalPeriodsData = [];
    this.educationalPeriod = new EducationalPeriod();
    this.filterData = new EducationalPeriodsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalPeriodsData = data.educationalPeriodsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
