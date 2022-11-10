export default class SimpleExamModelInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.simpleExamModelToken = "";
    this.fullCode = "";
    this.simpleExamModelTitleCurrent = "";
    this.simpleExamModelDescriptionCurrent = "";
    this.simpleExamModelNotes = "";
    this.simpleExamModelImageIsDefault = "";
    this.simpleExamModelImagePath = "";
    this.simpleExamModelImageSizeBytes = "";
    this.examTypeToken = "";
    this.examTypeNameCurrent = "";
    this.simpleExamModelImageSizeTextCurrent = "";
    this.simpleExamModelDegree = "";
  }
  fillData(data) {
    if (data) {
      this.simpleExamModelToken = data.simpleExamModelToken || "";
      this.fullCode = data.fullCode || "";
      this.simpleExamModelTitleCurrent = data.simpleExamModelTitleCurrent || "";
      this.simpleExamModelDescriptionCurrent =
        data.simpleExamModelDescriptionCurrent || "";
      this.simpleExamModelNotes = data.simpleExamModelNotes || "";
      this.simpleExamModelImageIsDefault =
        data.simpleExamModelImageIsDefault || "";
      this.simpleExamModelImagePath = data.simpleExamModelImagePath || "";
      this.simpleExamModelImageSizeBytes =
        data.simpleExamModelImageSizeBytes || "";
      this.examTypeToken = data.examTypeToken || "";
      this.examTypeNameCurrent = data.examTypeNameCurrent || "";
      this.simpleExamModelImageSizeTextCurrent =
        data.simpleExamModelImageSizeTextCurrent || "";
      this.simpleExamModelDegree = data.simpleExamModelDegree || "";
    } else {
      this.setInitialValue();
    }
  }
}
