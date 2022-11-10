import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";

export default class PriceQuotationJobOrdersFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.jobOrderHistoryWorkTypeToken = "";
    this.priceQuotationJobOrderToken = "";
    this.priceQuotationToken = "";
    this.placeToken = "";
    this.userWorkInJobOrderToken = "";

    this.priceQuotationInfoDataInclude = false;
    this.lastJobOrderHistoryWorkInfoDataInclude = false;
    this.sendTo = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.jobOrderHistoryWorkTypeToken =
        data.jobOrderHistoryWorkTypeToken ?? "";
      this.priceQuotationJobOrderToken = data.priceQuotationJobOrderToken ?? "";
      this.priceQuotationToken = data.priceQuotationToken ?? "";
      this.placeToken = data.placeToken ?? "";
      this.userWorkInJobOrderToken = data.userWorkInJobOrderToken ?? "";
      this.priceQuotationInfoDataInclude =
        data.priceQuotationInfoDataInclude ?? false;
      this.lastJobOrderHistoryWorkInfoDataInclude =
        data.lastJobOrderHistoryWorkInfoDataInclude ?? false;
      this.sendTo = data.sendTo ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
