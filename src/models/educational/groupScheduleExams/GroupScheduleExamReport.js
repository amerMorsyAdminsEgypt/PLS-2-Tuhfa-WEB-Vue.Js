import icon from "@/assets/images/print.svg";

export default class GroupScheduleExamReport {
  icon = icon;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.token = "";
    this.sendTo = "";
    this.isModelAnswers = false;
  }
  fillData(data) {
    if (data) {
      this.token = data.groupScheduleExamToken || "";
      this.sendTo = data.sendTo || "";
      this.isModelAnswers = data.isModelAnswers || false;
    } else {
      this.setInitialValue();
    }
  }
}
