import BaseEntityModel from "./../../general/BaseEntityModel";
import UserInterestFollowUpStatsticData from "./../followInterests/UserInterestFollowUpStatsticData";
import defaultImg from "@/assets/images/UserSysteamOtherInterests.svg";

export default class UserSysteamInterest extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.userSysteamInterestToken = "";
    this.interestTypeToken = "";
    this.interestTypeNameCurrent = "";
    this.interestStatusToken = "";
    this.interestStatusNameCurrent = "";
    this.systeamInterestDescriptionCurrent = "";
    this.systeamInterestDescriptionAr = "";
    this.systeamInterestDescriptionEn = "";
    this.systeamInterestDescriptionUnd = "";
    this.systeamInterestNotes = "";
    this.systeamInterestDateTimeFrom = "";
    this.systeamInterestDateTimeFromCustomized = "";
    this.systeamInterestDateFrom = "";
    this.systeamInterestTimeFrom = "";
    this.systeamInterestDateTimeTo = "";
    this.systeamInterestDateTimeToCustomized = "";
    this.systeamInterestDateTo = "";
    this.systeamInterestTimeTo = "";
    this.userSysteamInterestFollowUpStatsticData =
      new UserInterestFollowUpStatsticData();
    this.placeToken = null;
    this.placeInfoData = null;
    this.educationalCategoryToken = null;
    this.educationalCategoryInfoData = null;
    this.serviceToken = null;
    this.serviceInfoData = null;
    this.competitionToken = null;
    this.competitionInfoData = null;
    this.educationalGroupToken = null;
    this.educationalGroupInfoData = null;
    this.priorityTypeToken = null;
    this.priorityTypeInfoData = null;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.userSysteamInterestToken = data.userSysteamInterestToken ?? "";
      this.interestTypeToken = data.interestTypeToken ?? "";
      this.interestTypeNameCurrent = data.interestTypeNameCurrent ?? "";
      this.interestStatusToken = data.interestStatusToken ?? "";
      this.interestStatusNameCurrent = data.interestStatusNameCurrent ?? "";
      this.systeamInterestDescriptionCurrent =
        data.systeamInterestDescriptionCurrent ?? "";
      this.systeamInterestDescriptionAr =
        data.systeamInterestDescriptionAr ?? "";
      this.systeamInterestDescriptionEn =
        data.systeamInterestDescriptionEn ?? "";
      this.systeamInterestDescriptionUnd =
        data.systeamInterestDescriptionUnd ?? "";
      this.systeamInterestNotes = data.systeamInterestNotes ?? "";
      this.systeamInterestDateTimeFrom = data.systeamInterestDateTimeFrom ?? "";
      this.systeamInterestDateTimeFromCustomized =
        data.systeamInterestDateTimeFromCustomized ?? "";
      this.systeamInterestDateFrom = data.systeamInterestDateFrom ?? "";
      this.systeamInterestTimeFrom = data.systeamInterestTimeFrom ?? "";
      this.systeamInterestDateTimeTo = data.systeamInterestDateTimeTo ?? "";
      this.systeamInterestDateTimeToCustomized =
        data.systeamInterestDateTimeToCustomized ?? "";
      this.systeamInterestDateTo = data.systeamInterestDateTo ?? "";
      this.systeamInterestTimeTo = data.systeamInterestTimeTo ?? "";
      this.userSysteamInterestFollowUpStatsticData.fillData(
        data.userSysteamInterestFollowUpStatsticData
      );
      this.placeToken = data.placeToken ?? null;
      this.placeInfoData = data.placeInfoData ?? null;
      this.educationalCategoryToken = data.educationalCategoryToken ?? null;
      this.educationalCategoryInfoData =
        data.educationalCategoryInfoData ?? null;
      this.serviceToken = data.serviceToken ?? null;
      this.serviceInfoData = data.serviceInfoData ?? null;
      this.competitionToken = data.competitionToken ?? null;
      this.competitionInfoData = data.competitionInfoData ?? null;
      this.educationalGroupToken = data.educationalGroupToken ?? null;
      this.educationalGroupInfoData = data.educationalGroupInfoData ?? null;
      this.priorityTypeToken = data.priorityTypeToken ?? null;
      this.priorityTypeInfoData = data.priorityTypeInfoData ?? null;
    } else {
      this.setInitialValue();
    }
  }
}
