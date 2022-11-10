import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/PriceQuotationAffiliateOperations.svg";

export default class PriceQuotationAffiliateOperation extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue(priceQuotationDetailsToken = "") {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.designFile = "";
    this.priceQuotationAffiliateOperationToken = "";
    this.priceQuotationAffiliateOperationTitleCurrent = "";
    this.priceQuotationAffiliateOperationTitleEn = "";
    this.priceQuotationAffiliateOperationTitleAr = "";
    this.priceQuotationAffiliateOperationTitleUnd = "";
    this.priceQuotationAffiliateOperationDescriptionCurrent = "";
    this.priceQuotationAffiliateOperationDescriptionAr = "";
    this.priceQuotationAffiliateOperationDescriptionEn = "";
    this.priceQuotationAffiliateOperationDescriptionUnd = "";
    this.priceQuotationAffiliateOperationNotes = "";
    this.priceQuotationAffiliateOperationImageIsDefault = false;
    this.priceQuotationAffiliateOperationImagePath = "";
    this.priceQuotationAffiliateOperationImageSizeBytes = 0;
    this.priceQuotationAffiliateOperationImageSizeTextCurrent = "";
    this.priceQuotationAffiliateOperationImageSizeTextAr = "";
    this.priceQuotationAffiliateOperationImageSizeTextEn = "";
    this.priceQuotationAffiliateOperationImageSizeTextUnd = "";
    this.priceQuotationAffiliateOperationFileIsDefault = false;
    this.priceQuotationAffiliateOperationFilePath = "";
    this.priceQuotationAffiliateOperationFileSizeBytes = 0;
    this.priceQuotationAffiliateOperationFileSizeTextCurrent = "";
    this.priceQuotationAffiliateOperationFileTypeToken = "";
    this.priceQuotationAffiliateOperationFileTypeNameCurrent = "";
    this.priceQuotationDetailsToken = priceQuotationDetailsToken || "";
    this.priceQuotationDetailsInfoData = null;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.designFile = "";
      this.priceQuotationAffiliateOperationToken =
        data.priceQuotationAffiliateOperationToken ?? "";
      this.priceQuotationAffiliateOperationTitleCurrent =
        data.priceQuotationAffiliateOperationTitleCurrent ?? "";
      this.priceQuotationAffiliateOperationTitleEn =
        data.priceQuotationAffiliateOperationTitleEn ?? "";
      this.priceQuotationAffiliateOperationTitleAr =
        data.priceQuotationAffiliateOperationTitleAr ?? "";
      this.priceQuotationAffiliateOperationTitleUnd =
        data.priceQuotationAffiliateOperationTitleUnd ?? "";
      this.priceQuotationAffiliateOperationDescriptionCurrent =
        data.priceQuotationAffiliateOperationDescriptionCurrent ?? "";
      this.priceQuotationAffiliateOperationDescriptionAr =
        data.priceQuotationAffiliateOperationDescriptionAr ?? "";
      this.priceQuotationAffiliateOperationDescriptionEn =
        data.priceQuotationAffiliateOperationDescriptionEn ?? "";
      this.priceQuotationAffiliateOperationDescriptionUnd =
        data.priceQuotationAffiliateOperationDescriptionUnd ?? "";
      this.priceQuotationAffiliateOperationNotes =
        data.priceQuotationAffiliateOperationNotes ?? "";
      this.priceQuotationAffiliateOperationImageIsDefault =
        data.priceQuotationAffiliateOperationImageIsDefault ?? false;
      this.priceQuotationAffiliateOperationImagePath =
        data.priceQuotationAffiliateOperationImagePath ?? "";
      this.priceQuotationAffiliateOperationImageSizeBytes =
        data.priceQuotationAffiliateOperationImageSizeBytes ?? 0;
      this.priceQuotationAffiliateOperationImageSizeTextCurrent =
        data.priceQuotationAffiliateOperationImageSizeTextCurrent ?? "";
      this.priceQuotationAffiliateOperationImageSizeTextAr =
        data.priceQuotationAffiliateOperationImageSizeTextAr ?? "";
      this.priceQuotationAffiliateOperationImageSizeTextEn =
        data.priceQuotationAffiliateOperationImageSizeTextEn ?? "";
      this.priceQuotationAffiliateOperationImageSizeTextUnd =
        data.priceQuotationAffiliateOperationImageSizeTextUnd ?? "";
      this.priceQuotationAffiliateOperationFileIsDefault =
        data.priceQuotationAffiliateOperationFileIsDefault ?? false;
      this.priceQuotationAffiliateOperationFilePath =
        data.priceQuotationAffiliateOperationFilePath ?? "";
      this.priceQuotationAffiliateOperationFileSizeBytes =
        data.priceQuotationAffiliateOperationFileSizeBytes ?? 0;
      this.priceQuotationAffiliateOperationFileSizeTextCurrent =
        data.priceQuotationAffiliateOperationFileSizeTextCurrent ?? "";
      this.priceQuotationAffiliateOperationFileTypeToken =
        data.priceQuotationAffiliateOperationFileTypeToken ?? "";
      this.priceQuotationAffiliateOperationFileTypeNameCurrent =
        data.priceQuotationAffiliateOperationFileTypeNameCurrent ?? "";
      this.priceQuotationDetailsToken = data.priceQuotationDetailsToken ?? "";
      this.priceQuotationDetailsInfoData =
        data.priceQuotationDetailsInfoData ?? null;
    } else {
      this.setInitialValue();
    }
  }
}
