import { getPlacesDialog } from "./../../../utils/dialogsOfApi";

export default class SysteamInterestData {
  constructor(data = "") {
    if (data) this.fillData(data);
    else this.setInitialValue();
  }
  setInitialValue() {
    this.userSysteamInterestToken = "";
    this.userToken = "";
    this.interestTypeToken = "";
    this.interestTypeNameCurrent = "";
    this.interestStatusToken = "";
    this.interestStatusNameCurrent = "";
    this.systeamInterestDescriptionAr = "";
    this.systeamInterestDescriptionEn = "";
    this.systeamInterestDescriptionUnd = "";
    this.systeamInterestNotes = "";
    this.systeamInterestDateTimeFrom = "";
    this.systeamInterestDateTimeTo = "";
    this.priorityTypeToken = "";
    this.placeToken = "";
    this.educationalCategoryToken = "";
    this.serviceToken = "";
    this.competitionToken = "";
    this.educationalGroupToken = "";

    this.placeInfoData = null;
    this.educationalCategoryInfoData = null;
    this.serviceInfoData = null;
    this.competitionInfoData = null;
    this.educationalGroupInfoData = null;
    this.priorityTypeInfoData = null;

    this.placeTypeToken = "";
    this.placeTokenOptions = [];
    this.educationalCategorySystemComponentHierarchyToken = "";
    this.educationalCategorySystemComponentToken = "";
  }
  async fillData(data) {
    if (data) {
      this.userSysteamInterestToken = data.userSysteamInterestToken ?? "";
      this.userToken = data.userToken ?? "";
      this.interestTypeToken = data.interestTypeToken ?? "";
      this.interestTypeNameCurrent = data.interestTypeNameCurrent ?? "";
      this.interestStatusToken = data.interestStatusToken ?? "";
      this.interestStatusNameCurrent = data.interestStatusNameCurrent ?? "";
      this.systeamInterestDescriptionAr =
        data.systeamInterestDescriptionAr ?? "";
      this.systeamInterestDescriptionEn =
        data.systeamInterestDescriptionEn ?? "";
      this.systeamInterestDescriptionUnd =
        data.systeamInterestDescriptionUnd ?? "";
      this.systeamInterestNotes = data.systeamInterestNotes ?? "";
      this.systeamInterestDateTimeFrom = data.systeamInterestDateTimeFrom ?? "";
      this.systeamInterestDateTimeTo = data.systeamInterestDateTimeTo ?? "";
      this.priorityTypeToken = data.priorityTypeToken ?? "";
      this.placeToken = data.placeToken ?? "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.serviceToken = data.serviceToken ?? "";
      this.competitionToken = data.competitionToken ?? "";
      this.educationalGroupToken = data.educationalGroupToken ?? "";

      this.placeInfoData = data.placeInfoData ?? null;
      this.educationalCategoryInfoData =
        data.educationalCategoryInfoData ?? null;
      this.serviceInfoData = data.serviceInfoData ?? null;
      this.competitionInfoData = data.competitionInfoData ?? null;
      this.educationalGroupInfoData = data.educationalGroupInfoData ?? null;
      this.priorityTypeInfoData = data.priorityTypeInfoData ?? null;

      this.placeTypeToken = data.placeTypeToken ?? "";
      this.educationalCategorySystemComponentHierarchyToken =
        data.educationalCategorySystemComponentHierarchyToken ?? "";
      this.educationalCategorySystemComponentToken =
        data.educationalCategorySystemComponentToken ?? "";

      this.placeTokenOptions = [];
      if (data.placeTypeToken)
        this.placeTokenOptions = await getPlacesDialog({
          placeTypeToken: data.placeTypeToken,
        });
    } else {
      this.setInitialValue();
    }
  }
}
