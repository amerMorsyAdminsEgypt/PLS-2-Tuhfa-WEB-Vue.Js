import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/users.svg";
import UserProfile from "./UserProfile";
import UserFinanceStatisticData from "./UserFinanceStatisticData";
import UserInterestStatisticData from "./UserInterestStatisticData";
import EstablishmentRole from "./../settings/establishmentRoles/EstablishmentRole";

export default class User extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }

  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
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
    this.userFinanceStatisticData = new UserFinanceStatisticData();
    this.userInterestStatisticData = new UserInterestStatisticData();
    this.userProfileData = new UserProfile();
    this.establishmentRoleToken = "";
    this.establishmentRoleData = new EstablishmentRole();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.userToken = data.userToken ?? "";
      this.userActivityTypeToken = data.userActivityTypeToken ?? "";
      this.userActivityTypeNameCurrent = data.userActivityTypeNameCurrent ?? "";
      this.userNameCurrent = data.userNameCurrent ?? "";
      this.userNameAr = data.userNameAr ?? "";
      this.userNameEn = data.userNameEn ?? "";
      this.userNameUnd = data.userNameUnd ?? "";
      this.userPassword = data.userPassword ?? "";
      this.userPhoneCountryCode = data.userPhoneCountryCode ?? "";
      this.userPhoneCountryCodeName = data.userPhoneCountryCodeName ?? "";
      this.userPhone = data.userPhone ?? "";
      this.userPhoneWithCC = data.userPhoneWithCC ?? "";
      this.userEmail = data.userEmail ?? "";
      this.userName = data.userName ?? "";
      this.userTypeNameCurrent = data.userTypeNameCurrent ?? "";
      this.userTypeToken = data.userTypeToken ?? "";
      this.userImagePath = data.userImagePath ?? "";
      this.userImageIsDefault = data.userImageIsDefault ?? false;
      this.userImageSizeBytes = data.userImageSizeBytes ?? 0;
      this.userImageSizeTextCurrent = data.userImageSizeTextCurrent ?? "";
      this.jobGradeToken = data.jobGradeToken ?? "";
      this.jobGradeNameCurrent = data.jobGradeNameCurrent ?? "";
      this.jobGradeImagePath = data.jobGradeImagePath ?? "";
      this.establishmentRoleToken = data.establishmentRoleToken ?? "";
      this.userFinanceStatisticData.fillData(data.userFinanceStatisticData);
      this.userInterestStatisticData.fillData(data.userInterestStatisticData);
      this.userProfileData.userProfileFillData(data.userProfileData);
      this.establishmentRoleData.fillData(data.establishmentRoleData);
    } else {
      // comment
      this.setInitialValue();
    }
  }
}
//#endregion model
