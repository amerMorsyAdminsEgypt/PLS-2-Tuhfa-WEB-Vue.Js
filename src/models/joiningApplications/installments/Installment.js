import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/installments.svg";
import UserInfoData from "./../../general/UserCreatedData";
import InstallmentScheduleTimesInfoData from "./InstallmentScheduleTimesInfoData";
import InstallmentDebtsData from "./InstallmentDebtsData";

export default class Installment extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.debtTokens = [];
    this.installmentToken = "";
    this.installmentNameCurrent = "";
    this.installmentNameAr = "";
    this.installmentNameEn = "";
    this.installmentNameUnd = "";
    this.installmentDescriptionCurrent = "";
    this.installmentDescriptionAr = "";
    this.installmentDescriptionEn = "";
    this.installmentDescriptionUnd = "";
    this.installmentNotes = "";
    this.installmentImageIsDefault = "";
    this.installmentImagePath = "";
    this.installmentImageSizeBytes = "";
    this.installmentImageSizeTextCurrent = "";
    this.totalScheduleInstallmentMoney = "";
    this.totalScheduleInstallmentMoneyWithCurrency = "";
    this.totalScheduleInstallmentMoneyText = "";
    this.totalScheduleIPaidMoney = "";
    this.totalScheduleIPaidMoneyWithCurrency = "";
    this.totalScheduleIPaidMoneyText = "";
    this.totalScheduleRemainderMoney = "";
    this.totalScheduleRemainderMoneyWithCurrency = "";
    this.totalScheduleRemainderMoneyText = "";
    this.totalScheduleFinishPercentage = "";
    this.totalScheduleFinishPercentageText = "";
    this.cancelTypeToken = "";
    this.cancelTypeNameCurrent = "";
    this.cancelReasonCurrent = "";
    this.cancelReasonAr = "";
    this.cancelReasonEn = "";
    this.cancelReasonUnd = "";
    this.cancelNotes = "";
    this.cancelDateTime = "";
    this.cancelDateTimeCustomized = "";
    this.cancelDate = "";
    this.cancelTime = "";
    this.cancelUserToken = "";
    this.debtUserToken = "";
    this.isPaidCash = false;
    this.accountToken = "";
    this.cancelUserInfoData = new UserInfoData();
    this.debtUserInfoData = new UserInfoData();
    this.installmentScheduleTimesInfoData = [
      new InstallmentScheduleTimesInfoData(),
    ];
    this.installmentDebtsData = [new InstallmentDebtsData()];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.installmentToken = data.installmentToken ?? "";
      this.installmentNameCurrent = data.installmentNameCurrent ?? "";
      this.installmentNameAr = data.installmentNameAr ?? "";
      this.installmentNameEn = data.installmentNameEn ?? "";
      this.installmentNameUnd = data.installmentNameUnd ?? "";
      this.installmentDescriptionCurrent =
        data.installmentDescriptionCurrent ?? "";
      this.installmentDescriptionAr = data.installmentDescriptionAr ?? "";
      this.installmentDescriptionEn = data.installmentDescriptionEn ?? "";
      this.installmentDescriptionUnd = data.installmentDescriptionUnd ?? "";
      this.installmentNotes = data.installmentNotes ?? "";
      this.installmentImageIsDefault = data.installmentImageIsDefault ?? "";
      this.installmentImagePath = data.installmentImagePath ?? "";
      this.installmentImageSizeBytes = data.installmentImageSizeBytes ?? "";
      this.installmentImageSizeTextCurrent =
        data.installmentImageSizeTextCurrent ?? "";
      this.totalScheduleInstallmentMoney =
        data.totalScheduleInstallmentMoney ?? "";
      this.totalScheduleInstallmentMoneyWithCurrency =
        data.totalScheduleInstallmentMoneyWithCurrency ?? "";
      this.totalScheduleInstallmentMoneyText =
        data.totalScheduleInstallmentMoneyText ?? "";
      this.totalScheduleIPaidMoney = data.totalScheduleIPaidMoney ?? "";
      this.totalScheduleIPaidMoneyWithCurrency =
        data.totalScheduleIPaidMoneyWithCurrency ?? "";
      this.totalScheduleIPaidMoneyText = data.totalScheduleIPaidMoneyText ?? "";
      this.totalScheduleRemainderMoney = data.totalScheduleRemainderMoney ?? "";
      this.totalScheduleRemainderMoneyWithCurrency =
        data.totalScheduleRemainderMoneyWithCurrency ?? "";
      this.totalScheduleRemainderMoneyText =
        data.totalScheduleRemainderMoneyText ?? "";
      this.totalScheduleFinishPercentage =
        data.totalScheduleFinishPercentage ?? "";
      this.totalScheduleFinishPercentageText =
        data.totalScheduleFinishPercentageText ?? "";
      this.cancelTypeToken = data.cancelTypeToken ?? "";
      this.cancelTypeNameCurrent = data.cancelTypeNameCurrent ?? "";
      this.cancelReasonCurrent = data.cancelReasonCurrent ?? "";
      this.cancelReasonAr = data.cancelReasonAr ?? "";
      this.cancelReasonEn = data.cancelReasonEn ?? "";
      this.cancelReasonUnd = data.cancelReasonUnd ?? "";
      this.cancelNotes = data.cancelNotes ?? "";
      this.cancelDateTime = data.cancelDateTime ?? "";
      this.cancelDateTimeCustomized = data.cancelDateTimeCustomized ?? "";
      this.cancelDate = data.cancelDate ?? "";
      this.cancelTime = data.cancelTime ?? "";
      this.cancelUserToken = data.cancelUserToken ?? "";
      this.debtUserToken = data.debtUserToken ?? "";
      this.isPaidCash = data.isPaidCash ?? false;
      this.accountToken = data.accountToken ?? "";
      this.cancelUserInfoData.fillDataUserCreatedData(data.cancelUserInfoDate);
      this.debtUserInfoData.fillDataUserCreatedData(data.debtUserInfoData);
      this.installmentScheduleTimesInfoData =
        data.installmentScheduleTimesInfoData ?? [
          new InstallmentScheduleTimesInfoData(),
        ];
      this.installmentDebtsData = data.installmentDebtsData ?? [
        new InstallmentDebtsData(),
      ];
    } else {
      this.setInitialValue();
    }
  }
}
