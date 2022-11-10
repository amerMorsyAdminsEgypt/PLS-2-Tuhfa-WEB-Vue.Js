import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class StudentScheduleExamTimesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.studentScheduleExamTimes
        .activationTypeTokens || [];
    this.scheduleExamTimeToken = "";
    this.studentUserToken = "";
    this.simpleExamModelToken = "";
    this.educationalCategoryToken = "";
    this.educationalGroupToken = "";
    this.studentUserInfoDataInclude = false;
    this.simpleExamModelInfoDataInclude = false;
    this.educationalCategoryInfoDataInclude = false;
    this.educationalGroupInfoDataInclude = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.scheduleExamTimeToken = data.scheduleExamTimeToken || "";
      this.studentUserToken = data.studentUserToken || "";
      this.simpleExamModelToken = data.simpleExamModelToken || "";
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.educationalGroupToken = data.educationalGroupToken || "";
      this.studentUserInfoDataInclude =
        data.studentUserInfoDataInclude || false;
      this.simpleExamModelInfoDataInclude =
        data.simpleExamModelInfoDataInclude || false;
      this.educationalCategoryInfoDataInclude =
        data.educationalCategoryInfoDataInclude || false;
      this.educationalGroupInfoDataInclude =
        data.educationalGroupInfoDataInclude || false;
    } else {
      this.setInitialValue();
    }
  }
}
