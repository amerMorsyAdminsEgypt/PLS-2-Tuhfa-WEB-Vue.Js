import ActivationStatistics from "./../../models/general/ActivationStatistics";
import CountedService from "./CountedService";
import CountedServicesFilter from "./CountedServicesFilter";

export default class CountedServices {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.activationStatistics = new ActivationStatistics();
    this.countedServicesData = [];
    this.countedService = new CountedService();
    this.filterData = new CountedServicesFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort ?? [];
      this.activationStatistics.fillData(data.activationStatistics);
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.countedServicesData = data.countedServicesData ?? [];
    } else {
      this.setInitialValue();
    }
  }
}
