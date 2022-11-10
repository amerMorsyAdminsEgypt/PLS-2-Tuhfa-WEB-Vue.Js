import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";

export default class GovernoratesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.countryToken = "";
  }
  fillData(data) {
    this.countryToken = data.countryToken;
  }
}
