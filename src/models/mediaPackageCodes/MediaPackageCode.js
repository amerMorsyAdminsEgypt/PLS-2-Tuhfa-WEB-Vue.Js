import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/mediaPackageCodes.svg";
import icon from "@/assets/images/mediaPackageCodes.svg";
import MediaPackageInfoData from "./../mediaPackages/MediaPackageInfoData";
import MediaPackageCodeUsed from "./MediaPackageCodeUsed";
import SubscribeInMediaPackageClass from "./SubscribeInMediaPackageClass";

export default class MediaPackageCode extends BaseEntityModel {
  icon = icon;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaPackageCodeToken = "";
    this.mediaPackageCode = "";
    this.mediaPackageKey = "";
    this.mediaPackageCodeUsedTypeToken = "";
    this.mediaPackageCodeUsedTypeNameCurrent = "";
    this.mediaPackageInfoData = new MediaPackageInfoData();
    this.mediaPackageCodeUsed = new MediaPackageCodeUsed();
    // added by me
    this.countNeededCodes = "";
    this.subscribeInMediaPackage = new SubscribeInMediaPackageClass();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaPackageCodeToken = data.mediaPackageCodeToken ?? "";
      this.mediaPackageCode = data.mediaPackageCode ?? "";
      this.mediaPackageKey = data.mediaPackageKey ?? "";
      this.mediaPackageCodeUsedTypeToken =
        data.mediaPackageCodeUsedTypeToken ?? "";
      this.mediaPackageCodeUsedTypeNameCurrent =
        data.mediaPackageCodeUsedTypeNameCurrent ?? "";
      this.mediaPackageInfoData.fillData(data.mediaPackageInfoData);
      this.mediaPackageCodeUsed.fillData(data.mediaPackageCodeUsed);
    } else {
      this.setInitialValue();
    }
  }
}
