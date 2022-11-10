export default class EducationalGroupAttendanceUser {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userToken = "";
    this.attendanceTypeToken = "";
    this.attendFromDateTime = "";
    this.attendToDateTime = "";
    this.educationalGroupAttendanceNotes = "";
  }
  fillData(data) {
    this.userToken = data.userToken || "";
    this.attendanceTypeToken = data.attendanceTypeToken || "";
    this.attendFromDateTime = data.attendFromDateTime || "";
    this.attendToDateTime = data.attendToDateTime || "";
    this.educationalGroupAttendanceNotes =
      data.educationalGroupAttendanceNotes || "";
  }
}
