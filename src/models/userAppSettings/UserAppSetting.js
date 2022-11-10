export default class UserAppSetting {
  constructor() {
    this.setInitialValue();
  }

  setInitialValue() {
    this.userAppSettingToken = "";
    this.userToken = "";
    this.userPlatFormToken = "";
    this.userPlatFormNameCurrent = "";
    // this.themeToken = "";
    // this.themeNameCurrent = "";
    // this.decimalFormatToken = "";
    // this.decimalFormatNameCurrent = "";
    this.timeZoneToken = "";
    this.timeZoneNameCurrent = "";
    this.dateFormatToken = "";
    this.dateFormatNameCurrent = "";
    this.timeFormatToken = "";
    this.timeFormatNameCurrent = "";
    this.languageToken = "";
    this.languageNameCurrent = "";
    // this.currencyToken = "";
    // this.currencyNameCurrent = "";
    // this.printCodeTypeToken = "";
    // this.printCodeTypeNameCurrent = "";
    // this.startDayOfWeekToken = "";
    // this.startDayOfWeekNameCurrent = "";
    // this.startMonthOfYear = 1;
    // this.startMonthOfYearNameCurrent = "";
    // this.startDayOfMonth = 25;
    // this.backAfterAddStatus = true;
    // this.backAfterEditStatus = true;
    this.receiveNotificationStatus = false;
    // this.customSettings = "";
  }
  fillData(data) {
    if (data) {
      this.userAppSettingToken = data.userAppSettingToken || "";
      this.userToken = data.userToken || "";
      this.userPlatFormToken = data.userPlatFormToken || "";
      this.userPlatFormNameCurrent = data.userPlatFormNameCurrent || "";
      this.timeZoneToken = data.timeZoneToken || "";
      this.timeZoneNameCurrent = data.timeZoneNameCurrent || "";
      this.dateFormatToken = data.dateFormatToken || "";
      this.dateFormatNameCurrent = data.dateFormatNameCurrent || "";
      this.timeFormatToken = data.timeFormatToken || "";
      this.timeFormatNameCurrent = data.timeFormatNameCurrent || "";
      this.languageToken = data.languageToken || "";
      this.languageNameCurrent = data.languageNameCurrent || "";
      this.receiveNotificationStatus = data.receiveNotificationStatus || "";
    } else {
      this.setInitialValue();
    }
  }
}
