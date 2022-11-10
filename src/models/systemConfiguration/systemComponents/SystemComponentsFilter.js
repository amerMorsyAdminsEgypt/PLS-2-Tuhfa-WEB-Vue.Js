import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class SystemComponentsFilter extends BaseEntityModelFilter {
  constructor(modelName) {
    super();
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName) {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting[modelName].activationTypeTokens || [];

    this.systemTypeToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.systemTypeToken = data.userTypeToken;
    } else {
      this.setInitialValue();
    }
  }
}
