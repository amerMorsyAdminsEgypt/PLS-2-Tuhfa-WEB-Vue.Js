import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/UserValidSettings.svg";

export default class UserValidSetting extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue(userTypeToken = "") {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.userValidSettingToken = "";
    this.userTypeToken = userTypeToken ?? "";
    this.userTypeNameCurrent = "";
    this.userTypeNameAr = "";
    this.userTypeNameEn = "";
    this.userTypeNameUnd = "";
    this.userValidSettingNameCurrent = "";
    this.userValidSettingNameEn = "";
    this.userValidSettingNameAr = "";
    this.userValidSettingNameUnd = "";
    this.userValidSettingDescriptionCurrent = "";
    this.userValidSettingDescriptionAr = "";
    this.userValidSettingDescriptionEn = "";
    this.userValidSettingDescriptionUnd = "";
    this.userValidSettingImagePath = "";
    this.userValidSettingImageIsDefault = false;
    this.userValidSettingImageSizeBytes = "";
    this.userValidSettingImageSizeTextCurrent = "";
    this.userValidSettingImageSizeTextAr = "";
    this.userValidSettingImageSizeTextEn = "";
    this.userValidSettingImageSizeTextUnd = "";
    this.userValidSettingNotes = "";
    this.userValidSettingActiveStatus = false;
    this.requiredUserImageStatus = false;
    this.requiredUserFullCodeStatus = false;
    this.requiredUserEmailStatus = false;
    this.requiredUserPhoneStatus = false;
    this.requiredUserUserNameStatus = false;
    this.requiredUserNationalIDStatus = false;
    this.requiredUserExpiryDateNationalIDStatus = false;
    this.requiredUserNotesStatus = false;
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.userValidSettingToken = data.userValidSettingToken;
    this.userTypeToken = data.userTypeToken;
    this.userTypeNameCurrent = data.userTypeNameCurrent;
    this.userTypeNameAr = data.userTypeNameAr;
    this.userTypeNameEn = data.userTypeNameEn;
    this.userTypeNameUnd = data.userTypeNameUnd;
    this.userValidSettingNameCurrent = data.userValidSettingNameCurrent;
    this.userValidSettingNameEn = data.userValidSettingNameEn;
    this.userValidSettingNameAr = data.userValidSettingNameAr;
    this.userValidSettingNameUnd = data.userValidSettingNameUnd;
    this.userValidSettingDescriptionCurrent =
      data.userValidSettingDescriptionCurrent;
    this.userValidSettingDescriptionAr = data.userValidSettingDescriptionAr;
    this.userValidSettingDescriptionEn = data.userValidSettingDescriptionEn;
    this.userValidSettingDescriptionUnd = data.userValidSettingDescriptionUnd;
    this.userValidSettingImagePath = data.userValidSettingImagePath;
    this.userValidSettingImageIsDefault = data.userValidSettingImageIsDefault;
    this.userValidSettingImageSizeBytes = data.userValidSettingImageSizeBytes;
    this.userValidSettingImageSizeTextCurrent =
      data.userValidSettingImageSizeTextCurrent;
    this.userValidSettingImageSizeTextAr = data.userValidSettingImageSizeTextAr;
    this.userValidSettingImageSizeTextEn = data.userValidSettingImageSizeTextEn;
    this.userValidSettingImageSizeTextUnd =
      data.userValidSettingImageSizeTextUnd;
    this.userValidSettingNotes = data.userValidSettingNotes;
    this.userValidSettingActiveStatus = data.userValidSettingActiveStatus;
    this.requiredUserImageStatus = data.requiredUserImageStatus;
    this.requiredUserFullCodeStatus = data.requiredUserFullCodeStatus;
    this.requiredUserEmailStatus = data.requiredUserEmailStatus;
    this.requiredUserPhoneStatus = data.requiredUserPhoneStatus;
    this.requiredUserUserNameStatus = data.requiredUserUserNameStatus;
    this.requiredUserNationalIDStatus = data.requiredUserNationalIDStatus;
    this.requiredUserExpiryDateNationalIDStatus =
      data.requiredUserExpiryDateNationalIDStatus;
    this.requiredUserNotesStatus = data.requiredUserNotesStatus;
  }
}
