// import EmployeeInfoData from "./../../users/EmployeeInfoData";

export default class EducationalGroupWeekDay {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.dayToken = "";
    this.timeFrom = "";
    this.timeFromUTC = "";
    this.timeFromByRequestTimeZone = "";
    this.timeTo = "";
    this.timeToUTC = "";
    this.timeToByRequestTimeZone = "";
    this.timeDurationCurrent = "";
    this.timeZoneToken = "";
    this.timeZoneNameCurrent = "";
    this.appointmentTypeToken = "";
    this.appointmentTypeNameCurrent = "";
    this.maximumNumberOfStudents = 0;
    this.maximumNumberOfStudentsStatus = false;
    this.minimumNumberOfStudents = 0;
    this.minimumNumberOfStudentsStatus = false;
    this.totalNumberOfStudents = 0;
    this.employeesTokens = [];
    this.employeesInfoData = [];
    // this.employeesInfoData = [new EmployeeInfoData()];
  }
  fillData(data) {
    if (data) {
      this.dayToken = data.dayToken || "";
      this.timeFrom = data.timeFrom || "";
      this.timeFromUTC = data.timeFromUTC || "";
      this.timeFromByRequestTimeZone = data.timeFromByRequestTimeZone || "";
      this.timeTo = data.timeTo || "";
      this.timeToUTC = data.timeToUTC || "";
      this.timeToByRequestTimeZone = data.timeToByRequestTimeZone || "";
      this.timeDurationCurrent = data.timeDurationCurrent || "";
      this.timeZoneToken = data.timeZoneToken || "";
      this.timeZoneNameCurrent = data.timeZoneNameCurrent || "";
      this.appointmentTypeToken = data.appointmentTypeToken || "";
      this.appointmentTypeNameCurrent = data.appointmentTypeNameCurrent || "";
      this.maximumNumberOfStudents = data.maximumNumberOfStudents || 0;
      this.maximumNumberOfStudentsStatus =
        data.maximumNumberOfStudentsStatus || false;
      this.minimumNumberOfStudents = data.minimumNumberOfStudents || 0;
      this.minimumNumberOfStudentsStatus =
        data.minimumNumberOfStudentsStatus || false;
      this.totalNumberOfStudents = data.totalNumberOfStudents || 0;
      this.employeesTokens = data.employeesTokens || [];
    } else {
      this.setInitialValue();
    }
  }
}
