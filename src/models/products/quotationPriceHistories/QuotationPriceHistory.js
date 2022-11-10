import BaseEntityModel from "./../../general/BaseEntityModel";
import PlaceInfoData from "./../../places/PlaceInfoData";
import PriceQuotationDetailInfoData from "./../priceQuotationDetails/PriceQuotationDetailInfoData";
import defaultImg from "@/assets/images/QuotationPriceHistories.svg";

export default class QuotationPriceHistory extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.quotationPriceHistoryToken = "";
    this.quotationPriceHistoryDescriptionCurrent = "";
    this.quotationPriceHistoryDescriptionAr = "";
    this.quotationPriceHistoryDescriptionEn = "";
    this.quotationPriceHistoryDescriptionUnd = "";
    this.quotationPriceHistoryNotes = "";
    this.totalItemsQuantity = 0;
    this.totalItemsAmount = 0;
    this.totalItemsAmountText = "";
    this.totalItemsAmountWithCurrency = "";
    this.storeItemAmount = 0;
    this.storeItemAmountText = "";
    this.storeItemAmountWithCurrency = "";
    this.placeToken = "";
    this.placeInfoData = new PlaceInfoData();
    this.priceQuotationDetailsToken = "";
    this.priceQuotationDetailsInfoData = new PriceQuotationDetailInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.quotationPriceHistoryToken = data.quotationPriceHistoryToken ?? "";
      this.quotationPriceHistoryDescriptionCurrent =
        data.quotationPriceHistoryDescriptionCurrent ?? "";
      this.quotationPriceHistoryDescriptionAr =
        data.quotationPriceHistoryDescriptionAr ?? "";
      this.quotationPriceHistoryDescriptionEn =
        data.quotationPriceHistoryDescriptionEn ?? "";
      this.quotationPriceHistoryDescriptionUnd =
        data.quotationPriceHistoryDescriptionUnd ?? "";
      this.quotationPriceHistoryNotes = data.quotationPriceHistoryNotes ?? "";
      this.totalItemsQuantity = data.totalItemsQuantity ?? 0;
      this.totalItemsAmount = data.totalItemsAmount ?? 0;
      this.totalItemsAmountText = data.totalItemsAmountText ?? "";
      this.totalItemsAmountWithCurrency =
        data.totalItemsAmountWithCurrency ?? "";
      this.storeItemAmount = data.storeItemAmount ?? 0;
      this.storeItemAmountText = data.storeItemAmountText ?? "";
      this.storeItemAmountWithCurrency = data.storeItemAmountWithCurrency ?? "";
      this.placeToken = data.placeToken ?? "";
      this.placeInfoData.fillData(data.placeInfoData);
      this.priceQuotationDetailsToken = data.priceQuotationDetailsToken ?? "";
      this.priceQuotationDetailsInfoData.fillData(
        data.priceQuotationDetailsInfoData
      );
    } else {
      this.setInitialValue();
    }
  }
}
