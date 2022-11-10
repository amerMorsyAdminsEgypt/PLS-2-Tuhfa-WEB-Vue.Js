import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";
import { getLanguage } from "./../../../utils/functions";
import { LANGUAGES } from "./../../../utils/constants";
import i18n from "./../../../i18n";

export default class EducationalJoiningApplicationsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.language = getLanguage();
    switch (this.language) {
      case LANGUAGES.arEG:
        this.itemName = `${i18n.t("code")}: {fullCode} - ${i18n.t(
          "name"
        )}:  {educationalJoiningApplicationNameAr} - ${i18n.t(
          "actionsData.dateTime"
        )}: {joiningData} - {joiningTime}`;
        break;
      case LANGUAGES.enUS:
        this.itemName = `${i18n.t("code")}: {fullCode} - ${i18n.t(
          "name"
        )}:  {educationalJoiningApplicationNameEn} - ${i18n.t(
          "actionsData.dateTime"
        )}: {joiningData} - {joiningTime}`;
        break;
    }
    this.token = "";
    this.sendTo = "";
    this.activationTypeTokens =
      store.getters.generalSetting.educationalCategories.activationTypeTokens ||
      [];
    this.approvalTypeToken = "";
    this.educationalJoiningApplicationToken = "";
    this.educationalPeriodToken = "";
    this.educationalCategoryToken = "";
    this.userStudentToken = "";
    this.priceListToken = "";
    this.joiningDateTimeFrom = "";
    this.joiningDateTimeTo = "";
    this.approvalDataTimeFrom = "";
    this.approvalDataTimeTo = "";
    this.approvalUserInfoDataInclude = false;
    this.educationalCategoryInfoDataInclude = false;
    this.educationalPeriodInfoDataInclude = false;
    this.userStudentInfoDataInclude = false;
    this.priceListInfoDataInclude = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.approvalTypeToken = data.approvalTypeToken || "";
      this.educationalJoiningApplicationToken =
        data.educationalJoiningApplicationToken || "";
      this.educationalPeriodToken = data.educationalPeriodToken || "";
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.userStudentToken = data.userStudentToken || "";
      this.priceListToken = data.priceListToken || "";
      this.joiningDateTimeFrom = data.joiningDateTimeFrom || "";
      this.joiningDateTimeTo = data.joiningDateTimeTo || "";
      this.approvalDataTimeFrom = data.approvalDataTimeFrom || "";
      this.approvalDataTimeTo = data.approvalDataTimeTo || "";
      this.approvalUserInfoDataInclude =
        data.approvalUserInfoDataInclude || false;
      this.educationalCategoryInfoDataInclude =
        data.educationalCategoryInfoDataInclude || false;
      this.educationalPeriodInfoDataInclude =
        data.educationalPeriodInfoDataInclude || false;
      this.userStudentInfoDataInclude =
        data.userStudentInfoDataInclude || false;
      this.priceListInfoDataInclude = data.priceListInfoDataInclude || false;
    } else {
      this.setInitialValue();
    }
  }
}
