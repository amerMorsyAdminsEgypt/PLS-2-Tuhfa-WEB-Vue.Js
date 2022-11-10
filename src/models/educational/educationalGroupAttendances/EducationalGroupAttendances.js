import GeneralModel from "./../../general/GeneralModel";
import EducationalGroupAttendance from "./EducationalGroupAttendance";
import EducationalGroupAttendanceModel from "./EducationalGroupAttendanceModel";
import EducationalGroupAttendanceModelUpdate from "./EducationalGroupAttendanceModelUpdate";
import EducationalGroupAttendancesFilter from "./EducationalGroupAttendancesFilter";
// import { USER_TYPE } from "./../../../utils/constantLists";

export default class EducationalGroupAttendances extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalGroupAttendancesData = [];
    // this.educationalGroupAttendancesEmployeesData = [];
    // this.educationalGroupAttendancesStudentsData = [];
    this.educationalGroupAttendance = new EducationalGroupAttendance();
    this.educationalGroupAttendanceModel =
      new EducationalGroupAttendanceModel();
    this.educationalGroupAttendanceModelUpdate =
      new EducationalGroupAttendanceModelUpdate();
    this.filterData = new EducationalGroupAttendancesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      // this.fillEducationalGroupAttendancesData(
      //   data.educationalGroupAttendancesData
      // );
      this.educationalGroupAttendancesData =
        data.educationalGroupAttendancesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
  // fillEducationalGroupAttendancesData(arr = []) {
  //   if (arr.length > 0) {
  //     this.educationalGroupAttendancesData = arr || [];
  //     this.educationalGroupAttendancesEmployeesData = arr.filter(
  //       (item) => item.userInfoData.userTypeToken != USER_TYPE.Student
  //     );
  //     this.educationalGroupAttendancesStudentsData = arr.filter(
  //       (item) => item.userInfoData.userTypeToken == USER_TYPE.Student
  //     );
  //   } else {
  //     this.educationalGroupAttendancesData = [];
  //     this.educationalGroupAttendancesEmployeesData = [];
  //     this.educationalGroupAttendancesStudentsData = [];
  //   }
  // }
}
