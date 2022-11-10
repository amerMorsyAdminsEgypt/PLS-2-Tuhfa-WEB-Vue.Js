import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";

export default class PriceQuotationsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.token = "";
    this.reportTempletToken = "";
    this.sendTo = "";
    this.priceQuotationHistoryWorkTypeToken = "";
    this.priceQuotationToken = "";
    this.requestPlaceToken = "";
    this.reportTemplateToken = "";
    this.usersSalesToken = "";
    this.requestPlaceInfoDataInclude = false;
    this.reportTemplateInfoDataInclude = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
