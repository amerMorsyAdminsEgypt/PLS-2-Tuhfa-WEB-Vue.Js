import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/BloodTypes.svg";

export default class BloodType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.bloodTypeToken = "";
    this.bloodTypeNameCurrent = "";
    this.bloodTypeNameAr = "";
    this.bloodTypeNameEn = "";
    this.bloodTypeNameUnd = "";
    this.bloodTypeDescriptionCurrent = "";
    this.bloodTypeDescriptionAr = "";
    this.bloodTypeDescriptionEn = "";
    this.bloodTypeDescriptionUnd = "";
    this.bloodTypeNotes = "";
    this.bloodTypeImageIsDefault = false;
    this.bloodTypeImagePath = "";
    this.bloodTypeImageSizeBytes = 0;
    this.bloodTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.bloodTypeToken = data.bloodTypeToken;
      this.bloodTypeNameCurrent = data.bloodTypeNameCurrent;
      this.bloodTypeNameAr = data.bloodTypeNameAr;
      this.bloodTypeNameEn = data.bloodTypeNameEn;
      this.bloodTypeNameUnd = data.bloodTypeNameUnd;
      this.bloodTypeDescriptionCurrent = data.bloodTypeDescriptionCurrent;
      this.bloodTypeDescriptionAr = data.bloodTypeDescriptionAr;
      this.bloodTypeDescriptionEn = data.bloodTypeDescriptionEn;
      this.bloodTypeDescriptionUnd = data.bloodTypeDescriptionUnd;
      this.bloodTypeNotes = data.bloodTypeNotes;
      this.bloodTypeImageIsDefault = data.bloodTypeImageIsDefault;
      this.bloodTypeImagePath = data.bloodTypeImagePath;
      this.bloodTypeImageSizeBytes = data.bloodTypeImageSizeBytes;
      this.bloodTypeImageSizeTextCurrent = data.bloodTypeImageSizeTextCurrent;
    } else {
      this.setInitialValue();
    }
  }
}
