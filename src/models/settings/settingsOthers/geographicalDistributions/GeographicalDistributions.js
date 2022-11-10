import GeneralModel from "./../../../general/GeneralModel";
import GeographicalDistribution from "./GeographicalDistribution";
import GeographicalDistributionsFilter from "./GeographicalDistributionsFilter";

export default class GeographicalDistributions extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.geographicalDistributionsData = [];
    this.geographicalDistribution = new GeographicalDistribution();
    this.filterData = new GeographicalDistributionsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.geographicalDistributionsData =
        data.geographicalDistributionsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
