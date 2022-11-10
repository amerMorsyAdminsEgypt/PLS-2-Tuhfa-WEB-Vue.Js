export default class PriceQuotationInfo {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.priceQuotationToken = "";
    this.fullCode = "";
    this.priceQuotationNameCurrent = "";
    this.priceQuotationDescriptionCurrent = "";
    this.priceQuotationImageIsDefault = "";
    this.priceQuotationImagePath = "";
    this.priceQuotationImageSizeBytes = "";
    this.priceQuotationImageSizeTextCurrent = "";
    this.priceQuotationNotes = "";
    this.priceQuotationHistoryWorkTypeToken = "";
    this.priceQuotationHistoryWorkTypeNameCurrnet = "";
    this.requestPlaceInfoData = "";
  }
  fillData(data) {
    if (data) {
      this.priceQuotationToken = data.priceQuotationToken ?? "";
      this.fullCode = data.fullCode ?? "";
      this.priceQuotationNameCurrent = data.priceQuotationNameCurrent ?? "";
      this.priceQuotationDescriptionCurrent =
        data.priceQuotationDescriptionCurrent ?? "";
      this.priceQuotationImageIsDefault =
        data.priceQuotationImageIsDefault ?? "";
      this.priceQuotationImagePath = data.priceQuotationImagePath ?? "";
      this.priceQuotationImageSizeBytes =
        data.priceQuotationImageSizeBytes ?? "";
      this.priceQuotationImageSizeTextCurrent =
        data.priceQuotationImageSizeTextCurrent ?? "";
      this.priceQuotationNotes = data.priceQuotationNotes ?? "";
      this.priceQuotationHistoryWorkTypeToken =
        data.priceQuotationHistoryWorkTypeToken ?? "";
      this.priceQuotationHistoryWorkTypeNameCurrnet =
        data.priceQuotationHistoryWorkTypeNameCurrnet ?? "";
      this.requestPlaceInfoData = data.requestPlaceInfoData ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
