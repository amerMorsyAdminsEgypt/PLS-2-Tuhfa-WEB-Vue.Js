import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
import store from "./../../store";

export default class PlaceUsersFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();

    this.placeToken = "";
    this.userToken = "";
    this.userTypeToken = "";
    this.placeTypeToken = "";

    this.placeInfoDataInclude = true;
    this.userInfoDataInclude = true;

    this.activationTypeTokens =
      store.getters.generalSetting.placeUsers.activationTypeTokens || [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
