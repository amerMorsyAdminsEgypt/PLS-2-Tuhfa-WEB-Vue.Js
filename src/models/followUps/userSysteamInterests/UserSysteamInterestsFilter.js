import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class UserSysteamInterestsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.userSysteamInterests.activationTypeTokens ||
      [];

    this.userToken = "";
    this.communicationTypeToken = "";
    this.replyStatusTypeToken = "";

    this.placeInfoDataInclude = true;
    this.educationalCategoryInfoDataInclude = true;
    this.serviceInfoDataInclude = true;
    this.competitionInfoDataInclude = true;
    this.educationalGroupInfoDataInclude = true;
    this.priorityTypeInfoDataInclude = true;
    this.userSysteamInterestFollowUpStatsticDataInclude = true;
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
