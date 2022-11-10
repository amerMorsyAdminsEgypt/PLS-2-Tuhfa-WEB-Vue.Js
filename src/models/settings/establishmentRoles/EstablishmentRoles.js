import EstablishmentRole from "./EstablishmentRole";
import EstablishmentRolesFilter from "./EstablishmentRolesFilter";
import GeneralModel from "./../../general/GeneralModel";

export default class EstablishmentRoles extends GeneralModel {
  constructor(modelName) {
    super();
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName) {
    this.setGeneralModelInitialValue();
    this.establishmentRolesData = [];
    this.establishmentRole = new EstablishmentRole();
    this.filterData = new EstablishmentRolesFilter(modelName);
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.establishmentRolesData = data.establishmentRolesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
