import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/revenuesTypes.svg";

export default class RevenuesType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.revenuesTypeToken = "";
    this.revenuesTypeNameCurrent = "";
    this.revenuesTypeNameAr = "";
    this.revenuesTypeNameEn = "";
    this.revenuesTypeNameUnd = "";
    this.revenuesTypeDefaultPrice = "";
    this.revenuesTypeDescriptionCurrent = "";
    this.revenuesTypeDescriptionAr = "";
    this.revenuesTypeDescriptionEn = "";
    this.revenuesTypeDescriptionUnd = "";
    this.revenuesTypeNotes = "";
    this.revenuesTypeImageIsDefault = false;
    this.revenuesTypeImagePath = "";
    this.revenuesTypeImageSizeBytes = 0;
    this.revenuesTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.revenuesTypeToken = data.revenuesTypeToken ?? "";
      this.revenuesTypeNameCurrent = data.revenuesTypeNameCurrent ?? "";
      this.revenuesTypeNameAr = data.revenuesTypeNameAr ?? "";
      this.revenuesTypeNameEn = data.revenuesTypeNameEn ?? "";
      this.revenuesTypeNameUnd = data.revenuesTypeNameUnd ?? "";
      this.revenuesTypeDefaultPrice = data.revenuesTypeDefaultPrice ?? "";
      this.revenuesTypeDescriptionCurrent =
        data.revenuesTypeDescriptionCurrent ?? "";
      this.revenuesTypeDescriptionAr = data.revenuesTypeDescriptionAr ?? "";
      this.revenuesTypeDescriptionEn = data.revenuesTypeDescriptionEn ?? "";
      this.revenuesTypeDescriptionUnd = data.revenuesTypeDescriptionUnd ?? "";
      this.revenuesTypeNotes = data.revenuesTypeNotes ?? "";
      this.revenuesTypeImageIsDefault =
        data.revenuesTypeImageIsDefault ?? false;
      this.revenuesTypeImagePath = data.revenuesTypeImagePath ?? "";
      this.revenuesTypeImageSizeBytes = data.revenuesTypeImageSizeBytes ?? 0;
      this.revenuesTypeImageSizeTextCurrent =
        data.revenuesTypeImageSizeTextCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
