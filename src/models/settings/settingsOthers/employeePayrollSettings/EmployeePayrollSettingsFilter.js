import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";
import store from "./../../../../store";

export default class EmployeePayrollSettingsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.employeePayrollSettings
        .activationTypeTokens || [];

    this.userInfoDataInclude = true;
    this.educationalGroupInfoDataInclude = true;
    this.userToken = "";
    this.educationalGroupToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.activationTypeTokens = data.activationTypeTokens ?? [];
      this.userInfoDataInclude = data.userInfoDataInclude ?? true;
      this.educationalGroupInfoDataInclude =
        data.educationalGroupInfoDataInclude ?? true;
      this.userToken = data.userToken ?? "";
      this.educationalGroupToken = data.educationalGroupToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
