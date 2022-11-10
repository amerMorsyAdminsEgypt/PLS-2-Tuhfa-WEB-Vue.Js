import BaseEntityModel from "./../../general/BaseEntityModel";
import EducationalGroupInfoData from "./../educationalGroups/EducationalGroupInfoData";
import PlaceInfoData from "./../../places/PlaceInfoData";
import defaultImg from "@/assets/images/EducationalScheduleTimes.svg";

export default class EducationalScheduleTime extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.educationalScheduleTimeToken = "";
    this.educationalScheduleTimeNameCurrent = "";
    this.educationalScheduleTimeNameAr = "";
    this.educationalScheduleTimeNameEn = "";
    this.educationalScheduleTimeNameUnd = "";
    this.educationalScheduleTimeDescriptionCurrent = "";
    this.educationalScheduleTimeDescriptionAr = "";
    this.educationalScheduleTimeDescriptionEn = "";
    this.educationalScheduleTimeDescriptionUnd = "";
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
    this.educationalGroupToken = "";
    this.educationalGroupInfoData = new EducationalGroupInfoData();
    this.placeToken = "";
    this.placeInfoData = new PlaceInfoData();
    this.employeesData = [];
    this.studentsData = [];
    this.educationalScheduleTimeRatingStatisticData = null;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.educationalScheduleTimeToken =
        data.educationalScheduleTimeToken || "";
      this.educationalScheduleTimeNameCurrent =
        data.educationalScheduleTimeNameCurrent || "";
      this.educationalScheduleTimeNameAr =
        data.educationalScheduleTimeNameAr || "";
      this.educationalScheduleTimeNameEn =
        data.educationalScheduleTimeNameEn || "";
      this.educationalScheduleTimeNameUnd =
        data.educationalScheduleTimeNameUnd || "";
      this.educationalScheduleTimeDescriptionCurrent =
        data.educationalScheduleTimeDescriptionCurrent || "";
      this.educationalScheduleTimeDescriptionAr =
        data.educationalScheduleTimeDescriptionAr || "";
      this.educationalScheduleTimeDescriptionEn =
        data.educationalScheduleTimeDescriptionEn || "";
      this.educationalScheduleTimeDescriptionUnd =
        data.educationalScheduleTimeDescriptionUnd || "";
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
      this.educationalGroupToken = data.educationalGroupToken || "";
      this.educationalGroupInfoData.fillData(data.educationalGroupInfoData);
      this.placeToken = data.placeToken || "";
      this.placeInfoData.fillData(data.placeInfoData);
      this.employeesData = data.employeesData || [];
      this.studentsData = data.studentsData || [];
      this.educationalScheduleTimeRatingStatisticData =
        data.educationalScheduleTimeRatingStatisticData || null;
    } else {
      this.setInitialValue();
    }
  }
}
