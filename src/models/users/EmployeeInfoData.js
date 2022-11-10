export default class EmployeesInfoData {
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
    } else {
      this.setInitialValue();
    }
  }
}
