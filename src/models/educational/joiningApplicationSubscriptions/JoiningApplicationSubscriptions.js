import JoiningApplicationSubscriptionStatistics from "./JoiningApplicationSubscriptionStatistics";
import JoiningApplicationSubscription from "./JoiningApplicationSubscription";
import JoiningApplicationSubscriptionsFilter from "./JoiningApplicationSubscriptionsFilter";

export default class JoiningApplicationSubscriptions {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.joiningApplicationSubscriptionStatistics =
      new JoiningApplicationSubscriptionStatistics();
    this.joiningApplicationSubscriptionsData = [];
    this.joiningApplicationSubscription = new JoiningApplicationSubscription();
    this.filterData = new JoiningApplicationSubscriptionsFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort ?? [];
      this.joiningApplicationSubscriptionStatistics.fillJoiningApplicationSubscriptionStatisticsData(
        data.joiningApplicationSubscriptionStatistics
      );
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.joiningApplicationSubscriptionsData =
        data.joiningApplicationSubscriptions ?? [];
    } else {
      this.setInitialValue();
    }
  }
}
