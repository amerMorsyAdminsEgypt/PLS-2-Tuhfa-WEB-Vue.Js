import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/type.svg";

export default class SystemComponent extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.systemComponentToken = "";
    this.systemComponentNameCurrent = "";
    this.systemComponentNameAr = "";
    this.systemComponentNameEn = "";
    this.systemComponentNameUnd = "";
    this.systemTypeToken = "";
    this.systemTypeNameCurrent = "";
    this.systemTypeNameAr = "";
    this.systemTypeNameEn = "";
    this.systemTypeNameUnd = "";
    this.systemComponentDescriptionCurrent = "";
    this.systemComponentDescriptionAr = "";
    this.systemComponentDescriptionEn = "";
    this.systemComponentDescriptionUnd = "";
    this.systemComponentNotes = "";
    this.systemComponentImagePath = "";
    this.systemComponentImageIsDefault = "";
    this.systemComponentImageSizeBytes = "";
    this.systemComponentImageSizeTextCurrent = "";
    this.systemComponentImageSizeTextAr = "";
    this.systemComponentImageSizeTextEn = "";
    this.systemComponentImageSizeTextUnd = "";
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.systemComponentToken = data.systemComponentToken;
    this.systemComponentNameCurrent = data.systemComponentNameCurrent;
    this.systemComponentNameAr = data.systemComponentNameAr;
    this.systemComponentNameEn = data.systemComponentNameEn;
    this.systemComponentNameUnd = data.systemComponentNameUnd;
    this.systemTypeToken = data.systemTypeToken;
    this.systemTypeNameCurrent = data.systemTypeNameCurrent;
    this.systemTypeNameAr = data.systemTypeNameAr;
    this.systemTypeNameEn = data.systemTypeNameEn;
    this.systemTypeNameUnd = data.systemTypeNameUnd;
    this.systemComponentDescriptionCurrent =
      data.systemComponentDescriptionCurrent;
    this.systemComponentDescriptionAr = data.systemComponentDescriptionAr;
    this.systemComponentDescriptionEn = data.systemComponentDescriptionEn;
    this.systemComponentDescriptionUnd = data.systemComponentDescriptionUnd;
    this.systemComponentNotes = data.systemComponentNotes;
    this.systemComponentImagePath = data.systemComponentImagePath;
    this.systemComponentImageIsDefault = data.systemComponentImageIsDefault;
    this.systemComponentImageSizeBytes = data.systemComponentImageSizeBytes;
    this.systemComponentImageSizeTextCurrent =
      data.systemComponentImageSizeTextCurrent;
    this.systemComponentImageSizeTextAr = data.systemComponentImageSizeTextAr;
    this.systemComponentImageSizeTextEn = data.systemComponentImageSizeTextEn;
    this.systemComponentImageSizeTextUnd = data.systemComponentImageSizeTextUnd;
  }
}
