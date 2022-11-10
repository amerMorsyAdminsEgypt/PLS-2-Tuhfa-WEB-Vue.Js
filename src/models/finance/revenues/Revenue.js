import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/revenues.svg";

export default class Revenue extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.revenuesToken = "";
    this.revenuesDescriptionCurrent = "";
    this.revenuesDescriptionAr = "";
    this.revenuesDescriptionEn = "";
    this.revenuesDescriptionUnd = "";
    this.revenuesNotes = "";
    this.revenuesImageIsDefault = false;
    this.revenuesImagePath = "";
    this.revenuesImageSizeBytes = 0;
    this.revenuesImageSizeTextCurrent = "";
    this.revenuesMoney = "";
    this.revenuesMoneyWithCurrency = "";
    this.revenuesMoneyText = "";
    this.revenuesRefundTypeToken = "";
    this.revenuesRefundTypeNameCurrent = "";
    this.refundReasonCurrent = "";
    this.refundReasonAr = "";
    this.refundReasonEn = "";
    this.refundReasonUnd = "";
    this.refundNotes = "";
    this.revenuesTypeToken = "";
    this.revenuesTypeInfoData = "";
    this.accountToken = "";
    this.accountInfoData = "";
    this.refundUserToken = "";
    this.refundUserInfoData = "";
    this.paymentMethodToken = "";
    this.paymentMethodInfoData = "";
    this.refundPaymentMethodToken = "";
    this.refundPaymentMethodInfoData = "";
    this.refundDateTime = "";
    this.refundDateTimeCustomized = "";
    this.refundDate = "";
    this.refundTime = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.revenuesToken = data.revenuesToken ?? "";
      this.revenuesDescriptionCurrent = data.revenuesDescriptionCurrent ?? "";
      this.revenuesDescriptionAr = data.revenuesDescriptionAr ?? "";
      this.revenuesDescriptionEn = data.revenuesDescriptionEn ?? "";
      this.revenuesDescriptionUnd = data.revenuesDescriptionUnd ?? "";
      this.revenuesNotes = data.revenuesNotes ?? "";
      this.revenuesImageIsDefault = data.revenuesImageIsDefault ?? false;
      this.revenuesImagePath = data.revenuesImagePath ?? "";
      this.revenuesImageSizeBytes = data.revenuesImageSizeBytes ?? 0;
      this.revenuesImageSizeTextCurrent =
        data.revenuesImageSizeTextCurrent ?? "";
      this.revenuesMoney = data.revenuesMoney ?? "";
      this.revenuesMoneyWithCurrency = data.revenuesMoneyWithCurrency ?? "";
      this.revenuesMoneyText = data.revenuesMoneyText ?? "";
      this.revenuesRefundTypeToken = data.revenuesRefundTypeToken ?? "";
      this.revenuesRefundTypeNameCurrent =
        data.revenuesRefundTypeNameCurrent ?? "";
      this.refundReasonCurrent = data.refundReasonCurrent ?? "";
      this.refundReasonAr = data.refundReasonAr ?? "";
      this.refundReasonEn = data.refundReasonEn ?? "";
      this.refundReasonUnd = data.refundReasonUnd ?? "";
      this.refundNotes = data.refundNotes ?? "";
      this.revenuesTypeToken = data.revenuesTypeToken ?? "";
      this.revenuesTypeInfoData = data.revenuesTypeInfoData ?? "";
      this.accountToken = data.accountToken ?? "";
      this.accountInfoData = data.accountInfoData ?? "";
      this.refundUserToken = data.refundUserToken ?? "";
      this.refundUserInfoData = data.refundUserInfoData ?? "";
      this.paymentMethodToken = data.paymentMethodToken ?? "";
      this.paymentMethodInfoData = data.paymentMethodInfoData ?? "";
      this.refundPaymentMethodToken = data.refundPaymentMethodToken ?? "";
      this.refundPaymentMethodInfoData = data.refundPaymentMethodInfoData ?? "";
      this.refundDateTime = data.refundDateTime ?? "";
      this.refundDateTimeCustomized = data.refundDateTimeCustomized ?? "";
      this.refundDate = data.refundDate ?? "";
      this.refundTime = data.refundTime ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
