import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class DiscussionsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();

    this.activationTypeTokens =
      store.getters.generalSetting.discussions.activationTypeTokens ?? [];

    this.educationalCategoryInfoDataInclude = false;
    this.educationalGroupInfoDataInclude = false;
    this.educationalScheduleTimeInfoDataInclude = false;
    this.discussionTypeToken = "";
    this.mainToken = "";
    this.educationalCategoryToken = "";
    this.educationalScheduleTimeToken = "";
    this.educationalGroupToken = "";
    this.discussionToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.activationTypeTokens = data.activationTypeTokens ?? [];
      this.educationalCategoryInfoDataInclude =
        data.educationalCategoryInfoDataInclude ?? false;
      this.educationalGroupInfoDataInclude =
        data.educationalGroupInfoDataInclude ?? false;
      this.educationalScheduleTimeInfoDataInclude =
        data.educationalScheduleTimeInfoDataInclude ?? false;
      this.discussionTypeToken = data.discussionTypeToken ?? "";
      this.mainToken = data.mainToken ?? "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.educationalScheduleTimeToken =
        data.educationalScheduleTimeToken ?? "";
      this.educationalGroupToken = data.educationalGroupToken ?? "";
      this.discussionToken = data.discussionToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
