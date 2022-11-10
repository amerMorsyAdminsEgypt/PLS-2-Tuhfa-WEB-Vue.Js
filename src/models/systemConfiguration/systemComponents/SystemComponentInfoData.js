export default class SystemComponentInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.systemComponentToken = "";
    this.systemComponentNameCurrent = "";
    this.systemComponentNameAr = "";
    this.systemComponentNameEn = "";
    this.systemComponentNameUnd = "";
  }
  fillData(data) {
    if (data) {
      this.systemComponentToken = data.systemComponentToken || "";
      this.systemComponentNameCurrent = data.systemComponentNameCurrent || "";
      this.systemComponentNameAr = data.systemComponentNameAr || "";
      this.systemComponentNameEn = data.systemComponentNameEn || "";
      this.systemComponentNameUnd = data.systemComponentNameUnd || "";
    } else {
      this.setInitialValue();
    }
  }
}
