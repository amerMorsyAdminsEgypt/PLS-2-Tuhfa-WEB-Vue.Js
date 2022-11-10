import icon from "@/assets/images/subscribeInPakage.svg";

export default class SubscribeInMediaPackageClass {
  icon = icon;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userToken = "";
    this.mediaPackageToken = "";
    this.joinInEducationalGroupToken = "";
    this.cashPaymentStatus = false;
    this.paymentMethodToken = "";
    this.accountToken = "";
  }
  fillData(data) {
    if (data) {
      this.userToken = data.userToken ?? "";
      this.mediaPackageToken = data.mediaPackageToken ?? "";
      this.joinInEducationalGroupToken = data.joinInEducationalGroupToken ?? "";
      this.cashPaymentStatus = data.cashPaymentStatus ?? false;
      this.paymentMethodToken = data.paymentMethodToken ?? "";
      this.accountToken = data.accountToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
