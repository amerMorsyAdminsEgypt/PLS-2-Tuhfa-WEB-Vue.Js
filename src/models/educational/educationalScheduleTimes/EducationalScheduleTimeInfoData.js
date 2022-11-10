export default class EducationalScheduleTimeInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.educationalScheduleTimeToken = "";
    this.fullCode = "";
    this.educationalScheduleTimeNameCurrent = "";
    this.educationalScheduleTimeDescriptionCurrent = "";
    this.educationalScheduleTimeNotes = "";
    this.dateTimeFrom = "";
    this.dateTimeFromCustomized = "";
    this.dateTimeFromDate = "";
    this.dateTimeFromTime = "";
    this.dateTimeTo = "";
    this.dateTimeToCustomized = "";
    this.dateTimeToDate = "";
    this.dateTimeToTime = "";
    this.durationCurrent = "";
    this.appointmentTypeToken = "";
    this.appointmentTypeNameCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.educationalScheduleTimeToken =
        data.educationalScheduleTimeToken || "";
      this.fullCode = data.fullCode || "";
      this.educationalScheduleTimeNameCurrent =
        data.educationalScheduleTimeNameCurrent || "";
      this.educationalScheduleTimeDescriptionCurrent =
        data.educationalScheduleTimeDescriptionCurrent || "";
      this.educationalScheduleTimeNotes =
        data.educationalScheduleTimeNotes || "";
      this.dateTimeFrom = data.dateTimeFrom || "";
      this.dateTimeFromCustomized = data.dateTimeFromCustomized || "";
      this.dateTimeFromDate = data.dateTimeFromDate || "";
      this.dateTimeFromTime = data.dateTimeFromTime || "";
      this.dateTimeTo = data.dateTimeTo || "";
      this.dateTimeToCustomized = data.dateTimeToCustomized || "";
      this.dateTimeToDate = data.dateTimeToDate || "";
      this.dateTimeToTime = data.dateTimeToTime || "";
      this.durationCurrent = data.durationCurrent || "";
      this.appointmentTypeToken = data.appointmentTypeToken || "";
      this.appointmentTypeNameCurrent = data.appointmentTypeNameCurrent || "";
    } else {
      this.setInitialValue();
    }
  }
}
