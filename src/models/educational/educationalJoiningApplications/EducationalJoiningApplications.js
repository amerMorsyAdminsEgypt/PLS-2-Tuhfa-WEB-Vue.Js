import EducationalJoiningApplicationGeneralModel from "./EducationalJoiningApplicationGeneralModel";
import EducationalJoiningApplication from "./EducationalJoiningApplication";
import EducationalJoiningApplicationsFilter from "./EducationalJoiningApplicationsFilter";

export default class EducationalJoiningApplications extends EducationalJoiningApplicationGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalJoiningApplicationsData = [];
    this.educationalJoiningApplication = new EducationalJoiningApplication();
    this.filterData = new EducationalJoiningApplicationsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalJoiningApplicationsData =
        data.educationalJoiningApplicationsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
