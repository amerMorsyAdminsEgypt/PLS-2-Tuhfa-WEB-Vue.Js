import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/accountTransactions.svg";

export default class AccountTransaction extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.sendTo = "";
    this.accountTransactionToken = "";
    this.accountTransactionNameCurrent = "";
    this.accountTransactionNameAr = "";
    this.accountTransactionNameEn = "";
    this.accountTransactionNameUnd = "";
    this.accountTransactionDescriptionCurrent = "";
    this.accountTransactionDescriptionAr = "";
    this.accountTransactionDescriptionEn = "";
    this.accountTransactionDescriptionUnd = "";
    this.accountTransactionNotes = "";
    this.accountTransactionImageIsDefault = false;
    this.accountTransactionImagePath = "";
    this.accountTransactionImageSizeBytes = 0;
    this.accountTransactionImageSizeTextCurrent = "";
    this.accountTransactionMoneyBalance = 0.0;
    this.accountTransactionMoneyBalanceWithCurrency = "";
    this.accountTransactionMoneyBalanceText = "";
    this.accountTransactionTypeToken = "";
    this.accountTransactionTypeNameCurrent = "";
    this.accountTransactionMoney = "";
    this.accountTransactionMoneyWithCurrency = "";
    this.accountTransactionMoneyText = "";
    this.accountToken = "";
    this.accountInfoData = {};
    this.expensesToken = "";
    this.expensesInfoData = {};
    this.revenuesToken = "";
    this.revenuesInfoData = {};
    this.paymentMethodToken = "";
    this.paymentMethodInfoData = {};
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.accountTransactionToken = data.accountTransactionToken ?? "";
      this.accountTransactionNameCurrent =
        data.accountTransactionNameCurrent ?? "";
      this.accountTransactionNameAr = data.accountTransactionNameAr ?? "";
      this.accountTransactionNameEn = data.accountTransactionNameEn ?? "";
      this.accountTransactionNameUnd = data.accountTransactionNameUnd ?? "";
      this.accountTransactionDescriptionCurrent =
        data.accountTransactionDescriptionCurrent ?? "";
      this.accountTransactionDescriptionAr =
        data.accountTransactionDescriptionAr ?? "";
      this.accountTransactionDescriptionEn =
        data.accountTransactionDescriptionEn ?? "";
      this.accountTransactionDescriptionUnd =
        data.accountTransactionDescriptionUnd ?? "";
      this.accountTransactionNotes = data.accountTransactionNotes ?? "";
      this.accountTransactionImageIsDefault =
        data.accountTransactionImageIsDefault ?? false;
      this.accountTransactionImagePath = data.accountTransactionImagePath ?? "";
      this.accountTransactionImageSizeBytes =
        data.accountTransactionImageSizeBytes ?? 0;
      this.accountTransactionImageSizeTextCurrent =
        data.accountTransactionImageSizeTextCurrent ?? "";
      this.accountTransactionMoneyBalance =
        data.accountTransactionMoneyBalance ?? 0.0;
      this.accountTransactionMoneyBalanceWithCurrency =
        data.accountTransactionMoneyBalanceWithCurrency ?? "";
      this.accountTransactionMoneyBalanceText =
        data.accountTransactionMoneyBalanceText ?? "";
      this.accountTransactionTypeToken = data.accountTransactionTypeToken ?? "";
      this.accountTransactionTypeNameCurrent =
        data.accountTransactionTypeNameCurrent ?? "";
      this.accountTransactionMoney = data.accountTransactionMoney ?? "";
      this.accountTransactionMoneyWithCurrency =
        data.accountTransactionMoneyWithCurrency ?? "";
      this.accountTransactionMoneyText = data.accountTransactionMoneyText ?? "";
      this.accountToken = data.accountToken ?? "";
      this.accountInfoData = data.accountInfoData ?? {};
      this.expensesToken = data.expensesToken ?? "";
      this.expensesInfoData = data.expensesInfoData ?? {};
      this.revenuesToken = data.revenuesToken ?? "";
      this.revenuesInfoData = data.revenuesInfoData ?? {};
      this.paymentMethodToken = data.paymentMethodToken ?? "";
      this.paymentMethodInfoData = data.paymentMethodInfoData ?? {};
    } else {
      this.setInitialValue();
    }
  }
}
