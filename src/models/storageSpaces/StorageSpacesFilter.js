import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
// import store from "./../../store";

export default class StorageSpacesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    // this.activationTypeTokens =
    //   store.getters.generalSetting.storageSpaces.activationTypeTokens || [];
    this.storageSpaceTypeToken = "";
    this.mainDataInclude = true;
    this.mainToken = "";
    this.storageSpaceParentDataInclude = "";
    this.storageSpaceParentToken = "";
    this.storageSpaceToken = "";
    this.getOnlyChildStatus = false;
    this.getOnlyParentStatus = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.storageSpaceTypeToken = data.storageSpaceTypeToken || "";
      this.mainToken = data.mainToken || "";
      this.storageSpaceParentDataInclude =
        data.storageSpaceParentDataInclude || "";
      this.storageSpaceParentToken = data.storageSpaceParentToken || "";
      this.storageSpaceToken = data.storageSpaceToken || "";
      this.getOnlyChildStatus = data.getOnlyChildStatus || false;
      this.getOnlyParentStatus = data.getOnlyParentStatus || false;
    } else {
      this.setInitialValue();
    }
  }
}
