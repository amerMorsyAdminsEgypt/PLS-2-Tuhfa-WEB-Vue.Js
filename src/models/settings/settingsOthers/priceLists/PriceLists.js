import GeneralModel from "./../../../general/GeneralModel";
import PriceList from "./PriceList";
import PriceListsFilter from "./PriceListsFilter";

export default class PriceLists extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.priceListsData = [];
    this.priceList = new PriceList();
    this.filterData = new PriceListsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.priceListsData = data.priceListsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
