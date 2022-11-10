import GeneralModel from "./../../general/GeneralModel";
import PropertyType from "./PropertyType";
import PropertyTypesFilter from "./PropertyTypesFilter";

export default class PropertyTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.propertyTypesData = [];
    this.propertyType = new PropertyType();
    this.filterData = new PropertyTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.propertyTypesData = data.propertyTypesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
