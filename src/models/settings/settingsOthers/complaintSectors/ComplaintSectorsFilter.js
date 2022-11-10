import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";
import store from "./../../../../store";

export default class ComplaintSectorsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.complaintScopeTypeToken = "";
    this.complaintSectorsScopesDataInclude = true;
    this.activationTypeTokens =
      store.getters.generalSetting.complaintSectors.activationTypeTokens || [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.complaintScopeTypeToken = data.complaintScopeTypeToken || "";
    } else {
      this.setInitialValue();
    }
  }
}
