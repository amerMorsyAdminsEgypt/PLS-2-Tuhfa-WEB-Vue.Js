import { getUserAuthorizeToken } from "./../../../utils/functions";
import defaultImg from "@/assets/images/EducationalGroupAttendances.svg";

export default class EducationalGroupAttendanceModelUpdate {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userAuthorizeToken = getUserAuthorizeToken();
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
    this.userTypeToken = "";
    this.userNameCurrent = "";
    // this.priceListToken = "";
    // this.payMoneyInAttendanceStatus = "";
    // this.accountToken = "";
    // this.paymentMethodToken = "";
    this.educationalScheduleTimeToken = "";
    this.alternativeEducationalScheduleTimeToken = "";
  }
  fillData(data) {
    if (data) {
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
      this.userTypeToken = data.userInfoData
        ? data.userInfoData.userTypeToken || ""
        : "";
      this.userNameCurrent = data.userInfoData
        ? data.userInfoData.userNameCurrent || ""
        : "";
      // this.priceListToken = data.priceListToken ?? "";
      // this.payMoneyInAttendanceStatus = data.payMoneyInAttendanceStatus ?? "";
      // this.accountToken = data.accountToken ?? "";
      // this.paymentMethodToken = data.paymentMethodToken ?? "";
      this.educationalScheduleTimeToken =
        data.educationalScheduleTimeToken || "";
      this.alternativeEducationalScheduleTimeToken =
        data.alternativeEducationalScheduleTimeToken || "";
    } else {
      this.setInitialValue();
    }
  }
}
