import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/religions.svg";

export default class Religion extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.religionToken = "";
    this.religionNameCurrent = "";
    this.religionNameAr = "";
    this.religionNameEn = "";
    this.religionNameUnd = "";
    this.religionDescriptionCurrent = "";
    this.religionDescriptionAr = "";
    this.religionDescriptionEn = "";
    this.religionDescriptionUnd = "";
    this.religionNotes = "";
    this.religionImageIsDefault = false;
    this.religionImagePath = "";
    this.religionImageSizeBytes = 0;
    this.religionImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.religionToken = data.religionToken ?? "";
      this.religionNameCurrent = data.religionNameCurrent ?? "";
      this.religionNameAr = data.religionNameAr ?? "";
      this.religionNameEn = data.religionNameEn ?? "";
      this.religionNameUnd = data.religionNameUnd ?? "";
      this.religionDescriptionCurrent = data.religionDescriptionCurrent ?? "";
      this.religionDescriptionAr = data.religionDescriptionAr ?? "";
      this.religionDescriptionEn = data.religionDescriptionEn ?? "";
      this.religionDescriptionUnd = data.religionDescriptionUnd ?? "";
      this.religionNotes = data.religionNotes ?? "";
      this.religionImageIsDefault = data.religionImageIsDefault ?? "";
      this.religionImagePath = data.religionImagePath ?? "";
      this.religionImageSizeBytes = data.religionImageSizeBytes ?? "";
      this.religionImageSizeTextCurrent =
        data.religionImageSizeTextCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
