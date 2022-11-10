import GeneralModel from "./../../../general/GeneralModel";
import KnownMethod from "./KnownMethod";
import KnownMethodsFilter from "./KnownMethodsFilter";

export default class KnownMethods extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.knownMethodsData = [];
    this.knownMethod = new KnownMethod();
    this.filterData = new KnownMethodsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.knownMethodsData = data.knownMethodsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
