import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/serviceTypes.svg";

export default class ServiceType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.serviceTypeToken = "";
    this.serviceTypeNameCurrent = "";
    this.serviceTypeNameAr = "";
    this.serviceTypeNameEn = "";
    this.serviceTypeNameUnd = "";
    this.serviceTypeDescriptionCurrent = "";
    this.serviceTypeDescriptionAr = "";
    this.serviceTypeDescriptionEn = "";
    this.serviceTypeDescriptionUnd = "";
    this.serviceTypeNotes = "";
    this.serviceTypeImageIsDefault = false;
    this.serviceTypeImagePath = "";
    this.serviceTypeImageSizeBytes = 0;
    this.serviceTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.serviceTypeToken = data.serviceTypeToken;
      this.serviceTypeNameCurrent = data.serviceTypeNameCurrent;
      this.serviceTypeNameAr = data.serviceTypeNameAr;
      this.serviceTypeNameEn = data.serviceTypeNameEn;
      this.serviceTypeNameUnd = data.serviceTypeNameUnd;
      this.serviceTypeDescriptionCurrent = data.serviceTypeDescriptionCurrent;
      this.serviceTypeDescriptionAr = data.serviceTypeDescriptionAr;
      this.serviceTypeDescriptionEn = data.serviceTypeDescriptionEn;
      this.serviceTypeDescriptionUnd = data.serviceTypeDescriptionUnd;
      this.serviceTypeNotes = data.serviceTypeNotes;
      this.serviceTypeImageIsDefault = data.serviceTypeImageIsDefault;
      this.serviceTypeImagePath = data.serviceTypeImagePath;
      this.serviceTypeImageSizeBytes = data.serviceTypeImageSizeBytes;
      this.serviceTypeImageSizeTextCurrent =
        data.serviceTypeImageSizeTextCurrent;
    } else {
      this.setInitialValue();
    }
  }
}
