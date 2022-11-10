import ActivationStatistics from "./../../../models/general/ActivationStatistics";
import FollowInterest from "./FollowInterest";
import FollowInterestModel from "./FollowInterestModel";
import FollowInterestsFilter from "./FollowInterestsFilter";

export default class FollowInterests {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.activationStatistics = new ActivationStatistics();
    this.followInterestsData = [];
    this.followInterest = new FollowInterest();
    this.followInterestModel = new FollowInterestModel();
    this.filterData = new FollowInterestsFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort || [];
      this.activationStatistics.fillData(data.activationStatistics);
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.followInterestsData = data.followInterestsData || [];
    } else {
      this.setInitialValue();
    }
  }
}
