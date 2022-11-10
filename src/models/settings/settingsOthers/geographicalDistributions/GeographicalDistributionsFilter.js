import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";
import store from "./../../../../store";

export default class GeographicalDistributionsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();

    this.systemComponentToken = "";
    this.systemComponentHierarchyToken = "";
    this.parentGeographicalDistributionToken = "";
    this.getOnlyParentGeographicalDistributions = false;
    this.getOnlyChildGeographicalDistributions = false;
    this.systemComponentDataInclude = false;
    this.systemComponentsHierarchyDataInclude = false;
    this.parentGeographicalDistributionDataInclude = false;

    this.activationTypeTokens =
      store.getters.generalSetting.geographicalDistributions
        .activationTypeTokens || [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
