export default class GradingPlanSlicesData {
  constructor() {
    this.setInitialGradingPlanSlicesDataValue();
  }
  setInitialGradingPlanSlicesDataValue() {
    this.degreeFrom = 0;
    this.degreeTo = "";
    this.degreeNameAr = "";
    this.degreeNameEn = "";
    this.degreeNameUnd = "";
    this.degreeNotes = "";
  }
  fillGradingPlanSlicesData(data) {
    if (data) {
      this.degreeFrom = data.degreeFrom ?? 0;
      this.degreeTo = data.degreeTo ?? "";
      this.degreeNameAr = data.degreeNameAr ?? "";
      this.degreeNameEn = data.degreeNameEn ?? "";
      this.degreeNameUnd = data.degreeNameUnd ?? "";
      this.degreeNotes = data.degreeNotes ?? "";
    } else {
      this.setInitialGradingPlanSlicesDataValue();
    }
  }
}
