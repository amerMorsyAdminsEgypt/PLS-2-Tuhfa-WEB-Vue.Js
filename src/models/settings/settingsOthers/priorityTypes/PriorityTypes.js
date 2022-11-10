import GeneralModel from "./../../../general/GeneralModel";
import PriorityType from "./PriorityType";
import PriorityTypesFilter from "./PriorityTypesFilter";

export default class PriorityTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.priorityTypesData = [];
    this.priorityType = new PriorityType();
    this.filterData = new PriorityTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.priorityTypesData = data.priorityTypesData || [];
      let filter = {
        ...this.filterData,
        ...data.pagination,
      };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
