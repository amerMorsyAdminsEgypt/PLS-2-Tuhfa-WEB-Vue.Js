import GeneralModel from "./../general/GeneralModel";
import MediaPackage from "./MediaPackage";
import MediaPackagesFilter from "./MediaPackagesFilter";

export default class MediaPackages extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.mediaPackagesData = [];
    this.mediaPackage = new MediaPackage();
    this.filterData = new MediaPackagesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.mediaPackagesData = data.mediaPackagesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
