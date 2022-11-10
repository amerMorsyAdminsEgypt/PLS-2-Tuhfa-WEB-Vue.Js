export default class JobGradeInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.jobGradeToken = "";
    this.jobGradeNameCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.jobGradeToken = data.jobGradeToken ?? "";
      this.jobGradeNameCurrent = data.jobGradeNameCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
