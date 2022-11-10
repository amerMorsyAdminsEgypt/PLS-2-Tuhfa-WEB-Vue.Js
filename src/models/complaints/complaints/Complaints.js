import GeneralModel from "./../../general/GeneralModel";
import Complaint from "./Complaint";
import ComplaintsFilter from "./ComplaintsFilter";

export default class Complaints extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.complaintsData = [];
    this.complaint = new Complaint();
    this.filterData = new ComplaintsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.complaintsData = data.complaintsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
