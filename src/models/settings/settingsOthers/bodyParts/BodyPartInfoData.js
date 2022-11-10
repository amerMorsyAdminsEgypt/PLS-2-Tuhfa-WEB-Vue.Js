import SystemComponentInfoData from "./../../../systemConfiguration/systemComponents/SystemComponentInfoData";
import SystemComponentsHierarchyInfoData from "./../../../systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchyInfoData";

export default class BodyPartInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.fullCode = "";
    this.bodyPartToken = "";
    this.bodyPartNameCurrent = "";
    this.bodyPartNameEn = "";
    this.bodyPartNameAr = "";
    this.bodyPartNameUnd = "";
    this.systemComponentToken = "";
    this.systemComponentHierarchyToken = "";
    this.systemComponentData = new SystemComponentInfoData();
    this.systemComponentsHierarchyData =
      new SystemComponentsHierarchyInfoData();
  }
  fillData(data) {
    if (data) {
      this.fullCode = data.fullCode ?? "";
      this.bodyPartToken = data.bodyPartToken ?? "";
      this.bodyPartNameCurrent = data.bodyPartNameCurrent ?? "";
      this.bodyPartNameEn = data.bodyPartNameEn ?? "";
      this.bodyPartNameAr = data.bodyPartNameAr ?? "";
      this.bodyPartNameUnd = data.bodyPartNameUnd ?? "";
      this.systemComponentToken = data.systemComponentToken ?? "";
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken ?? "";
      this.systemComponentData.fillData(data.systemComponentData);
      this.systemComponentsHierarchyData.fillData(
        data.systemComponentsHierarchyData
      );
    } else {
      this.setInitialValue();
    }
  }
}
