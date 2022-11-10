export default class TrueFalseQuestion {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    // this.trueFalseQuestionToken = "";
    this.trueFalseQuestionTextCurrent = "";
    this.trueFalseQuestionTextAr = "";
    this.trueFalseQuestionTextEn = "";
    this.trueFalseQuestionTextUnd = "";
    this.trueFalseDescriptionCurrent = "";
    this.trueFalseDescriptionAr = "";
    this.trueFalseDescriptionEn = "";
    this.trueFalseDescriptionUnd = "";
    this.questionDegree = 0;
    this.correctAnswer = false;
  }
  fillData(data) {
    if (data) {
      // this.trueFalseQuestionToken = data.trueFalseQuestionToken || "";
      this.trueFalseQuestionTextCurrent =
        data.trueFalseQuestionTextCurrent || "";
      this.trueFalseQuestionTextAr = data.trueFalseQuestionTextAr || "";
      this.trueFalseQuestionTextEn = data.trueFalseQuestionTextEn || "";
      this.trueFalseQuestionTextUnd = data.trueFalseQuestionTextUnd || "";
      this.trueFalseDescriptionCurrent = data.trueFalseDescriptionCurrent || "";
      this.trueFalseDescriptionAr = data.trueFalseDescriptionAr || "";
      this.trueFalseDescriptionEn = data.trueFalseDescriptionEn || "";
      this.trueFalseDescriptionUnd = data.trueFalseDescriptionUnd || "";
      this.questionDegree = data.questionDegree || 0;
      this.correctAnswer = data.correctAnswer || false;
    } else {
      this.setInitialValue();
    }
  }
}
