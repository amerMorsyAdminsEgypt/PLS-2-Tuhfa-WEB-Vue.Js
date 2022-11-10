import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class EducationalGroupsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.educationalGroups.activationTypeTokens || [];
    this.educationalPeriodToken = "";
    this.employeeUserToken = "";
    this.educationalGroupToken = "";
    this.educationalGroupStartDateTimeFrom = "";
    this.educationalGroupStartDateTimeTo = "";
    this.educationalGroupEndDateTimeFrom = "";
    this.educationalGroupEndDateTimeTo = "";
    this.educationalCategoryToken = "";
    this.educationalCategoryInfoDataInclude = false;
    this.educationalPeriodDataInclude = false;
    this.educationalGroupWeekDayDataInclude = false;
    this.educationalGroupTerminationTypeToken = "";
    this.educationalGroupClosedStateTypeToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.educationalPeriodToken = data.educationalPeriodToken || "";
      this.employeeUserToken = data.employeeUserToken || "";
      this.educationalGroupToken = data.educationalGroupToken || "";
      this.educationalGroupStartDateTimeFrom =
        data.educationalGroupStartDateTimeFrom || "";
      this.educationalGroupStartDateTimeTo =
        data.educationalGroupStartDateTimeTo || "";
      this.educationalGroupEndDateTimeFrom =
        data.educationalGroupEndDateTimeFrom || "";
      this.educationalGroupEndDateTimeTo =
        data.educationalGroupEndDateTimeTo || "";
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.educationalCategoryInfoDataInclude =
        data.educationalCategoryInfoDataInclude || false;
      this.educationalPeriodDataInclude =
        data.educationalPeriodDataInclude || false;
      this.educationalGroupWeekDayDataInclude =
        data.educationalGroupWeekDayDataInclude || false;
      this.educationalGroupTerminationTypeToken =
        data.educationalGroupTerminationTypeToken || "";
      this.educationalGroupClosedStateTypeToken =
        data.educationalGroupClosedStateTypeToken || "";
    } else {
      this.setInitialValue();
    }
  }
}
