import BaseEntityModel from "./../../general/BaseEntityModel";
import UserInfoData from "./../../users/UserInfoData";
import defaultImg from "@/assets/images/JoiningApplicationSubscriptions.svg";

export default class JoiningApplicationSubscription extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor(educationalJoiningApplicationToken) {
    super();
    this.setInitialValue(educationalJoiningApplicationToken);
  }
  setInitialValue(educationalJoiningApplicationToken = "") {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.joiningApplicationSubscriptionToken = "";
    this.joiningApplicationSubscriptionNameCurrent = "";
    this.educationalJoiningApplicationToken =
      educationalJoiningApplicationToken || "";
    this.educationalJoiningApplicationNameCurrent = "";
    this.userStudentToken = "";
    this.userStudentInfoData = new UserInfoData();
    this.subscriptionFromDateTime = "";
    this.subscriptionFromDateTimeCustomized = "";
    this.subscriptionFromDate = "";
    this.subscriptionFromTime = "";
    this.subscriptionToDateTime = "";
    this.subscriptionToDateTimeCustomized = "";
    this.subscriptionToDate = "";
    this.subscriptionToTime = "";
    this.subscriptionTypeToken = "";
    this.subscriptionTypeNameCurrent = "";
    this.subscriptionRequestSessionsNumber = 0;
    this.joiningApplicationSubscriptionImageIsDefault = false;
    this.joiningApplicationSubscriptionImagePath = "";
    this.joiningApplicationSubscriptionImageSizeBytes = 0;
    this.joiningApplicationSubscriptionImageSizeTextCurrent = "";
    this.joiningApplicationSubscriptionNotes = "";
    this.totalDebtsMoney = 0;
    this.totalDebtsMoneyWithCurrency = "";
    this.totalDebtsMoneyText = "";
    this.totalPaidMoney = 0;
    this.totalPaidMoneyWithCurrency = "";
    this.totalPaidMoneyMoneyText = "";
    this.totalRemainderMoney = 0;
    this.totalRemainderMoneyWithCurrency = "";
    this.totalRemainderMoneyMoneyText = "";
    this.paidPercentage = 0;
    this.paidPercentageText = "";
    this.remainderPercentage = 0;
    this.remainderPercentageText = "";
    this.priceListToken = "";
    this.priceListNameCurrent = "";
    this.priceListPackagePriceForClient = 0;
    this.priceListPackagePriceInOfferForClient = 0;
    this.priceListSessionPriceForClient = 0;
    this.priceListSessionPriceInOfferForClient = 0;
    this.priceListHourPriceForClient = 0;
    this.priceListHourPriceInOfferForClient = 0;
    this.priceListInOfferStatus = false;
    this.refundTypeToken = "";
    this.refundTypeNameCurrent = "";
    this.refundReasonCurrent = "";
    this.refundDateTime = "";
    this.refundDateTimeCustomized = "";
    this.refundDate = "";
    this.refundTime = "";
    this.refundNotes = "";
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.joiningApplicationSubscriptionToken =
      data.joiningApplicationSubscriptionToken ?? "";
    this.joiningApplicationSubscriptionNameCurrent =
      data.joiningApplicationSubscriptionNameCurrent ?? "";
    this.educationalJoiningApplicationToken =
      data.educationalJoiningApplicationToken ?? "";
    this.educationalJoiningApplicationNameCurrent =
      data.educationalJoiningApplicationNameCurrent ?? "";
    this.userStudentToken = data.userStudentToken ?? "";
    this.userStudentInfoData.fillData(data.userStudentInfoData);
    this.subscriptionFromDateTime = data.subscriptionFromDateTime ?? "";
    this.subscriptionFromDateTimeCustomized =
      data.subscriptionFromDateTimeCustomized ?? "";
    this.subscriptionFromDate = data.subscriptionFromDate ?? "";
    this.subscriptionFromTime = data.subscriptionFromTime ?? "";
    this.subscriptionToDateTime = data.subscriptionToDateTime ?? "";
    this.subscriptionToDateTimeCustomized =
      data.subscriptionToDateTimeCustomized ?? "";
    this.subscriptionToDate = data.subscriptionToDate ?? "";
    this.subscriptionToTime = data.subscriptionToTime ?? "";
    this.subscriptionTypeToken = data.subscriptionTypeToken ?? "";
    this.subscriptionTypeNameCurrent = data.subscriptionTypeNameCurrent ?? "";
    this.subscriptionRequestSessionsNumber =
      data.subscriptionRequestSessionsNumber ?? 0;
    this.joiningApplicationSubscriptionImageIsDefault =
      data.joiningApplicationSubscriptionImageIsDefault ?? false;
    this.joiningApplicationSubscriptionImagePath =
      data.joiningApplicationSubscriptionImagePath ?? "";
    this.joiningApplicationSubscriptionImageSizeBytes =
      data.joiningApplicationSubscriptionImageSizeBytes ?? 0;
    this.joiningApplicationSubscriptionImageSizeTextCurrent =
      data.joiningApplicationSubscriptionImageSizeTextCurrent ?? "";
    this.joiningApplicationSubscriptionNotes =
      data.joiningApplicationSubscriptionNotes ?? "";
    this.totalDebtsMoney = data.totalDebtsMoney ?? 0;
    this.totalDebtsMoneyWithCurrency = data.totalDebtsMoneyWithCurrency ?? "";
    this.totalDebtsMoneyText = data.totalDebtsMoneyText ?? "";
    this.totalPaidMoney = data.totalPaidMoney ?? 0;
    this.totalPaidMoneyWithCurrency = data.totalPaidMoneyWithCurrency ?? "";
    this.totalPaidMoneyMoneyText = data.totalPaidMoneyMoneyText ?? "";
    this.totalRemainderMoney = data.totalRemainderMoney ?? 0;
    this.totalRemainderMoneyWithCurrency =
      data.totalRemainderMoneyWithCurrency ?? "";
    this.totalRemainderMoneyMoneyText = data.totalRemainderMoneyMoneyText ?? "";
    this.paidPercentage = data.paidPercentage ?? 0;
    this.paidPercentageText = data.paidPercentageText ?? "";
    this.remainderPercentage = data.remainderPercentage ?? 0;
    this.remainderPercentageText = data.remainderPercentageText ?? "";
    this.priceListToken = data.priceListToken ?? "";
    this.priceListNameCurrent = data.priceListNameCurrent ?? "";
    this.priceListPackagePriceForClient =
      data.priceListPackagePriceForClient ?? 0;
    this.priceListPackagePriceInOfferForClient =
      data.priceListPackagePriceInOfferForClient ?? 0;
    this.priceListSessionPriceForClient =
      data.priceListSessionPriceForClient ?? 0;
    this.priceListSessionPriceInOfferForClient =
      data.priceListSessionPriceInOfferForClient ?? 0;
    this.priceListHourPriceForClient = data.priceListHourPriceForClient ?? 0;
    this.priceListHourPriceInOfferForClient =
      data.priceListHourPriceInOfferForClient ?? 0;
    this.priceListInOfferStatus = data.priceListInOfferStatus ?? false;
    this.refundTypeToken = data.refundTypeToken ?? "";
    this.refundTypeNameCurrent = data.refundTypeNameCurrent ?? "";
    this.refundReasonCurrent = data.refundReasonCurrent ?? "";
    this.refundDateTime = data.refundDateTime ?? "";
    this.refundDateTimeCustomized = data.refundDateTimeCustomized ?? "";
    this.refundDate = data.refundDate ?? "";
    this.refundTime = data.refundTime ?? "";
    this.refundNotes = data.refundNotes ?? "";
  }
}
