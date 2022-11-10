import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class EducationalRatingsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.educationalCategoryDataInclude = true;
    this.educationalGroupDataInclude = true;
    this.educationalScheduleTimeDataInclude = true;

    this.educationalRatingTypeToken = "";

    this.educationalCategoryToken = "";
    this.educationalGroupToken = "";
    this.educationalScheduleTimeToken = "";

    this.activationTypeTokens =
      store.getters.generalSetting.educationalRatings.activationTypeTokens ??
      [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
