import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class ComplaintsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.complaintTypeInfoDataInclude = true;
    this.complaintSectorInfoDataInclude = true;
    this.complainingPersonUserInfoDataInclude = true;
    this.lastComplaintFollowUpInfoDataInclude = true;
    this.priorityTypeInfoDataInclude = true;
    // this.closedByUserInfoDataInclude = true;

    this.userTypeToken = "";
    this.complainingPersonUserToken = "";
    this.complaintStatusTypeToken = "";
    this.complaintTypeToken = "";
    this.complaintSectorToken = "";
    this.priorityTypeToken = "";
    this.closedByUserToken = "";

    this.token = "";
    this.sendTo = "";

    this.activationTypeTokens =
      store.getters.generalSetting.complaints.activationTypeTokens ?? [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
