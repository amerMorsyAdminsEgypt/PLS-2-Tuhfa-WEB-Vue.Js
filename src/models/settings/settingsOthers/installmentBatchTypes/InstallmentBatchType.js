import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/installmentBatchTypes.svg";

export default class InstallmentBatchType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.installmentBatchTypeToken = "";
    this.installmentBatchTypeNameCurrent = "";
    this.installmentBatchTypeNameAr = "";
    this.installmentBatchTypeNameEn = "";
    this.installmentBatchTypeNameUnd = "";
    this.installmentBatchTypeDescriptionCurrent = "";
    this.installmentBatchTypeDescriptionAr = "";
    this.installmentBatchTypeDescriptionEn = "";
    this.installmentBatchTypeDescriptionUnd = "";
    this.installmentBatchTypeNotes = "";
    this.installmentBatchTypeImageIsDefault = false;
    this.installmentBatchTypeImagePath = "";
    this.installmentBatchTypeImageSizeBytes = 0;
    this.installmentBatchTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.installmentBatchTypeToken = data.installmentBatchTypeToken ?? "";
      this.installmentBatchTypeNameCurrent =
        data.installmentBatchTypeNameCurrent ?? "";
      this.installmentBatchTypeNameAr = data.installmentBatchTypeNameAr ?? "";
      this.installmentBatchTypeNameEn = data.installmentBatchTypeNameEn ?? "";
      this.installmentBatchTypeNameUnd = data.installmentBatchTypeNameUnd ?? "";
      this.installmentBatchTypeDescriptionCurrent =
        data.installmentBatchTypeDescriptionCurrent ?? "";
      this.installmentBatchTypeDescriptionAr =
        data.installmentBatchTypeDescriptionAr ?? "";
      this.installmentBatchTypeDescriptionEn =
        data.installmentBatchTypeDescriptionEn ?? "";
      this.installmentBatchTypeDescriptionUnd =
        data.installmentBatchTypeDescriptionUnd ?? "";
      this.installmentBatchTypeNotes = data.installmentBatchTypeNotes ?? "";
      this.installmentBatchTypeImageIsDefault =
        data.installmentBatchTypeImageIsDefault ?? false;
      this.installmentBatchTypeImagePath =
        data.installmentBatchTypeImagePath ?? "";
      this.installmentBatchTypeImageSizeBytes =
        data.installmentBatchTypeImageSizeBytes ?? 0;
      this.installmentBatchTypeImageSizeTextCurrent =
        data.installmentBatchTypeImageSizeTextCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
