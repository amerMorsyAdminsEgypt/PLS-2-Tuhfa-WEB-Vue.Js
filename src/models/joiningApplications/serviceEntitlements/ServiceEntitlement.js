import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/installmentPayments.svg";
import ServiceInfoData from "./../../services/Service";
import AccountInfoData from "./../../finance/accounts/Account";
import UserInfoData from "./../../general/UserCreatedData";
import PaymentMethodInfoData from "./../../settings/settingsOthers/paymentMethods/PaymentMethod";

export default class ServiceEntitlement extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.serviceEntitlementToken = "";
    this.serviceEntitlementDescriptionCurrent = "";
    this.serviceEntitlementDescriptionAr = "";
    this.serviceEntitlementDescriptionEn = "";
    this.serviceEntitlementDescriptionUnd = "";
    this.serviceEntitlementNotes = "";
    this.serviceEntitlementImageIsDefault = "";
    this.serviceEntitlementImagePath = "";
    this.serviceEntitlementImageSizeBytes = "";
    this.serviceEntitlementImageSizeTextCurrent = "";
    this.serviceEntitlementMoney = 0;
    this.serviceEntitlementMoneyWithCurrency = "";
    this.serviceEntitlementMoneyText = "";
    this.refundServiceEntitlementMoney = "";
    this.refundServiceEntitlementMoneyWithCurrency = "";
    this.refundServiceEntitlementMoneyText = "";
    this.serviceEntitlementRefundTypeToken = "";
    this.serviceEntitlementRefundTypeNameCurrent = "";
    this.refundReasonCurrent = "";
    this.refundReasonAr = "";
    this.refundReasonEn = "";
    this.refundDateTime = "";
    this.refundDateTimeCustomized = "";
    this.refundDate = "";
    this.refundTime = "";
    this.refundNotes = "";
    this.serviceToken = "";
    this.accountToken = "";
    this.refundUserToken = "";
    this.userStudentToken = "";
    this.paymentMethodToken = "";
    this.refundPaymentMethodToken = "";
    this.serviceInfoData = new ServiceInfoData();
    this.accountInfoData = new AccountInfoData();
    this.refundUserInfoData = new UserInfoData();
    this.userStudentInfoData = new UserInfoData();
    this.paymentMethodInfoData = new PaymentMethodInfoData();
    this.refundPaymentMethodInfoData = new PaymentMethodInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.serviceEntitlementToken = data.serviceEntitlementToken ?? "";
      this.serviceEntitlementDescriptionCurrent =
        data.serviceEntitlementDescriptionCurrent ?? "";
      this.serviceEntitlementDescriptionAr =
        data.serviceEntitlementDescriptionAr ?? "";
      this.serviceEntitlementDescriptionEn =
        data.serviceEntitlementDescriptionEn ?? "";
      this.serviceEntitlementDescriptionUnd =
        data.serviceEntitlementDescriptionUnd ?? "";
      this.serviceEntitlementNotes = data.serviceEntitlementNotes ?? "";
      this.serviceEntitlementImageIsDefault =
        data.serviceEntitlementImageIsDefault ?? "";
      this.serviceEntitlementImagePath = data.serviceEntitlementImagePath ?? "";
      this.serviceEntitlementImageSizeBytes =
        data.serviceEntitlementImageSizeBytes ?? "";
      this.serviceEntitlementImageSizeTextCurrent =
        data.serviceEntitlementImageSizeTextCurrent ?? "";
      this.serviceEntitlementMoney = data.serviceEntitlementMoney ?? 0;
      this.serviceEntitlementMoneyWithCurrency =
        data.serviceEntitlementMoneyWithCurrency ?? "";
      this.serviceEntitlementMoneyText = data.serviceEntitlementMoneyText ?? "";
      this.refundServiceEntitlementMoney =
        data.refundServiceEntitlementMoney ?? "";
      this.refundServiceEntitlementMoneyWithCurrency =
        data.refundServiceEntitlementMoneyWithCurrency ?? "";
      this.refundServiceEntitlementMoneyText =
        data.refundServiceEntitlementMoneyText ?? "";
      this.serviceEntitlementRefundTypeToken =
        data.serviceEntitlementRefundTypeToken ?? "";
      this.serviceEntitlementRefundTypeNameCurrent =
        data.serviceEntitlementRefundTypeNameCurrent ?? "";
      this.refundReasonCurrent = data.refundReasonCurrent ?? "";
      this.refundReasonAr = data.refundReasonAr ?? "";
      this.refundReasonEn = data.refundReasonEn ?? "";
      this.refundDateTime = data.refundDateTime ?? "";
      this.refundDateTimeCustomized = data.refundDateTimeCustomized ?? "";
      this.refundDate = data.refundDate ?? "";
      this.refundTime = data.refundTime ?? "";
      this.refundNotes = data.refundNotes ?? "";
      this.serviceToken = data.serviceToken ?? "";
      this.accountToken = data.accountToken ?? "";
      this.refundUserToken = data.refundUserToken ?? "";
      this.userStudentToken = data.userStudentToken ?? "";
      this.paymentMethodToken = data.paymentMethodToken ?? "";
      this.refundPaymentMethodToken = data.refundPaymentMethodToken ?? "";
      this.serviceInfoData.fillData(data.serviceInfoData);
      this.accountInfoData.fillData(data.accountInfoData);
      this.refundUserInfoData.fillDataUserCreatedData(data.refundUserInfoData);
      this.userStudentInfoData.fillDataUserCreatedData(
        data.userStudentInfoData
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
