import BaseEntityModel from "./../../general/BaseEntityModel";
import CertificateData from "./../../settings/settingsOthers/certificates/Certificate";
// import UserModel from "./../../users/UserModel";
import defaultImg from "@/assets/images/UserTrainingCourses.svg";

export default class UserTrainingCourse extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.userTrainingCourseToken = "";
    this.userTrainingCourseNameCurrent = "";
    this.userTrainingCourseNameEn = "";
    this.userTrainingCourseNameAr = "";
    this.userTrainingCourseNameUnd = "";
    this.userTrainingCourseDescriptionCurrent = "";
    this.userTrainingCourseDescriptionAr = "";
    this.userTrainingCourseDescriptionEn = "";
    this.userTrainingCourseDescriptionUnd = "";
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
    this.trainingCourseDurationCurrent = "";
    this.userTrainingCourseImagePath = "";
    this.userTrainingCourseImageIsDefault = "";
    this.userTrainingCourseImageSizeBytes = "";
    this.userTrainingCourseImageSizeTextCurrent = "";
    this.userTrainingCourseNotes = "";
    this.userToken = "";
    this.certificateToken = "";
    this.certificateData = new CertificateData();
    // this.userData = new UserModel();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.userTrainingCourseToken = data.userTrainingCourseToken ?? "";
      this.userTrainingCourseNameCurrent =
        data.userTrainingCourseNameCurrent ?? "";
      this.userTrainingCourseNameEn = data.userTrainingCourseNameEn ?? "";
      this.userTrainingCourseNameAr = data.userTrainingCourseNameAr ?? "";
      this.userTrainingCourseNameUnd = data.userTrainingCourseNameUnd ?? "";
      this.userTrainingCourseDescriptionCurrent =
        data.userTrainingCourseDescriptionCurrent ?? "";
      this.userTrainingCourseDescriptionAr =
        data.userTrainingCourseDescriptionAr ?? "";
      this.userTrainingCourseDescriptionEn =
        data.userTrainingCourseDescriptionEn ?? "";
      this.userTrainingCourseDescriptionUnd =
        data.userTrainingCourseDescriptionUnd ?? "";
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
      this.trainingCourseDurationCurrent =
        data.trainingCourseDurationCurrent ?? "";
      this.userTrainingCourseImagePath = data.userTrainingCourseImagePath ?? "";
      this.userTrainingCourseImageIsDefault =
        data.userTrainingCourseImageIsDefault ?? "";
      this.userTrainingCourseImageSizeBytes =
        data.userTrainingCourseImageSizeBytes ?? "";
      this.userTrainingCourseImageSizeTextCurrent =
        data.userTrainingCourseImageSizeTextCurrent ?? "";
      this.userTrainingCourseNotes = data.userTrainingCourseNotes ?? "";
      this.userToken = data.userToken ?? "";
      this.certificateToken = data.certificateToken ?? "";
      this.certificateData.fillData(data.certificateData);
      // this.userData.fillData(data.userData);
    } else {
      this.setInitialValue();
    }
  }
}
