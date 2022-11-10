import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/installmentPayments.svg";
import UserInfoData from "./../../general/UserCreatedData";
import AccountInfoData from "./../../finance/accounts/Account";
import PaymentMethodInfoData from "./../../settings/settingsOthers/paymentMethods/PaymentMethod";

export default class InstallmentPayment extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.installmentPaymentToken = "";
    this.installmentPaymentDescriptionCurrent = "";
    this.installmentPaymentDescriptionAr = "";
    this.installmentPaymentDescriptionEn = "";
    this.installmentPaymentDescriptionUnd = "";
    this.installmentPaymentNotes = "";
    this.installmentPaymentImageIsDefault = "";
    this.installmentPaymentImagePath = "";
    this.installmentPaymentImageSizeBytes = "";
    this.installmentPaymentImageSizeTextCurrent = "";
    this.installmentPaymentMoney = "";
    this.installmentPaymentMoneyWithCurrency = "";
    this.installmentPaymentMoneyText = "";
    this.refundInstallmentPaymentMoney = "";
    this.refundInstallmentPaymentMoneyWithCurrency = "";
    this.refundInstallmentPaymentMoneyText = "";
    this.installmentPaymentDateTime = "";
    this.installmentPaymentDateTimeCustomized = "";
    this.installmentPaymentDate = "";
    this.installmentPaymentTime = "";
    this.refundDateTime = "";
    this.refundDateTimeCustomized = "";
    this.refundDate = "";
    this.refundTime = "";
    this.refundTypeToken = "";
    this.refundTypeNameCurrent = "";
    this.refundReasonCurrent = "";
    this.refundReasonAr = "";
    this.refundReasonEn = "";
    this.refundReasonUnd = "";
    this.refundNotes = "";
    this.debtUserToken = "";
    this.installmentScheduleTimeToken = "";
    this.installmentScheduleTimeInfo = "";
    this.accountToken = "";
    this.paymentUserToken = "";
    this.paymentMethodToken = "";
    this.refundUserToken = "";
    this.refundPaymentMethodToken = "";
    this.debtUserInfoData = new UserInfoData();
    this.refundUserInfoData = new UserInfoData();
    this.paymentUserInfoData = new UserInfoData();
    this.accountInfoData = new AccountInfoData();
    this.paymentMethodInfoData = new PaymentMethodInfoData();
    this.refundPaymentMethodInfoData = new PaymentMethodInfoData();
    this.remainderMoney = 0; // added by me
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.installmentPaymentToken = data.installmentPaymentToken ?? "";
      this.installmentPaymentDescriptionCurrent =
        data.installmentPaymentDescriptionCurrent ?? "";
      this.installmentPaymentDescriptionAr =
        data.installmentPaymentDescriptionAr ?? "";
      this.installmentPaymentDescriptionEn =
        data.installmentPaymentDescriptionEn ?? "";
      this.installmentPaymentDescriptionUnd =
        data.installmentPaymentDescriptionUnd ?? "";
      this.installmentPaymentNotes = data.installmentPaymentNotes ?? "";
      this.installmentPaymentImageIsDefault =
        data.installmentPaymentImageIsDefault ?? "";
      this.installmentPaymentImagePath = data.installmentPaymentImagePath ?? "";
      this.installmentPaymentImageSizeBytes =
        data.installmentPaymentImageSizeBytes ?? "";
      this.installmentPaymentImageSizeTextCurrent =
        data.installmentPaymentImageSizeTextCurrent ?? "";
      this.installmentPaymentMoney = data.installmentPaymentMoney ?? "";
      this.installmentPaymentMoneyWithCurrency =
        data.installmentPaymentMoneyWithCurrency ?? "";
      this.installmentPaymentMoneyText = data.installmentPaymentMoneyText ?? "";
      this.refundInstallmentPaymentMoney =
        data.refundInstallmentPaymentMoney ?? "";
      this.refundInstallmentPaymentMoneyWithCurrency =
        data.refundInstallmentPaymentMoneyWithCurrency ?? "";
      this.refundInstallmentPaymentMoneyText =
        data.refundInstallmentPaymentMoneyText ?? "";
      this.installmentPaymentDateTime = data.installmentPaymentDateTime ?? "";
      this.installmentPaymentDateTimeCustomized =
        data.installmentPaymentDateTimeCustomized ?? "";
      this.installmentPaymentDate = data.installmentPaymentDate ?? "";
      this.installmentPaymentTime = data.installmentPaymentTime ?? "";
      this.refundDateTime = data.refundDateTime ?? "";
      this.refundDateTimeCustomized = data.refundDateTimeCustomized ?? "";
      this.refundDate = data.refundDate ?? "";
      this.refundTime = data.refundTime ?? "";
      this.refundTypeToken = data.refundTypeToken ?? "";
      this.refundTypeNameCurrent = data.refundTypeNameCurrent ?? "";
      this.refundReasonCurrent = data.refundReasonCurrent ?? "";
      this.refundReasonAr = data.refundReasonAr ?? "";
      this.refundReasonEn = data.refundReasonEn ?? "";
      this.refundReasonUnd = data.refundReasonUnd ?? "";
      this.refundNotes = data.refundNotes ?? "";
      this.debtUserToken = data.debtUserToken ?? "";
      this.installmentScheduleTimeToken =
        data.installmentScheduleTimeToken ?? "";
      this.installmentScheduleTimeInfo = data.installmentScheduleTimeInfo ?? "";
      this.accountToken = data.accountToken ?? "";
      this.paymentUserToken = data.paymentUserToken ?? "";
      this.paymentMethodToken = data.paymentMethodToken ?? "";
      this.refundUserToken = data.refundUserToken ?? "";
      this.refundPaymentMethodToken = data.refundPaymentMethodToken ?? "";
      this.debtUserInfoData.fillDataUserCreatedData(data.debtUserInfoData);
      this.refundUserInfoData.fillDataUserCreatedData(data.refundUserInfoData);
      this.paymentUserInfoData.fillDataUserCreatedData(
        data.paymentUserInfoData
      );
      this.accountInfoData.fillData(data.accountInfoData);
      this.paymentMethodInfoData.fillData(data.paymentMethodInfoData);
      this.refundPaymentMethodInfoData.fillData(
        data.refundPaymentMethodInfoData
      );
      this.remainderMoney = data.remainderMoney ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
