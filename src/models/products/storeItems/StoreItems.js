import GeneralModel from "./../../general/GeneralModel";
import StoreItem from "./StoreItem";
import StoreItemsFilter from "./StoreItemsFilter";

export default class StoreItems extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.storeItemsData = [];
    this.storeItem = new StoreItem();
    this.filterData = new StoreItemsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.storeItemsData = data.storeItemsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
