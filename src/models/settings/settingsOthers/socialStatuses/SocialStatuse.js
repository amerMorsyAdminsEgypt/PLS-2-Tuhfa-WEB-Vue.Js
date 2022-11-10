import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/socialStatuses.svg";

export default class SocialStatuse extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.socialStatuseToken = "";
    this.socialStatuseNameCurrent = "";
    this.socialStatuseNameAr = "";
    this.socialStatuseNameEn = "";
    this.socialStatuseNameUnd = "";
    this.socialStatuseDescriptionCurrent = "";
    this.socialStatuseDescriptionAr = "";
    this.socialStatuseDescriptionEn = "";
    this.socialStatuseDescriptionUnd = "";
    this.socialStatuseNotes = "";
    this.socialStatuseImageIsDefault = false;
    this.socialStatuseImagePath = "";
    this.socialStatuseImageSizeBytes = 0;
    this.socialStatuseImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.socialStatuseToken = data.socialStatuseToken;
      this.socialStatuseNameCurrent = data.socialStatuseNameCurrent;
      this.socialStatuseNameAr = data.socialStatuseNameAr;
      this.socialStatuseNameEn = data.socialStatuseNameEn;
      this.socialStatuseNameUnd = data.socialStatuseNameUnd;
      this.socialStatuseDescriptionCurrent =
        data.socialStatuseDescriptionCurrent;
      this.socialStatuseDescriptionAr = data.socialStatuseDescriptionAr;
      this.socialStatuseDescriptionEn = data.socialStatuseDescriptionEn;
      this.socialStatuseDescriptionUnd = data.socialStatuseDescriptionUnd;
      this.socialStatuseNotes = data.socialStatuseNotes;
      this.socialStatuseImageIsDefault = data.socialStatuseImageIsDefault;
      this.socialStatuseImagePath = data.socialStatuseImagePath;
      this.socialStatuseImageSizeBytes = data.socialStatuseImageSizeBytes;
      this.socialStatuseImageSizeTextCurrent =
        data.socialStatuseImageSizeTextCurrent;
    } else {
      this.setInitialValue();
    }
  }
}
