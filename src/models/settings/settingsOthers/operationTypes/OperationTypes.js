import GeneralModel from "./../../../general/GeneralModel";
import OperationType from "./OperationType";
import OperationTypesFilter from "./OperationTypesFilter";

export default class OperationTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.operationTypesData = [];
    this.operationType = new OperationType();
    this.filterData = new OperationTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.operationTypesData = data.operationTypesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
