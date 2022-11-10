import ActivationStatistics from "./../../../models/general/ActivationStatistics";
import UserOtherInterest from "./UserOtherInterest";
import UserOtherInterestModel from "./UserOtherInterestModel";
import UserOtherInterestsFilter from "./UserOtherInterestsFilter";

export default class UserOtherInterests {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.activationStatistics = new ActivationStatistics();
    this.userOtherInterestsData = [];
    this.userOtherInterest = new UserOtherInterest();
    this.userOtherInterestModel = new UserOtherInterestModel();
    this.filterData = new UserOtherInterestsFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort || [];
      this.activationStatistics.fillData(data.userOtherInterestsStatstics);
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.userOtherInterestsData = data.userOtherInterestsData || [];
    } else {
      this.setInitialValue();
    }
  }
}
