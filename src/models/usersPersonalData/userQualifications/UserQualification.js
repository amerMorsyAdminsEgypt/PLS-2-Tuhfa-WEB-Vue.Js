import BaseEntityModel from "./../../general/BaseEntityModel";
// import UserModel from "./../../users/UserModel";
import QualificationData from "./../../settings/settingsOthers/qualifications/Qualification";
import ClassificationDegreeData from "./../../settings/settingsOthers/classificationDegrees/ClassificationDegree";
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
    this.userQualificationToken = "";
    this.userQualificationNameCurrent = "";
    this.userQualificationNameEn = "";
    this.userQualificationNameAr = "";
    this.userQualificationNameUnd = "";
    this.userQualificationDescriptionCurrent = "";
    this.userQualificationDescriptionAr = "";
    this.userQualificationDescriptionEn = "";
    this.userQualificationDescriptionUnd = "";
    this.userTypeNameCurrent = "";
    this.userTypeToken = "";
    this.joiningDateTime = "";
    this.joiningDateTimeCustomized = "";
    this.joiningDate = "";
    this.joiningTime = "";
    this.obtainingDateTime = "";
    this.obtainingDateTimeCustomized = "";
    this.obtainingDate = "";
    this.obtainingTime = "";
    this.obtainStatus = "";
    this.qualificationDurationCurrent = "";
    this.qualificationDurationEn = "";
    this.qualificationDurationAr = "";
    this.qualificationDurationUnd = "";
    this.userQualificationImagePath = "";
    this.userQualificationImageIsDefault = "";
    this.userQualificationImageSizeBytes = "";
    this.userQualificationImageSizeTextCurrent = "";
    this.userQualificationNotes = "";
    this.userToken = "";
    this.qualificationToken = "";
    this.classificationDegreeToken = "";
    // this.userData = new UserModel();
    this.qualificationData = new QualificationData();
    this.classificationDegreeData = new ClassificationDegreeData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.userQualificationToken = data.userQualificationToken ?? "";
      this.userQualificationNameCurrent =
        data.userQualificationNameCurrent ?? "";
      this.userQualificationNameEn = data.userQualificationNameEn ?? "";
      this.userQualificationNameAr = data.userQualificationNameAr ?? "";
      this.userQualificationNameUnd = data.userQualificationNameUnd ?? "";
      this.userQualificationDescriptionCurrent =
        data.userQualificationDescriptionCurrent ?? "";
      this.userQualificationDescriptionAr =
        data.userQualificationDescriptionAr ?? "";
      this.userQualificationDescriptionEn =
        data.userQualificationDescriptionEn ?? "";
      this.userQualificationDescriptionUnd =
        data.userQualificationDescriptionUnd ?? "";
      this.userTypeNameCurrent = data.userTypeNameCurrent ?? "";
      this.userTypeToken = data.userTypeToken ?? "";
      this.joiningDateTime = data.joiningDateTime ?? "";
      this.joiningDateTimeCustomized = data.joiningDateTimeCustomized ?? "";
      this.joiningDate = data.joiningDate ?? "";
      this.joiningTime = data.joiningTime ?? "";
      this.obtainingDateTime = data.obtainingDateTime ?? "";
      this.obtainingDateTimeCustomized = data.obtainingDateTimeCustomized ?? "";
      this.obtainingDate = data.obtainingDate ?? "";
      this.obtainingTime = data.obtainingTime ?? "";
      this.obtainStatus = data.obtainStatus ?? "";
      this.qualificationDurationCurrent =
        data.qualificationDurationCurrent ?? "";
      this.qualificationDurationEn = data.qualificationDurationEn ?? "";
      this.qualificationDurationAr = data.qualificationDurationAr ?? "";
      this.qualificationDurationUnd = data.qualificationDurationUnd ?? "";
      this.userQualificationImagePath = data.userQualificationImagePath ?? "";
      this.userQualificationImageIsDefault =
        data.userQualificationImageIsDefault ?? "";
      this.userQualificationImageSizeBytes =
        data.userQualificationImageSizeBytes ?? "";
      this.userQualificationImageSizeTextCurrent =
        data.userQualificationImageSizeTextCurrent ?? "";
      this.userQualificationNotes = data.userQualificationNotes ?? "";
      this.userToken = data.userToken ?? "";
      this.qualificationToken = data.qualificationToken ?? "";
      this.classificationDegreeToken = data.classificationDegreeToken ?? "";
      // this.userData.fillData(data.userData);
      this.qualificationData.fillData(data.qualificationData);
      this.classificationDegreeData.fillData(data.classificationDegreeData);
    } else {
      this.setInitialValue();
    }
  }
}
