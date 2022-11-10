import PriceQuotationDetailGeneralModel from "./PriceQuotationDetailGeneralModel";
import PriceQuotationDetail from "./PriceQuotationDetail";
import PriceQuotationDetailsFilter from "./PriceQuotationDetailsFilter";

export default class PriceQuotationDetails extends PriceQuotationDetailGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.priceQuotationDetailsData = [];
    this.priceQuotationDetail = new PriceQuotationDetail();
    this.filterData = new PriceQuotationDetailsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.priceQuotationDetailsData = data.priceQuotationDetailsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
