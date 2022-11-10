import GeneralModel from "./../../general/GeneralModel";
import EducationalGroupStudent from "./EducationalGroupStudent";
import EducationalGroupStudentsFilter from "./EducationalGroupStudentsFilter";

export default class EducationalGroupStudents extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalGroupStudentsData = [];
    this.educationalGroupStudent = new EducationalGroupStudent();
    this.filterData = new EducationalGroupStudentsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalGroupStudentsData =
        data.educationalGroupStudentsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
