import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/bodyParts.svg";
import SystemComponentInfoData from "./../../../systemConfiguration/systemComponents/SystemComponentInfoData";
import SystemComponentsHierarchyInfoData from "./../../../systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchyInfoData";
import BodyPartInfoData from "./BodyPartInfoData";

export default class BodyPart extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.bodyPartToken = "";
    this.bodyPartNameCurrent = "";
    this.bodyPartNameEn = "";
    this.bodyPartNameAr = "";
    this.bodyPartNameUnd = "";
    this.bodyPartDescriptionCurrent = "";
    this.bodyPartDescriptionAr = "";
    this.bodyPartDescriptionEn = "";
    this.bodyPartDescriptionUnd = "";
    this.bodyPartImageIsDefault = false;
    this.bodyPartImagePath = "";
    this.bodyPartImageSizeBytes = 0;
    this.bodyPartImageSizeTextCurrent = "";
    this.bodyPartImageSizeTextAr = "";
    this.bodyPartImageSizeTextEn = "";
    this.bodyPartImageSizeTextUnd = "";
    this.bodyPartNotes = "";
    this.systemComponentToken = "";
    this.systemComponentHierarchyToken = "";
    this.parentBodyPartToken = "";
    this.systemComponentData = new SystemComponentInfoData();
    this.systemComponentsHierarchyData =
      new SystemComponentsHierarchyInfoData();
    this.parentBodyPartData = new BodyPartInfoData();
    this.isHaveChildrenStatus = false;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.bodyPartToken = data.bodyPartToken ?? "";
      this.bodyPartNameCurrent = data.bodyPartNameCurrent ?? "";
      this.bodyPartNameEn = data.bodyPartNameEn ?? "";
      this.bodyPartNameAr = data.bodyPartNameAr ?? "";
      this.bodyPartDescriptionCurrent = data.bodyPartDescriptionCurrent ?? "";
      this.bodyPartDescriptionAr = data.bodyPartDescriptionAr ?? "";
      this.bodyPartDescriptionEn = data.bodyPartDescriptionEn ?? "";
      this.bodyPartDescriptionUnd = data.bodyPartDescriptionUnd ?? "";
      this.bodyPartImageIsDefault = data.bodyPartImageIsDefault ?? false;
      this.bodyPartImagePath = data.bodyPartImagePath ?? "";
      this.bodyPartImageSizeBytes = data.bodyPartImageSizeBytes ?? 0;
      this.bodyPartImageSizeTextCurrent =
        data.bodyPartImageSizeTextCurrent ?? "";
      this.bodyPartImageSizeTextAr = data.bodyPartImageSizeTextAr ?? "";
      this.bodyPartImageSizeTextEn = data.bodyPartImageSizeTextEn ?? "";
      this.bodyPartImageSizeTextUnd = data.bodyPartImageSizeTextUnd ?? "";
      this.bodyPartNotes = data.bodyPartNotes ?? "";
      this.systemComponentToken = data.systemComponentToken ?? "";
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken ?? "";
      this.parentBodyPartToken = data.parentBodyPartToken ?? "";
      this.systemComponentData.fillData(data.systemComponentData);
      this.systemComponentsHierarchyData.fillData(
        data.systemComponentsHierarchyData
      );
      this.parentBodyPartData.fillData(data.parentBodyPartData);
      this.isHaveChildrenStatus = data.isHaveChildrenStatus ?? false;
    } else {
      this.setInitialValue();
    }
  }
}
