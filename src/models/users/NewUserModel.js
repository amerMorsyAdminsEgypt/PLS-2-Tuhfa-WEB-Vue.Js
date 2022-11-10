import defaultImg from "@/assets/images/users.svg";
import { USER_TYPE } from "./../../utils/constantLists";

const userProfileData = {
  userBirthPlaceNameAr: "",
  userBirthPlaceNameEn: "",
  userBirthPlaceNameUnd: "",
  userBirthDateTime: "",
  militaryStatuseTypeStartDateTime: "",
  militaryStatuseTypeEndDateTime: "",
  userAddressEn: "",
  userAddressAr: "",
  userAddressUnd: "",
  userNationalNumber: "",
  userPhone1: "",
  userPhone1CountryCodeName: "",
  userPhone1CountryCode: "",
  userPhone2: "",
  userPhone2CountryCodeName: "",
  userPhone2CountryCode: "",
  userPhone3: "",
  userPhone3CountryCodeName: "",
  userPhone3CountryCode: "",
  userGenderToken: "",
  userCitizenshipTypeToken: "",
  userEmail: "",
  userSocialStatuseNotes: "",
  userInsuranceNumber: "",
  userBankAccountNumber: "",
  userGeneralNotes: "",
  fatherDeathTypeToken: "",
  motherDeathTypeToken: "",
};

export default class NewUserModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }

  setInitialValue() {
    this.fullCode = "";
    this.userNameAr = "";
    this.userNameEn = "";
    this.userNameUnd = "";
    this.userPhoneCountryCode = "";
    this.userPhoneCountryCodeName = "";
    this.userPhone = "";
    this.userEmail = "";
    this.userTypeNameCurrent = "";
    this.userTypeToken = USER_TYPE.Student;
    this.jobGradeToken = "";
    this.userProfileData = userProfileData;
  }
  fillData(data) {
    if (data) {
      this.fullCode = data.fullCode || "";
      this.userNameAr = data.userNameAr || "";
      this.userNameEn = data.userNameEn || "";
      this.userNameUnd = data.userNameUnd || "";
      this.userPhoneCountryCode = data.userPhoneCountryCode || "";
      this.userPhoneCountryCodeName = data.userPhoneCountryCodeName || "";
      this.userPhone = data.userPhone || "";
      this.userEmail = data.userEmail || "";
      this.userTypeNameCurrent = data.userTypeNameCurrent || "";
      this.userTypeToken = data.userTypeToken || "";
      this.jobGradeToken = data.jobGradeToken || "";
      this.userProfileData = data.jobGradeToken || userProfileData;
    } else {
      this.setInitialValue();
    }
  }
}
