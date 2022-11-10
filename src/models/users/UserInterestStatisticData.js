export default class UserInterestStatisticData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountOthersInterests = 0;
    this.totalCountOthersInterestsPlaces = 0;
    this.othersInterestsPlacesPercentage = 0;
    this.othersInterestsPlacesPercentageText = "";
    this.totalCountOthersInterestsEducationalCategories = 0;
    this.othersInterestsEducationalCategoriesPercentage = 0;
    this.othersInterestsEducationalCategoriesPercentageText = "";
    this.totalCountOthersInterestsServices = 0;
    this.othersInterestsServicesPercentage = 0;
    this.othersInterestsServicesPercentageText = "";
    this.totalCountOthersInterestsCompetitions = 0;
    this.othersInterestsCompetitionsPercentage = 0;
    this.othersInterestsCompetitionsPercentageText = "";
    this.totalCountOthersInterestsEducationalGroups = 0;
    this.othersInterestsEducationalGroupsPercentage = 0;
    this.othersInterestsEducationalGroupsPercentageText = "";
    this.totalCountOthersInterestsStatusFollowUp = 0;
    this.othersInterestsStatusFollowUpPercentage = 0;
    this.othersInterestsStatusFollowUpPercentageText = "";
    this.totalCountOthersInterestsStatusJoined = 0;
    this.othersInterestsStatusJoinedPercentage = 0;
    this.othersInterestsStatusJoinedPercentageText = "";
    this.totalCountSysteamInterests = 0;
    this.totalCountSysteamInterestsPlaces = 0;
    this.systeamInterestsPlacesPercentage = 0;
    this.systeamInterestsPlacesPercentageText = "";
    this.totalCountSysteamInterestsEducationalCategories = 0;
    this.systeamInterestsEducationalCategoriesPercentage = 0;
    this.systeamInterestsEducationalCategoriesPercentageText = "";
    this.totalCountSysteamInterestsServices = 0;
    this.systeamInterestsServicesPercentage = 0;
    this.systeamInterestsServicesPercentageText = "";
    this.totalCountSysteamInterestsCompetitions = 0;
    this.systeamInterestsCompetitionsPercentage = 0;
    this.systeamInterestsCompetitionsPercentageText = "";
    this.totalCountSysteamInterestsEducationalGroups = 0;
    this.systeamInterestsEducationalGroupsPercentage = 0;
    this.systeamInterestsEducationalGroupsPercentageText = "";
    this.totalCountSysteamInterestsStatusFollowUp = 0;
    this.systeamInterestsStatusFollowUpPercentage = 0;
    this.systeamInterestsStatusFollowUpPercentageText = "";
    this.totalCountSysteamInterestsStatusJoined = 0;
    this.systeamInterestsStatusJoinedPercentage = 0;
    this.systeamInterestsStatusJoinedPercentageText = "";
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
    this.lastFollowInterestToken = "";
    this.lastFollowInterestInfoData = null;
    this.lastUpdateStatisticsDateTime = "";
    this.lastUpdateStatisticsDateTimeCustomized = "";
    this.lastUpdateStatisticsDate = "";
    this.lastUpdateStatisticsTime = "";
    this.lastUpdateStatisticsFromText = "";
  }
  fillData(data) {
    if (data) {
      this.totalCountOthersInterests = data.totalCountOthersInterests ?? 0;
      this.totalCountOthersInterestsPlaces =
        data.totalCountOthersInterestsPlaces ?? 0;
      this.othersInterestsPlacesPercentage =
        data.othersInterestsPlacesPercentage ?? 0;
      this.othersInterestsPlacesPercentageText =
        data.othersInterestsPlacesPercentageText ?? "";
      this.totalCountOthersInterestsEducationalCategories =
        data.totalCountOthersInterestsEducationalCategories ?? 0;
      this.othersInterestsEducationalCategoriesPercentage =
        data.othersInterestsEducationalCategoriesPercentage ?? 0;
      this.othersInterestsEducationalCategoriesPercentageText =
        data.othersInterestsEducationalCategoriesPercentageText ?? "";
      this.totalCountOthersInterestsServices =
        data.totalCountOthersInterestsServices ?? 0;
      this.othersInterestsServicesPercentage =
        data.othersInterestsServicesPercentage ?? 0;
      this.othersInterestsServicesPercentageText =
        data.othersInterestsServicesPercentageText ?? "";
      this.totalCountOthersInterestsCompetitions =
        data.totalCountOthersInterestsCompetitions ?? 0;
      this.othersInterestsCompetitionsPercentage =
        data.othersInterestsCompetitionsPercentage ?? 0;
      this.othersInterestsCompetitionsPercentageText =
        data.othersInterestsCompetitionsPercentageText ?? "";
      this.totalCountOthersInterestsEducationalGroups =
        data.totalCountOthersInterestsEducationalGroups ?? 0;
      this.othersInterestsEducationalGroupsPercentage =
        data.othersInterestsEducationalGroupsPercentage ?? 0;
      this.othersInterestsEducationalGroupsPercentageText =
        data.othersInterestsEducationalGroupsPercentageText ?? "";
      this.totalCountOthersInterestsStatusFollowUp =
        data.totalCountOthersInterestsStatusFollowUp ?? 0;
      this.othersInterestsStatusFollowUpPercentage =
        data.othersInterestsStatusFollowUpPercentage ?? 0;
      this.othersInterestsStatusFollowUpPercentageText =
        data.othersInterestsStatusFollowUpPercentageText ?? "";
      this.totalCountOthersInterestsStatusJoined =
        data.totalCountOthersInterestsStatusJoined ?? 0;
      this.othersInterestsStatusJoinedPercentage =
        data.othersInterestsStatusJoinedPercentage ?? 0;
      this.othersInterestsStatusJoinedPercentageText =
        data.othersInterestsStatusJoinedPercentageText ?? "";
      this.totalCountSysteamInterests = data.totalCountSysteamInterests ?? 0;
      this.totalCountSysteamInterestsPlaces =
        data.totalCountSysteamInterestsPlaces ?? 0;
      this.systeamInterestsPlacesPercentage =
        data.systeamInterestsPlacesPercentage ?? 0;
      this.systeamInterestsPlacesPercentageText =
        data.systeamInterestsPlacesPercentageText ?? "";
      this.totalCountSysteamInterestsEducationalCategories =
        data.totalCountSysteamInterestsEducationalCategories ?? 0;
      this.systeamInterestsEducationalCategoriesPercentage =
        data.systeamInterestsEducationalCategoriesPercentage ?? 0;
      this.systeamInterestsEducationalCategoriesPercentageText =
        data.systeamInterestsEducationalCategoriesPercentageText ?? "";
      this.totalCountSysteamInterestsServices =
        data.totalCountSysteamInterestsServices ?? 0;
      this.systeamInterestsServicesPercentage =
        data.systeamInterestsServicesPercentage ?? 0;
      this.systeamInterestsServicesPercentageText =
        data.systeamInterestsServicesPercentageText ?? "";
      this.totalCountSysteamInterestsCompetitions =
        data.totalCountSysteamInterestsCompetitions ?? 0;
      this.systeamInterestsCompetitionsPercentage =
        data.systeamInterestsCompetitionsPercentage ?? 0;
      this.systeamInterestsCompetitionsPercentageText =
        data.systeamInterestsCompetitionsPercentageText ?? "";
      this.totalCountSysteamInterestsEducationalGroups =
        data.totalCountSysteamInterestsEducationalGroups ?? 0;
      this.systeamInterestsEducationalGroupsPercentage =
        data.systeamInterestsEducationalGroupsPercentage ?? 0;
      this.systeamInterestsEducationalGroupsPercentageText =
        data.systeamInterestsEducationalGroupsPercentageText ?? "";
      this.totalCountSysteamInterestsStatusFollowUp =
        data.totalCountSysteamInterestsStatusFollowUp ?? 0;
      this.systeamInterestsStatusFollowUpPercentage =
        data.systeamInterestsStatusFollowUpPercentage ?? 0;
      this.systeamInterestsStatusFollowUpPercentageText =
        data.systeamInterestsStatusFollowUpPercentageText ?? "";
      this.totalCountSysteamInterestsStatusJoined =
        data.totalCountSysteamInterestsStatusJoined ?? 0;
      this.systeamInterestsStatusJoinedPercentage =
        data.systeamInterestsStatusJoinedPercentage ?? 0;
      this.systeamInterestsStatusJoinedPercentageText =
        data.systeamInterestsStatusJoinedPercentageText ?? "";
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
      this.lastFollowInterestToken = data.lastFollowInterestToken ?? "";
      this.lastFollowInterestInfoData = data.lastFollowInterestInfoData ?? null;
      this.lastUpdateStatisticsDateTime =
        data.lastUpdateStatisticsDateTime ?? "";
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
