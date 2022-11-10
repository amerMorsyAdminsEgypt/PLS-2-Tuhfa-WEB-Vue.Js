import BaseEntityModel from "./../../general/BaseEntityModel";
import PropertyTypeInfoData from "./../propertyTypes/PropertyTypeInfoData";
import defaultImg from "@/assets/images/StoreItems.svg";

export default class StoreItem extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.storeItemToken = "";
    this.storeItemNameCurrent = "";
    this.storeItemNameEn = "";
    this.storeItemNameAr = "";
    this.storeItemNameUnd = "";
    this.storeItemDescriptionCurrent = "";
    this.storeItemDescriptionAr = "";
    this.storeItemDescriptionEn = "";
    this.storeItemDescriptionUnd = "";
    this.storeItemImageIsDefault = false;
    this.storeItemImagePath = "";
    this.storeItemImageSizeBytes = "";
    this.storeItemImageSizeTextCurrent = "";
    this.storeItemNotes = "";
    this.parentStoreItemToken = "";
    this.parentStoreItemData = null;
    this.mainRootToken = "";
    this.rankingUnderParent = 0;
    this.isHaveChildrenStatus = false;
    this.systemComponentToken = "";
    this.systemComponentInfoData = null;
    this.systemComponentHierarchyToken = "";
    this.systemComponentsHierarchyInfoData = null;
    this.fullTreeData = "";
    this.propertyTypesData = [];
    this.propertyTypeTokens = [];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.storeItemToken = data.storeItemToken ?? "";
      this.storeItemNameCurrent = data.storeItemNameCurrent ?? "";
      this.storeItemNameEn = data.storeItemNameEn ?? "";
      this.storeItemNameAr = data.storeItemNameAr ?? "";
      this.storeItemNameUnd = data.storeItemNameUnd ?? "";
      this.storeItemDescriptionCurrent = data.storeItemDescriptionCurrent ?? "";
      this.storeItemDescriptionAr = data.storeItemDescriptionAr ?? "";
      this.storeItemDescriptionEn = data.storeItemDescriptionEn ?? "";
      this.storeItemDescriptionUnd = data.storeItemDescriptionUnd ?? "";
      this.storeItemImageIsDefault = data.storeItemImageIsDefault ?? false;
      this.storeItemImagePath = data.storeItemImagePath ?? "";
      this.storeItemImageSizeBytes = data.storeItemImageSizeBytes ?? "";
      this.storeItemImageSizeTextCurrent =
        data.storeItemImageSizeTextCurrent ?? "";
      this.storeItemNotes = data.storeItemNotes ?? "";
      this.parentStoreItemToken = data.parentStoreItemToken ?? "";
      this.parentStoreItemData = data.parentStoreItemData ?? null;
      this.mainRootToken = data.mainRootToken ?? "";
      this.rankingUnderParent = data.rankingUnderParent ?? 0;
      this.isHaveChildrenStatus = data.isHaveChildrenStatus ?? false;
      this.systemComponentToken = data.systemComponentToken ?? "";
      this.systemComponentInfoData = data.systemComponentInfoData ?? null;
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken ?? "";
      this.systemComponentsHierarchyInfoData =
        data.systemComponentsHierarchyInfoData ?? null;
      this.fullTreeData = data.fullTreeData ?? "";
      this.propertyTypesData = [];
      this.propertyTypeTokens = [];
      if (data.propertyTypesData != null && data.propertyTypesData.length > 0) {
        this.propertyTypesData = data.propertyTypesData.map((element) => {
          return new PropertyTypeInfoData(element);
        });
        this.propertyTypeTokens = data.propertyTypesData.map((element) => {
          return element.propertyTypeToken;
        });
      }
    } else {
      this.setInitialValue();
    }
  }
}
