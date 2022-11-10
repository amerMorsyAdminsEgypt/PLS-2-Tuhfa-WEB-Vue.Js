import StoreItemInfoData from "./../storeItems/StoreItemInfoData";

export default class PriceQuotationDetailInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.priceQuotationDetailsToken = "";
    this.fullCode = "";
    this.storeItemToken = "";
    this.storeItemInfoData = new StoreItemInfoData();
    this.storeItemQuantity = 0;
    this.approvedPriceStoreItemAmount = 0;
    this.approvedPriceStoreItemAmountText = "";
    this.approvedPriceStoreItemAmountWithCurrency = "";
    this.affiliateOperationTypeNameCurrent = "";
    this.affiliateOperationAmount = 0;
    this.affiliateOperationAmountText = "";
    this.affiliateOperationAmountWithCurrency = "";
    this.quotationDetailsHistoryWorkTypeToken = "";
    this.quotationDetailsHistoryWorkTypeNameCurrent = "";
    this.priceQuotationToken = "";
    this.priceQuotationInfoData = null;
  }
  fillData(data) {
    if (data) {
      this.priceQuotationDetailsToken = data.priceQuotationDetailsToken ?? "";
      this.fullCode = data.fullCode ?? "";
      this.storeItemToken = data.storeItemToken ?? "";
      this.storeItemInfoData.fillData(data.storeItemInfoData);
      this.storeItemQuantity = data.storeItemQuantity ?? 0;
      this.approvedPriceStoreItemAmount =
        data.approvedPriceStoreItemAmount ?? 0;
      this.approvedPriceStoreItemAmountText =
        data.approvedPriceStoreItemAmountText ?? "";
      this.approvedPriceStoreItemAmountWithCurrency =
        data.approvedPriceStoreItemAmountWithCurrency ?? "";
      this.affiliateOperationTypeNameCurrent =
        data.affiliateOperationTypeNameCurrent ?? "";
      this.affiliateOperationAmount = data.affiliateOperationAmount ?? 0;
      this.affiliateOperationAmountText =
        data.affiliateOperationAmountText ?? "";
      this.affiliateOperationAmountWithCurrency =
        data.affiliateOperationAmountWithCurrency ?? "";
      this.quotationDetailsHistoryWorkTypeToken =
        data.quotationDetailsHistoryWorkTypeToken ?? "";
      this.quotationDetailsHistoryWorkTypeNameCurrent =
        data.quotationDetailsHistoryWorkTypeNameCurrent ?? "";
      this.priceQuotationToken = data.priceQuotationToken ?? "";
      this.priceQuotationInfoData = data.priceQuotationInfoData ?? null;
    } else {
      this.setInitialValue();
    }
  }
}
