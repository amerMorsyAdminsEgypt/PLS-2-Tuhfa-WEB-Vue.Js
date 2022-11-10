import ActivationStatistics from "./../../../models/general/ActivationStatistics";
import SystemComponent from "./SystemComponent";
import SystemComponentsFilter from "./SystemComponentsFilter";

export default class SystemComponents {
  constructor(modelName) {
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName) {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.activationStatistics = new ActivationStatistics();
    this.systemComponentsData = [];
    this.systemComponent = new SystemComponent();
    this.filterData = new SystemComponentsFilter(modelName);
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort || [];
      this.activationStatistics.fillData(data.activationStatistics);
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.systemComponentsData = data.systemComponentsData || [];
    } else {
      this.setInitialValue();
    }
  }
}
