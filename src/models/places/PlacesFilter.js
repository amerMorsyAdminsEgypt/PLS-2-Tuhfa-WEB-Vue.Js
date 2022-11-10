import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
import store from "./../../store";

export default class PlacesFilter extends BaseEntityModelFilter {
  constructor(modelName) {
    super();
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName = "") {
    this.setFilterInitialValue();
    try {
      this.activationTypeTokens =
        store.getters.generalSetting[modelName].activationTypeTokens;
    } catch (error) {
      this.activationTypeTokens = [];
    }
    this.systemComponentToken = "";
    this.systemComponentHierarchyToken = "";
    this.parentPlaceToken = "";
    this.placeTypeToken = "";
    this.withUserToken = "";
    this.notWithUserToken = "";
    this.placeActivityTypeToken = "";
    this.geographicalDistributionDataInclude = false;
    this.systemComponentDataInclude = false;
    this.systemComponentsHierarchyDataInclude = false;
    this.fullTreeDataInclude = false;
    this.parentPlaceDataInclude = false;
    this.getOnlyParentPlaces = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.systemComponentToken = data.systemComponentToken ?? "";
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken ?? "";
      this.parentPlaceToken = data.parentPlaceToken ?? "";
      this.placeTypeToken = data.placeTypeToken ?? "";
      this.withUserToken = data.withUserToken ?? "";
      this.notWithUserToken = data.notWithUserToken ?? "";
      this.placeActivityTypeToken = data.placeActivityTypeToken ?? "";
      this.geographicalDistributionDataInclude =
        data.geographicalDistributionDataInclude ?? false;
      this.systemComponentDataInclude =
        data.systemComponentDataInclude ?? false;
      this.systemComponentsHierarchyDataInclude =
        data.systemComponentsHierarchyDataInclude ?? false;
      this.fullTreeDataInclude = data.fullTreeDataInclude ?? false;
      this.parentPlaceDataInclude = data.parentPlaceDataInclude ?? false;
      this.getOnlyParentPlaces = data.getOnlyParentPlaces ?? false;
    } else {
      this.setInitialValue();
    }
  }
}
