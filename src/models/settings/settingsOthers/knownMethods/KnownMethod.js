import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/knownMethods.svg";

export default class KnownMethod extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.knownMethodToken = "";
    this.knownMethodNameCurrent = "";
    this.knownMethodNameAr = "";
    this.knownMethodNameEn = "";
    this.knownMethodNameUnd = "";
    this.knownMethodDescriptionCurrent = "";
    this.knownMethodDescriptionAr = "";
    this.knownMethodDescriptionEn = "";
    this.knownMethodDescriptionUnd = "";
    this.knownMethodNotes = "";
    this.knownMethodImageIsDefault = false;
    this.knownMethodImagePath = "";
    this.knownMethodImageSizeBytes = 0;
    this.knownMethodImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.knownMethodToken = data.knownMethodToken ?? "";
      this.knownMethodNameCurrent = data.knownMethodNameCurrent ?? "";
      this.knownMethodNameAr = data.knownMethodNameAr ?? "";
      this.knownMethodNameEn = data.knownMethodNameEn ?? "";
      this.knownMethodNameUnd = data.knownMethodNameUnd ?? "";
      this.knownMethodDescriptionCurrent =
        data.knownMethodDescriptionCurrent ?? "";
      this.knownMethodDescriptionAr = data.knownMethodDescriptionAr ?? "";
      this.knownMethodDescriptionEn = data.knownMethodDescriptionEn ?? "";
      this.knownMethodDescriptionUnd = data.knownMethodDescriptionUnd ?? "";
      this.knownMethodNotes = data.knownMethodNotes ?? "";
      this.knownMethodImageIsDefault = data.knownMethodImageIsDefault ?? false;
      this.knownMethodImagePath = data.knownMethodImagePath ?? "";
      this.knownMethodImageSizeBytes = data.knownMethodImageSizeBytes ?? 0;
      this.knownMethodImageSizeTextCurrent =
        data.knownMethodImageSizeTextCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
