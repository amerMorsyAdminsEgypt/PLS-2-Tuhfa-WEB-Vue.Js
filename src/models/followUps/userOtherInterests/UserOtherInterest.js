import BaseEntityModel from "./../../general/BaseEntityModel";
import UserInterestFollowUpStatsticData from "./../followInterests/UserInterestFollowUpStatsticData";
import defaultImg from "@/assets/images/UserSysteamOtherInterests.svg";

export default class UserOtherInterest extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.userOtherInterestToken = "";
    this.userToken = "";
    this.otherInterestNameCurrent = "";
    this.otherInterestNameAr = "";
    this.otherInterestNameEn = "";
    this.otherInterestNameUnd = "";
    this.otherInterestDescriptionCurrent = "";
    this.otherInterestDescriptionAr = "";
    this.otherInterestDescriptionEn = "";
    this.otherInterestDescriptionUnd = "";
    this.interestTypeToken = "";
    this.interestTypeNameCurrent = "";
    this.interestStatusToken = "";
    this.interestStatusNameCurrent = "";
    this.otherInterestNotes = "";
    this.otherInterestDateTimeFrom = null;
    this.otherInterestDateTimeFromCustomized = "";
    this.otherInterestDateFrom = "";
    this.otherInterestTimeFrom = "";
    this.otherInterestDateTimeTo = null;
    this.otherInterestDateTimeToCustomized = "";
    this.otherInterestDateTo = "";
    this.otherInterestTimeTo = "";
    this.userOtherInterestFollowUpStatsticData =
      new UserInterestFollowUpStatsticData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.userOtherInterestToken = data.userOtherInterestToken ?? "";
      this.userToken = data.userToken ?? "";
      this.otherInterestNameCurrent = data.otherInterestNameCurrent ?? "";
      this.otherInterestNameAr = data.otherInterestNameAr ?? "";
      this.otherInterestNameEn = data.otherInterestNameEn ?? "";
      this.otherInterestNameUnd = data.otherInterestNameUnd ?? "";
      this.otherInterestDescriptionCurrent =
        data.otherInterestDescriptionCurrent ?? "";
      this.otherInterestDescriptionAr = data.otherInterestDescriptionAr ?? "";
      this.otherInterestDescriptionEn = data.otherInterestDescriptionEn ?? "";
      this.otherInterestDescriptionUnd = data.otherInterestDescriptionUnd ?? "";
      this.interestTypeToken = data.interestTypeToken ?? "";
      this.interestTypeNameCurrent = data.interestTypeNameCurrent ?? "";
      this.interestStatusToken = data.interestStatusToken ?? "";
      this.interestStatusNameCurrent = data.interestStatusNameCurrent ?? "";
      this.otherInterestNotes = data.otherInterestNotes ?? "";
      this.otherInterestDateTimeFrom = data.otherInterestDateTimeFrom ?? null;
      this.otherInterestDateTimeFromCustomized =
        data.otherInterestDateTimeFromCustomized ?? "";
      this.otherInterestDateFrom = data.otherInterestDateFrom ?? "";
      this.otherInterestTimeFrom = data.otherInterestTimeFrom ?? "";
      this.otherInterestDateTimeTo = data.otherInterestDateTimeTo ?? null;
      this.otherInterestDateTimeToCustomized =
        data.otherInterestDateTimeToCustomized ?? "";
      this.otherInterestDateTo = data.otherInterestDateTo ?? "";
      this.otherInterestTimeTo = data.otherInterestTimeTo ?? "";
      this.userOtherInterestFollowUpStatsticData.fillData(
        data.userOtherInterestFollowUpStatsticData
      );
    } else {
      this.setInitialValue();
    }
  }
}
