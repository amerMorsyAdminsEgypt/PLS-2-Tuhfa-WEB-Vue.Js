export default class AccountInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.accountToken = "";
    this.accountNameCurrent = "";
    this.accountNameAr = "";
    this.accountNameEn = "";
    this.accountNameUnd = "";
    this.accountDescriptionCurrent = "";
    this.accountDescriptionAr = "";
    this.accountDescriptionEn = "";
    this.accountDescriptionUnd = "";
    this.accountNotes = "";
    this.accountImageIsDefault = false;
    this.accountImagePath = "";
    this.accountImageSizeBytes = 0;
    this.accountImageSizeTextCurrent = "";
    this.accountMoneyBalance = 0.0;
    this.accountMoneyBalanceWithCurrency = "";
    this.accountMoneyBalanceText = "";
  }
  fillData(data) {
    if (data) {
      this.accountToken = data.accountToken ?? "";
      this.accountNameCurrent = data.accountNameCurrent ?? "";
      this.accountNameAr = data.accountNameAr ?? "";
      this.accountNameEn = data.accountNameEn ?? "";
      this.accountNameUnd = data.accountNameUnd ?? "";
      this.accountDescriptionCurrent = data.accountDescriptionCurrent ?? "";
      this.accountDescriptionAr = data.accountDescriptionAr ?? "";
      this.accountDescriptionEn = data.accountDescriptionEn ?? "";
      this.accountDescriptionUnd = data.accountDescriptionUnd ?? "";
      this.accountNotes = data.accountNotes ?? "";
      this.accountImageIsDefault = data.accountImageIsDefault ?? false;
      this.accountImagePath = data.accountImagePath ?? "";
      this.accountImageSizeBytes = data.accountImageSizeBytes ?? 0;
      this.accountImageSizeTextCurrent = data.accountImageSizeTextCurrent ?? "";
      this.accountMoneyBalance = data.accountMoneyBalance ?? 0.0;
      this.accountMoneyBalanceWithCurrency =
        data.accountMoneyBalanceWithCurrency ?? "";
      this.accountMoneyBalanceText = data.accountMoneyBalanceText ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
