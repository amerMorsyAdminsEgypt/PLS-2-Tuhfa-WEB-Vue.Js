export default class EducationalCategoryInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.educationalCategoryToken = "";
    this.fullCode = "";
    this.educationalCategoryNameCurrent = "";
    this.educationalCategoryDescriptionCurrent = "";
    this.educationalCategoryImageIsDefault = "";
    this.educationalCategoryImageSizeBytes = "";
    this.educationalCategoryImagePath = "";
    this.educationalCategoryFullImagePath = "";
    this.educationalCategoryImageSizeTextCurrent = "";
    this.systemComponentToken = "";
    this.systemComponentNameCurrent = "";
    this.systemComponentHierarchyToken = "";
    this.systemComponentHierarchyNameCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.fullCode = data.fullCode ?? "";
      this.educationalCategoryNameCurrent =
        data.educationalCategoryNameCurrent ?? "";
      this.educationalCategoryDescriptionCurrent =
        data.educationalCategoryDescriptionCurrent ?? "";
      this.educationalCategoryImageIsDefault =
        data.educationalCategoryImageIsDefault ?? "";
      this.educationalCategoryImageSizeBytes =
        data.educationalCategoryImageSizeBytes ?? "";
      this.educationalCategoryImagePath =
        data.educationalCategoryImagePath ?? "";
      this.educationalCategoryFullImagePath =
        data.educationalCategoryFullImagePath ?? "";
      this.educationalCategoryImageSizeTextCurrent =
        data.educationalCategoryImageSizeTextCurrent ?? "";
      this.systemComponentToken = data.systemComponentToken ?? "";
      this.systemComponentNameCurrent = data.systemComponentNameCurrent ?? "";
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken ?? "";
      this.systemComponentHierarchyNameCurrent =
        data.systemComponentHierarchyNameCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
