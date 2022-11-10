import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/EducationalGroupTransfers.svg";
import UserInfoData from "./../../users/UserInfoData";
import EducationalCategoryInfoData from "./../educationalCategories/EducationalCategoryInfoData";
import EducationalGroupInfoData from "./../educationalGroups/EducationalGroupInfoData";

export default class EducationalGroupTransfer extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.educationalGroupTransferringToken = "";
    this.educationalGroupTransferringReasonCurrent = "";
    this.educationalGroupTransferringReasonAr = "";
    this.educationalGroupTransferringReasonEn = "";
    this.educationalGroupTransferringReasonUnd = "";
    this.educationalGroupTransferringImageIsDefault = false;
    this.educationalGroupTransferringImagePath = "";
    this.educationalGroupTransferringImageSizeBytes = 0;
    this.educationalGroupTransferringImageSizeTextCurrent = "";
    this.educationalGroupTransferringDateTime = "";
    this.educationalGroupTransferringDateTimeCustomized = "";
    this.educationalGroupTransferringDate = "";
    this.educationalGroupTransferringTime = "";
    this.educationalGroupTransferringAmountValue = 0;
    this.educationalGroupTransferringAmountValueWithCurrency = "";
    this.educationalGroupTransferringAmountValueText = "";
    this.educationalGroupTransferringNotes = "";
    this.educationalCategoryToken = "";
    this.educationalCategoryInfoData = new EducationalCategoryInfoData();
    this.oldEducationalGroupToken = "";
    this.oldEducationalGroupInfoData = new EducationalGroupInfoData();
    this.newEducationalGroupToken = "";
    this.newEducationalGroupInfoData = new EducationalGroupInfoData();
    this.userStudentToken = "";
    this.userStudentInfoData = new UserInfoData();
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.educationalGroupTransferringToken =
      data.educationalGroupTransferringToken ?? "";
    this.educationalGroupTransferringReasonCurrent =
      data.educationalGroupTransferringReasonCurrent ?? "";
    this.educationalGroupTransferringReasonAr =
      data.educationalGroupTransferringReasonAr ?? "";
    this.educationalGroupTransferringReasonEn =
      data.educationalGroupTransferringReasonEn ?? "";
    this.educationalGroupTransferringReasonUnd =
      data.educationalGroupTransferringReasonUnd ?? "";
    this.educationalGroupTransferringImageIsDefault =
      data.educationalGroupTransferringImageIsDefault ?? false;
    this.educationalGroupTransferringImagePath =
      data.educationalGroupTransferringImagePath ?? "";
    this.educationalGroupTransferringImageSizeBytes =
      data.educationalGroupTransferringImageSizeBytes ?? 0;
    this.educationalGroupTransferringImageSizeTextCurrent =
      data.educationalGroupTransferringImageSizeTextCurrent ?? "";
    this.educationalGroupTransferringDateTime =
      data.educationalGroupTransferringDateTime ?? "";
    this.educationalGroupTransferringDateTimeCustomized =
      data.educationalGroupTransferringDateTimeCustomized ?? "";
    this.educationalGroupTransferringDate =
      data.educationalGroupTransferringDate ?? "";
    this.educationalGroupTransferringTime =
      data.educationalGroupTransferringTime ?? "";
    this.educationalGroupTransferringAmountValue =
      data.educationalGroupTransferringAmountValue ?? 0;
    this.educationalGroupTransferringAmountValueWithCurrency =
      data.educationalGroupTransferringAmountValueWithCurrency ?? "";
    this.educationalGroupTransferringAmountValueText =
      data.educationalGroupTransferringAmountValueText ?? "";
    this.educationalGroupTransferringNotes =
      data.educationalGroupTransferringNotes ?? "";
    this.educationalCategoryToken = data.educationalCategoryToken ?? "";
    this.educationalCategoryInfoData.fillData(data.educationalCategoryInfoData);
    this.oldEducationalGroupToken = data.oldEducationalGroupToken ?? "";
    this.oldEducationalGroupInfoData.fillData(data.oldEducationalGroupInfoData);
    this.newEducationalGroupToken = data.newEducationalGroupToken ?? "";
    this.newEducationalGroupInfoData.fillData(data.newEducationalGroupInfoData);
    this.userStudentToken = data.userStudentToken ?? "";
    this.userStudentInfoData.fillData(data.userStudentInfoData);
  }
}
