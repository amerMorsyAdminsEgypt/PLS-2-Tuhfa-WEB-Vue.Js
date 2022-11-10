import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class EducationalGroupAttendancesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.educationalGroupAttendances
        .activationTypeTokens || [];
    this.educationalGroupAttendanceToken = "";
    this.userToken = "";
    this.userTypeToken = "";
    this.educationalGroupToken = "";
    this.educationalScheduleTimeToken = "";
    this.alternativeEducationalScheduleTimeToken = "";
    this.startAttendDateTimeFrom = "";
    this.startAttendDateTimeTo = "";
    this.endAttendDateTimeFrom = "";
    this.endAttendDateTimeTo = "";
    this.userInfoDataInclude = false;
    this.educationalScheduleTimeInfoDataInclude = false;
    this.alternativeEducationalScheduleTimeInfoDataInclude = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.educationalGroupAttendanceToken =
        data.educationalGroupAttendanceToken || "";
      this.userToken = data.userToken || "";
      this.userTypeToken = data.userTypeToken || "";
      this.educationalGroupToken = data.educationalGroupToken || "";
      this.educationalScheduleTimeToken =
        data.educationalScheduleTimeToken || "";
      this.alternativeEducationalScheduleTimeToken =
        data.alternativeEducationalScheduleTimeToken || "";
      this.startAttendDateTimeFrom = data.startAttendDateTimeFrom || "";
      this.startAttendDateTimeTo = data.startAttendDateTimeTo || "";
      this.endAttendDateTimeFrom = data.endAttendDateTimeFrom || "";
      this.endAttendDateTimeTo = data.endAttendDateTimeTo || "";
      this.userInfoDataInclude = data.userInfoDataInclude || false;
      this.educationalScheduleTimeInfoDataInclude =
        data.educationalScheduleTimeInfoDataInclude || false;
      this.alternativeEducationalScheduleTimeInfoDataInclude =
        data.alternativeEducationalScheduleTimeInfoDataInclude || false;
    } else {
      this.setInitialValue();
    }
  }
}
