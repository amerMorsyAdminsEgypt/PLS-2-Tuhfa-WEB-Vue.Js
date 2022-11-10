import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class EducationalGroupPlacesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    try {
      this.activationTypeTokens =
        store.getters.generalSetting.educationalGroupPlaces.activationTypeTokens;
    } catch (error) {
      this.activationTypeTokens = [];
    }
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
