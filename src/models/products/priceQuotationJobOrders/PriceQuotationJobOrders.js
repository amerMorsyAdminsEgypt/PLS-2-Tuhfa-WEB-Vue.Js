import PriceQuotationJobOrderGeneralModel from "./PriceQuotationJobOrderGeneralModel";
import PriceQuotationJobOrder from "./PriceQuotationJobOrder";
import PriceQuotationJobOrdersFilter from "./PriceQuotationJobOrdersFilter";

export default class PriceQuotationJobOrders extends PriceQuotationJobOrderGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.priceQuotationJobOrdersData = [];
    this.priceQuotationJobOrder = new PriceQuotationJobOrder();
    this.filterData = new PriceQuotationJobOrdersFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.priceQuotationJobOrdersData = data.priceQuotationJobOrdersData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
