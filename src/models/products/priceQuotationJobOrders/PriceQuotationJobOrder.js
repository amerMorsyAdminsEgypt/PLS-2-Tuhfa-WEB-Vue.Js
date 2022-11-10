import BaseEntityModel from "./../../general/BaseEntityModel";
import PriceQuotationInfo from "./../priceQuotations/PriceQuotationInfo";
import defaultImg from "@/assets/images/PriceQuotationJobOrders.svg";

export default class PriceQuotationJobOrder extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue(jobOrderHistoryWorkTypeToken = "") {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.priceQuotationJobOrderToken = "";
    this.priceQuotationJobOrderNameCurrent = "";
    this.priceQuotationJobOrderNameEn = "";
    this.priceQuotationJobOrderNameAr = "";
    this.priceQuotationJobOrderNameUnd = "";
    this.priceQuotationJobOrderDescriptionCurrent = "";
    this.priceQuotationJobOrderDescriptionAr = "";
    this.priceQuotationJobOrderDescriptionEn = "";
    this.priceQuotationJobOrderDescriptionUnd = "";
    this.startWorkDateTime = "";
    this.startWorkDateTimeCustomized = "";
    this.startWorkDate = "";
    this.startWorkTime = "";
    this.expectedFinishWorkDateTime = "";
    this.expectedFinishWorkDateTimeCustomized = "";
    this.expectedFinishWorkDate = "";
    this.expectedFinishWorkTime = "";
    this.priceQuotationJobOrderImageIsDefault = false;
    this.priceQuotationJobOrderImagePath = "";
    this.priceQuotationJobOrderImageSizeBytes = "";
    this.priceQuotationJobOrderImageSizeTextCurrent = "";
    this.priceQuotationJobOrderNotes = "";
    this.jobOrderHistoryWorkTypeToken = jobOrderHistoryWorkTypeToken || "";
    this.jobOrderHistoryWorkTypeNameCurrent = "";
    this.priceQuotationToken = "";
    this.lastJobOrderHistoryWorkToken = "";
    this.priceQuotationInfoData = new PriceQuotationInfo();
    this.lastJobOrderHistoryWorkInfoData = null;
    this.priceQuotationJobOrderUsersData = [];
    this.userTokenList = [];
    this.jobOrderHistoryWorkNotes = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.priceQuotationJobOrderToken = data.priceQuotationJobOrderToken ?? "";
      this.priceQuotationJobOrderNameCurrent =
        data.priceQuotationJobOrderNameCurrent ?? "";
      this.priceQuotationJobOrderNameEn =
        data.priceQuotationJobOrderNameEn ?? "";
      this.priceQuotationJobOrderNameAr =
        data.priceQuotationJobOrderNameAr ?? "";
      this.priceQuotationJobOrderNameUnd =
        data.priceQuotationJobOrderNameUnd ?? "";
      this.priceQuotationJobOrderDescriptionCurrent =
        data.priceQuotationJobOrderDescriptionCurrent ?? "";
      this.priceQuotationJobOrderDescriptionAr =
        data.priceQuotationJobOrderDescriptionAr ?? "";
      this.priceQuotationJobOrderDescriptionEn =
        data.priceQuotationJobOrderDescriptionEn ?? "";
      this.priceQuotationJobOrderDescriptionUnd =
        data.priceQuotationJobOrderDescriptionUnd ?? "";
      this.startWorkDateTime = data.startWorkDateTime ?? "";
      this.startWorkDateTimeCustomized = data.startWorkDateTimeCustomized ?? "";
      this.startWorkDate = data.startWorkDate ?? "";
      this.startWorkTime = data.startWorkTime ?? "";
      this.expectedFinishWorkDateTime = data.expectedFinishWorkDateTime ?? "";
      this.expectedFinishWorkDateTimeCustomized =
        data.expectedFinishWorkDateTimeCustomized ?? "";
      this.expectedFinishWorkDate = data.expectedFinishWorkDate ?? "";
      this.expectedFinishWorkTime = data.expectedFinishWorkTime ?? "";
      this.priceQuotationJobOrderImageIsDefault =
        data.priceQuotationJobOrderImageIsDefault ?? false;
      this.priceQuotationJobOrderImagePath =
        data.priceQuotationJobOrderImagePath ?? "";
      this.priceQuotationJobOrderImageSizeBytes =
        data.priceQuotationJobOrderImageSizeBytes ?? "";
      this.priceQuotationJobOrderImageSizeTextCurrent =
        data.priceQuotationJobOrderImageSizeTextCurrent ?? "";
      this.priceQuotationJobOrderNotes = data.priceQuotationJobOrderNotes ?? "";
      this.jobOrderHistoryWorkTypeToken =
        data.jobOrderHistoryWorkTypeToken ?? "";
      this.jobOrderHistoryWorkTypeNameCurrent =
        data.jobOrderHistoryWorkTypeNameCurrent ?? "";
      this.priceQuotationToken = data.priceQuotationToken ?? "";
      this.lastJobOrderHistoryWorkToken =
        data.lastJobOrderHistoryWorkToken ?? "";
      this.priceQuotationInfoData.fillData(data.priceQuotationInfoData);
      this.lastJobOrderHistoryWorkInfoData =
        data.lastJobOrderHistoryWorkInfoData ?? null;
      this.priceQuotationJobOrderUsersData =
        data.priceQuotationJobOrderUsersData ?? [];
    } else {
      this.setInitialValue();
    }
  }
}
