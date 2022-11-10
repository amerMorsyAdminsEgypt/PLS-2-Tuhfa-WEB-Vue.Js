import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";

export default class UserScientificDegreesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.userDataInclude = true;
    this.classificationDegreeDataInclude = true;
    this.scientificDegreeDataInclude = true;

    this.userToken = "";
    this.scientificDegreeToken = "";
    this.classificationDegreeToken = "";
    this.userScientificDegreeToken = "";
    this.joiningDateTimeFrom = "";
    this.joiningDateTimeTo = "";
    this.obtainingDateTimeFrom = "";
    this.obtainingDateTimeTo = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.userDataInclude = data.userDataInclude ?? true;
      this.classificationDegreeDataInclude =
        data.classificationDegreeDataInclude ?? true;
      this.scientificDegreeDataInclude =
        data.scientificDegreeDataInclude ?? true;

      this.userToken = data.userToken ?? "";
      this.scientificDegreeToken = data.scientificDegreeToken ?? "";
      this.classificationDegreeToken = data.classificationDegreeToken ?? "";
      this.userScientificDegreeToken = data.userScientificDegreeToken ?? "";
      this.joiningDateTimeFrom = data.joiningDateTimeFrom ?? "";
      this.joiningDateTimeTo = data.joiningDateTimeTo ?? "";
      this.obtainingDateTimeFrom = data.obtainingDateTimeFrom ?? "";
      this.obtainingDateTimeTo = data.obtainingDateTimeTo ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
