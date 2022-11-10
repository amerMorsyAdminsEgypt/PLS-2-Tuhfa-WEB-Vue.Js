import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/complaints.svg";
import UserInfoData from "./../../general/UserCreatedData";
import priorityTypeInfoData from "./../../settings/settingsOthers/priorityTypes/PriorityTypeInfoData";
import complaintTypeInfoData from "./../../settings/settingsOthers/complaintTypes/ComplaintType";
import complaintSectorInfoData from "./../../settings/settingsOthers/complaintSectors/ComplaintSector";
import lastComplaintFollowUpInfoData from "./../complaintFollowUps/ComplaintFollowUpInfoData";

export default class Complaint extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.complaintToken = "";
    this.complaintTitleCurrent = "";
    this.complaintTitleAr = "";
    this.complaintTitleEn = "";
    this.complaintTitleUnd = "";
    this.complaintDescriptionCurrent = "";
    this.complaintDescriptionAr = "";
    this.complaintDescriptionEn = "";
    this.complaintDescriptionUnd = "";
    this.complaintNotes = "";
    this.complaintStatusTypeToken = "";
    this.complaintStatusTypeNameCurrent = "";
    this.complaintMediaIsDefault = "";
    this.complaintMediaPath = "";
    this.complaintMediaSizeBytes = "";
    this.complaintMediaSizeTextCurrent = "";
    this.complaintMediaTypeToken = "";
    this.complaintMediaTypeNameCurrent = "";
    this.complaintMediaTypeNameAr = "";
    this.complaintMediaTypeNameEn = "";
    this.complaintMediaTypeNameUnd = "";
    this.userTypeToken = "";
    this.complainingPersonUserToken = "";
    this.closedByUserToken = "";
    this.closedDateTime = "";
    this.closedDateTimeCustomized = "";
    this.closedDate = "";
    this.closedTime = "";
    this.closedNotes = "";
    this.closedFromSideToken = "";
    this.closedFromSideNameCurrent = "";
    this.priorityTypeToken = "";
    this.complaintTypeToken = "";
    this.complaintSectorToken = "";
    this.complainingPersonUserInfoData = new UserInfoData();
    this.closedByUserInfoData = new UserInfoData();
    this.priorityTypeInfoData = new priorityTypeInfoData();
    this.complaintTypeInfoData = new complaintTypeInfoData();
    this.complaintSectorInfoData = new complaintSectorInfoData();
    this.lastComplaintFollowUpInfoData = new lastComplaintFollowUpInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = data.mediaFile ?? "";
      this.complaintToken = data.complaintToken ?? "";
      this.complaintTitleCurrent = data.complaintTitleCurrent ?? "";
      this.complaintTitleAr = data.complaintTitleAr ?? "";
      this.complaintTitleEn = data.complaintTitleEn ?? "";
      this.complaintTitleUnd = data.complaintTitleUnd ?? "";
      this.complaintDescriptionCurrent = data.complaintDescriptionCurrent ?? "";
      this.complaintDescriptionAr = data.complaintDescriptionAr ?? "";
      this.complaintDescriptionEn = data.complaintDescriptionEn ?? "";
      this.complaintDescriptionUnd = data.complaintDescriptionUnd ?? "";
      this.complaintNotes = data.complaintNotes ?? "";
      this.complaintStatusTypeToken = data.complaintStatusTypeToken ?? "";
      this.complaintStatusTypeNameCurrent =
        data.complaintStatusTypeNameCurrent ?? "";
      this.complaintMediaIsDefault = data.complaintMediaIsDefault ?? "";
      this.complaintMediaPath = data.complaintMediaPath ?? "";
      this.complaintMediaSizeBytes = data.complaintMediaSizeBytes ?? "";
      this.complaintMediaSizeTextCurrent =
        data.complaintMediaSizeTextCurrent ?? "";
      this.complaintMediaTypeToken = data.complaintMediaTypeToken ?? "";
      this.complaintMediaTypeNameCurrent =
        data.complaintMediaTypeNameCurrent ?? "";
      this.complaintMediaTypeNameAr = data.complaintMediaTypeNameAr ?? "";
      this.complaintMediaTypeNameEn = data.complaintMediaTypeNameEn ?? "";
      this.complaintMediaTypeNameUnd = data.complaintMediaTypeNameUnd ?? "";
      this.complainingPersonUserToken = data.complainingPersonUserToken ?? "";
      this.closedByUserToken = data.closedByUserToken ?? "";
      this.closedDateTime = data.closedDateTime ?? "";
      this.closedDateTimeCustomized = data.closedDateTimeCustomized ?? "";
      this.closedDate = data.closedDate ?? "";
      this.closedTime = data.closedTime ?? "";
      this.closedNotes = data.closedNotes ?? "";
      this.closedFromSideToken = data.closedFromSideToken ?? "";
      this.closedFromSideNameCurrent = data.closedFromSideNameCurrent ?? "";
      this.priorityTypeToken = data.priorityTypeToken ?? "";
      this.complaintTypeToken = data.complaintTypeToken ?? "";
      this.complaintSectorToken = data.complaintSectorToken ?? "";
      this.complainingPersonUserInfoData.fillDataUserCreatedData(
        data.complainingPersonUserInfoData
      );
      this.userTypeToken = this.complainingPersonUserInfoData.userTypeToken;
      this.closedByUserInfoData.fillDataUserCreatedData(
        data.closedByUserInfoData
      );
      this.priorityTypeInfoData.fillPriorityTypeInfoData(
        data.priorityTypeInfoData
      );
      this.complaintTypeInfoData.fillData(data.complaintTypeInfoData);
      this.complaintSectorInfoData.fillData(data.complaintSectorInfoData);
      this.lastComplaintFollowUpInfoData.fillData(
        data.lastComplaintFollowUpInfoData
      );
    } else {
      this.setInitialValue();
    }
  }
}
