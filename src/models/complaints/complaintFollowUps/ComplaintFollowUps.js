import GeneralModel from "./../../general/GeneralModel";
import Complaint from "./../complaints/Complaint";
import ComplaintFollowUp from "./ComplaintFollowUp";
import ComplaintFollowUpsFilter from "./ComplaintFollowUpsFilter";

export default class ComplaintFollowUps extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.complaint = new Complaint();
    this.complaintFollowUpsData = [];
    this.complaintFollowUp = new ComplaintFollowUp();
    this.filterData = new ComplaintFollowUpsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.complaintFollowUpsData = data.complaintFollowUpsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.complaint.fillData(data.complaint);
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
