import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/personalCardTypes.svg";

export default class PersonalCardType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.personalCardTypeToken = "";
    this.personalCardTypeNameCurrent = "";
    this.personalCardTypeNameAr = "";
    this.personalCardTypeNameEn = "";
    this.personalCardTypeNameUnd = "";
    this.personalCardTypeDescriptionCurrent = "";
    this.personalCardTypeDescriptionAr = "";
    this.personalCardTypeDescriptionEn = "";
    this.personalCardTypeDescriptionUnd = "";
    this.personalCardTypeNotes = "";
    this.personalCardTypeImageIsDefault = false;
    this.personalCardTypeImagePath = "";
    this.personalCardTypeImageSizeBytes = 0;
    this.personalCardTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.personalCardTypeToken = data.personalCardTypeToken;
      this.personalCardTypeNameCurrent = data.personalCardTypeNameCurrent;
      this.personalCardTypeNameAr = data.personalCardTypeNameAr;
      this.personalCardTypeNameEn = data.personalCardTypeNameEn;
      this.personalCardTypeNameUnd = data.personalCardTypeNameUnd;
      this.personalCardTypeDescriptionCurrent =
        data.personalCardTypeDescriptionCurrent;
      this.personalCardTypeDescriptionAr = data.personalCardTypeDescriptionAr;
      this.personalCardTypeDescriptionEn = data.personalCardTypeDescriptionEn;
      this.personalCardTypeDescriptionUnd = data.personalCardTypeDescriptionUnd;
      this.personalCardTypeNotes = data.personalCardTypeNotes;
      this.personalCardTypeImageIsDefault = data.personalCardTypeImageIsDefault;
      this.personalCardTypeImagePath = data.personalCardTypeImagePath;
      this.personalCardTypeImageSizeBytes = data.personalCardTypeImageSizeBytes;
      this.personalCardTypeImageSizeTextCurrent =
        data.personalCardTypeImageSizeTextCurrent;
    } else {
      this.setInitialValue();
    }
  }
}
