import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
// import store from "./../../../store";

export default class UserFamiliesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    // this.activationTypeTokens =
    //   store.getters.generalSetting[modelName].activationTypeTokens || [];
    this.userTypeToken = "";
    this.userToken = "";
    this.nationalityCountryToken = "";
    this.relativeRelationTypeToken = "";
    this.generalJobToken = "";
    this.userFamilyToken = "";
    this.userDataInclude = true;
    this.relativeRelationTypeDataInclude = true;
    this.nationalityCountryDataInclude = true;
    this.generalJobDataInclude = true;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.userTypeToken = data.userTypeToken || "";
      this.userToken = data.userToken || "";
      this.nationalityCountryToken = data.nationalityCountryToken || "";
      this.relativeRelationTypeToken = data.relativeRelationTypeToken || "";
      this.generalJobToken = data.generalJobToken || "";
      this.userFamilyToken = data.userFamilyToken || "";
      this.userDataInclude = data.userDataInclude || true;
      this.relativeRelationTypeDataInclude =
        data.relativeRelationTypeDataInclude || true;
      this.nationalityCountryDataInclude =
        data.nationalityCountryDataInclude || true;
      this.generalJobDataInclude = data.generalJobDataInclude || true;
    } else {
      this.setInitialValue();
    }
  }
}
