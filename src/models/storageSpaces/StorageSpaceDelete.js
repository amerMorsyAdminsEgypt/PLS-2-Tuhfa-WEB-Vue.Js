import GeneralDelete from "./../general/GeneralDelete";

export default class StorageSpaceDelete extends GeneralDelete {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.storageSpaceTypeToken = "";
  }
  fillData(data) {
    this.fillGeneralDeleteData(data);
    this.storageSpaceTypeToken = data.storageSpaceTypeToken || "";
  }
}
