import BaseEntityModel from "./../../general/BaseEntityModel";
import PriceQuotationInfo from "./../priceQuotations/PriceQuotationInfo";
import LastPriceQuotationHistoryWorkInfoData from "./../priceQuotations/LastPriceQuotationHistoryWorkInfoData";
import defaultImg from "@/assets/images/PriceQuotationDetails.svg";

export default class PriceQuotationDetail extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.priceQuotationDetailsToken = "";
    this.storeItemToken = "";
    this.priceQuotationDetailsNotes = "";
    this.storeItemQuantity = 0;
    this.approvedPriceStoreItemsAmount = 0;
    this.approvedPriceStoreItemsAmountText = "";
    this.approvedPriceStoreItemsAmountWithCurrency = "";
    this.approvedPriceStoreItemAmount = 0;
    this.approvedPriceStoreItemAmountText = "";
    this.approvedPriceStoreItemAmountWithCurrency = "";
    this.affiliateOperationTypeToken = "";
    this.affiliateOperationTypeNameCurrent = "";
    this.affiliateOperationAmount = 0;
    this.affiliateOperationAmountText = "";
    this.affiliateOperationAmountWithCurrency = "";
    this.totalFinalPrice = 0;
    this.totalFinalPriceText = "";
    this.totalFinalPriceWithCurrency = "";
    this.quotationDetailsHistoryWorkTypeToken = "";
    this.quotationDetailsHistoryWorkTypeNameCurrent = "";
    this.priceQuotationToken = "";
    this.bestPriceQuotationPriceHistoryToken = "";
    this.bestPricePlaceToken = "";
    this.bestPriceTotalItemsAmount = 0;
    this.bestPriceTotalItemsAmountText = "";
    this.bestPriceTotalItemsAmountWithCurrency = "";
    this.bestPriceStoreItemAmount = 0;
    this.bestPriceStoreItemAmountText = "";
    this.bestPriceStoreItemAmountWithCurrency = "";
    this.lastPriceQuotationHistoryWorkToken = "";
    this.lastPriceQuotationAffiliateOperationToken = "";
    this.storeItemInfoData = null;
    this.storeItemPropertyTypesData = [];
    this.priceQuotationInfoData = new PriceQuotationInfo();
    this.bestPricePlaceInfoData = null;
    this.lastPriceQuotationHistoryWorkInfoData =
      new LastPriceQuotationHistoryWorkInfoData();
    this.lastPriceQuotationAffiliateOperationInfoData = null;
    this.quotationDetailsHistoryWorkNotes = ""; //added by me when move
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.priceQuotationDetailsToken = data.priceQuotationDetailsToken ?? "";
      this.storeItemToken = data.storeItemToken ?? "";
      this.priceQuotationDetailsNotes = data.priceQuotationDetailsNotes ?? "";
      this.storeItemQuantity = data.storeItemQuantity ?? 0;
      this.approvedPriceStoreItemsAmount =
        data.approvedPriceStoreItemsAmount ?? 0;
      this.approvedPriceStoreItemsAmountText =
        data.approvedPriceStoreItemsAmountText ?? "";
      this.approvedPriceStoreItemsAmountWithCurrency =
        data.approvedPriceStoreItemsAmountWithCurrency ?? "";
      this.approvedPriceStoreItemAmount =
        data.approvedPriceStoreItemAmount ?? 0;
      this.approvedPriceStoreItemAmountText =
        data.approvedPriceStoreItemAmountText ?? "";
      this.approvedPriceStoreItemAmountWithCurrency =
        data.approvedPriceStoreItemAmountWithCurrency ?? "";
      this.affiliateOperationTypeToken = data.affiliateOperationTypeToken ?? "";
      this.affiliateOperationTypeNameCurrent =
        data.affiliateOperationTypeNameCurrent ?? "";
      this.affiliateOperationAmount = data.affiliateOperationAmount ?? 0;
      this.affiliateOperationAmountText =
        data.affiliateOperationAmountText ?? "";
      this.affiliateOperationAmountWithCurrency =
        data.affiliateOperationAmountWithCurrency ?? "";
      this.totalFinalPrice = data.totalFinalPrice ?? 0;
      this.totalFinalPriceText = data.totalFinalPriceText ?? "";
      this.totalFinalPriceWithCurrency = data.totalFinalPriceWithCurrency ?? "";
      this.quotationDetailsHistoryWorkTypeToken =
        data.quotationDetailsHistoryWorkTypeToken ?? "";
      this.quotationDetailsHistoryWorkTypeNameCurrent =
        data.quotationDetailsHistoryWorkTypeNameCurrent ?? "";
      this.priceQuotationToken = data.priceQuotationToken ?? "";
      this.bestPriceQuotationPriceHistoryToken =
        data.bestPriceQuotationPriceHistoryToken ?? "";
      this.bestPricePlaceToken = data.bestPricePlaceToken ?? "";
      this.bestPriceTotalItemsAmount = data.bestPriceTotalItemsAmount ?? 0;
      this.bestPriceTotalItemsAmountText =
        data.bestPriceTotalItemsAmountText ?? "";
      this.bestPriceTotalItemsAmountWithCurrency =
        data.bestPriceTotalItemsAmountWithCurrency ?? "";
      this.bestPriceStoreItemAmount = data.bestPriceStoreItemAmount ?? 0;
      this.bestPriceStoreItemAmountText =
        data.bestPriceStoreItemAmountText ?? "";
      this.bestPriceStoreItemAmountWithCurrency =
        data.bestPriceStoreItemAmountWithCurrency ?? "";
      this.lastPriceQuotationHistoryWorkToken =
        data.lastPriceQuotationHistoryWorkToken ?? "";
      this.lastPriceQuotationAffiliateOperationToken =
        data.lastPriceQuotationAffiliateOperationToken ?? "";
      this.storeItemInfoData = data.storeItemInfoData ?? null;
      this.storeItemPropertyTypesData = data.storeItemPropertyTypesData ?? [];
      this.priceQuotationInfoData.fillData(data.priceQuotationInfoData);
      this.bestPricePlaceInfoData = data.bestPricePlaceInfoData ?? null;
      this.lastPriceQuotationHistoryWorkInfoData.fillData(
        data.lastPriceQuotationHistoryWorkInfoData
      );
      this.lastPriceQuotationAffiliateOperationInfoData =
        data.lastPriceQuotationAffiliateOperationInfoData ?? null;
    } else {
      this.setInitialValue();
    }
  }
}
