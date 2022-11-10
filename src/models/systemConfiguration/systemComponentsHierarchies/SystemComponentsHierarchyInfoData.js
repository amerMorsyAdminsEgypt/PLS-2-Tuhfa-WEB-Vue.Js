export default class SystemComponentsHierarchyInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.systemComponentsHierarchyToken = "";
    this.systemComponentsHierarchyNameCurrent = "";
    this.systemComponentsHierarchyNameAr = "";
    this.systemComponentsHierarchyNameEn = "";
    this.systemComponentsHierarchyNameUnd = "";
  }
  fillData(data) {
    if (data) {
      this.systemComponentsHierarchyToken =
        data.systemComponentsHierarchyToken || "";
      this.systemComponentsHierarchyNameCurrent =
        data.systemComponentsHierarchyNameCurrent || "";
      this.systemComponentsHierarchyNameAr =
        data.systemComponentsHierarchyNameAr || "";
      this.systemComponentsHierarchyNameEn =
        data.systemComponentsHierarchyNameEn || "";
      this.systemComponentsHierarchyNameUnd =
        data.systemComponentsHierarchyNameUnd || "";
    } else {
      this.setInitialValue();
    }
  }
}
