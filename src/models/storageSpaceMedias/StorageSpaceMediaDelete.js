import GeneralDelete from "./../general/GeneralDelete";

export default class StorageSpaceMediaDelete extends GeneralDelete {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.storageSpaceMediaTypeToken = "";
  }
  fillData(data) {
    this.fillGeneralDeleteData(data);
    this.storageSpaceMediaTypeToken = data.storageSpaceMediaTypeToken || "";
  }
}
