import GeneralModel from "./../../../general/GeneralModel";
import InstallmentBatchType from "./InstallmentBatchType";
import InstallmentBatchTypesFilter from "./InstallmentBatchTypesFilter";

export default class InstallmentBatchTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.installmentBatchTypesData = [];
    this.installmentBatchType = new InstallmentBatchType();
    this.filterData = new InstallmentBatchTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.installmentBatchTypesData = data.installmentBatchTypesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
