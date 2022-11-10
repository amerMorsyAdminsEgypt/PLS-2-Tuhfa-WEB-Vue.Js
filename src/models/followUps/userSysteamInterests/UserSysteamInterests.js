import ActivationStatistics from "./../../../models/general/ActivationStatistics";
import UserSysteamInterest from "./UserSysteamInterest";
import UserSysteamInterestModel from "./UserSysteamInterestModel";
import UserSysteamInterestsFilter from "./UserSysteamInterestsFilter";

export default class UserSysteamInterests {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.activationStatistics = new ActivationStatistics();
    this.userSysteamInterestsData = [];
    this.userSysteamInterest = new UserSysteamInterest();
    this.userSysteamInterestModel = new UserSysteamInterestModel();
    this.filterData = new UserSysteamInterestsFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort || [];
      this.activationStatistics.fillData(data.userSysteamInterestsStatstic);
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.userSysteamInterestsData = data.userSysteamInterestsData || [];
    } else {
      this.setInitialValue();
    }
  }
}
