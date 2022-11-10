import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class UserQualificationsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.userDataInclude = true;
    this.classificationDegreeDataInclude = true;
    this.qualificationDataInclude = true;

    this.userToken = "";
    this.qualificationToken = "";
    this.classificationDegreeToken = "";
    this.userQualificationToken = "";
    this.joiningDateTimeFrom = "";
    this.joiningDateTimeTo = "";
    this.obtainingDateTimeFrom = "";
    this.obtainingDateTimeTo = "";
    this.sendTo = "";
    this.userTypeToken = "";
    this.activationTypeTokens =
      store.getters.generalSetting.userQualifications.activationTypeTokens ??
      [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.userDataInclude = data.userDataInclude ?? true;
      this.classificationDegreeDataInclude =
        data.classificationDegreeDataInclude ?? true;
      this.qualificationDataInclude = data.qualificationDataInclude ?? true;

      this.userToken = data.userToken ?? "";
      this.qualificationToken = data.qualificationToken ?? "";
      this.classificationDegreeToken = data.classificationDegreeToken ?? "";
      this.userQualificationToken = data.userQualificationToken ?? "";
      this.joiningDateTimeFrom = data.joiningDateTimeFrom ?? "";
      this.joiningDateTimeTo = data.joiningDateTimeTo ?? "";
      this.obtainingDateTimeFrom = data.obtainingDateTimeFrom ?? "";
      this.obtainingDateTimeTo = data.obtainingDateTimeTo ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
