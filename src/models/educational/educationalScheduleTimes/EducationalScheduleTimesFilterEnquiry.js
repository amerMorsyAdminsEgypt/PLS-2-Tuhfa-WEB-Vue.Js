export default class EducationalScheduleTimesFilterEnquiry {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.educationalGroupToken = "";
    this.dateTimeFrom = "";
    this.dateTimeTo = "";
  }
  fillData(data) {
    if (data) {
      this.educationalGroupToken = data.educationalGroupToken || "";
      this.dateTimeFrom = data.dateTimeFrom || "";
      this.dateTimeTo = data.dateTimeTo || "";
    } else {
      this.setInitialValue();
    }
  }
}
