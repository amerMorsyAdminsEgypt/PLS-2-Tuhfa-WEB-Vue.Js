import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/folder.svg";
import icon from "@/assets/images/StorageSpaces.svg";

export default class StorageSpace extends BaseEntityModel {
  icon = icon;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue(mainToken) {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.storageSpaceToken = "";
    this.storageSpaceNameCurrent = "";
    this.storageSpaceNameEn = "";
    this.storageSpaceNameAr = "";
    this.storageSpaceNameUnd = "";
    this.storageSpaceTypeToken = "";
    this.storageSpaceTypeNameCurrent = "";
    this.storageSpaceImagePath = "";
    this.storageSpaceImageIsDefault = false;
    this.storageSpaceImageSizeBytes = 0;
    this.storageSpaceImageSizeTextCurrent = "";
    this.countChildActive = 0;
    this.countChildArchived = 0;
    this.countChildBlocked = 0;
    this.countChildTotal = 0;
    this.countStorageSpacesMediaActive = 0;
    this.storageSpacesMediaActiveSizeBytes = 0;
    this.storageSpacesMediaActiveSizeTextCurrent = "";
    this.storageSpacesMediaActiveSizeTextAr = "";
    this.storageSpacesMediaActiveSizeTextEn = "";
    this.storageSpacesMediaActiveSizeTextUnd = "";
    this.countStorageSpacesMediaArchived = 0;
    this.storageSpacesMediaArchivedSizeBytes = 0;
    this.storageSpacesMediaArchivedSizeTextCurrent = "";
    this.storageSpacesMediaArchivedSizeTextAr = "";
    this.storageSpacesMediaArchivedSizeTextEn = "";
    this.storageSpacesMediaArchivedSizeTextUnd = "";
    this.countStorageSpacesMediaBlocked = 0;
    this.storageSpacesMediaBlockedSizeBytes = 0;
    this.storageSpacesMediaBlockedSizeTextCurrent = "";
    this.storageSpacesMediaBlockedSizeTextAr = "";
    this.storageSpacesMediaBlockedSizeTextEn = "";
    this.storageSpacesMediaBlockedSizeTextUnd = "";
    this.storageSpaceDescriptionCurrent = "";
    this.storageSpaceDescriptionAr = "";
    this.storageSpaceDescriptionEn = "";
    this.storageSpaceDescriptionUnd = "";
    this.countStorageSpacesMediaTotal = 0;
    this.storageSpacesMediaTotalSizeBytes = 0;
    this.storageSpacesMediaTotalSizeTextCurrent = "";
    this.storageSpacesMediaTotalSizeTextAr = "";
    this.storageSpacesMediaTotalSizeTextEn = "";
    this.storageSpacesMediaTotalSizeTextUnd = "";
    this.storageSpaceNotes = "";
    this.isChild = false;
    this.mainToken = mainToken || "";
    this.storageSpaceShowStatusTypeToken = "";
    this.storageSpaceShowStatusTypeNameCurrent = "";
    this.storageSpaceShowStatusTypeNameAr = "";
    this.storageSpaceShowStatusTypeNameEn = "";
    this.storageSpaceShowStatusTypeNameUnd = "";
    this.storageSpaceParentToken = null;
    this.storageSpaceParentData = null;
    this.userToken = null;
    this.userData = null;
    this.placeToken = "";
    this.placeData = null;
    this.educationalCategoryToken = null;
    this.educationalCategoryData = null;
    this.educationalGroupToken = null;
    this.educationalGroupData = null;
    this.vechileToken = null;
    this.vechileData = null;
    this.accountToken = null;
    this.accountData = null;
    this.storeItemToken = null;
    this.storeItemData = null;
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.storageSpaceToken = data.storageSpaceToken;
    this.storageSpaceNameCurrent = data.storageSpaceNameCurrent;
    this.storageSpaceNameEn = data.storageSpaceNameEn;
    this.storageSpaceNameAr = data.storageSpaceNameAr;
    this.storageSpaceNameUnd = data.storageSpaceNameUnd;
    this.storageSpaceTypeToken = data.storageSpaceTypeToken;
    this.storageSpaceTypeNameCurrent = data.storageSpaceTypeNameCurrent;
    this.storageSpaceImagePath = data.storageSpaceImagePath;
    this.storageSpaceImageIsDefault = data.storageSpaceImageIsDefault;
    this.storageSpaceImageSizeBytes = data.storageSpaceImageSizeBytes;
    this.storageSpaceImageSizeTextCurrent =
      data.storageSpaceImageSizeTextCurrent;
    this.countChildActive = data.countChildActive;
    this.countChildArchived = data.countChildArchived;
    this.countChildBlocked = data.countChildBlocked;
    this.countChildTotal = data.countChildTotal;
    this.countStorageSpacesMediaActive = data.countStorageSpacesMediaActive;
    this.storageSpacesMediaActiveSizeBytes =
      data.storageSpacesMediaActiveSizeBytes;
    this.storageSpacesMediaActiveSizeTextCurrent =
      data.storageSpacesMediaActiveSizeTextCurrent;
    this.storageSpacesMediaActiveSizeTextAr =
      data.storageSpacesMediaActiveSizeTextAr;
    this.storageSpacesMediaActiveSizeTextEn =
      data.storageSpacesMediaActiveSizeTextEn;
    this.storageSpacesMediaActiveSizeTextUnd =
      data.storageSpacesMediaActiveSizeTextUnd;
    this.countStorageSpacesMediaArchived = data.countStorageSpacesMediaArchived;
    this.storageSpacesMediaArchivedSizeBytes =
      data.storageSpacesMediaArchivedSizeBytes;
    this.storageSpacesMediaArchivedSizeTextCurrent =
      data.storageSpacesMediaArchivedSizeTextCurrent;
    this.storageSpacesMediaArchivedSizeTextAr =
      data.storageSpacesMediaArchivedSizeTextAr;
    this.storageSpacesMediaArchivedSizeTextEn =
      data.storageSpacesMediaArchivedSizeTextEn;
    this.storageSpacesMediaArchivedSizeTextUnd =
      data.storageSpacesMediaArchivedSizeTextUnd;
    this.countStorageSpacesMediaBlocked = data.countStorageSpacesMediaBlocked;
    this.storageSpacesMediaBlockedSizeBytes =
      data.storageSpacesMediaBlockedSizeBytes;
    this.storageSpacesMediaBlockedSizeTextCurrent =
      data.storageSpacesMediaBlockedSizeTextCurrent;
    this.storageSpacesMediaBlockedSizeTextAr =
      data.storageSpacesMediaBlockedSizeTextAr;
    this.storageSpacesMediaBlockedSizeTextEn =
      data.storageSpacesMediaBlockedSizeTextEn;
    this.storageSpacesMediaBlockedSizeTextUnd =
      data.storageSpacesMediaBlockedSizeTextUnd;
    this.storageSpaceDescriptionCurrent = data.storageSpaceDescriptionCurrent;
    this.storageSpaceDescriptionAr = data.storageSpaceDescriptionAr;
    this.storageSpaceDescriptionEn = data.storageSpaceDescriptionEn;
    this.storageSpaceDescriptionUnd = data.storageSpaceDescriptionUnd;
    this.countStorageSpacesMediaTotal = data.countStorageSpacesMediaTotal;
    this.storageSpacesMediaTotalSizeBytes =
      data.storageSpacesMediaTotalSizeBytes;
    this.storageSpacesMediaTotalSizeTextCurrent =
      data.storageSpacesMediaTotalSizeTextCurrent;
    this.storageSpacesMediaTotalSizeTextAr =
      data.storageSpacesMediaTotalSizeTextAr;
    this.storageSpacesMediaTotalSizeTextEn =
      data.storageSpacesMediaTotalSizeTextEn;
    this.storageSpacesMediaTotalSizeTextUnd =
      data.storageSpacesMediaTotalSizeTextUnd;
    this.storageSpaceNotes = data.storageSpaceNotes;
    this.isChild = data.isChild;
    this.mainToken = data.mainToken;
    this.storageSpaceShowStatusTypeToken =
      data.storageSpaceShowStatusTypeToken || "";
    this.storageSpaceShowStatusTypeNameCurrent =
      data.storageSpaceShowStatusTypeNameCurrent || "";
    this.storageSpaceShowStatusTypeNameAr =
      data.storageSpaceShowStatusTypeNameAr || "";
    this.storageSpaceShowStatusTypeNameEn =
      data.storageSpaceShowStatusTypeNameEn || "";
    this.storageSpaceShowStatusTypeNameUnd =
      data.storageSpaceShowStatusTypeNameUnd || "";
    this.storageSpaceParentToken = data.storageSpaceParentToken;
    this.storageSpaceParentData = data.storageSpaceParentData;
    this.userToken = data.userToken;
    this.userData = data.userData;
    this.placeToken = data.placeToken;
    this.placeData = data.placeData;
    this.educationalCategoryToken = data.educationalCategoryToken;
    this.educationalCategoryData = data.educationalCategoryData;
    this.educationalGroupToken = data.educationalGroupToken;
    this.educationalGroupData = data.educationalGroupData;
    this.vechileToken = data.vechileToken;
    this.vechileData = data.vechileData;
    this.accountToken = data.accountToken;
    this.accountData = data.accountData;
    this.storeItemToken = data.storeItemToken;
    this.storeItemData = data.storeItemData;
  }
}
