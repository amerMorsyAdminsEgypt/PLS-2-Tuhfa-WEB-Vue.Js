import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/complaintFollowUps.svg";
import ComplaintInfoData from "./../complaints/ComplaintInfoData";
import UserInfoData from "./../../general/UserCreatedData";
import complaintTypeInfoData from "./../../settings/settingsOthers/complaintTypes/ComplaintType";
import complaintSectorInfoData from "./../../settings/settingsOthers/complaintSectors/ComplaintSector";

export default class ComplaintFollowUp extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.complaintFollowUpToken = "";
    this.complaintFollowUpTextCurrent = "";
    this.complaintFollowUpTextAr = "";
    this.complaintFollowUpTextEn = "";
    this.complaintFollowUpTextUnd = "";
    this.complaintFollowUpSideTypeToken = "";
    this.complaintFollowUpSideTypeNameCurrent = "";
    this.complaintFollowUpMediaPath = "";
    this.complaintFollowUpMediaSizeBytes = "";
    this.complaintFollowUpImageSizeTextCurrent = "";
    this.complaintFollowUpMediaTypeToken = "";
    this.complaintFollowUpMediaTypeNameCurrent = "";
    this.userFollowUpToken = "";
    this.complaintToken = "";
    this.complaintTypeToken = "";
    this.complaintSectorToken = "";
    this.complaintInfoData = new ComplaintInfoData();
    this.userFollowUpData = new UserInfoData();
    this.complaintTypeInfoData = new complaintTypeInfoData();
    this.complaintSectorInfoData = new complaintSectorInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = data.mediaFile ?? "";
      this.complaintFollowUpToken = data.complaintFollowUpToken ?? "";
      this.complaintFollowUpTextCurrent =
        data.complaintFollowUpTextCurrent ?? "";
      this.complaintFollowUpTextAr = data.complaintFollowUpTextAr ?? "";
      this.complaintFollowUpTextEn = data.complaintFollowUpTextEn ?? "";
      this.complaintFollowUpTextUnd = data.complaintFollowUpTextUnd ?? "";
      this.complaintFollowUpSideTypeToken =
        data.complaintFollowUpSideTypeToken ?? "";
      this.complaintFollowUpSideTypeNameCurrent =
        data.complaintFollowUpSideTypeNameCurrent ?? "";
      this.complaintFollowUpMediaPath = data.complaintFollowUpMediaPath ?? "";
      this.complaintFollowUpMediaSizeBytes =
        data.complaintFollowUpMediaSizeBytes ?? "";
      this.complaintFollowUpImageSizeTextCurrent =
        data.complaintFollowUpImageSizeTextCurrent ?? "";
      this.complaintFollowUpMediaTypeToken =
        data.complaintFollowUpMediaTypeToken ?? "";
      this.complaintFollowUpMediaTypeNameCurrent =
        data.complaintFollowUpMediaTypeNameCurrent ?? "";
      this.userFollowUpToken = data.userFollowUpToken ?? "";
      this.complaintToken = data.complaintToken ?? "";
      this.complaintTypeToken = data.complaintTypeToken ?? "";
      this.complaintSectorToken = data.complaintSectorToken ?? "";
      this.complaintInfoData.fillData(data.complaintInfoData);
      this.userFollowUpData.fillDataUserCreatedData(data.userFollowUpData);
      this.complaintTypeInfoData.fillData(data.complaintTypeInfoData);
      this.complaintSectorInfoData.fillData(data.complaintSectorInfoData);
    } else {
      this.setInitialValue();
    }
  }
}
