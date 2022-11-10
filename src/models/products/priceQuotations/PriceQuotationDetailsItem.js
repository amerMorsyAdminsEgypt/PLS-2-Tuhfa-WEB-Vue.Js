export default class PriceQuotationDetailsItem {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.storeItemToken = "";
    this.storeItemName = "";
    this.storeItemQuantity = 0;
    this.affiliateOperationTypeToken = "";
    this.affiliateOperationTypeNameCurrent = "";
    this.priceQuotationDetalisNotes = "";
    this.storeItemPropertyTypesData = [];
  }
  fillData(data) {
    if (data) {
      this.storeItemToken = data.storeItemToken || "";
      this.storeItemName = data.storeItemName || "";
      this.storeItemQuantity = data.storeItemQuantity || 0;
      this.affiliateOperationTypeToken = data.affiliateOperationTypeToken || "";
      this.affiliateOperationTypeNameCurrent =
        data.affiliateOperationTypeNameCurrent || "";
      this.priceQuotationDetalisNotes = data.priceQuotationDetalisNotes || "";
      this.storeItemPropertyTypesData = data.storeItemPropertyTypesData || [];
    } else {
      this.setInitialValue();
    }
  }
}
