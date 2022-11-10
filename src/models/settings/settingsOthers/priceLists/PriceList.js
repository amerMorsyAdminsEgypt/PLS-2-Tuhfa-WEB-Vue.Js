import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/PriceLists.svg";
import EducationalCategoryInfoData from "./../../../educational/educationalCategories/EducationalCategoryInfoData";

export default class PriceList extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.priceListToken = "";
    this.priceListNameCurrent = "";
    this.priceListNameAr = "";
    this.priceListNameEn = "";
    this.priceListNameUnd = "";
    this.priceListDescriptionCurrent = "";
    this.priceListDescriptionAr = "";
    this.priceListDescriptionEn = "";
    this.priceListDescriptionUnd = "";
    this.priceListNotes = "";
    this.priceListPackagePriceForClient = "";
    this.priceListPackagePriceInOfferForClient = "";
    this.priceListSessionPriceForClient = "";
    this.priceListSessionPriceInOfferForClient = "";
    this.priceListHourPriceForClient = "";
    this.priceListHourPriceInOfferForClient = "";
    this.priceListInOfferStatus = false;
    this.priceListImageIsDefault = false;
    this.priceListImagePath = "";
    this.priceListImageSizeBytes = 0;
    this.priceListImageSizeTextCurrent = "";
    this.showStatusToken = "";
    this.showStatusNameCurrent = "";
    this.educationalCategoryToken = "";
    this.educationalCategoryInfoData = new EducationalCategoryInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.priceListToken = data.priceListToken || "";
      this.priceListNameCurrent = data.priceListNameCurrent || "";
      this.priceListNameAr = data.priceListNameAr || "";
      this.priceListNameEn = data.priceListNameEn || "";
      this.priceListNameUnd = data.priceListNameUnd || "";
      this.priceListDescriptionCurrent = data.priceListDescriptionCurrent || "";
      this.priceListDescriptionAr = data.priceListDescriptionAr || "";
      this.priceListDescriptionEn = data.priceListDescriptionEn || "";
      this.priceListDescriptionUnd = data.priceListDescriptionUnd || "";
      this.priceListNotes = data.priceListNotes || "";
      this.priceListPackagePriceForClient =
        data.priceListPackagePriceForClient || "";
      this.priceListPackagePriceInOfferForClient =
        data.priceListPackagePriceInOfferForClient || "";
      this.priceListSessionPriceForClient =
        data.priceListSessionPriceForClient || "";
      this.priceListSessionPriceInOfferForClient =
        data.priceListSessionPriceInOfferForClient || "";
      this.priceListHourPriceForClient = data.priceListHourPriceForClient || "";
      this.priceListHourPriceInOfferForClient =
        data.priceListHourPriceInOfferForClient || "";
      this.priceListInOfferStatus = data.priceListInOfferStatus || false;
      this.priceListImageIsDefault = data.priceListImageIsDefault || false;
      this.priceListImagePath = data.priceListImagePath || "";
      this.priceListImageSizeBytes = data.priceListImageSizeBytes || 0;
      this.priceListImageSizeTextCurrent =
        data.priceListImageSizeTextCurrent || "";
      this.showStatusToken = data.showStatusToken || "";
      this.showStatusNameCurrent = data.showStatusNameCurrent || "";
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.educationalCategoryInfoData.fillData(
        data.educationalCategoryInfoData
      );
    } else {
      this.setInitialValue();
    }
  }
}
