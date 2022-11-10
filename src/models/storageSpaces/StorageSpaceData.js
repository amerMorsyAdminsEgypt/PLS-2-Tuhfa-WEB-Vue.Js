import EducationalCategoryInfoData from "./../educational/educationalCategories/EducationalCategoryInfoData";
import EducationalGroup from "./../educational/educationalGroups/EducationalGroup";

export default class StorageSpaceData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue(mainToken) {
    this.storageSpaceToken = "";
    this.fullCode = "";
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
    this.educationalGroupToken = null;
    this.vechileToken = null;
    this.vechileData = null;
    this.accountToken = null;
    this.accountData = null;
    this.storeItemToken = null;
    this.storeItemData = null;
    this.educationalCategoryData = new EducationalCategoryInfoData();
    this.educationalGroupData = new EducationalGroup();
  }
  fillData(data) {
    if (data) {
      this.storageSpaceToken = data.storageSpaceToken ?? "";
      this.fullCode = data.fullCode ?? "";
      this.storageSpaceNameCurrent = data.storageSpaceNameCurrent ?? "";
      this.storageSpaceNameEn = data.storageSpaceNameEn ?? "";
      this.storageSpaceNameAr = data.storageSpaceNameAr ?? "";
      this.storageSpaceNameUnd = data.storageSpaceNameUnd ?? "";
      this.storageSpaceTypeToken = data.storageSpaceTypeToken ?? "";
      this.storageSpaceTypeNameCurrent = data.storageSpaceTypeNameCurrent ?? "";
      this.storageSpaceImagePath = data.storageSpaceImagePath ?? "";
      this.storageSpaceImageIsDefault =
        data.storageSpaceImageIsDefault ?? false;
      this.storageSpaceImageSizeBytes = data.storageSpaceImageSizeBytes ?? 0;
      this.storageSpaceImageSizeTextCurrent =
        data.storageSpaceImageSizeTextCurrent ?? "";
      this.countChildActive = data.countChildActive ?? 0;
      this.countChildArchived = data.countChildArchived ?? 0;
      this.countChildBlocked = data.countChildBlocked ?? 0;
      this.countChildTotal = data.countChildTotal ?? 0;
      this.countStorageSpacesMediaActive =
        data.countStorageSpacesMediaActive ?? 0;
      this.storageSpacesMediaActiveSizeBytes =
        data.storageSpacesMediaActiveSizeBytes ?? 0;
      this.storageSpacesMediaActiveSizeTextCurrent =
        data.storageSpacesMediaActiveSizeTextCurrent ?? "";
      this.storageSpacesMediaActiveSizeTextAr =
        data.storageSpacesMediaActiveSizeTextAr ?? "";
      this.storageSpacesMediaActiveSizeTextEn =
        data.storageSpacesMediaActiveSizeTextEn ?? "";
      this.storageSpacesMediaActiveSizeTextUnd =
        data.storageSpacesMediaActiveSizeTextUnd ?? "";
      this.countStorageSpacesMediaArchived =
        data.countStorageSpacesMediaArchived ?? 0;
      this.storageSpacesMediaArchivedSizeBytes =
        data.storageSpacesMediaArchivedSizeBytes ?? 0;
      this.storageSpacesMediaArchivedSizeTextCurrent =
        data.storageSpacesMediaArchivedSizeTextCurrent ?? "";
      this.storageSpacesMediaArchivedSizeTextAr =
        data.storageSpacesMediaArchivedSizeTextAr ?? "";
      this.storageSpacesMediaArchivedSizeTextEn =
        data.storageSpacesMediaArchivedSizeTextEn ?? "";
      this.storageSpacesMediaArchivedSizeTextUnd =
        data.storageSpacesMediaArchivedSizeTextUnd ?? "";
      this.countStorageSpacesMediaBlocked =
        data.countStorageSpacesMediaBlocked ?? 0;
      this.storageSpacesMediaBlockedSizeBytes =
        data.storageSpacesMediaBlockedSizeBytes ?? 0;
      this.storageSpacesMediaBlockedSizeTextCurrent =
        data.storageSpacesMediaBlockedSizeTextCurrent ?? "";
      this.storageSpacesMediaBlockedSizeTextAr =
        data.storageSpacesMediaBlockedSizeTextAr ?? "";
      this.storageSpacesMediaBlockedSizeTextEn =
        data.storageSpacesMediaBlockedSizeTextEn ?? "";
      this.storageSpacesMediaBlockedSizeTextUnd =
        data.storageSpacesMediaBlockedSizeTextUnd ?? "";
      this.storageSpaceDescriptionCurrent =
        data.storageSpaceDescriptionCurrent ?? "";
      this.storageSpaceDescriptionAr = data.storageSpaceDescriptionAr ?? "";
      this.storageSpaceDescriptionEn = data.storageSpaceDescriptionEn ?? "";
      this.storageSpaceDescriptionUnd = data.storageSpaceDescriptionUnd ?? "";
      this.countStorageSpacesMediaTotal =
        data.countStorageSpacesMediaTotal ?? 0;
      this.storageSpacesMediaTotalSizeBytes =
        data.storageSpacesMediaTotalSizeBytes ?? 0;
      this.storageSpacesMediaTotalSizeTextCurrent =
        data.storageSpacesMediaTotalSizeTextCurrent ?? "";
      this.storageSpacesMediaTotalSizeTextAr =
        data.storageSpacesMediaTotalSizeTextAr ?? "";
      this.storageSpacesMediaTotalSizeTextEn =
        data.storageSpacesMediaTotalSizeTextEn ?? "";
      this.storageSpacesMediaTotalSizeTextUnd =
        data.storageSpacesMediaTotalSizeTextUnd ?? "";
      this.storageSpaceNotes = data.storageSpaceNotes ?? "";
      this.isChild = data.isChild ?? false;
      this.mainToken = data.mainToken ?? "";
      this.storageSpaceShowStatusTypeToken =
        data.storageSpaceShowStatusTypeToken ?? "";
      this.storageSpaceShowStatusTypeNameCurrent =
        data.storageSpaceShowStatusTypeNameCurrent ?? "";
      this.storageSpaceShowStatusTypeNameAr =
        data.storageSpaceShowStatusTypeNameAr ?? "";
      this.storageSpaceShowStatusTypeNameEn =
        data.storageSpaceShowStatusTypeNameEn ?? "";
      this.storageSpaceShowStatusTypeNameUnd =
        data.storageSpaceShowStatusTypeNameUnd ?? "";
      this.storageSpaceParentToken = data.storageSpaceParentToken ?? null;
      this.storageSpaceParentData = data.storageSpaceParentData ?? null;
      this.userToken = data.userToken ?? null;
      this.userData = data.userData ?? null;
      this.placeToken = data.placeToken ?? "";
      this.placeData = data.placeData ?? null;
      this.educationalCategoryToken = data.educationalCategoryToken ?? null;
      this.educationalGroupToken = data.educationalGroupToken ?? null;
      this.vechileToken = data.vechileToken ?? null;
      this.vechileData = data.vechileData ?? null;
      this.accountToken = data.accountToken ?? null;
      this.accountData = data.accountData ?? null;
      this.storeItemToken = data.storeItemToken ?? null;
      this.storeItemData = data.storeItemData ?? null;
      this.educationalCategoryData.fillData(data.educationalCategoryData);
      this.educationalGroupData.fillData(data.educationalGroupData);
    } else {
      this.setInitialValue();
    }
  }
}
