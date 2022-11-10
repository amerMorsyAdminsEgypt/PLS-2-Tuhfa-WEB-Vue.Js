import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class SystemComponentsHierarchiesFilter extends BaseEntityModelFilter {
  constructor(modelName) {
    super();
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName) {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting[modelName].activationTypeTokens || [];

    this.systemComponentsHierarchiesDetailsDataInclude = true;
    this.systemTypeToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.systemTypeToken = data.systemTypeToken ?? "";
      this.systemComponentsHierarchiesDetailsDataInclude =
        data.systemComponentsHierarchiesDetailsDataInclude ?? true;
    } else {
      this.setInitialValue();
    }
  }
}
