import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/generalJobs.svg";

export default class GeneralJob extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.generalJobToken = "";
    this.generalJobNameCurrent = "";
    this.generalJobNameAr = "";
    this.generalJobNameEn = "";
    this.generalJobNameUnd = "";
    this.generalJobDescriptionCurrent = "";
    this.generalJobDescriptionAr = "";
    this.generalJobDescriptionEn = "";
    this.generalJobDescriptionUnd = "";
    this.generalJobNotes = "";
    this.generalJobImageIsDefault = false;
    this.generalJobImagePath = "";
    this.generalJobImageSizeBytes = 0;
    this.generalJobImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.generalJobToken = data.generalJobToken;
      this.generalJobNameCurrent = data.generalJobNameCurrent;
      this.generalJobNameAr = data.generalJobNameAr;
      this.generalJobNameEn = data.generalJobNameEn;
      this.generalJobNameUnd = data.generalJobNameUnd;
      this.generalJobDescriptionCurrent = data.generalJobDescriptionCurrent;
      this.generalJobDescriptionAr = data.generalJobDescriptionAr;
      this.generalJobDescriptionEn = data.generalJobDescriptionEn;
      this.generalJobDescriptionUnd = data.generalJobDescriptionUnd;
      this.generalJobNotes = data.generalJobNotes;
      this.generalJobImageIsDefault = data.generalJobImageIsDefault;
      this.generalJobImagePath = data.generalJobImagePath;
      this.generalJobImageSizeBytes = data.generalJobImageSizeBytes;
      this.generalJobImageSizeTextCurrent = data.generalJobImageSizeTextCurrent;
    } else {
      this.setInitialValue();
    }
  }
}
