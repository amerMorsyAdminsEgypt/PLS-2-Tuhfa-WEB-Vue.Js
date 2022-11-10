import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";

export default class UserPersonalCardsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    // this.userDataInclude = true;
    this.personalCardTypeDataInclude = true;

    this.userToken = "";
    this.personalCardTypeToken = "";
    this.cardCreationDateTimeFrom = "";
    this.cardCreationDateTimeTo = "";
    this.cardExpirationDateTimeFrom = "";
    this.cardExpirationDateTimeTo = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      // this.userDataInclude = data.userDataInclude ?? true;
      this.personalCardTypeDataInclude =
        data.personalCardTypeDataInclude ?? true;
      this.userToken = data.userToken ?? "";
      this.personalCardTypeToken = data.personalCardTypeToken ?? "";
      this.cardCreationDateTimeFrom = data.cardCreationDateTimeFrom ?? "";
      this.cardCreationDateTimeTo = data.cardCreationDateTimeTo ?? "";
      this.cardExpirationDateTimeFrom = data.cardExpirationDateTimeFrom ?? "";
      this.cardExpirationDateTimeTo = data.cardExpirationDateTimeTo ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
