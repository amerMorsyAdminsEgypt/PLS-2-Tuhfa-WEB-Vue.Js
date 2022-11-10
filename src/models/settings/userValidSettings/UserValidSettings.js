import GeneralModel from "./../../general/GeneralModel";
import UserValidSetting from "./UserValidSetting";
import UserValidSettingsFilter from "./UserValidSettingsFilter";

export default class UserValidSettings extends GeneralModel {
  constructor(modelName) {
    super();
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName) {
    this.setGeneralModelInitialValue();
    this.userValidSettingsData = [];
    this.userValidSetting = new UserValidSetting();
    this.filterData = new UserValidSettingsFilter(modelName);
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.userValidSettingsData = data.userValidSettingsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
