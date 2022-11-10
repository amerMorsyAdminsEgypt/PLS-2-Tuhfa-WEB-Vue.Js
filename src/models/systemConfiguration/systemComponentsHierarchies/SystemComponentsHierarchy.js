import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/type.svg";

export default class SystemComponentsHierarchy extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.systemComponentsHierarchyToken = "";
    this.systemComponentsHierarchyNameCurrent = "";
    this.systemComponentsHierarchyNameAr = "";
    this.systemComponentsHierarchyNameEn = "";
    this.systemComponentsHierarchyNameUnd = "";
    this.systemTypeToken = "";
    this.systemTypeNameCurrent = "";
    this.systemTypeNameAr = "";
    this.systemTypeNameEn = "";
    this.systemTypeNameUnd = "";
    this.systemComponentsHierarchyDescriptionCurrent = "";
    this.systemComponentsHierarchyDescriptionAr = "";
    this.systemComponentsHierarchyDescriptionEn = "";
    this.systemComponentsHierarchyDescriptionUnd = "";
    this.systemComponentsHierarchyNotes = "";
    this.systemComponentsHierarchyImagePath = "";
    this.systemComponentsHierarchyImageIsDefault = "";
    this.systemComponentsHierarchyImageSizeBytes = "";
    this.systemComponentsHierarchyImageSizeTextCurrent = "";
    this.systemComponentsHierarchyImageSizeTextAr = "";
    this.systemComponentsHierarchyImageSizeTextEn = "";
    this.systemComponentsHierarchyImageSizeTextUnd = "";
    this.systemComponentsHierarchiesDetailsData = "";
    this.systemComponentTokenList = [];
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.systemComponentsHierarchyToken = data.systemComponentsHierarchyToken;
    this.systemComponentsHierarchyNameCurrent =
      data.systemComponentsHierarchyNameCurrent;
    this.systemComponentsHierarchyNameAr = data.systemComponentsHierarchyNameAr;
    this.systemComponentsHierarchyNameEn = data.systemComponentsHierarchyNameEn;
    this.systemComponentsHierarchyNameUnd =
      data.systemComponentsHierarchyNameUnd;
    this.systemTypeToken = data.systemTypeToken;
    this.systemTypeNameCurrent = data.systemTypeNameCurrent;
    this.systemTypeNameAr = data.systemTypeNameAr;
    this.systemTypeNameEn = data.systemTypeNameEn;
    this.systemTypeNameUnd = data.systemTypeNameUnd;
    this.systemComponentsHierarchyDescriptionCurrent =
      data.systemComponentsHierarchyDescriptionCurrent;
    this.systemComponentsHierarchyDescriptionAr =
      data.systemComponentsHierarchyDescriptionAr;
    this.systemComponentsHierarchyDescriptionEn =
      data.systemComponentsHierarchyDescriptionEn;
    this.systemComponentsHierarchyDescriptionUnd =
      data.systemComponentsHierarchyDescriptionUnd;
    this.systemComponentsHierarchyNotes = data.systemComponentsHierarchyNotes;
    this.systemComponentsHierarchyImagePath =
      data.systemComponentsHierarchyImagePath;
    this.systemComponentsHierarchyImageIsDefault =
      data.systemComponentsHierarchyImageIsDefault;
    this.systemComponentsHierarchyImageSizeBytes =
      data.systemComponentsHierarchyImageSizeBytes;
    this.systemComponentsHierarchyImageSizeTextCurrent =
      data.systemComponentsHierarchyImageSizeTextCurrent;
    this.systemComponentsHierarchyImageSizeTextAr =
      data.systemComponentsHierarchyImageSizeTextAr;
    this.systemComponentsHierarchyImageSizeTextEn =
      data.systemComponentsHierarchyImageSizeTextEn;
    this.systemComponentsHierarchyImageSizeTextUnd =
      data.systemComponentsHierarchyImageSizeTextUnd;
    this.systemComponentsHierarchiesDetailsData =
      data.systemComponentsHierarchiesDetailsData;
    this.systemComponentTokenList = data.systemComponentsHierarchiesDetailsData
      .length
      ? data.systemComponentsHierarchiesDetailsData.map(
          (x) => x.systemComponentToken
        )
      : [];
  }
}
