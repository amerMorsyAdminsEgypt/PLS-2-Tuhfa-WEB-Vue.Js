export default class ActiveSubscriptionData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.subscriptionTypeToken = "";
    this.subscriptionTypeNameCurrent = "";
    this.subscriptionRequestSessionsNumber = "";
    this.subscriptionRemaningSessionsNumberCount = "";
    this.subscriptionFinishedSessionsNumberCount = "";
    this.subscriptionFromDateTime = "";
    this.subscriptionFromDateTimeCustomized = "";
    this.subscriptionFromDate = "";
    this.subscriptionFromTime = "";
    this.subscriptionToDateTime = "";
    this.subscriptionToDateTimeCustomized = "";
    this.subscriptionToDate = "";
    this.subscriptionToTime = "";
    this.canAttendaceStatus = "";
    this.errorCannotAttendanceReasonCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.subscriptionTypeToken = data.subscriptionTypeToken ?? "";
      this.subscriptionTypeNameCurrent = data.subscriptionTypeNameCurrent ?? "";
      this.subscriptionRequestSessionsNumber =
        data.subscriptionRequestSessionsNumber ?? "";
      this.subscriptionRemaningSessionsNumberCount =
        data.subscriptionRemaningSessionsNumberCount ?? "";
      this.subscriptionFinishedSessionsNumberCount =
        data.subscriptionFinishedSessionsNumberCount ?? "";
      this.subscriptionFromDateTime = data.subscriptionFromDateTime ?? "";
      this.subscriptionFromDateTimeCustomized =
        data.subscriptionFromDateTimeCustomized ?? "";
      this.subscriptionFromDate = data.subscriptionFromDate ?? "";
      this.subscriptionFromTime = data.subscriptionFromTime ?? "";
      this.subscriptionToDateTime = data.subscriptionToDateTime ?? "";
      this.subscriptionToDateTimeCustomized =
        data.subscriptionToDateTimeCustomized ?? "";
      this.subscriptionToDate = data.subscriptionToDate ?? "";
      this.subscriptionToTime = data.subscriptionToTime ?? "";
      this.canAttendaceStatus = data.canAttendaceStatus ?? "";
      this.errorCannotAttendanceReasonCurrent =
        data.errorCannotAttendanceReasonCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
