import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class JoiningApplicationSubscriptionsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.joiningApplicationSubscriptions
        .activationTypeTokens || [];
    this.joiningApplicationSubscriptionToken = "";
    this.educationalJoiningApplicationToken = "";
    this.userStudentToken = "";
    this.educationalCategoryToken = "";
    this.educationalPeriodToken = "";
    this.priceListToken = "";
    this.subscriptionTypeToken = "";
    this.refundTypeToken = "";
    this.userStudentInfoDataInclude = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.joiningApplicationSubscriptionToken =
        data.joiningApplicationSubscriptionToken || "";
      this.educationalJoiningApplicationToken =
        data.educationalJoiningApplicationToken || "";
      this.userStudentToken = data.userStudentToken || "";
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.educationalPeriodToken = data.educationalPeriodToken || "";
      this.priceListToken = data.priceListToken || "";
      this.subscriptionTypeToken = data.subscriptionTypeToken || "";
      this.refundTypeToken = data.refundTypeToken || "";
      this.userStudentInfoDataInclude =
        data.userStudentInfoDataInclude || false;
    } else {
      this.setInitialValue();
    }
  }
}
