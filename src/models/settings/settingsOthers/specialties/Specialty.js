import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/specialties.svg";

export default class Specialty extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.specialtieToken = "";
    this.specialtieNameCurrent = "";
    this.specialtieNameAr = "";
    this.specialtieNameEn = "";
    this.specialtieNameUnd = "";
    this.specialtieDescriptionCurrent = "";
    this.specialtieDescriptionAr = "";
    this.specialtieDescriptionEn = "";
    this.specialtieDescriptionUnd = "";
    this.specialtieNotes = "";
    this.specialtieImageIsDefault = false;
    this.specialtieImagePath = "";
    this.specialtieImageSizeBytes = 0;
    this.specialtieImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.specialtieToken = data.specialtieToken;
      this.specialtieNameCurrent = data.specialtieNameCurrent;
      this.specialtieNameAr = data.specialtieNameAr;
      this.specialtieNameEn = data.specialtieNameEn;
      this.specialtieNameUnd = data.specialtieNameUnd;
      this.specialtieDescriptionCurrent = data.specialtieDescriptionCurrent;
      this.specialtieDescriptionAr = data.specialtieDescriptionAr;
      this.specialtieDescriptionEn = data.specialtieDescriptionEn;
      this.specialtieDescriptionUnd = data.specialtieDescriptionUnd;
      this.specialtieNotes = data.specialtieNotes;
      this.specialtieImageIsDefault = data.specialtieImageIsDefault;
      this.specialtieImagePath = data.specialtieImagePath;
      this.specialtieImageSizeBytes = data.specialtieImageSizeBytes;
      this.specialtieImageSizeTextCurrent = data.specialtieImageSizeTextCurrent;
    } else {
      this.setInitialValue();
    }
  }
}
