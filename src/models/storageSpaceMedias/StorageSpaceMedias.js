import StorageSpaceMediaGeneralModel from "./StorageSpaceMediaGeneralModel";
import StorageSpaceMedia from "./StorageSpaceMedia";
import StorageSpaceMediasFilter from "./StorageSpaceMediasFilter";

export default class StorageSpaceMedias extends StorageSpaceMediaGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.storageSpaceMediaData = [];
    this.storageSpaceMedia = new StorageSpaceMedia();
    this.filterData = new StorageSpaceMediasFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.storageSpaceMediaData = data.storageSpaceMediaData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
