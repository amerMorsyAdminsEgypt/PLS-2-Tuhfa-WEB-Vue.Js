import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";
import { getLanguage } from "./../../../utils/functions";
import { LANGUAGES } from "./../../../utils/constants";
// import i18n from "./../../../i18n";

export default class EducationalPeriodsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.language = getLanguage();
    switch (this.language) {
      case LANGUAGES.arEG:
        this.itemName = `{educationalPeriodNameAr} - ({educationalPeriodStartDate} : {educationalPeriodEndDate})`;
        break;
      case LANGUAGES.enUS:
        this.itemName = `{educationalPeriodNameEn} - ({educationalPeriodStartDate} : {educationalPeriodEndDate})`;
        break;
    }
    this.closedStateTypeToken = "";
    this.activationTypeTokens =
      store.getters.generalSetting.educationalPeriods.activationTypeTokens ??
      [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
