import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";

export default class UserInjuriesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.userDataInclude = true;
    this.injuryTypeDataInclude = true;
    this.bodyPartDataInclude = true;
    this.userTypeToken = "";
    this.userToken = "";
    this.injuryTypeToken = "";
    this.bodyPartToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.userDataInclude = data.userDataInclude ?? true;
      this.injuryTypeDataInclude = data.injuryTypeDataInclude ?? true;
      this.bodyPartDataInclude = data.bodyPartDataInclude ?? true;
      this.userTypeToken = data.userTypeToken ?? "";
      this.userToken = data.userToken ?? "";
      this.injuryTypeToken = data.injuryTypeToken ?? "";
      this.bodyPartToken = data.bodyPartToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
