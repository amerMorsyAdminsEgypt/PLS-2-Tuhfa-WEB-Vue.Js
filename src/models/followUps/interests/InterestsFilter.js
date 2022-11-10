import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class InterestsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.educationalCategoryInterestDataInclude = true;
    this.educationalCategoryOtherInterestDataInclude = true;
    this.educationalCategoryDataInclude = true;
    this.placeDataInclude = true;
    this.studentUserDataInclude = true;

    this.activationTypeTokens =
      store.getters.generalSetting.interests.activationTypeTokens ?? [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
