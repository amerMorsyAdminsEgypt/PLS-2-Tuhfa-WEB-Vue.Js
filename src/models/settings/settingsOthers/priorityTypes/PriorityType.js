import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/priorityTypes.svg";
import ColorInfoData from "./../colors/ColorInfoData";

export default class PriorityType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.priorityTypeToken = "";
    this.priorityTypeNameCurrent = "";
    this.priorityTypeNameAr = "";
    this.priorityTypeNameEn = "";
    this.priorityTypeNameUnd = "";
    this.priorityTypeDescriptionCurrent = "";
    this.priorityTypeDescriptionAr = "";
    this.priorityTypeDescriptionEn = "";
    this.priorityTypeDescriptionUnd = "";
    this.priorityTypeNotes = "";
    this.colorToken = "";
    this.colorInfoData = new ColorInfoData();
    this.priorityScopeTokens = [];
    this.priorityScopeData = [];
    this.priorityTypeImageIsDefault = false;
    this.priorityTypeImagePath = "";
    this.priorityTypeImageSizeBytes = 0;
    this.priorityTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.priorityTypeToken = data.priorityTypeToken || "";
      this.priorityTypeNameCurrent = data.priorityTypeNameCurrent || "";
      this.priorityTypeNameAr = data.priorityTypeNameAr || "";
      this.priorityTypeNameEn = data.priorityTypeNameEn || "";
      this.priorityTypeNameUnd = data.priorityTypeNameUnd || "";
      this.priorityTypeDescriptionCurrent =
        data.priorityTypeDescriptionCurrent || "";
      this.priorityTypeDescriptionAr = data.priorityTypeDescriptionAr || "";
      this.priorityTypeDescriptionEn = data.priorityTypeDescriptionEn || "";
      this.priorityTypeDescriptionUnd = data.priorityTypeDescriptionUnd || "";
      this.priorityTypeNotes = data.priorityTypeNotes || "";
      this.colorToken = data.colorToken || "";
      this.colorInfoData.fillColorInfoData(data.colorInfoData);
      this.priorityScopeTokens = data.priorityScopeTokens || [];
      this.priorityScopeData = data.priorityScopeData || [];
      this.priorityTypeImageIsDefault =
        data.priorityTypeImageIsDefault || false;
      this.priorityTypeImagePath = data.priorityTypeImagePath || "";
      this.priorityTypeImageSizeBytes = data.priorityTypeImageSizeBytes || "";
      this.priorityTypeImageSizeTextCurrent =
        data.priorityTypeImageSizeTextCurrent || "";
    } else {
      this.setInitialValue();
    }
  }
}
