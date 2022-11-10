import GeneralModel from "./../../general/GeneralModel";
import UserLoginCode from "./UserLoginCode";
import UserLoginCodesFilter from "./UserLoginCodesFilter";

export default class UserLoginCodes extends GeneralModel {
  constructor(modelName) {
    super();
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName) {
    this.setGeneralModelInitialValue();
    this.userLoginCodesData = [];
    this.userLoginCode = new UserLoginCode();
    this.filterData = new UserLoginCodesFilter(modelName);
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.userLoginCodesData = data.userLoginCodesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
