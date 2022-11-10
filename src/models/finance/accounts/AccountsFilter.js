import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";
import { getLanguage } from "./../../../utils/functions";
import { LANGUAGES } from "./../../../utils/constants";
import i18n from "./../../../i18n";

export default class AccountsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.language = getLanguage();
    switch (this.language) {
      case LANGUAGES.arEG:
        this.itemName = `{accountNameAr} - ${i18n.t(
          "Accounts.balance"
        )}({accountMoneyBalanceWithCurrency})`;
        break;
      case LANGUAGES.enUS:
        this.itemName = `{accountNameEn} - ${i18n.t(
          "Accounts.balance"
        )}({accountMoneyBalanceWithCurrency})`;
        break;
    }
    this.accountMoneyBalanceFrom = "";
    this.accountMoneyBalanceTo = "";
    this.activationTypeTokens =
      store.getters.generalSetting.accounts.activationTypeTokens ?? [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
