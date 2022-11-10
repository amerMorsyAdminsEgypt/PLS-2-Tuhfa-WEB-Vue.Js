import BaseEntityModel from "./../../general/BaseEntityModel";
import GeneralJobData from "./../../settings/settingsOthers/generalJobs/GeneralJob";
// import UserModel from "./../../users/UserModel";
import defaultImg from "@/assets/images/UserExperiences.svg";

export default class UserExperience extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.userExperienceToken = "";
    this.userExperienceNameCurrent = "";
    this.userExperienceNameEn = "";
    this.userExperienceNameAr = "";
    this.userExperienceNameUnd = "";
    this.userExperiencePlaceNameCurrent = "";
    this.userExperiencePlaceNameEn = "";
    this.userExperiencePlaceNameAr = "";
    this.userExperiencePlaceNameUnd = "";
    this.userExperienceDescriptionCurrent = "";
    this.userExperienceDescriptionAr = "";
    this.userExperienceDescriptionEn = "";
    this.userExperienceDescriptionUnd = "";
    this.userTypeNameCurrent = "";
    this.userTypeToken = "";
    this.startDateTime = "";
    this.startDateTimeCustomized = "";
    this.startDate = "";
    this.startTime = "";
    this.endDateTime = "";
    this.endDateTimeCustomized = "";
    this.endDate = "";
    this.endTime = "";
    this.obtainStatus = "";
    this.experienceDurationCurrent = "";
    this.experienceDurationEn = "";
    this.experienceDurationAr = "";
    this.experienceDurationUnd = "";
    this.userExperienceImagePath = "";
    this.userExperienceImageIsDefault = "";
    this.userExperienceImageSizeBytes = "";
    this.userExperienceImageSizeTextCurrent = "";
    this.userExperienceNotes = "";
    this.userToken = "";
    this.generalJobToken = "";
    this.generalJobData = new GeneralJobData();
    // this.userData = new UserModel();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.userExperienceToken = data.userExperienceToken ?? "";
      this.userExperienceNameCurrent = data.userExperienceNameCurrent ?? "";
      this.userExperienceNameEn = data.userExperienceNameEn ?? "";
      this.userExperienceNameAr = data.userExperienceNameAr ?? "";
      this.userExperienceNameUnd = data.userExperienceNameUnd ?? "";
      this.userExperiencePlaceNameCurrent =
        data.userExperiencePlaceNameCurrent ?? "";
      this.userExperiencePlaceNameEn = data.userExperiencePlaceNameEn ?? "";
      this.userExperiencePlaceNameAr = data.userExperiencePlaceNameAr ?? "";
      this.userExperiencePlaceNameUnd = data.userExperiencePlaceNameUnd ?? "";
      this.userExperienceDescriptionCurrent =
        data.userExperienceDescriptionCurrent ?? "";
      this.userExperienceDescriptionAr = data.userExperienceDescriptionAr ?? "";
      this.userExperienceDescriptionEn = data.userExperienceDescriptionEn ?? "";
      this.userExperienceDescriptionUnd =
        data.userExperienceDescriptionUnd ?? "";
      this.userTypeNameCurrent = data.userTypeNameCurrent ?? "";
      this.userTypeToken = data.userTypeToken ?? "";
      this.startDateTime = data.startDateTime ?? "";
      this.startDateTimeCustomized = data.startDateTimeCustomized ?? "";
      this.startDate = data.startDate ?? "";
      this.startTime = data.startTime ?? "";
      this.endDateTime = data.endDateTime ?? "";
      this.endDateTimeCustomized = data.endDateTimeCustomized ?? "";
      this.endDate = data.endDate ?? "";
      this.endTime = data.endTime ?? "";
      this.obtainStatus = data.obtainStatus ?? "";
      this.experienceDurationCurrent = data.experienceDurationCurrent ?? "";
      this.experienceDurationEn = data.experienceDurationEn ?? "";
      this.experienceDurationAr = data.experienceDurationAr ?? "";
      this.experienceDurationUnd = data.experienceDurationUnd ?? "";
      this.userExperienceImagePath = data.userExperienceImagePath ?? "";
      this.userExperienceImageIsDefault =
        data.userExperienceImageIsDefault ?? "";
      this.userExperienceImageSizeBytes =
        data.userExperienceImageSizeBytes ?? "";
      this.userExperienceImageSizeTextCurrent =
        data.userExperienceImageSizeTextCurrent ?? "";
      this.userExperienceNotes = data.userExperienceNotes ?? "";
      this.userToken = data.userToken ?? "";
      this.generalJobToken = data.generalJobToken ?? "";
      this.generalJobData.fillData(data.generalJobData);
      // this.userData.fillData(data.userData);
    } else {
      this.setInitialValue();
    }
  }
}
