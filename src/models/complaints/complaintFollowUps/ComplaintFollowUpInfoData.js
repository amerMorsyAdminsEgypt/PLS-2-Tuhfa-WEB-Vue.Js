import UserInfoData from "./../../general/UserCreatedData";
import complaintTypeInfoData from "./../../settings/settingsOthers/complaintTypes/ComplaintType";
import complaintSectorInfoData from "./../../settings/settingsOthers/complaintSectors/ComplaintSector";

export default class ComplaintFollowUpInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.fullCode = "";
    this.complaintFollowUpDate = "";
    this.complaintFollowUpTime = "";
    this.complaintFollowUpTextCurrent = "";
    this.complaintFollowUpSideTypeToken = "";
    this.complaintFollowUpSideTypeNameCurrent = "";
    this.complaintFollowUpMediaIsDefault = "";
    this.complaintFollowUpMediaPath = "";
    this.complaintFollowUpMediaSizeBytes = "";
    this.complaintFollowUpImageSizeTextCurrent = "";
    this.complaintFollowUpMediaTypeToken = "";
    this.complaintFollowUpMediaTypeNameCurrent = "";
    this.userFollowUpData = new UserInfoData();
    this.complaintTypeInfoData = new complaintTypeInfoData();
    this.complaintSectorInfoData = new complaintSectorInfoData();
  }
  fillData(data) {
    if (data) {
      this.fullCode = data.fullCode ?? "";
      this.complaintFollowUpDate = data.complaintFollowUpDate ?? "";
      this.complaintFollowUpTime = data.complaintFollowUpTime ?? "";
      this.complaintFollowUpTextCurrent =
        data.complaintFollowUpTextCurrent ?? "";
      this.complaintFollowUpSideTypeToken =
        data.complaintFollowUpSideTypeToken ?? "";
      this.complaintFollowUpSideTypeNameCurrent =
        data.complaintFollowUpSideTypeNameCurrent ?? "";
      this.complaintFollowUpMediaIsDefault =
        data.complaintFollowUpMediaIsDefault ?? "";
      this.complaintFollowUpMediaPath = data.complaintFollowUpMediaPath ?? "";
      this.complaintFollowUpMediaSizeBytes =
        data.complaintFollowUpMediaSizeBytes ?? "";
      this.complaintFollowUpImageSizeTextCurrent =
        data.complaintFollowUpImageSizeTextCurrent ?? "";
      this.complaintFollowUpMediaTypeToken =
        data.complaintFollowUpMediaTypeToken ?? "";
      this.complaintFollowUpMediaTypeNameCurrent =
        data.complaintFollowUpMediaTypeNameCurrent ?? "";
      this.userFollowUpData.fillDataUserCreatedData(data.userFollowUpData);
      this.complaintTypeInfoData.fillData(data.complaintTypeInfoData);
      this.complaintSectorInfoData.fillData(data.complaintSectorInfoData);
    } else {
      this.setInitialValue();
    }
  }
}
