import BaseEntityModel from "./../../general/BaseEntityModel";
import User from "./../../users/User";
import InjuryType from "./../../settings/settingsOthers/injuryTypes/InjuryType";
import BodyPart from "./../../settings/settingsOthers/bodyParts/BodyPart";
import defaultImg from "@/assets/images/UserQualifications.svg";

export default class UserQualification extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.userInjuryToken = "";
    this.userInjuryNameCurrent = "";
    this.userInjuryNameEn = "";
    this.userInjuryNameAr = "";
    this.userInjuryNameUnd = "";
    this.userInjuryDescriptionCurrent = "";
    this.userInjuryDescriptionAr = "";
    this.userInjuryDescriptionEn = "";
    this.userInjuryDescriptionUnd = "";
    this.injuryDateTime = "";
    this.injuryDateTimeCustomized = "";
    this.injuryDate = "";
    this.injuryTime = "";
    this.injuryRecoveryStartDateTime = "";
    this.injuryRecoveryStartDateTimeCustomized = "";
    this.injuryRecoveryStartDate = "";
    this.injuryRecoveryStartTime = "";
    this.injuryRecoveryEndDateTime = "";
    this.injuryRecoveryEndDateTimeCustomized = "";
    this.injuryRecoveryEndDate = "";
    this.injuryRecoveryEndTime = "";
    this.injuryRecoveryDurationCurrent = "";
    this.injuryRecoveryDurationEn = "";
    this.injuryRecoveryDurationAr = "";
    this.injuryRecoveryDurationUnd = "";
    this.userInjuryImagePath = "";
    this.userInjuryImageIsDefault = false;
    this.userInjuryImageSizeBytes = 0;
    this.userInjuryImageSizeTextCurrent = "";
    this.userInjuryImageSizeTextAr = "";
    this.userInjuryImageSizeTextEn = "";
    this.userInjuryImageSizeTextUnd = "";
    this.userInjuryNotes = "";
    this.userToken = "";
    this.injuryTypeToken = "";
    this.bodyPartToken = "";
    this.userData = new User();
    this.injuryTypeData = new InjuryType();
    this.bodyPartData = new BodyPart();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.userInjuryToken = data.userInjuryToken ?? "";
      this.userInjuryNameCurrent = data.userInjuryNameCurrent ?? "";
      this.userInjuryNameEn = data.userInjuryNameEn ?? "";
      this.userInjuryNameAr = data.userInjuryNameAr ?? "";
      this.userInjuryNameUnd = data.userInjuryNameUnd ?? "";
      this.userInjuryDescriptionCurrent =
        data.userInjuryDescriptionCurrent ?? "";
      this.userInjuryDescriptionAr = data.userInjuryDescriptionAr ?? "";
      this.userInjuryDescriptionEn = data.userInjuryDescriptionEn ?? "";
      this.userInjuryDescriptionUnd = data.userInjuryDescriptionUnd ?? "";
      this.injuryDateTime = data.injuryDateTime ?? "";
      this.injuryDateTimeCustomized = data.injuryDateTimeCustomized ?? "";
      this.injuryDate = data.injuryDate ?? "";
      this.injuryTime = data.injuryTime ?? "";
      this.injuryRecoveryStartDateTime = data.injuryRecoveryStartDateTime ?? "";
      this.injuryRecoveryStartDateTimeCustomized =
        data.injuryRecoveryStartDateTimeCustomized ?? "";
      this.injuryRecoveryStartDate = data.injuryRecoveryStartDate ?? "";
      this.injuryRecoveryStartTime = data.injuryRecoveryStartTime ?? "";
      this.injuryRecoveryEndDateTime = data.injuryRecoveryEndDateTime ?? "";
      this.injuryRecoveryEndDateTimeCustomized =
        data.injuryRecoveryEndDateTimeCustomized ?? "";
      this.injuryRecoveryEndDate = data.injuryRecoveryEndDate ?? "";
      this.injuryRecoveryEndTime = data.injuryRecoveryEndTime ?? "";
      this.injuryRecoveryDurationCurrent =
        data.injuryRecoveryDurationCurrent ?? "";
      this.injuryRecoveryDurationEn = data.injuryRecoveryDurationEn ?? "";
      this.injuryRecoveryDurationAr = data.injuryRecoveryDurationAr ?? "";
      this.injuryRecoveryDurationUnd = data.injuryRecoveryDurationUnd ?? "";
      this.userInjuryImagePath = data.userInjuryImagePath ?? "";
      this.userInjuryImageIsDefault = data.userInjuryImageIsDefault ?? false;
      this.userInjuryImageSizeBytes = data.userInjuryImageSizeBytes ?? 0;
      this.userInjuryImageSizeTextCurrent =
        data.userInjuryImageSizeTextCurrent ?? "";
      this.userInjuryImageSizeTextAr = data.userInjuryImageSizeTextAr ?? "";
      this.userInjuryImageSizeTextEn = data.userInjuryImageSizeTextEn ?? "";
      this.userInjuryImageSizeTextUnd = data.userInjuryImageSizeTextUnd ?? "";
      this.userInjuryNotes = data.userInjuryNotes ?? "";
      this.userToken = data.userToken ?? "";
      this.injuryTypeToken = data.injuryTypeToken ?? "";
      this.bodyPartToken = data.bodyPartToken ?? "";
      this.userData.fillData(data.userData);
      this.injuryTypeData.fillData(data.injuryTypeData);
      this.bodyPartData.fillData(data.bodyPartData);
    } else {
      this.setInitialValue();
    }
  }
}
