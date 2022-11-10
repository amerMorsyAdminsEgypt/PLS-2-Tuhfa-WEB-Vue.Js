import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";

export default class JobsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.sectorToken = "";
  }
  fillData(data) {
    this.sectorToken = data.sectorToken;
  }
}
