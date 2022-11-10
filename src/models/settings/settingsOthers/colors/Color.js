import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/colors.svg";

export default class Color extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.mediaFile = "";
    this.colorToken = "";
    this.colorNameCurrent = "";
    this.colorNameAr = "";
    this.colorNameEn = "";
    this.colorNameUnd = "";
    this.colorDescriptionCurrent = "";
    this.colorDescriptionAr = "";
    this.colorDescriptionEn = "";
    this.colorDescriptionUnd = "";
    this.colorHexFromat = "";
    this.colorNotes = "";
    this.colorImageIsDefault = false;
    this.colorImagePath = "";
    this.colorImageSizeBytes = 0;
    this.colorImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.colorToken = data.colorToken || "";
      this.colorNameCurrent = data.colorNameCurrent || "";
      this.colorNameAr = data.colorNameAr || "";
      this.colorNameEn = data.colorNameEn || "";
      this.colorNameUnd = data.colorNameUnd || "";
      this.colorDescriptionCurrent = data.colorDescriptionCurrent || "";
      this.colorDescriptionAr = data.colorDescriptionAr || "";
      this.colorDescriptionEn = data.colorDescriptionEn || "";
      this.colorDescriptionUnd = data.colorDescriptionUnd || "";
      this.colorHexFromat = data.colorHexFromat || "";
      this.colorNotes = data.colorNotes || "";
      this.colorImageIsDefault = data.colorImageIsDefault || false;
      this.colorImagePath = data.colorImagePath || "";
      this.colorImageSizeBytes = data.colorImageSizeBytes || "";
      this.colorImageSizeTextCurrent = data.colorImageSizeTextCurrent || "";
    } else {
      this.setInitialValue();
    }
  }
}
