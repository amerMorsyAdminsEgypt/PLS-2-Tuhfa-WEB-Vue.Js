import GeneralModel from "./../general/GeneralModel";
import MediaPackageCode from "./MediaPackageCode";
import MediaPackageCodesFilter from "./MediaPackageCodesFilter";

export default class MediaPackageCodes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.mediaPackageCodesData = [];
    this.mediaPackageCode = new MediaPackageCode();
    this.filterData = new MediaPackageCodesFilter();
  }
  fillData(data) {
    if (data) {
      let modefiedData = {
        ...data,
        activationStatistics: data.mediaPackageCodesStatistics,
      };
      this.fillGeneralModelData(modefiedData);
      this.mediaPackageCodesData = data.mediaPackageCodesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
