import ActivationStatistics from "./../../models/general/ActivationStatistics";
import Service from "./Service";
import ServicesFilter from "./ServicesFilter";

export default class Services {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.activationStatistics = new ActivationStatistics();
    this.servicesData = [];
    this.service = new Service();
    this.filterData = new ServicesFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort ?? [];
      this.activationStatistics.fillData(data.activationStatistics);
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.servicesData = data.servicesData ?? [];
    } else {
      this.setInitialValue();
    }
  }
}
