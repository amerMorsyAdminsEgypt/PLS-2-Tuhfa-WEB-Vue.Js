import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class EducationalGroupsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.educationalGroupStudents
        .activationTypeTokens || [];

    this.studentUserToken = "";
    this.educationalGroupToken = "";
    this.educationalCategoryToken = "";
    this.educationalJoiningApplicationToken = "";

    this.educationalGroupInfoDataInclude = true;
    this.studentUserInfoDateInclude = true;
    this.educationalJoiningApplicationInfoDateInclude = true;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
