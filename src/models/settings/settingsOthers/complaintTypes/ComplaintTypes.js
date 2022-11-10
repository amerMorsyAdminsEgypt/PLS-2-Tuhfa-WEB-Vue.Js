import GeneralModel from "./../../../general/GeneralModel";
import ComplaintType from "./ComplaintType";
import ComplaintTypesFilter from "./ComplaintTypesFilter";

export default class ComplaintTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.complaintTypesData = [];
    this.complaintType = new ComplaintType();
    this.filterData = new ComplaintTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.complaintTypesData = data.complaintTypesData || [];
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
