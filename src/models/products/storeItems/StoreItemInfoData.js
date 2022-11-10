export default class StoreItemInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.storeItemToken = "";
    this.fullCode = "";
    this.storeItemNameCurrent = "";
    this.storeItemDescriptionCurrent = "";
    this.storeItemImagePath = "";
    this.storeItemFullImagePath = "";
    this.systemComponentToken = "";
    this.systemComponentNameCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.storeItemToken = data.storeItemToken ?? "";
      this.fullCode = data.fullCode ?? "";
      this.storeItemNameCurrent = data.storeItemNameCurrent ?? "";
      this.storeItemDescriptionCurrent = data.storeItemDescriptionCurrent ?? "";
      this.storeItemImagePath = data.storeItemImagePath ?? "";
      this.storeItemFullImagePath = data.storeItemFullImagePath ?? "";
      this.systemComponentToken = data.systemComponentToken ?? "";
      this.systemComponentNameCurrent = data.systemComponentNameCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
