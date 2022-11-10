import ActivationStatistics from "./../../../models/general/ActivationStatistics";
import SystemComponentsHierarchy from "./SystemComponentsHierarchy";
import SystemComponentsHierarchiesFilter from "./SystemComponentsHierarchiesFilter";

export default class SystemComponentsHierarchies {
  constructor(modelName) {
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName) {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.activationStatistics = new ActivationStatistics();
    this.systemComponentsHierarchiesData = [];
    this.systemComponentsHierarchy = new SystemComponentsHierarchy();
    this.filterData = new SystemComponentsHierarchiesFilter(modelName);
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort || [];
      this.activationStatistics.fillData(data.activationStatistics);
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.systemComponentsHierarchiesData =
        data.systemComponentsHierarchiesData || [];
    } else {
      this.setInitialValue();
    }
  }
}
