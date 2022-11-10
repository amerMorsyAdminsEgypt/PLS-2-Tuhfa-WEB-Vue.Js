import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";
import store from "./../../../../store";

export default class ReligionsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.sendTo = "";
    this.userTypeToken = "";

    this.activationTypeTokens =
      store.getters.generalSetting.religions.activationTypeTokens || [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
