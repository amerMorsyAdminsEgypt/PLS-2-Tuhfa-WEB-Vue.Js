import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class ServiceEntitlementsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.userStudentInfoDataInclude = true;
    this.serviceInfoDataInclude = true;
    this.accountInfoDataInclude = true;
    this.paymentMethodInfoDataInclude = true;
    this.refundUserInfoDataInclude = true;
    this.refundPaymentMethodInfoDataInclude = true;

    this.userStudentToken = "";
    this.paymentUserToken = "";
    this.serviceEntitlementToken = "";
    this.serviceToken = "";
    this.accountToken = "";
    this.paymentMethodToken = "";
    this.refundUserToken = "";
    this.refundPaymentMethodToken = "";
    this.serviceEntitlementRefundTypeToken = "";
    this.serviceEntitlementMoneyValueFrom = "";
    this.serviceEntitlementMoneyValueTo = "";

    this.activationTypeTokens =
      store.getters.generalSetting.serviceEntitlements.activationTypeTokens ??
      [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
