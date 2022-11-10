import SystemComponentInfoData from "./../../../systemConfiguration/systemComponents/SystemComponentInfoData";
import SystemComponentsHierarchyInfoData from "./../../../systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchyInfoData";

export default class GeographicalDistributionInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.fullCode = "";
    this.geographicalDistributionToken = "";
    this.geographicalDistributionNameCurrent = "";
    this.geographicalDistributionNameEn = "";
    this.geographicalDistributionNameAr = "";
    this.geographicalDistributionNameUnd = "";
    this.systemComponentToken = "";
    this.systemComponentHierarchyToken = "";
    this.systemComponentData = new SystemComponentInfoData();
    this.systemComponentsHierarchyData =
      new SystemComponentsHierarchyInfoData();
  }
  fillData(data) {
    if (data) {
      this.fullCode = data.fullCode ?? "";
      this.geographicalDistributionToken =
        data.geographicalDistributionToken ?? "";
      this.geographicalDistributionNameCurrent =
        data.geographicalDistributionNameCurrent ?? "";
      this.geographicalDistributionNameEn =
        data.geographicalDistributionNameEn ?? "";
      this.geographicalDistributionNameAr =
        data.geographicalDistributionNameAr ?? "";
      this.geographicalDistributionNameUnd =
        data.geographicalDistributionNameUnd ?? "";
      this.systemComponentToken = data.systemComponentToken ?? "";
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken ?? "";
      this.systemComponentData.fillData(data.systemComponentData);
      this.systemComponentsHierarchyData.fillData(
        data.systemComponentsHierarchyData
      );
    } else {
      this.setInitialValue();
    }
  }
}
