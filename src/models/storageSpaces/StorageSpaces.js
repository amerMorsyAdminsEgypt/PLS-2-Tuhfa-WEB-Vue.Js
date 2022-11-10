import GeneralModel from "./../general/GeneralModel";
import StorageSpace from "./StorageSpace";
import StorageSpacesFilter from "./StorageSpacesFilter";

export default class StorageSpaces extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.storageSpacesData = [];
    this.storageSpace = new StorageSpace();
    this.filterData = new StorageSpacesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.storageSpacesData = data.storageSpacesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
