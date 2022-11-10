import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class GroupScheduleExamsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.token = "";
    this.sendTo = "";
    this.isModelAnswers = "";
    this.activationTypeTokens =
      store.getters.generalSetting.groupScheduleExams.activationTypeTokens ||
      [];
    this.groupScheduleExamToken = "";
    this.educationalGroupToken = "";
    this.startExamDateTimeFrom = "";
    this.startExamDateTimeTo = "";
    this.endExamDateTimeFrom = "";
    this.endExamDateTimeTo = "";
    this.educationalGroupInfoDataInclude = false;
    this.simpleExamModelInfoDataInclude = false;
    this.educationalCategoryInfoDataInclude = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.groupScheduleExamToken = data.groupScheduleExamToken || "";
      this.educationalGroupToken = data.educationalGroupToken || "";
      this.startExamDateTimeFrom = data.startExamDateTimeFrom || "";
      this.startExamDateTimeTo = data.startExamDateTimeTo || "";
      this.endExamDateTimeFrom = data.endExamDateTimeFrom || "";
      this.endExamDateTimeTo = data.endExamDateTimeTo || "";
      this.educationalGroupInfoDataInclude =
        data.educationalGroupInfoDataInclude || false;
      this.simpleExamModelInfoDataInclude =
        data.simpleExamModelInfoDataInclude || false;
      this.educationalCategoryInfoDataInclude =
        data.educationalCategoryInfoDataInclude || false;
    } else {
      this.setInitialValue();
    }
  }
}
