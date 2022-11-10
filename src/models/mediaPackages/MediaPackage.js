import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/mediaPackages.svg";
import icon from "@/assets/images/mediaPackages.svg";
import AccountInfoData from "./../finance/accounts/Account";
import EducationalCategoryInfoData from "./../educational/educationalCategories/EducationalCategoryInfoData";
import MediaPackageFinance from "./MediaPackageFinance";
import MediaPackageLicenceData from "./MediaPackageLicenceData";
import MediaPackageStatisticsData from "./MediaPackageStatisticsData";

export default class MediaPackage extends BaseEntityModel {
  icon = icon;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.mediaPackageToken = "";
    this.mediaPackageNameCurrent = "";
    this.mediaPackageNameAr = "";
    this.mediaPackageNameEn = "";
    this.mediaPackageNameUnd = "";
    this.mediaPackageDescriptionCurrent = "";
    this.mediaPackageDescriptionAr = "";
    this.mediaPackageDescriptionEn = "";
    this.mediaPackageDescriptionUnd = "";
    this.mediaPackageNotes = "";
    this.mediaPackageImageIsDefault = false;
    this.mediaPackageImagePath = "";
    this.mediaPackageImageSizeBytes = 0;
    this.mediaPackageImageSizeTextCurrent = "";
    this.mediaPackageShowStatusTypeToken = "";
    this.mediaPackageShowStatusTypeNameCurrent = "";
    this.educationalCategoryToken = "";
    this.accountToken = "";
    this.mediaPackageMediaData = [];
    this.accountInfoData = new AccountInfoData();
    this.educationalCategoryInfoData = new EducationalCategoryInfoData();
    this.mediaPackageFinance = new MediaPackageFinance();
    this.mediaPackageLicenceData = new MediaPackageLicenceData();
    this.mediaPackageStatisticsData = new MediaPackageStatisticsData();
    // added by me
    this.selectorFolderTokenMediaTokensAndData = []; //listOfObj sub-selection
    this.selectorSharedMediaTokens = []; //all selection
    this.selectorSharedMediaData = []; //all selection
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.mediaPackageToken = data.mediaPackageToken ?? "";
      this.mediaPackageNameCurrent = data.mediaPackageNameCurrent ?? "";
      this.mediaPackageNameAr = data.mediaPackageNameAr ?? "";
      this.mediaPackageNameEn = data.mediaPackageNameEn ?? "";
      this.mediaPackageNameUnd = data.mediaPackageNameUnd ?? "";
      this.mediaPackageDescriptionCurrent =
        data.mediaPackageDescriptionCurrent ?? "";
      this.mediaPackageDescriptionAr = data.mediaPackageDescriptionAr ?? "";
      this.mediaPackageDescriptionEn = data.mediaPackageDescriptionEn ?? "";
      this.mediaPackageDescriptionUnd = data.mediaPackageDescriptionUnd ?? "";
      this.mediaPackageNotes = data.mediaPackageNotes ?? "";
      this.mediaPackageImageIsDefault =
        data.mediaPackageImageIsDefault ?? false;
      this.mediaPackageImagePath = data.mediaPackageImagePath ?? "";
      this.mediaPackageImageSizeBytes = data.mediaPackageImageSizeBytes ?? 0;
      this.mediaPackageImageSizeTextCurrent =
        data.mediaPackageImageSizeTextCurrent ?? "";
      this.mediaPackageShowStatusTypeToken =
        data.mediaPackageShowStatusTypeToken ?? "";
      this.mediaPackageShowStatusTypeNameCurrent =
        data.mediaPackageShowStatusTypeNameCurrent ?? "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.accountToken = data.accountToken ?? "";
      this.mediaPackageMediaData = data.mediaPackageMediaData ?? [];
      this.accountInfoData.fillData(data.accountInfoData);
      this.educationalCategoryInfoData.fillData(
        data.educationalCategoryInfoData
      );
      this.mediaPackageFinance.fillData(data.mediaPackageFinance);
      this.mediaPackageLicenceData.fillData(data.mediaPackageLicenceData);
      this.mediaPackageStatisticsData.fillData(data.mediaPackageStatisticsData);
    } else {
      this.setInitialValue();
    }
  }
}
