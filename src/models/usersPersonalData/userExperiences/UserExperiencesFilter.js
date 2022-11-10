import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";

export default class UserExperiencesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    // this.userDataInclude = true;
    this.generalJobDataInclude = true;

    this.userToken = "";
    this.generalJobToken = "";
    this.userExperienceToken = "";
    this.startDateTimeFrom = "";
    this.startDateTimeTo = "";
    this.endDateTimeFrom = "";
    this.endDateTimeTo = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      // this.userDataInclude = data.userDataInclude ?? true;
      this.generalJobDataInclude = data.generalJobDataInclude ?? true;
      this.userToken = data.userToken ?? "";
      this.generalJobToken = data.generalJobToken ?? "";
      this.userExperienceToken = data.userExperienceToken ?? "";
      this.startDateTimeFrom = data.startDateTimeFrom ?? "";
      this.startDateTimeTo = data.startDateTimeTo ?? "";
      this.endDateTimeFrom = data.endDateTimeFrom ?? "";
      this.endDateTimeTo = data.endDateTimeTo ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
