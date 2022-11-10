import defaultImg from "@/assets/images/users.svg";
import UserProfileModel from "./UserProfileModel";

export default class UserModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }

  setInitialValue() {
    this.mediaFile = "";
    this.fullCode = "";
    this.userToken = "";
    this.userActivityTypeToken = "";
    this.userActivityTypeNameCurrent = "";
    this.userNameCurrent = "";
    this.userNameAr = "";
    this.userNameEn = "";
    this.userNameUnd = "";
    this.userPassword = "";
    this.userPhoneCountryCode = "";
    this.userPhoneCountryCodeName = "";
    this.userPhone = "";
    this.userPhoneWithCC = "";
    this.userEmail = "";
    this.userName = "";
    this.userTypeNameCurrent = "";
    this.userTypeToken = "";
    this.userImagePath = "";
    this.userImageIsDefault = false;
    this.userImageSizeBytes = 0;
    this.userImageSizeTextCurrent = "";
    this.jobGradeToken = "";
    this.jobGradeNameCurrent = "";
    this.jobGradeImagePath = "";
    this.userProfileData = new UserProfileModel();
    this.establishmentRoleToken = "";
  }
  fillData(data) {
    if (data) {
      this.mediaFile = "";
      this.fullCode = data.fullCode || "";
      this.userToken = data.userToken || "";
      this.userActivityTypeToken = data.userActivityTypeToken || "";
      this.userActivityTypeNameCurrent = data.userActivityTypeNameCurrent || "";
      this.userNameCurrent = data.userNameCurrent || "";
      this.userNameAr = data.userNameAr || "";
      this.userNameEn = data.userNameEn || "";
      this.userNameUnd = data.userNameUnd || "";
      // this.userPassword = data.userPassword || "";
      this.userPhoneCountryCode = data.userPhoneCountryCode || "";
      this.userPhoneCountryCodeName = data.userPhoneCountryCodeName || "";
      this.userPhone = data.userPhone || "";
      this.userPhoneWithCC = data.userPhoneWithCC || "";
      this.userEmail = data.userEmail || "";
      this.userName = data.userName || "";
      this.userTypeNameCurrent = data.userTypeNameCurrent || "";
      this.userTypeToken = data.userTypeToken || "";
      this.userImagePath = data.userImagePath || "";
      this.userImageIsDefault = data.userImageIsDefault || false;
      this.userImageSizeBytes = data.userImageSizeBytes || 0;
      this.userImageSizeTextCurrent = data.userImageSizeTextCurrent || "";
      this.jobGradeToken = data.jobGradeToken || "";
      this.jobGradeNameCurrent = data.jobGradeNameCurrent || "";
      this.jobGradeImagePath = data.jobGradeImagePath || "";
      this.userProfileData.fillData(data.userProfileData);
      this.establishmentRoleToken = data.establishmentRoleToken || "";
    } else {
      this.setInitialValue();
    }
  }
}
