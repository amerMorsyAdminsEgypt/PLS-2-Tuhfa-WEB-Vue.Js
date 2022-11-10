import SystemComponentInfoData from "./../../systemConfiguration/systemComponents/SystemComponentInfoData";
import SystemComponentsHierarchyInfoData from "./../../systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchyInfoData";

export default class EducationalCategoryInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.educationalCategoryToken = "";
    this.fullCode = "";
    this.educationalCategoryNameCurrent = "";
    this.educationalCategoryDescriptionCurrent = "";
    this.educationalCategoryImagePath = "";
    this.systemComponentToken = "";
    this.systemComponentData = new SystemComponentInfoData();
    this.systemComponentHierarchyToken = "";
    this.systemComponentsHierarchyData =
      new SystemComponentsHierarchyInfoData();
  }
  fillData(data) {
    if (data) {
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.fullCode = data.fullCode || "";
      this.educationalCategoryNameCurrent =
        data.educationalCategoryNameCurrent || "";
      this.educationalCategoryDescriptionCurrent =
        data.educationalCategoryDescriptionCurrent || "";
      this.educationalCategoryImagePath =
        data.educationalCategoryImagePath || "";
      this.systemComponentToken = data.systemComponentToken || "";
      this.systemComponentData.fillData(data.systemComponentData);
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken || "";
      this.systemComponentsHierarchyData.fillData(
        data.systemComponentsHierarchyData
      );
    } else {
      this.setInitialValue();
    }
  }
}
