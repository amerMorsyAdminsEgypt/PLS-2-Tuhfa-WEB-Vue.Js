import BaseEntityModel from "./../../general/BaseEntityModel";
import EducationalScheduleTimeInfoData from "./../educationalScheduleTimes/EducationalScheduleTimeInfoData";
import UserInfoData from "./../../users/UserInfoData";
import defaultImg from "@/assets/images/EducationalGroupAttendances.svg";

export default class EducationalGroupAttendance extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.educationalGroupAttendanceToken = "";
    this.attendanceTypeToken = "";
    this.attendanceTypeNameCurrent = "";
    this.attendFromDateTime = "";
    this.attendFromCustomized = "";
    this.attendFromDate = "";
    this.attendFromTime = "";
    this.attendToDateTime = "";
    this.attendToCustomized = "";
    this.attendToDate = "";
    this.attendToTime = "";
    this.durationCurrent = "";
    this.educationalGroupAttendanceNotes = "";
    this.userToken = "";
    this.userInfoData = new UserInfoData();
    this.educationalGroupToken = ""; // add by me
    this.educationalGroupTokenAlternative = ""; // add by me
    this.educationalScheduleTimeToken = "";
    this.educationalScheduleTimeInfoData =
      new EducationalScheduleTimeInfoData();
    this.alternativeEducationalScheduleTimeToken = "";
    this.alternativeEducationalScheduleTimeInfoData =
      new EducationalScheduleTimeInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.educationalGroupAttendanceToken =
        data.educationalGroupAttendanceToken || "";
      this.attendanceTypeToken = data.attendanceTypeToken || "";
      this.attendanceTypeNameCurrent = data.attendanceTypeNameCurrent || "";
      this.attendFromDateTime = data.attendFromDateTime || "";
      this.attendFromCustomized = data.attendFromCustomized || "";
      this.attendFromDate = data.attendFromDate || "";
      this.attendFromTime = data.attendFromTime || "";
      this.attendToDateTime = data.attendToDateTime || "";
      this.attendToCustomized = data.attendToCustomized || "";
      this.attendToDate = data.attendToDate || "";
      this.attendToTime = data.attendToTime || "";
      this.durationCurrent = data.durationCurrent || "";
      this.educationalGroupAttendanceNotes =
        data.educationalGroupAttendanceNotes || "";
      this.userToken = data.userToken || "";
      this.userInfoData.fillData(data.userInfoData);
      this.educationalGroupToken = data.educationalGroupToken || "";
      this.educationalGroupTokenAlternative =
        data.educationalGroupTokenAlternative || "";
      this.educationalScheduleTimeToken =
        data.educationalScheduleTimeToken || "";
      this.educationalScheduleTimeInfoData.fillData(
        data.educationalScheduleTimeInfoData
      );
      this.alternativeEducationalScheduleTimeToken =
        data.alternativeEducationalScheduleTimeToken || "";
      this.alternativeEducationalScheduleTimeInfoData.fillData(
        data.alternativeEducationalScheduleTimeInfoData
      );
    } else {
      this.setInitialValue();
    }
  }
}
