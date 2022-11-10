import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/employeePayrollSettings.svg";
import UserInfoData from "./UserInfoData";
import EducationalGroupInfoData from "./EducationalGroupInfoData";

export default class EmployeePayrollSetting extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.employeePayrollSettingToken = "";
    this.employeeSalaryCalculationTypeToken = "";
    this.employeeSalaryCalculationTypeNameCurrent = "";
    this.employeeSalaryCalculationTypeNameAr = "";
    this.employeeSalaryCalculationTypeNameEn = "";
    this.employeeSalaryCalculationTypeNameUnd = "";
    this.employeeSalaryCalculationCaseTypeToken = "";
    this.employeeSalaryCalculationCaseTypeNameCurrent = "";
    this.employeeSalaryCalculationCaseTypeNameAr = "";
    this.employeeSalaryCalculationCaseTypeNameEn = "";
    this.employeeSalaryCalculationCaseTypeNameUnd = "";
    this.calculationTypeToken = "";
    this.calculationTypeNameCurrent = "";
    this.calculationTypeNameAr = "";
    this.calculationTypeNameEn = "";
    this.calculationTypeNameUnd = "";
    this.employeeCalculationValue = "";
    this.employeeCalculationValueText = "";
    this.employeePayrollSettingDescriptionCurrent = "";
    this.employeePayrollSettingDescriptionAr = "";
    this.employeePayrollSettingDescriptionEn = "";
    this.employeePayrollSettingDescriptionUnd = "";
    this.userToken = "";
    this.educationalGroupToken = "";
    this.userInfoData = new UserInfoData();
    this.educationalGroupInfoData = new EducationalGroupInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.employeePayrollSettingToken = data.employeePayrollSettingToken ?? "";
      this.employeeSalaryCalculationTypeToken =
        data.employeeSalaryCalculationTypeToken ?? "";
      this.employeeSalaryCalculationTypeNameCurrent =
        data.employeeSalaryCalculationTypeNameCurrent ?? "";
      this.employeeSalaryCalculationTypeNameAr =
        data.employeeSalaryCalculationTypeNameAr ?? "";
      this.employeeSalaryCalculationTypeNameEn =
        data.employeeSalaryCalculationTypeNameEn ?? "";
      this.employeeSalaryCalculationTypeNameUnd =
        data.employeeSalaryCalculationTypeNameUnd ?? "";
      this.employeeSalaryCalculationCaseTypeToken =
        data.employeeSalaryCalculationCaseTypeToken ?? "";
      this.employeeSalaryCalculationCaseTypeNameCurrent =
        data.employeeSalaryCalculationCaseTypeNameCurrent ?? "";
      this.employeeSalaryCalculationCaseTypeNameAr =
        data.employeeSalaryCalculationCaseTypeNameAr ?? "";
      this.employeeSalaryCalculationCaseTypeNameEn =
        data.employeeSalaryCalculationCaseTypeNameEn ?? "";
      this.employeeSalaryCalculationCaseTypeNameUnd =
        data.employeeSalaryCalculationCaseTypeNameUnd ?? "";
      this.calculationTypeToken = data.calculationTypeToken ?? "";
      this.calculationTypeNameCurrent = data.calculationTypeNameCurrent ?? "";
      this.calculationTypeNameAr = data.calculationTypeNameAr ?? "";
      this.calculationTypeNameEn = data.calculationTypeNameEn ?? "";
      this.calculationTypeNameUnd = data.calculationTypeNameUnd ?? "";
      this.employeeCalculationValue = data.employeeCalculationValue ?? "";
      this.employeeCalculationValueText =
        data.employeeCalculationValueText ?? "";
      this.employeePayrollSettingDescriptionCurrent =
        data.employeePayrollSettingDescriptionCurrent ?? "";
      this.employeePayrollSettingDescriptionAr =
        data.employeePayrollSettingDescriptionAr ?? "";
      this.employeePayrollSettingDescriptionEn =
        data.employeePayrollSettingDescriptionEn ?? "";
      this.employeePayrollSettingDescriptionUnd =
        data.employeePayrollSettingDescriptionUnd ?? "";
      this.userToken = data.userToken ?? "";
      this.educationalGroupToken = data.educationalGroupToken ?? "";
      this.userInfoData.fillData(data.userInfoData);
      this.educationalGroupInfoData.fillData(data.educationalGroupInfoData);
    } else {
      this.setInitialValue();
    }
  }
}
