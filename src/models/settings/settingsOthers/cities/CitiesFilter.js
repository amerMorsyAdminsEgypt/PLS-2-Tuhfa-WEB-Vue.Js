import BaseEntityModelFilter from "../../../general/BaseEntityModelFilter";

export default class CitiesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.governorateToken = "";
  }
  fillData(data) {
    this.governorateToken = data.governorateToken;
  }
}
