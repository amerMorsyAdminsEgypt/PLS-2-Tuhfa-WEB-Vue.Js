import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
// import store from "./../../store";

export default class SharedMediaWithSpaceStorageMediasFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.sharedMediaToken = "";
    this.storageSpaceMediaToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.sharedMediaToken = data.sharedMediaToken ?? "";
      this.storageSpaceMediaToken = data.storageSpaceMediaToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
