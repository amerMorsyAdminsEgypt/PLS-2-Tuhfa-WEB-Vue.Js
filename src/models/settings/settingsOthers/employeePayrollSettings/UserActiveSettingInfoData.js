import { SALARY_CALCULATION_CASE_TYPES } from "./../../../../utils/constantLists";

export default class UserActiveSettingInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.itemUpdated = false; // by me
    this.userToken = "";
    this.userNameCurrent = "";
    this.educationalGroupToken = "";
    this.employeeSalaryCalculationTypeToken =
      SALARY_CALCULATION_CASE_TYPES.ClientAttendanceAndAbsence;
    this.employeeSalaryCalculationCaseTypeToken = "";
    this.calculationTypeToken = "";
    this.employeeCalculationValue = 0;
    this.employeeCalculationValueText = "";
    this.employeePayrollSettingDescriptionAr = "";
    this.employeePayrollSettingDescriptionEn = "";
    this.employeePayrollSettingDescriptionUnd = "";
  }
  fillData(data) {
    if (data) {
      this.itemUpdated = false;
      this.userToken = data.userToken ?? "";
      this.userNameCurrent = data.userNameCurrent ?? "";
      this.educationalGroupToken = data.educationalGroupToken ?? "";
      this.employeeSalaryCalculationTypeToken =
        data.employeeSalaryCalculationTypeToken ?? "";
      this.employeeSalaryCalculationCaseTypeToken =
        data.employeeSalaryCalculationCaseTypeToken ?? "";
      this.calculationTypeToken = data.calculationTypeToken ?? "";
      this.employeeCalculationValue = data.employeeCalculationValue ?? 0;
      this.employeeCalculationValueText =
        data.employeeCalculationValueText ?? "";
      this.employeePayrollSettingDescriptionAr =
        data.employeePayrollSettingDescriptionAr ?? "";
      this.employeePayrollSettingDescriptionEn =
        data.employeePayrollSettingDescriptionEn ?? "";
      this.employeePayrollSettingDescriptionUnd =
        data.employeePayrollSettingDescriptionUnd ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
