import { getUserAuthorizeToken } from "./../../../utils/functions";
import defaultImg from "@/assets/images/EducationalScheduleTimes.svg";

export default class EducationalScheduleTimeModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userAuthorizeToken = getUserAuthorizeToken();
    this.educationalScheduleTimesData = [];
  }
  fillData(data) {
    this.educationalScheduleTimesData = data.educationalScheduleTimesData || [];
    this.handelEmployeesTokens();
    console.log(this.educationalScheduleTimesData);
  }
  fillDataForUpdate(data) {
    if (data) {
      this.educationalScheduleTimesData = [data];
      this.handelEmployeesTokens();
    } else {
      this.educationalScheduleTimesData = [];
    }
  }
  handelEmployeesData() {
    if (this.educationalScheduleTimesData.length != 0) {
      this.educationalScheduleTimesData.forEach((element) => {
        element.employeesData = [];
        if (element.employeesTokens.length != 0) {
          element.employeesTokens.forEach((employee) => {
            element.employeesData.push({ employeeUserToken: employee });
          });
        }
      });
    }
  }
  handelEmployeesTokens() {
    if (this.educationalScheduleTimesData.length != 0) {
      this.educationalScheduleTimesData.forEach((element) => {
        element.employeesTokens = [];
        if (element.employeesData.length != 0) {
          element.employeesData.forEach((employee) => {
            element.employeesTokens.push(employee.employeeUserToken);
          });
        }
      });
    }
  }
}
