import BaseEntityModel from "./../../general/BaseEntityModel";
import UserInfoData from "./../../users/UserInfoData";
import CountryInfoData from "./../../settings/settingsOthers/countries/Country";
import RelativeRelationTypeData from "./../../settings/settingsOthers/relativeRelationTypes/RelativeRelationTypeData";
import JobGrade from "./../../settings/settingsOthers/jobGrades/JobGrade";
import defaultImg from "@/assets/images/UserFamilies.svg";

export default class UserFamily extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.userFamilyToken = "";
    this.userFamilyNameCurrent = "";
    this.userFamilyNameAr = "";
    this.userFamilyNameEn = "";
    this.userFamilyNameUnd = "";
    this.userTypeNameCurrent = "";
    this.userTypeToken = "";
    this.userFamilyPhone1 = "";
    this.userFamilyPhone1CountryCodeName = "";
    this.userFamilyPhone1CountryCode = "";
    this.userFamilyPhone1WithCC = "";
    this.userFamilyPhone1WhatsAppStatus = false;
    this.userFamilyPhone2 = "";
    this.userFamilyPhone2CountryCodeName = "";
    this.userFamilyPhone2CountryCode = "";
    this.userFamilyPhone2WithCC = "";
    this.userFamilyPhone2WhatsAppStatus = false;
    this.userFamilyPhone3 = "";
    this.userFamilyPhone3CountryCodeName = "";
    this.userFamilyPhone3CountryCode = "";
    this.userFamilyPhone3WithCC = "";
    this.userFamilyPhone3WhatsAppStatus = false;
    this.userFamilyAddressCurrent = "";
    this.userFamilyAddressEn = "";
    this.userFamilyAddressAr = "";
    this.userFamilyAddressUnd = "";
    this.userFamilyNotes = "";
    this.userFamilyImagePath = "";
    this.userFamilyImageIsDefault = false;
    this.userFamilyImageSizeBytes = 0;
    this.userFamilyImageSizeTextCurrent = "";
    this.userFamilyImageSizeTextAr = "";
    this.userFamilyImageSizeTextEn = "";
    this.userFamilyImageSizeTextUnd = "";
    this.emergencyContactStatus = false;
    this.userFamilyEmail = "";
    this.userFamilyUserName = "";
    this.userFamilyMainPhone = "";
    this.userFamilyMainPhoneCountryCodeName = "";
    this.userFamilyMainPhoneCountryCode = "";
    this.userFamilyMainPhoneWithCC = "";
    this.userFamilyUserPassword = "";
    this.userFamilyNationalNumber = "";
    this.addedByUserFamilyPersonTokenStatus = false;
    this.userToken = "";
    this.userData = new UserInfoData();
    this.userFamilyPersonToken = "";
    this.userFamilyPersonData = null;
    this.nationalityCountryToken = "";
    this.nationalityCountryData = new CountryInfoData();
    this.relativeRelationTypeToken = "";
    this.relativeRelationTypeData = new RelativeRelationTypeData();
    this.jobGradeToken = "";
    this.jobGradeData = new JobGrade();
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.userFamilyToken = data.userFamilyToken ?? "";
    this.userFamilyNameCurrent = data.userFamilyNameCurrent ?? "";
    this.userFamilyNameAr = data.userFamilyNameAr ?? "";
    this.userFamilyNameEn = data.userFamilyNameEn ?? "";
    this.userFamilyNameUnd = data.userFamilyNameUnd ?? "";
    this.userTypeNameCurrent = data.userTypeNameCurrent ?? "";
    this.userTypeToken = data.userTypeToken ?? "";
    this.userFamilyPhone1 = data.userFamilyPhone1 ?? "";
    this.userFamilyPhone1CountryCodeName =
      data.userFamilyPhone1CountryCodeName ?? "";
    this.userFamilyPhone1CountryCode = data.userFamilyPhone1CountryCode ?? "";
    this.userFamilyPhone1WithCC = data.userFamilyPhone1WithCC ?? "";
    this.userFamilyPhone1WhatsAppStatus =
      data.userFamilyPhone1WhatsAppStatus ?? false;
    this.userFamilyPhone2 = data.userFamilyPhone2 ?? "";
    this.userFamilyPhone2CountryCodeName =
      data.userFamilyPhone2CountryCodeName ?? "";
    this.userFamilyPhone2CountryCode = data.userFamilyPhone2CountryCode ?? "";
    this.userFamilyPhone2WithCC = data.userFamilyPhone2WithCC ?? "";
    this.userFamilyPhone2WhatsAppStatus =
      data.userFamilyPhone2WhatsAppStatus ?? false;
    this.userFamilyPhone3 = data.userFamilyPhone3 ?? "";
    this.userFamilyPhone3CountryCodeName =
      data.userFamilyPhone3CountryCodeName ?? "";
    this.userFamilyPhone3CountryCode = data.userFamilyPhone3CountryCode ?? "";
    this.userFamilyPhone3WithCC = data.userFamilyPhone3WithCC ?? "";
    this.userFamilyPhone3WhatsAppStatus =
      data.userFamilyPhone3WhatsAppStatus ?? false;
    this.userFamilyAddressCurrent = data.userFamilyAddressCurrent ?? "";
    this.userFamilyAddressEn = data.userFamilyAddressEn ?? "";
    this.userFamilyAddressAr = data.userFamilyAddressAr ?? "";
    this.userFamilyAddressUnd = data.userFamilyAddressUnd ?? "";
    this.userFamilyNotes = data.userFamilyNotes ?? "";
    this.userFamilyImagePath = data.userFamilyImagePath ?? "";
    this.userFamilyImageIsDefault = data.userFamilyImageIsDefault ?? false;
    this.userFamilyImageSizeBytes = data.userFamilyImageSizeBytes ?? 0;
    this.userFamilyImageSizeTextCurrent =
      data.userFamilyImageSizeTextCurrent ?? "";
    this.userFamilyImageSizeTextAr = data.userFamilyImageSizeTextAr ?? "";
    this.userFamilyImageSizeTextEn = data.userFamilyImageSizeTextEn ?? "";
    this.userFamilyImageSizeTextUnd = data.userFamilyImageSizeTextUnd ?? "";
    this.emergencyContactStatus = data.emergencyContactStatus ?? false;
    this.userFamilyEmail = data.userFamilyEmail ?? "";
    this.userFamilyUserName = data.userFamilyUserName ?? "";
    this.userFamilyMainPhone = data.userFamilyMainPhone ?? "";
    this.userFamilyMainPhoneCountryCodeName =
      data.userFamilyMainPhoneCountryCodeName ?? "";
    this.userFamilyMainPhoneCountryCode =
      data.userFamilyMainPhoneCountryCode ?? "";
    this.userFamilyMainPhoneWithCC = data.userFamilyMainPhoneWithCC ?? "";
    this.userFamilyUserPassword = data.userFamilyUserPassword ?? "";
    this.userFamilyNationalNumber = data.userFamilyNationalNumber ?? "";
    this.addedByUserFamilyPersonTokenStatus =
      data.addedByUserFamilyPersonTokenStatus ?? false;
    this.userToken = data.userToken ?? "";
    this.userData.fillData(data.userData);
    this.userFamilyPersonToken = data.userFamilyPersonToken ?? "";
    this.userFamilyPersonData = data.userFamilyPersonData ?? null;
    this.nationalityCountryToken = data.nationalityCountryToken ?? "";
    this.nationalityCountryData.fillData(data.nationalityCountryData);
    this.relativeRelationTypeToken = data.relativeRelationTypeToken ?? "";
    this.relativeRelationTypeData.fillData(data.relativeRelationTypeData);
    this.jobGradeToken = data.jobGradeToken ?? "";
    this.jobGradeData.fillData(data.jobGradeData);
  }
}
