export default class QuotationPriceHistoryDtoItem {
  constructor(data = "") {
    if (data) this.fillData(data);
    else this.setInitialValue();
  }
  setInitialValue() {
    this.quotationPriceHistoryToken = "";
    this.priceQuotationDetailsToken = "";
    this.placeInfoData = { placeTypeToken: "" };
    this.placeToken = "";
    this.placeTokensOptions = [];
    this.totalItemsAmount = 0;
    this.quotationPriceHistoryDescriptionAr = "";
    this.quotationPriceHistoryDescriptionEn = "";
    this.quotationPriceHistoryDescriptionUnd = "";
    this.quotationPriceHistoryNotes = "";
  }
  fillData(data) {
    if (data) {
      this.quotationPriceHistoryToken = data.quotationPriceHistoryToken ?? "";
      this.priceQuotationDetailsToken = data.priceQuotationDetailsToken ?? "";
      this.placeInfoData = {
        placeTypeToken: data.placeInfoData
          ? data.placeInfoData.placeTypeToken ?? ""
          : "",
      };
      this.placeToken = data.placeToken ?? "";
      this.placeTokensOptions = data.placeTokensOptions ?? [];
      this.totalItemsAmount = data.totalItemsAmount ?? 0;
      this.quotationPriceHistoryDescriptionAr =
        data.quotationPriceHistoryDescriptionAr ?? "";
      this.quotationPriceHistoryDescriptionEn =
        data.quotationPriceHistoryDescriptionEn ?? "";
      this.quotationPriceHistoryDescriptionUnd =
        data.quotationPriceHistoryDescriptionUnd ?? "";
      this.quotationPriceHistoryNotes = data.quotationPriceHistoryNotes ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
