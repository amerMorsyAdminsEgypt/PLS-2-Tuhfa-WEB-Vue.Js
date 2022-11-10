import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class StoreItemsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.storeItems.activationTypeTokens || [];

    this.storeItemToken = "";
    this.systemComponentToken = "";
    this.systemComponentHierarchyToken = "";
    this.parentStoreItemToken = "";
    this.getOnlyParentStoreItems = false;
    this.getOnlyChildStoreItems = false;
    this.systemComponentDataInclude = false;
    this.systemComponentsHierarchyDataInclude = false;
    this.parentStoreItemDataInclude = false;
    this.propertyTypesDataInclude = false;
    this.priceQuotationFromDateTime = "";
    this.priceQuotationToDateTime = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.storeItemToken = data.storeItemToken ?? "";
      this.systemComponentToken = data.systemComponentToken ?? "";
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken ?? "";
      this.parentStoreItemToken = data.parentStoreItemToken ?? "";
      this.getOnlyParentStoreItems = data.getOnlyParentStoreItems ?? false;
      this.getOnlyChildStoreItems = data.getOnlyChildStoreItems ?? false;
      this.systemComponentDataInclude =
        data.systemComponentDataInclude ?? false;
      this.systemComponentsHierarchyDataInclude =
        data.systemComponentsHierarchyDataInclude ?? false;
      this.parentStoreItemDataInclude =
        data.parentStoreItemDataInclude ?? false;
      this.propertyTypesDataInclude = data.propertyTypesDataInclude ?? false;
      this.priceQuotationFromDateTime = data.priceQuotationFromDateTime ?? "";
      this.priceQuotationToDateTime = data.priceQuotationToDateTime ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
