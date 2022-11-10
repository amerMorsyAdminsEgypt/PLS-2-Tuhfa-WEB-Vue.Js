import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
// import store from "./../../store";

export default class StorageSpaceMediasFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    // this.activationTypeTokens =
    //   store.getters.generalSetting.storageSpaces.activationTypeTokens || [];
    this.storageSpaceMediaTypeToken = "";
    this.storageSpaceToken = "";
    this.storageSpaceMediaToken = "";
    this.storageSpaceDataInclude = false;
    this.storageSpaceMediaFileTypeToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.storageSpaceMediaTypeToken = data.storageSpaceMediaTypeToken || "";
      this.storageSpaceToken = data.storageSpaceToken || "";
      this.storageSpaceMediaToken = data.storageSpaceMediaToken || "";
      this.storageSpaceDataInclude = data.storageSpaceDataInclude || false;
      this.storageSpaceMediaFileTypeToken =
        data.storageSpaceMediaFileTypeToken || "";
    } else {
      this.setInitialValue();
    }
  }
}
