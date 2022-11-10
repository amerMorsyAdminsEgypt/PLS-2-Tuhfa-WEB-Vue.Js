import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class FollowInterestsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.followInterests.activationTypeTokens || [];

    this.userToken = "";
    this.userSysteamInterestToken = "";
    this.userOtherInterestToken = "";
    this.communicationTypeToken = "";
    this.replyStatusTypeToken = "";

    this.communicationTypeInfoDataInclude = true;
    this.systeamInterestsDataInclude = true;
    this.otherInterestsDataInclude = true;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
