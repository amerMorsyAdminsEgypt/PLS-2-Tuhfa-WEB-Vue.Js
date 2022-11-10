export default class EducationalJoiningApplicationApprove {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.token = "";
    this.approvalTypeToken = "";
    this.rejectReasonAr = "";
    this.rejectReasonEn = "";
    this.rejectReasonUnd = "";
    this.approvalNote = "";
    this.priceListToken = "";
    this.subscriptionTypeToken = "";
    this.subscriptionRequestSessionsNumber = "";
    this.subscriptionToDateTime = "";
  }
  fillData(data) {
    if (data) {
      // this.token = data.token ?? data.educationalJoiningApplicationToken ?? "";
      this.token = data.token ?? "";
      this.approvalTypeToken = data.approvalTypeToken ?? "";
      this.rejectReasonAr = data.rejectReasonAr ?? "";
      this.rejectReasonEn = data.rejectReasonEn ?? "";
      this.rejectReasonUnd = data.rejectReasonUnd ?? "";
      this.approvalNote = data.approvalNote ?? "";
      this.priceListToken = data.priceListToken ?? "";
      this.subscriptionTypeToken = data.subscriptionTypeToken ?? "";
      this.subscriptionRequestSessionsNumber =
        data.subscriptionRequestSessionsNumber ?? "";
      this.subscriptionToDateTime = data.subscriptionToDateTime ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
