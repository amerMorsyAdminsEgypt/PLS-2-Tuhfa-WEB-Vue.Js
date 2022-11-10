import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/countedServiceTransactions.svg";
import CountedServiceInfoData from "./../../countedServices/CountedServiceInfoData";
import AccountInfoData from "./../accounts/AccountInfoData";
import UserCreatedData from "./../../general/UserCreatedData";
import PaymentMethodInfoData from "./../../settings/settingsOthers/paymentMethods/PaymentMethodInfoData";

export default class CountedServiceTransaction extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.token = "";
    this.refundReasonAr = "";
    this.refundReasonEn = "";
    this.refundReasonUnd = "";
    this.isSellingForStudent = false;
    this.countedServiceTransactionToken = "";
    this.countedServiceTransactionDescriptionCurrent = "";
    this.countedServiceTransactionDescriptionAr = "";
    this.countedServiceTransactionDescriptionEn = "";
    this.countedServiceTransactionDescriptionUnd = "";
    this.countedServiceTransactionNotes = "";
    this.countedServiceTransactionImageIsDefault = "";
    this.countedServiceTransactionImagePath = "";
    this.countedServiceTransactionImageSizeBytes = "";
    this.countedServiceTransactionImageSizeTextCurrent = "";
    this.countedServiceCount = "";
    this.countedServiceTransactionMoney = "";
    this.countedServiceTransactionMoneyWithCurrency = "";
    this.countedServiceTransactionMoneyText = "";
    this.refundCountedServiceTransactionMoney = "";
    this.refundCountedServiceTransactionMoneyWithCurrency = "";
    this.refundCountedServiceTransactionMoneyText = "";
    this.countedServiceTransactionTypeToken = "";
    this.countedServiceTransactionTypeNameCurrent = "";
    this.countedServiceTransactionTypeNameEn = "";
    this.countedServiceTransactionTypeNameAr = "";
    this.countedServiceTransactionTypeNameUnd = "";
    this.countedServiceTransactionRefundTypeToken = "";
    this.countedServiceTransactionRefundTypeNameCurrent = "";
    this.refundReasonCurrent = "";
    this.refundDateTime = "";
    this.refundDateTimeCustomized = "";
    this.refundDate = "";
    this.refundTime = "";
    this.refundNotes = "";
    this.countedServiceToken = "";
    this.accountToken = "";
    this.refundUserToken = "";
    this.studentUserToken = "";
    this.paymentMethodToken = "";
    this.refundPaymentMethodToken = "";
    this.countedServiceInfoData = new CountedServiceInfoData();
    this.accountInfoData = new AccountInfoData();
    this.refundUserInfoData = new UserCreatedData();
    this.studentUserInfoData = new UserCreatedData();
    this.paymentMethodInfoData = new PaymentMethodInfoData();
    this.refundPaymentMethodInfoData = new PaymentMethodInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.countedServiceTransactionToken =
        data.countedServiceTransactionToken ?? "";
      this.countedServiceTransactionDescriptionCurrent =
        data.countedServiceTransactionDescriptionCurrent ?? "";
      this.countedServiceTransactionDescriptionAr =
        data.countedServiceTransactionDescriptionAr ?? "";
      this.countedServiceTransactionDescriptionEn =
        data.countedServiceTransactionDescriptionEn ?? "";
      this.countedServiceTransactionDescriptionUnd =
        data.countedServiceTransactionDescriptionUnd ?? "";
      this.countedServiceTransactionNotes =
        data.countedServiceTransactionNotes ?? "";
      this.countedServiceTransactionImageIsDefault =
        data.countedServiceTransactionImageIsDefault ?? "";
      this.countedServiceTransactionImagePath =
        data.countedServiceTransactionImagePath ?? "";
      this.countedServiceTransactionImageSizeBytes =
        data.countedServiceTransactionImageSizeBytes ?? "";
      this.countedServiceTransactionImageSizeTextCurrent =
        data.countedServiceTransactionImageSizeTextCurrent ?? "";
      this.countedServiceCount = data.countedServiceCount ?? "";
      this.countedServiceTransactionMoney =
        data.countedServiceTransactionMoney ?? "";
      this.countedServiceTransactionMoneyWithCurrency =
        data.countedServiceTransactionMoneyWithCurrency ?? "";
      this.countedServiceTransactionMoneyText =
        data.countedServiceTransactionMoneyText ?? "";
      this.refundCountedServiceTransactionMoney =
        data.refundCountedServiceTransactionMoney ?? "";
      this.refundCountedServiceTransactionMoneyWithCurrency =
        data.refundCountedServiceTransactionMoneyWithCurrency ?? "";
      this.refundCountedServiceTransactionMoneyText =
        data.refundCountedServiceTransactionMoneyText ?? "";
      this.countedServiceTransactionTypeToken =
        data.countedServiceTransactionTypeToken ?? "";
      this.countedServiceTransactionTypeNameCurrent =
        data.countedServiceTransactionTypeNameCurrent ?? "";
      this.countedServiceTransactionTypeNameEn =
        data.countedServiceTransactionTypeNameEn ?? "";
      this.countedServiceTransactionTypeNameAr =
        data.countedServiceTransactionTypeNameAr ?? "";
      this.countedServiceTransactionTypeNameUnd =
        data.countedServiceTransactionTypeNameUnd ?? "";
      this.countedServiceTransactionRefundTypeToken =
        data.countedServiceTransactionRefundTypeToken ?? "";
      this.countedServiceTransactionRefundTypeNameCurrent =
        data.countedServiceTransactionRefundTypeNameCurrent ?? "";
      this.refundReasonCurrent = data.refundReasonCurrent ?? "";
      this.refundDateTime = data.refundDateTime ?? "";
      this.refundDateTimeCustomized = data.refundDateTimeCustomized ?? "";
      this.refundDate = data.refundDate ?? "";
      this.refundTime = data.refundTime ?? "";
      this.refundNotes = data.refundNotes ?? "";
      this.countedServiceToken = data.countedServiceToken ?? "";
      this.accountToken = data.accountToken ?? "";
      this.refundUserToken = data.refundUserToken ?? "";
      this.studentUserToken = data.studentUserToken ?? "";
      this.paymentMethodToken = data.paymentMethodToken ?? "";
      this.refundPaymentMethodToken = data.refundPaymentMethodToken ?? "";
      this.countedServiceInfoData.fillData(data.countedServiceInfoData);
      this.accountInfoData.fillData(data.accountInfoData);
      this.refundUserInfoData.fillDataUserCreatedData(data.refundUserInfoData);
      this.studentUserInfoData.fillDataUserCreatedData(
        data.studentUserInfoData
      );
      this.paymentMethodInfoData.fillData(data.paymentMethodInfoData);
      this.refundPaymentMethodInfoData.fillData(
        data.refundPaymentMethodInfoData
      );
    } else {
      this.setInitialValue();
    }
  }
}
