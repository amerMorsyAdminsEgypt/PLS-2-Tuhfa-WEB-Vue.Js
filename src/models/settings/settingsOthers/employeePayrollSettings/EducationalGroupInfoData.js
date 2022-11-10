export default class EducationalGroupInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.educationalGroupToken = "";
    this.fullCode = "";
    this.educationalGroupNameCurrent = "";
    this.educationalGroupImagePath = "";
    this.educationalGroupFullImagePath = "";
    this.educationalGroupStartDate = "";
    this.educationalGroupStartTime = "";
    this.educationalGroupEndDate = "";
    this.educationalGroupEndTime = "";
    this.educationalGroupStartDateTimeCustomized = "";
    this.educationalGroupEndDateTimeCustomized = "";
    this.educationalGroupMaximumStudentsNumber = 0;
    this.educationalGroupMinimumStudentsNumber = 0;
    this.educationalGroupDurationCurrent = "";
    this.educationalGroupClosedStateTypeToken = "";
    this.educationalGroupClosedStateTypeNameCurrent = "";
    this.educationalGroupTerminationTypeToken = "";
    this.educationalGroupTerminationTypeNameCurrent = "";
    this.educationalGroupWeekDayData = null;
  }
  fillData(data) {
    if (data) {
      this.educationalGroupToken = data.educationalGroupToken ?? "";
      this.fullCode = data.fullCode ?? "";
      this.educationalGroupNameCurrent = data.educationalGroupNameCurrent ?? "";
      this.educationalGroupImagePath = data.educationalGroupImagePath ?? "";
      this.educationalGroupFullImagePath =
        data.educationalGroupFullImagePath ?? "";
      this.educationalGroupStartDate = data.educationalGroupStartDate ?? "";
      this.educationalGroupStartTime = data.educationalGroupStartTime ?? "";
      this.educationalGroupEndDate = data.educationalGroupEndDate ?? "";
      this.educationalGroupEndTime = data.educationalGroupEndTime ?? "";
      this.educationalGroupStartDateTimeCustomized =
        data.educationalGroupStartDateTimeCustomized ?? "";
      this.educationalGroupEndDateTimeCustomized =
        data.educationalGroupEndDateTimeCustomized ?? "";
      this.educationalGroupMaximumStudentsNumber =
        data.educationalGroupMaximumStudentsNumber ?? 0;
      this.educationalGroupMinimumStudentsNumber =
        data.educationalGroupMinimumStudentsNumber ?? 0;
      this.educationalGroupDurationCurrent =
        data.educationalGroupDurationCurrent ?? "";
      this.educationalGroupClosedStateTypeToken =
        data.educationalGroupClosedStateTypeToken ?? "";
      this.educationalGroupClosedStateTypeNameCurrent =
        data.educationalGroupClosedStateTypeNameCurrent ?? "";
      this.educationalGroupTerminationTypeToken =
        data.educationalGroupTerminationTypeToken ?? "";
      this.educationalGroupTerminationTypeNameCurrent =
        data.educationalGroupTerminationTypeNameCurrent ?? "";
      this.educationalGroupWeekDayData =
        data.educationalGroupWeekDayData ?? null;
    } else {
      this.setInitialValue();
    }
  }
}
