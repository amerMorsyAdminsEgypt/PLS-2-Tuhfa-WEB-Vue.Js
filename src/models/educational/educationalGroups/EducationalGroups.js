import EducationalGroupGeneralMode from "./EducationalGroupGeneralMode";
import EducationalGroup from "./EducationalGroup";
import EducationalGroupModel from "./EducationalGroupModel";
import EducationalGroupAddStudents from "./EducationalGroupAddStudents";
import EducationalGroupsFilter from "./EducationalGroupsFilter";

export default class EducationalGroups extends EducationalGroupGeneralMode {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalGroupsData = [];
    this.educationalGroup = new EducationalGroup();
    this.educationalGroupModel = new EducationalGroupModel();
    this.educationalGroupAddStudents = new EducationalGroupAddStudents();
    this.filterData = new EducationalGroupsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalGroupsData = data.educationalGroupsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
