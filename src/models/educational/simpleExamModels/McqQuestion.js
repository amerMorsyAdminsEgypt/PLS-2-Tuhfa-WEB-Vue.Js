export default class McqQuestion {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    // this.mcqQuestionToken = "";
    this.mcqQuestionTextCurrent = "";
    this.mcqQuestionTextAr = "";
    this.mcqQuestionTextEn = "";
    this.mcqQuestionTextUnd = "";
    this.mcqQuestionDescriptionCurrent = "";
    this.mcqQuestionDescriptionAr = "";
    this.mcqQuestionDescriptionEn = "";
    this.mcqQuestionDescriptionUnd = "";
    this.questionDegree = 0;
    this.aAnswerCurrent = "";
    this.aAnswerAr = "";
    this.aAnswerEn = "";
    this.aAnswerUnd = "";
    this.aAnswerAppearanceStatus = false;
    this.aCorrectAnswer = false;
    this.bAnswerCurrent = "";
    this.bAnswerAr = "";
    this.bAnswerEn = "";
    this.bAnswerUnd = "";
    this.bAnswerAppearanceStatus = false;
    this.bCorrectAnswer = false;
    this.cAnswerCurrent = "";
    this.cAnswerAr = "";
    this.cAnswerEn = "";
    this.cAnswerUnd = "";
    this.cAnswerAppearanceStatus = false;
    this.cCorrectAnswer = false;
    this.dAnswerCurrent = "";
    this.dAnswerAr = "";
    this.dAnswerEn = "";
    this.dAnswerUnd = "";
    this.dAnswerAppearanceStatus = false;
    this.dCorrectAnswer = false;
  }
  fillData(data) {
    if (data) {
      // this.mcqQuestionToken = data.mcqQuestionToken || "";
      this.mcqQuestionTextCurrent = data.mcqQuestionTextCurrent || "";
      this.mcqQuestionTextAr = data.mcqQuestionTextAr || "";
      this.mcqQuestionTextEn = data.mcqQuestionTextEn || "";
      this.mcqQuestionTextUnd = data.mcqQuestionTextUnd || "";
      this.mcqQuestionDescriptionCurrent =
        data.mcqQuestionDescriptionCurrent || "";
      this.mcqQuestionDescriptionAr = data.mcqQuestionDescriptionAr || "";
      this.mcqQuestionDescriptionEn = data.mcqQuestionDescriptionEn || "";
      this.mcqQuestionDescriptionUnd = data.mcqQuestionDescriptionUnd || "";
      this.questionDegree = data.questionDegree || 0;
      this.aAnswerCurrent = data.aAnswerCurrent || "";
      this.aAnswerAr = data.aAnswerAr || "";
      this.aAnswerEn = data.aAnswerEn || "";
      this.aAnswerUnd = data.aAnswerUnd || "";
      this.aAnswerAppearanceStatus = data.aAnswerAppearanceStatus || false;
      this.aCorrectAnswer = data.aCorrectAnswer || false;
      this.bAnswerCurrent = data.bAnswerCurrent || "";
      this.bAnswerAr = data.bAnswerAr || "";
      this.bAnswerEn = data.bAnswerEn || "";
      this.bAnswerUnd = data.bAnswerUnd || "";
      this.bAnswerAppearanceStatus = data.bAnswerAppearanceStatus || false;
      this.bCorrectAnswer = data.bCorrectAnswer || false;
      this.cAnswerCurrent = data.cAnswerCurrent || "";
      this.cAnswerAr = data.cAnswerAr || "";
      this.cAnswerEn = data.cAnswerEn || "";
      this.cAnswerUnd = data.cAnswerUnd || "";
      this.cAnswerAppearanceStatus = data.cAnswerAppearanceStatus || false;
      this.cCorrectAnswer = data.cCorrectAnswer || false;
      this.dAnswerCurrent = data.dAnswerCurrent || "";
      this.dAnswerAr = data.dAnswerAr || "";
      this.dAnswerEn = data.dAnswerEn || "";
      this.dAnswerUnd = data.dAnswerUnd || "";
      this.dAnswerAppearanceStatus = data.dAnswerAppearanceStatus || false;
      this.dCorrectAnswer = data.dCorrectAnswer || false;
    } else {
      this.setInitialValue();
    }
  }
}
