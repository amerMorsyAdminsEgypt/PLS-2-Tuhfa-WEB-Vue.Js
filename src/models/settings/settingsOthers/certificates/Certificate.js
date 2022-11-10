import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/certificates.svg";

export default class Certificate extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.certificateToken = "";
    this.certificateNameCurrent = "";
    this.certificateNameAr = "";
    this.certificateNameEn = "";
    this.certificateNameUnd = "";
    this.certificateDescriptionCurrent = "";
    this.certificateDescriptionAr = "";
    this.certificateDescriptionEn = "";
    this.certificateDescriptionUnd = "";
    this.certificateNotes = "";
    this.certificateImageIsDefault = false;
    this.certificateImagePath = "";
    this.certificateImageSizeBytes = 0;
    this.certificateImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.certificateToken = data.certificateToken;
      this.certificateNameCurrent = data.certificateNameCurrent;
      this.certificateNameAr = data.certificateNameAr;
      this.certificateNameEn = data.certificateNameEn;
      this.certificateNameUnd = data.certificateNameUnd;
      this.certificateDescriptionCurrent = data.certificateDescriptionCurrent;
      this.certificateDescriptionAr = data.certificateDescriptionAr;
      this.certificateDescriptionEn = data.certificateDescriptionEn;
      this.certificateDescriptionUnd = data.certificateDescriptionUnd;
      this.certificateNotes = data.certificateNotes;
      this.certificateImageIsDefault = data.certificateImageIsDefault;
      this.certificateImagePath = data.certificateImagePath;
      this.certificateImageSizeBytes = data.certificateImageSizeBytes;
      this.certificateImageSizeTextCurrent =
        data.certificateImageSizeTextCurrent;
    } else {
      this.setInitialValue();
    }
  }
}
