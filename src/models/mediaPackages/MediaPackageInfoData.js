import MediaPackageFinance from "./MediaPackageFinance";
import MediaPackageLicenceData from "./MediaPackageLicenceData";

export default class MediaPackageInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.fullCode = "";
    this.mediaPackageToken = "";
    this.mediaPackageNameCurrent = "";
    this.mediaPackageDescriptionCurrent = "";
    this.mediaPackageNotes = "";
    this.mediaPackageImageIsDefault = false;
    this.mediaPackageImagePath = "";
    this.mediaPackageImageSizeBytes = 0;
    this.mediaPackageImageSizeTextCurrent = "";
    this.mediaPackageShowStatusTypeNameCurrent = "";
    this.mediaPackageFinance = new MediaPackageFinance();
    this.mediaPackageLicenceData = new MediaPackageLicenceData();
  }
  fillData(data) {
    if (data) {
      this.fullCode = data.fullCode ?? "";
      this.mediaPackageToken = data.mediaPackageToken ?? "";
      this.mediaPackageNameCurrent = data.mediaPackageNameCurrent ?? "";
      this.mediaPackageDescriptionCurrent =
        data.mediaPackageDescriptionCurrent ?? "";
      this.mediaPackageNotes = data.mediaPackageNotes ?? "";
      this.mediaPackageImageIsDefault =
        data.mediaPackageImageIsDefault ?? false;
      this.mediaPackageImagePath = data.mediaPackageImagePath ?? "";
      this.mediaPackageImageSizeBytes = data.mediaPackageImageSizeBytes ?? 0;
      this.mediaPackageImageSizeTextCurrent =
        data.mediaPackageImageSizeTextCurrent ?? "";
      this.mediaPackageShowStatusTypeNameCurrent =
        data.mediaPackageShowStatusTypeNameCurrent ?? "";
      this.mediaPackageFinance.fillData(data.mediaPackageFinance);
      this.mediaPackageLicenceData.fillData(data.mediaPackageLicenceData);
    } else {
      this.setInitialValue();
    }
  }
}
