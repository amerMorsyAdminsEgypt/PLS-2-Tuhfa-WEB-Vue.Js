export default class UserInterestFollowUpStatsticData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountFollowUpEmployees = 0;
    this.totalCountFollowInterests = 0;
    this.totalCountFollowInterestsIsReply = 0;
    this.followInterestsIsReplyPercentage = 0;
    this.followInterestsIsReplyPercentageText = "";
    this.totalCountFollowInterestsNotReply = 0;
    this.followInterestsNotReplyPercentage = 0;
    this.followInterestsNotReplyPercentageText = "";
    this.totalCountFollowInterestsPhoneIsClose = 0;
    this.followInterestsPhoneIsClosePercentage = 0;
    this.followInterestsPhoneIsClosePercentageText = "";
    this.lastFollowInterestToken = null;
    this.lastFollowInterestInfoData = null;
    this.lastUpdateStatisticsDateTime = null;
    this.lastUpdateStatisticsDateTimeCustomized = "";
    this.lastUpdateStatisticsDate = "";
    this.lastUpdateStatisticsTime = "";
    this.lastUpdateStatisticsFromText = "";
  }
  fillData(data) {
    if (data) {
      this.totalCountFollowUpEmployees = data.totalCountFollowUpEmployees ?? 0;
      this.totalCountFollowInterests = data.totalCountFollowInterests ?? 0;
      this.totalCountFollowInterestsIsReply =
        data.totalCountFollowInterestsIsReply ?? 0;
      this.followInterestsIsReplyPercentage =
        data.followInterestsIsReplyPercentage ?? 0;
      this.followInterestsIsReplyPercentageText =
        data.followInterestsIsReplyPercentageText ?? "";
      this.totalCountFollowInterestsNotReply =
        data.totalCountFollowInterestsNotReply ?? 0;
      this.followInterestsNotReplyPercentage =
        data.followInterestsNotReplyPercentage ?? 0;
      this.followInterestsNotReplyPercentageText =
        data.followInterestsNotReplyPercentageText ?? "";
      this.totalCountFollowInterestsPhoneIsClose =
        data.totalCountFollowInterestsPhoneIsClose ?? 0;
      this.followInterestsPhoneIsClosePercentage =
        data.followInterestsPhoneIsClosePercentage ?? 0;
      this.followInterestsPhoneIsClosePercentageText =
        data.followInterestsPhoneIsClosePercentageText ?? "";
      this.lastFollowInterestToken = data.lastFollowInterestToken ?? null;
      this.lastFollowInterestInfoData = data.lastFollowInterestInfoData ?? null;
      this.lastUpdateStatisticsDateTime =
        data.lastUpdateStatisticsDateTime ?? null;
      this.lastUpdateStatisticsDateTimeCustomized =
        data.lastUpdateStatisticsDateTimeCustomized ?? "";
      this.lastUpdateStatisticsDate = data.lastUpdateStatisticsDate ?? "";
      this.lastUpdateStatisticsTime = data.lastUpdateStatisticsTime ?? "";
      this.lastUpdateStatisticsFromText =
        data.lastUpdateStatisticsFromText ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
