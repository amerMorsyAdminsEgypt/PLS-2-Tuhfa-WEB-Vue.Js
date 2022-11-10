import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/folder.svg";
import icon from "@/assets/images/sharedMediaFolders.svg";

export default class SharedMediaFolder extends BaseEntityModel {
  icon = icon;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.sharedMediaFolderToken = "";
    this.sharedMediaFolderNameCurrent = "";
    this.sharedMediaFolderNameEn = "";
    this.sharedMediaFolderNameAr = "";
    this.sharedMediaFolderNameUnd = "";
    this.sharedMediaFolderDescriptionCurrent = "";
    this.sharedMediaFolderDescriptionAr = "";
    this.sharedMediaFolderDescriptionEn = "";
    this.sharedMediaFolderDescriptionUnd = "";
    this.sharedMediaFolderTypeToken = "";
    this.sharedMediaFolderTypeNameCurrent = "";
    this.sharedMediaFolderImagePath = "";
    this.sharedMediaFolderImageIsDefault = false;
    this.sharedMediaFolderImageSizeBytes = 0;
    this.sharedMediaFolderImageSizeTextCurrent = "";
    this.sharedMediaFolderNotes = "";
    this.mainModuleToken = "";
    this.rankingUnderParent = 0;
    this.mainTreeRootToken = "";
    this.isHaveChildrenStatus = false;
    this.parentSharedMediaFolderToken = "";
    this.sharedMediaFolderParentInfoData = null;
    this.sharedMediaFolderStatistics = "";
    this.educationalCategoryToken = "";
    this.educationalCategoryInfoData = null;
    this.educationalGroupToken = "";
    this.educationalGroupInfoData = null;
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.sharedMediaFolderToken = data.sharedMediaFolderToken ?? "";
    this.sharedMediaFolderNameCurrent = data.sharedMediaFolderNameCurrent ?? "";
    this.sharedMediaFolderNameEn = data.sharedMediaFolderNameEn ?? "";
    this.sharedMediaFolderNameAr = data.sharedMediaFolderNameAr ?? "";
    this.sharedMediaFolderNameUnd = data.sharedMediaFolderNameUnd ?? "";
    this.sharedMediaFolderDescriptionCurrent =
      data.sharedMediaFolderDescriptionCurrent ?? "";
    this.sharedMediaFolderDescriptionAr =
      data.sharedMediaFolderDescriptionAr ?? "";
    this.sharedMediaFolderDescriptionEn =
      data.sharedMediaFolderDescriptionEn ?? "";
    this.sharedMediaFolderDescriptionUnd =
      data.sharedMediaFolderDescriptionUnd ?? "";
    this.sharedMediaFolderTypeToken = data.sharedMediaFolderTypeToken ?? "";
    this.sharedMediaFolderTypeNameCurrent =
      data.sharedMediaFolderTypeNameCurrent ?? "";
    this.sharedMediaFolderImagePath = data.sharedMediaFolderImagePath ?? "";
    this.sharedMediaFolderImageIsDefault =
      data.sharedMediaFolderImageIsDefault ?? false;
    this.sharedMediaFolderImageSizeBytes =
      data.sharedMediaFolderImageSizeBytes ?? 0;
    this.sharedMediaFolderImageSizeTextCurrent =
      data.sharedMediaFolderImageSizeTextCurrent ?? "";
    this.sharedMediaFolderNotes = data.sharedMediaFolderNotes ?? "";
    this.mainModuleToken = data.mainModuleToken ?? "";
    this.rankingUnderParent = data.rankingUnderParent ?? 0;
    this.mainTreeRootToken = data.mainTreeRootToken ?? "";
    this.isHaveChildrenStatus = data.isHaveChildrenStatus ?? false;
    this.parentSharedMediaFolderToken = data.parentSharedMediaFolderToken ?? "";
    this.sharedMediaFolderParentInfoData =
      data.sharedMediaFolderParentInfoData ?? null;
    this.sharedMediaFolderStatistics = data.sharedMediaFolderStatistics ?? "";
    this.educationalCategoryToken = data.educationalCategoryToken ?? "";
    this.educationalCategoryInfoData = data.educationalCategoryInfoData ?? null;
    this.educationalGroupToken = data.educationalGroupToken ?? "";
    this.educationalGroupInfoData = data.educationalGroupInfoData ?? null;
  }
}
