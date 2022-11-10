import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class InstallmentsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();

    this.debtUserInfoDataInclude = true;
    this.cancelUserInfoDataInclude = true;
    this.installmentScheduleTimesInfoDataInclude = true;
    this.installmentDebtsDataInclude = true;

    this.cancelUserToken = "";
    this.debtUserToken = "";
    this.totalScheduleInstallmentMoneyFrom = "";
    this.totalScheduleInstallmentMoneyTo = "";
    this.totalScheduleIPaidMoneyFrom = "";
    this.totalScheduleIPaidMoneyTo = "";
    this.totalScheduleRemainderMoneyFrom = "";
    this.totalScheduleRemainderMoneyTo = "";
    this.totalScheduleFinishPercentageFrom = "";
    this.totalScheduleFinishPercentageTo = "";

    // repots filter
    this.installmentBatchTypeToken = "";
    this.sendTo = "";
    this.dateTimeStartSearch = "";
    this.dateTimeEndSearch = "";

    this.activationTypeTokens =
      store.getters.generalSetting.installments.activationTypeTokens ?? [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
