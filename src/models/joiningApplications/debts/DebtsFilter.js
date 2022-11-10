import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";
import { getLanguage } from "./../../../utils/functions";
import { LANGUAGES } from "./../../../utils/constants";
import i18n from "./../../../i18n";

export default class DebtsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.language = getLanguage();
    switch (this.language) {
      case LANGUAGES.arEG:
        this.itemName = `{debtTitleAr} - ${i18n.t("type")}({debtTypeNameAr})`;
        break;
      case LANGUAGES.enUS:
        this.itemName = `{debtTitleEn} - ${i18n.t("type")}({debtTypeNameEn})`;
        break;
    }

    this.userInfoDataInclude = true;
    this.educationalJoiningApplicationInfoDataInclude = true;

    this.userToken = "";
    this.educationalJoiningApplicationToken = "";
    this.schedulingStatusTypeToken = "";
    this.debtTypeToken = "";
    this.debtMoneyFrom = "";
    this.debtMoneyTo = "";
    this.paidMoneyFrom = "";
    this.paidMoneyTo = "";
    this.remainderMoneyFrom = "";
    this.remainderMoneyTo = "";
    this.finishPercentageFrom = "";
    this.finishPercentageTo = "";

    this.activationTypeTokens =
      store.getters.generalSetting.debts.activationTypeTokens ?? [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
