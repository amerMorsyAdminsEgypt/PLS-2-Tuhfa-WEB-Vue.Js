import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class InterestFollowUpsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.educationalCategoryInterestDataInclude = true;
    this.educationalCategoryOtherInterestDataInclude = true;

    this.interestFollowUpToken = "";
    this.educationalCategoryInterestToken = "";
    this.educationalCategoryOtherInterestToken = "";

    this.activationTypeTokens =
      store.getters.generalSetting.interestFollowUps.activationTypeTokens ?? [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
