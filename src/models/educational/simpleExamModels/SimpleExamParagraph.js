export default class SimpleExamParagraph {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    // this.simpleExamParagraphToken = "";
    this.simpleExamParagraphTextCurrent = "";
    this.simpleExamParagraphTitleAr = "";
    this.simpleExamParagraphTitleEn = "";
    this.simpleExamParagraphTitleUnd = "";
    this.simpleExamParagraphDescriptionCurrent = "";
    this.simpleExamParagraphDescriptionAr = "";
    this.simpleExamParagraphDescriptionEn = "";
    this.simpleExamParagraphDescriptionUnd = "";
    this.simpleExamParagraphDegree = 0;
    this.mcqQuestionsDegree = 0;
    this.trueFalseDegree = 0;
    this.trueFalseQuestionsData = [];
    this.mcqQuestionsData = [];
  }
  fillData(data) {
    if (data) {
      // this.simpleExamParagraphToken = data.simpleExamParagraphToken || "";
      this.simpleExamParagraphTextCurrent =
        data.simpleExamParagraphTextCurrent || "";
      this.simpleExamParagraphTitleAr = data.simpleExamParagraphTitleAr || "";
      this.simpleExamParagraphTitleEn = data.simpleExamParagraphTitleEn || "";
      this.simpleExamParagraphTitleUnd = data.simpleExamParagraphTitleUnd || "";
      this.simpleExamParagraphDescriptionCurrent =
        data.simpleExamParagraphDescriptionCurrent || "";
      this.simpleExamParagraphDescriptionAr =
        data.simpleExamParagraphDescriptionAr || "";
      this.simpleExamParagraphDescriptionEn =
        data.simpleExamParagraphDescriptionEn || "";
      this.simpleExamParagraphDescriptionUnd =
        data.simpleExamParagraphDescriptionUnd || "";
      this.simpleExamParagraphDegree = data.simpleExamParagraphDegree || 0;
      this.mcqQuestionsDegree = data.mcqQuestionsDegree || 0;
      this.trueFalseDegree = data.trueFalseDegree || 0;
      this.trueFalseQuestionsData = data.trueFalseQuestionsData || [];
      this.mcqQuestionsData = data.mcqQuestionsData || [];
    } else {
      this.setInitialValue();
    }
  }
}
