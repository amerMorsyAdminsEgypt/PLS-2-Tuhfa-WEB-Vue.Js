import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/expenses.svg";

export default class Expense extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.expensesToken = "";
    this.expensesDescriptionCurrent = "";
    this.expensesDescriptionAr = "";
    this.expensesDescriptionEn = "";
    this.expensesDescriptionUnd = "";
    this.expensesNotes = "";
    this.expensesImageIsDefault = false;
    this.expensesImagePath = "";
    this.expensesImageSizeBytes = 0;
    this.expensesImageSizeTextCurrent = "";
    this.expensesMoney = "";
    this.expensesMoneyWithCurrency = "";
    this.expensesMoneyText = "";
    this.expensesRefundTypeToken = "";
    this.expensesRefundTypeNameCurrent = "";
    this.refundReasonCurrent = "";
    this.refundReasonAr = "";
    this.refundReasonEn = "";
    this.refundReasonUnd = "";
    this.refundNotes = "";
    this.expensesTypeToken = "";
    this.expensesTypeInfoData = "";
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
      this.expensesToken = data.expensesToken ?? "";
      this.expensesDescriptionCurrent = data.expensesDescriptionCurrent ?? "";
      this.expensesDescriptionAr = data.expensesDescriptionAr ?? "";
      this.expensesDescriptionEn = data.expensesDescriptionEn ?? "";
      this.expensesDescriptionUnd = data.expensesDescriptionUnd ?? "";
      this.expensesNotes = data.expensesNotes ?? "";
      this.expensesImageIsDefault = data.expensesImageIsDefault ?? false;
      this.expensesImagePath = data.expensesImagePath ?? "";
      this.expensesImageSizeBytes = data.expensesImageSizeBytes ?? 0;
      this.expensesImageSizeTextCurrent =
        data.expensesImageSizeTextCurrent ?? "";
      this.expensesMoney = data.expensesMoney ?? "";
      this.expensesMoneyWithCurrency = data.expensesMoneyWithCurrency ?? "";
      this.expensesMoneyText = data.expensesMoneyText ?? "";
      this.expensesRefundTypeToken = data.expensesRefundTypeToken ?? "";
      this.expensesRefundTypeNameCurrent =
        data.expensesRefundTypeNameCurrent ?? "";
      this.refundReasonCurrent = data.refundReasonCurrent ?? "";
      this.refundReasonAr = data.refundReasonAr ?? "";
      this.refundReasonEn = data.refundReasonEn ?? "";
      this.refundReasonUnd = data.refundReasonUnd ?? "";
      this.refundNotes = data.refundNotes ?? "";
      this.expensesTypeToken = data.expensesTypeToken ?? "";
      this.expensesTypeInfoData = data.expensesTypeInfoData ?? "";
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
