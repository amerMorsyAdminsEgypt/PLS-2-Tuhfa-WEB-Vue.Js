import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/complaintTypes.svg";

export default class ComplaintType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.complaintTypeToken = "";
    this.complaintTypeNameCurrent = "";
    this.complaintTypeNameAr = "";
    this.complaintTypeNameEn = "";
    this.complaintTypeNameUnd = "";
    this.complaintTypeDescriptionCurrent = "";
    this.complaintTypeDescriptionAr = "";
    this.complaintTypeDescriptionEn = "";
    this.complaintTypeDescriptionUnd = "";
    this.complaintTypeNotes = "";
    this.complaintTypeImageIsDefault = false;
    this.complaintTypeImagePath = "";
    this.complaintTypeImageSizeBytes = 0;
    this.complaintTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.complaintTypeToken = data.complaintTypeToken || "";
      this.complaintTypeNameCurrent = data.complaintTypeNameCurrent || "";
      this.complaintTypeNameAr = data.complaintTypeNameAr || "";
      this.complaintTypeNameEn = data.complaintTypeNameEn || "";
      this.complaintTypeNameUnd = data.complaintTypeNameUnd || "";
      this.complaintTypeDescriptionCurrent =
        data.complaintTypeDescriptionCurrent || "";
      this.complaintTypeDescriptionAr = data.complaintTypeDescriptionAr || "";
      this.complaintTypeDescriptionEn = data.complaintTypeDescriptionEn || "";
      this.complaintTypeDescriptionUnd = data.complaintTypeDescriptionUnd || "";
      this.complaintTypeNotes = data.complaintTypeNotes || "";
      this.complaintTypeImageIsDefault =
        data.complaintTypeImageIsDefault || false;
      this.complaintTypeImagePath = data.complaintTypeImagePath || "";
      this.complaintTypeImageSizeBytes = data.complaintTypeImageSizeBytes || "";
      this.complaintTypeImageSizeTextCurrent =
        data.complaintTypeImageSizeTextCurrent || "";
    } else {
      this.setInitialValue();
    }
  }
}
