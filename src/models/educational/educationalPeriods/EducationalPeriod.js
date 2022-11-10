import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/educationalPeriods.svg";

export default class EducationalPeriod extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.educationalPeriodToken = "";
    this.educationalPeriodNameCurrent = "";
    this.educationalPeriodNameAr = "";
    this.educationalPeriodNameEn = "";
    this.educationalPeriodNameUnd = "";
    this.educationalPeriodDescriptionCurrent = "";
    this.educationalPeriodDescriptionAr = "";
    this.educationalPeriodDescriptionEn = "";
    this.educationalPeriodDescriptionUnd = "";
    this.educationalPeriodNotes = "";
    this.educationalPeriodImageIsDefault = false;
    this.educationalPeriodImagePath = "";
    this.educationalPeriodImageSizeBytes = "";
    this.educationalPeriodImageSizeTextCurrent = "";
    this.closedStateTypeToken = "";
    this.closedStateTypeNameCurrent = "";
    this.educationalPeriodStartDateTime = "";
    this.educationalPeriodStartDateTimeCustomized = "";
    this.educationalPeriodStartDate = "";
    this.educationalPeriodStartTime = "";
    this.educationalPeriodEndDateTime = "";
    this.educationalPeriodEndDateTimeCustomized = "";
    this.educationalPeriodEndDate = "";
    this.educationalPeriodEndTime = "";
    this.educationalPeriodDurationCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.educationalPeriodToken = data.educationalPeriodToken ?? "";
      this.educationalPeriodNameCurrent =
        data.educationalPeriodNameCurrent ?? "";
      this.educationalPeriodNameAr = data.educationalPeriodNameAr ?? "";
      this.educationalPeriodNameEn = data.educationalPeriodNameEn ?? "";
      this.educationalPeriodNameUnd = data.educationalPeriodNameUnd ?? "";
      this.educationalPeriodDescriptionCurrent =
        data.educationalPeriodDescriptionCurrent ?? "";
      this.educationalPeriodDescriptionAr =
        data.educationalPeriodDescriptionAr ?? "";
      this.educationalPeriodDescriptionEn =
        data.educationalPeriodDescriptionEn ?? "";
      this.educationalPeriodDescriptionUnd =
        data.educationalPeriodDescriptionUnd ?? "";
      this.educationalPeriodNotes = data.educationalPeriodNotes ?? "";
      this.educationalPeriodImageIsDefault =
        data.educationalPeriodImageIsDefault ?? false;
      this.educationalPeriodImagePath = data.educationalPeriodImagePath ?? "";
      this.educationalPeriodImageSizeBytes =
        data.educationalPeriodImageSizeBytes ?? "";
      this.educationalPeriodImageSizeTextCurrent =
        data.educationalPeriodImageSizeTextCurrent ?? "";
      this.closedStateTypeToken = data.closedStateTypeToken ?? "";
      this.closedStateTypeNameCurrent = data.closedStateTypeNameCurrent ?? "";
      this.educationalPeriodStartDateTime =
        data.educationalPeriodStartDateTime ?? "";
      this.educationalPeriodStartDateTimeCustomized =
        data.educationalPeriodStartDateTimeCustomized ?? "";
      this.educationalPeriodStartDate = data.educationalPeriodStartDate ?? "";
      this.educationalPeriodStartTime = data.educationalPeriodStartTime ?? "";
      this.educationalPeriodEndDateTime =
        data.educationalPeriodEndDateTime ?? "";
      this.educationalPeriodEndDateTimeCustomized =
        data.educationalPeriodEndDateTimeCustomized ?? "";
      this.educationalPeriodEndDate = data.educationalPeriodEndDate ?? "";
      this.educationalPeriodEndTime = data.educationalPeriodEndTime ?? "";
      this.educationalPeriodDurationCurrent =
        data.educationalPeriodDurationCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
