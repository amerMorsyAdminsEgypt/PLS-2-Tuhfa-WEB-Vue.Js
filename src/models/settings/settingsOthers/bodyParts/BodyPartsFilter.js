import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";
import store from "./../../../../store";

export default class BodyPartsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();

    this.systemComponentToken = "";
    this.systemComponentHierarchyToken = "";
    this.parentBodyPartToken = "";
    this.getOnlyParentBodyParts = false;
    this.getOnlyChildBodyParts = false;
    this.systemComponentDataInclude = false;
    this.systemComponentsHierarchyDataInclude = false;
    this.parentBodyPartDataInclude = false;

    this.activationTypeTokens =
      store.getters.generalSetting.bodyParts.activationTypeTokens || [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
