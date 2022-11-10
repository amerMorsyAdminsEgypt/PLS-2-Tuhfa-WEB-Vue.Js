import BaseEntityModel from "./../../general/BaseEntityModel";
import PersonalCardTypeData from "./../../settings/settingsOthers/personalCardTypes/PersonalCardType";
// import UserModel from "./../../users/UserModel";
import defaultImg from "@/assets/images/UserPersonalCards.svg";

export default class UserPersonalCard extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.userPersonalCardToken = "";
    this.userPersonalCardNameCurrent = "";
    this.userPersonalCardNameAr = "";
    this.userPersonalCardNameEn = "";
    this.userPersonalCardNameUnd = "";
    this.userPersonalCardDescriptionCurrent = "";
    this.userPersonalCardDescriptionAr = "";
    this.userPersonalCardDescriptionEn = "";
    this.userPersonalCardDescriptionUnd = "";
    this.userTypeNameCurrent = "";
    this.userTypeToken = "";
    this.userPersonalCardCreationPlaceNameCurrent = "";
    this.userPersonalCardCreationPlaceNameAr = "";
    this.userPersonalCardCreationPlaceNameEn = "";
    this.userPersonalCardCreationPlaceNameUnd = "";
    this.userPersonalCardNumber = "";
    this.userPersonalCardCreationDateTime = "";
    this.userPersonalCardCreationDateTimeCustomized = "";
    this.userPersonalCardCreationDate = "";
    this.userPersonalCardCreationTime = "";
    this.userPersonalCardExpirationDateTime = "";
    this.userPersonalCardExpirationDateCustomized = "";
    this.userPersonalCardExpirationDate = "";
    this.userPersonalCardExpirationTime = "";
    this.userPersonalCardDurationAr = "";
    this.userPersonalCardDurationEn = "";
    this.userPersonalCardDurationUnd = "";
    this.userPersonalCardImagePath = "";
    this.userPersonalCardImageIsDefault = "";
    this.userPersonalCardImageSizeBytes = "";
    this.userPersonalCardImageSizeTextCurrent = "";
    this.userPersonalCardNotes = "";
    this.userToken = "";
    this.personalCardTypeToken = "";
    this.personalCardTypeData = new PersonalCardTypeData();
    // this.userData = new UserModel();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.userPersonalCardToken = data.userPersonalCardToken ?? "";
      this.userPersonalCardNameCurrent = data.userPersonalCardNameCurrent ?? "";
      this.userPersonalCardNameAr = data.userPersonalCardNameAr ?? "";
      this.userPersonalCardNameEn = data.userPersonalCardNameEn ?? "";
      this.userPersonalCardNameUnd = data.userPersonalCardNameUnd ?? "";
      this.userPersonalCardDescriptionCurrent =
        data.userPersonalCardDescriptionCurrent ?? "";
      this.userPersonalCardDescriptionAr =
        data.userPersonalCardDescriptionAr ?? "";
      this.userPersonalCardDescriptionEn =
        data.userPersonalCardDescriptionEn ?? "";
      this.userPersonalCardDescriptionUnd =
        data.userPersonalCardDescriptionUnd ?? "";
      this.userTypeNameCurrent = data.userTypeNameCurrent ?? "";
      this.userTypeToken = data.userTypeToken ?? "";
      this.userPersonalCardCreationPlaceNameCurrent =
        data.userPersonalCardCreationPlaceNameCurrent ?? "";
      this.userPersonalCardCreationPlaceNameAr =
        data.userPersonalCardCreationPlaceNameAr ?? "";
      this.userPersonalCardCreationPlaceNameEn =
        data.userPersonalCardCreationPlaceNameEn ?? "";
      this.userPersonalCardCreationPlaceNameUnd =
        data.userPersonalCardCreationPlaceNameUnd ?? "";
      this.userPersonalCardNumber = data.userPersonalCardNumber ?? "";
      this.userPersonalCardCreationDateTime =
        data.userPersonalCardCreationDateTime ?? "";
      this.userPersonalCardCreationDateTimeCustomized =
        data.userPersonalCardCreationDateTimeCustomized ?? "";
      this.userPersonalCardCreationDate =
        data.userPersonalCardCreationDate ?? "";
      this.userPersonalCardCreationTime =
        data.userPersonalCardCreationTime ?? "";
      this.userPersonalCardExpirationDateTime =
        data.userPersonalCardExpirationDateTime ?? "";
      this.userPersonalCardExpirationDateCustomized =
        data.userPersonalCardExpirationDateCustomized ?? "";
      this.userPersonalCardExpirationDate =
        data.userPersonalCardExpirationDate ?? "";
      this.userPersonalCardExpirationTime =
        data.userPersonalCardExpirationTime ?? "";
      this.userPersonalCardDurationAr = data.userPersonalCardDurationAr ?? "";
      this.userPersonalCardDurationEn = data.userPersonalCardDurationEn ?? "";
      this.userPersonalCardDurationUnd = data.userPersonalCardDurationUnd ?? "";
      this.userPersonalCardImagePath = data.userPersonalCardImagePath ?? "";
      this.userPersonalCardImageIsDefault =
        data.userPersonalCardImageIsDefault ?? "";
      this.userPersonalCardImageSizeBytes =
        data.userPersonalCardImageSizeBytes ?? "";
      this.userPersonalCardImageSizeTextCurrent =
        data.userPersonalCardImageSizeTextCurrent ?? "";
      this.userPersonalCardNotes = data.userPersonalCardNotes ?? "";
      this.userToken = data.userToken ?? "";
      this.personalCardTypeToken = data.personalCardTypeToken ?? "";
      this.personalCardTypeData.fillData(data.personalCardTypeData);
      // this.userData.fillData(data.userData);
    } else {
      this.setInitialValue();
    }
  }
}
