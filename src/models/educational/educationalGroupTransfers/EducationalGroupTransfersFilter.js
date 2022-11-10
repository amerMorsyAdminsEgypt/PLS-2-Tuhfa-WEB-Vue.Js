import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class EducationalGroupTransfersFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.educationalGroupTransfers
        .activationTypeTokens || [];

    this.educationalGroupTransferringToken = "";
    this.educationalJoiningApplicationToken = "";
    this.educationalCategoryToken = "";
    this.educationalGroupToken = "";
    this.oldEducationalGroupToken = "";
    this.newEducationalGroupToken = "";
    this.userStudentToken = "";

    this.educationalCategoryInfoDataInclude = true;
    this.oldEducationalGroupInfoDataInclude = true;
    this.newEducationalGroupInfoDataInclude = true;
    this.userStudentInfoDataInclude = true;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
