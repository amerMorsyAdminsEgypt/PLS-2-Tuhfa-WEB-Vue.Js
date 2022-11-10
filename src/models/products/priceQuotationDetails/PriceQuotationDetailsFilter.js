import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";

export default class PriceQuotationDetailsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.quotationDetailsHistoryWorkTypeToken = "";
    this.priceQuotationDetailsToken = "";
    this.priceQuotationToken = "";
    this.affiliateOperationTypeToken = "";

    this.storeItemInfoDataInclude = false;
    this.priceQuotationInfoDataInclude = false;
    this.storeItemPropertyTypesDataInclude = false;
    this.lastPriceQuotationHistoryWorkInfoDataInclude = false;
    this.lastPriceQuotationAffiliateOperationInfoDataInclude = false;
    this.bestPricePlaceInfoDataInclude = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
