import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class UserOtherInterestsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.userOtherInterests.activationTypeTokens ||
      [];

    this.userToken = "";
    this.communicationTypeToken = "";
    this.replyStatusTypeToken = "";

    this.userOtherInterestFollowUpStatsticDataInclude = true;
    this.lastFollowInterestInfoDataInclude = true;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
