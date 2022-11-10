import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class ComplaintFollowUpsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.complaintInfoDataInclude = true;
    this.userFollowUpInfoDataInclude = true;
    this.complaintTypeInfoDataInclude = true;
    this.complaintSectorInfoDataInclude = true;

    this.complaintToken = "";
    this.userFollowUpToken = "";
    this.complaintFollowUpSideTypeToken = "";

    this.activationTypeTokens =
      store.getters.generalSetting.complaintFollowUps.activationTypeTokens ??
      [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
