import GeneralModel from "./../../general/GeneralModel";
import EducationalGroupEmployee from "./EducationalGroupEmployee";
import EducationalGroupEmployeesFilter from "./EducationalGroupEmployeesFilter";

export default class EducationalGroupEmployees extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalGroupEmployeesData = [];
    this.educationalGroupEmployee = new EducationalGroupEmployee();
    this.filterData = new EducationalGroupEmployeesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalGroupEmployeesData = data.educationalGroupEmployees ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
