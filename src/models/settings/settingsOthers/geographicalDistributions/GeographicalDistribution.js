import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/geographicalDistributions.svg";
import SystemComponentInfoData from "./../../../systemConfiguration/systemComponents/SystemComponentInfoData";
import SystemComponentsHierarchyInfoData from "./../../../systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchyInfoData";
import GeographicalDistributionInfoData from "./GeographicalDistributionInfoData";

export default class GeographicalDistribution extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.geographicalDistributionToken = "";
    this.geographicalDistributionNameCurrent = "";
    this.geographicalDistributionNameEn = "";
    this.geographicalDistributionNameAr = "";
    this.geographicalDistributionNameUnd = "";
    this.geographicalDistributionCountryCodeName = "";
    this.geographicalDistributionCountryCode = "";
    this.geographicalDistributionMapLink = "";
    this.geographicalDistributionLatitude = "";
    this.geographicalDistributionlongitude = "";
    this.geographicalDistributionEndLatitude = "";
    this.geographicalDistributionEndlongitude = "";
    this.geographicalDistributionDistance = "";
    this.geographicalDistributionDescriptionCurrent = "";
    this.geographicalDistributionDescriptionAr = "";
    this.geographicalDistributionDescriptionEn = "";
    this.geographicalDistributionDescriptionUnd = "";
    this.geographicalDistributionImageIsDefault = false;
    this.geographicalDistributionImagePath = "";
    this.geographicalDistributionImageSizeBytes = 0;
    this.geographicalDistributionImageSizeTextCurrent = "";
    this.geographicalDistributionImageSizeTextAr = "";
    this.geographicalDistributionImageSizeTextEn = "";
    this.geographicalDistributionImageSizeTextUnd = "";
    this.geographicalDistributionNotes = "";
    this.systemComponentToken = "";
    this.systemComponentHierarchyToken = "";
    this.parentGeographicalDistributionToken = "";
    this.systemComponentData = new SystemComponentInfoData();
    this.systemComponentsHierarchyData =
      new SystemComponentsHierarchyInfoData();
    this.parentGeographicalDistributionData =
      new GeographicalDistributionInfoData();
    this.isHaveChildrenStatus = false;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
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
      this.geographicalDistributionCountryCodeName =
        data.geographicalDistributionCountryCodeName ?? "";
      this.geographicalDistributionCountryCode =
        data.geographicalDistributionCountryCode ?? "";
      this.geographicalDistributionMapLink =
        data.geographicalDistributionMapLink ?? "";
      this.geographicalDistributionLatitude =
        data.geographicalDistributionLatitude ?? "";
      this.geographicalDistributionlongitude =
        data.geographicalDistributionlongitude ?? "";
      this.geographicalDistributionEndLatitude =
        data.geographicalDistributionEndLatitude ?? "";
      this.geographicalDistributionEndlongitude =
        data.geographicalDistributionEndlongitude ?? "";
      this.geographicalDistributionDistance =
        data.geographicalDistributionDistance ?? "";
      this.geographicalDistributionDescriptionCurrent =
        data.geographicalDistributionDescriptionCurrent ?? "";
      this.geographicalDistributionDescriptionAr =
        data.geographicalDistributionDescriptionAr ?? "";
      this.geographicalDistributionDescriptionEn =
        data.geographicalDistributionDescriptionEn ?? "";
      this.geographicalDistributionDescriptionUnd =
        data.geographicalDistributionDescriptionUnd ?? "";
      this.geographicalDistributionImageIsDefault =
        data.geographicalDistributionImageIsDefault ?? false;
      this.geographicalDistributionImagePath =
        data.geographicalDistributionImagePath ?? "";
      this.geographicalDistributionImageSizeBytes =
        data.geographicalDistributionImageSizeBytes ?? 0;
      this.geographicalDistributionImageSizeTextCurrent =
        data.geographicalDistributionImageSizeTextCurrent ?? "";
      this.geographicalDistributionImageSizeTextAr =
        data.geographicalDistributionImageSizeTextAr ?? "";
      this.geographicalDistributionImageSizeTextEn =
        data.geographicalDistributionImageSizeTextEn ?? "";
      this.geographicalDistributionImageSizeTextUnd =
        data.geographicalDistributionImageSizeTextUnd ?? "";
      this.geographicalDistributionNotes =
        data.geographicalDistributionNotes ?? "";
      this.systemComponentToken = data.systemComponentToken ?? "";
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken ?? "";
      this.parentGeographicalDistributionToken =
        data.parentGeographicalDistributionToken ?? "";
      this.systemComponentData.fillData(data.systemComponentData);
      this.systemComponentsHierarchyData.fillData(
        data.systemComponentsHierarchyData
      );
      this.parentGeographicalDistributionData.fillData(
        data.parentGeographicalDistributionData
      );
      this.isHaveChildrenStatus = data.isHaveChildrenStatus ?? false;
    } else {
      this.setInitialValue();
    }
  }
}
