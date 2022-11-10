import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";

export default class DistrictsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.cityToken = "";
  }
  fillData(data) {
    this.cityToken = data.cityToken;
  }
}
