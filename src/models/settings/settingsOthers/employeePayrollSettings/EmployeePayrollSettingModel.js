// import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/employeePayrollSettings.svg";
import UserActiveSettingInfoData from "./UserActiveSettingInfoData";

export default class EmployeePayrollSettingModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.educationalGroupToken = "";
    this.employeePayrollSettingList = []; //added by me
  }
  fillData(data) {
    if (data) {
      this.educationalGroupToken = data.educationalGroupToken ?? "";
      if (data.employeePayrollSettingList.length) {
        this.employeePayrollSettingList = data.employeePayrollSettingList.map(
          function (list) {
            let itemUpdated = false;
            return { ...list, itemUpdated: itemUpdated };
          }
        );
      } else {
        this.employeePayrollSettingList = [new UserActiveSettingInfoData()];
      }
    } else {
      this.setInitialValue();
    }
  }
}
