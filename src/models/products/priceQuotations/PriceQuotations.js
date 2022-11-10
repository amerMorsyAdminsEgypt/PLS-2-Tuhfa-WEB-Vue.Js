import PriceQuotationGeneralModel from "./PriceQuotationGeneralModel";
import PriceQuotation from "./PriceQuotation";
import PriceQuotationModel from "./PriceQuotationModel";
import PriceQuotationsFilter from "./PriceQuotationsFilter";

export default class PriceQuotations extends PriceQuotationGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.priceQuotationsData = [];
    this.priceQuotation = new PriceQuotation();
    this.priceQuotationModel = new PriceQuotationModel();
    this.filterData = new PriceQuotationsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.priceQuotationsData = data.priceQuotationsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
