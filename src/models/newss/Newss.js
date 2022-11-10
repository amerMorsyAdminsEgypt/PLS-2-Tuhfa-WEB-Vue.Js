import ActivationStatistics from "./../../models/general/ActivationStatistics";
import News from "./News";
import NewssFilter from "./NewssFilter";

export default class Newss {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.activationStatistics = new ActivationStatistics();
    this.newssData = [];
    this.news = new News();
    this.filterData = new NewssFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort ?? [];
      this.activationStatistics.fillData(data.activationStatistics);
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.newssData = data.newsData ?? [];
    } else {
      this.setInitialValue();
    }
  }
}
