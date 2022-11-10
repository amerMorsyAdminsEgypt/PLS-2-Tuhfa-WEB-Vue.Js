import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";

export default class UserOperationsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.userDataInclude = false;
    this.operationTypeDataInclude = false;
    this.bodyPartDataInclude = false;
    this.userTypeToken = "";
    this.userToken = "";
    this.operationTypeToken = "";
    this.bodyPartToken = "";
    this.operationDateTimeFrom = "";
    this.operationDateTimeTo = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.userDataInclude = data.userDataInclude ?? true;
      this.operationTypeDataInclude = data.operationTypeDataInclude ?? true;
      this.bodyPartDataInclude = data.bodyPartDataInclude ?? true;
      this.userTypeToken = data.userTypeToken ?? "";
      this.userToken = data.userToken ?? "";
      this.operationTypeToken = data.operationTypeToken ?? "";
      this.bodyPartToken = data.bodyPartToken ?? "";
      this.operationDateTimeFrom = data.operationDateTimeFrom ?? "";
      this.operationDateTimeTo = data.operationDateTimeTo ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
