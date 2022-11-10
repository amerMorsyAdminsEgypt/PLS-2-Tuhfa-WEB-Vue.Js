import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/injuryTypes.svg";

export default class InjuryType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.injuryTypeToken = "";
    this.injuryTypeNameCurrent = "";
    this.injuryTypeNameAr = "";
    this.injuryTypeNameEn = "";
    this.injuryTypeNameUnd = "";
    this.injuryTypeDescriptionCurrent = "";
    this.injuryTypeDescriptionAr = "";
    this.injuryTypeDescriptionEn = "";
    this.injuryTypeDescriptionUnd = "";
    this.injuryTypeNotes = "";
    this.injuryTypeImageIsDefault = false;
    this.injuryTypeImagePath = "";
    this.injuryTypeImageSizeBytes = 0;
    this.injuryTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.injuryTypeToken = data.injuryTypeToken;
      this.injuryTypeNameCurrent = data.injuryTypeNameCurrent;
      this.injuryTypeNameAr = data.injuryTypeNameAr;
      this.injuryTypeNameEn = data.injuryTypeNameEn;
      this.injuryTypeNameUnd = data.injuryTypeNameUnd;
      this.injuryTypeDescriptionCurrent = data.injuryTypeDescriptionCurrent;
      this.injuryTypeDescriptionAr = data.injuryTypeDescriptionAr;
      this.injuryTypeDescriptionEn = data.injuryTypeDescriptionEn;
      this.injuryTypeDescriptionUnd = data.injuryTypeDescriptionUnd;
      this.injuryTypeNotes = data.injuryTypeNotes;
      this.injuryTypeImageIsDefault = data.injuryTypeImageIsDefault;
      this.injuryTypeImagePath = data.injuryTypeImagePath;
      this.injuryTypeImageSizeBytes = data.injuryTypeImageSizeBytes;
      this.injuryTypeImageSizeTextCurrent = data.injuryTypeImageSizeTextCurrent;
    } else {
      this.setInitialValue();
    }
  }
}
