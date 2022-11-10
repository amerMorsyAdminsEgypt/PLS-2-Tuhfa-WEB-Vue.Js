import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
import store from "./../../store";
import { getLanguage } from "./../../utils/functions";
import { LANGUAGES } from "./../../utils/constants";
import i18n from "./../../i18n";

let language = getLanguage();
export default class UsersFilter extends BaseEntityModelFilter {
  constructor(modelName) {
    super();
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName = "") {
    switch (language) {
      case LANGUAGES.arEG:
        this.itemName = `${i18n.t("code")}: {fullCode} - ${i18n.t(
          "name"
        )}: {userNameAr}`;
        break;
      case LANGUAGES.enUS:
        this.itemName = `${i18n.t("code")}: {fullCode} - ${i18n.t(
          "name"
        )}: {userNameEn}`;
        break;
    }

    try {
      this.activationTypeTokens =
        store.getters.generalSetting[modelName].activationTypeTokens;
    } catch (error) {
      this.activationTypeTokens = [];
    }
    this.userTypeToken = "";

    this.userActivityTypeToken = "";
    this.inPlaceToken = "";
    this.notInPlaceToken = "";
    this.totalCountInterestsFrom = "";
    this.userToken = "";
    this.token = "";
    this.establishmentRoleDataInclude = false;
    this.userProfileDataInclude = false;
    this.userInterestStatisticDataInclude = false;

    this.studentUserToken = "";
    this.educationalGroupToken = "";

    // report
    this.geographicalDistributionToken = "";
    this.nationalityCountryToken = "";
    this.socialStatuseToken = "";
    this.insuranceCompanyToken = "";
    this.bankToken = "";
    this.religionToken = "";
    this.parentsSocialStatusToken = "";
    this.educationalStageToken = "";
    this.specialtieToken = "";
    this.jobGradeToken = "";
    this.yearFrom = "";
    this.yearTo = "";
    this.sendTo = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.userTypeToken = data.userTypeToken || "";
      this.geographicalDistributionToken =
        data.geographicalDistributionToken ?? "";
      this.nationalityCountryToken = data.nationalityCountryToken ?? "";
      this.socialStatuseToken = data.socialStatuseToken ?? "";
      this.insuranceCompanyToken = data.insuranceCompanyToken ?? "";
      this.bankToken = data.bankToken ?? "";
      this.religionToken = data.religionToken ?? "";
      this.parentsSocialStatusToken = data.parentsSocialStatusToken ?? "";
      this.educationalStageToken = data.educationalStageToken ?? "";
      this.specialtieToken = data.specialtieToken ?? "";
      this.jobGradeToken = data.jobGradeToken ?? "";
      this.yearFrom = data.yearFrom ?? "";
      this.yearTo = data.yearTo ?? "";
      this.sendTo = data.sendTo ?? "";
      this.userActivityTypeToken = data.userActivityTypeToken || "";
      this.inPlaceToken = data.inPlaceToken || "";
      this.notInPlaceToken = data.notInPlaceToken || "";
      this.totalCountInterestsFrom = data.totalCountInterestsFrom || "";
      this.userToken = data.userToken || "";
      this.token = data.token || "";
      this.establishmentRoleDataInclude =
        data.establishmentRoleDataInclude || false;
      this.userProfileDataInclude = data.userProfileDataInclude || false;
      this.userInterestStatisticDataInclude =
        data.userInterestStatisticDataInclude || false;
      // } else {
      //   this.setInitialValue();
    }
  }
}
