import GeneralDelete from "./../../general/GeneralDelete";

export default class UserValidSettingDelete extends GeneralDelete {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.userTypeToken = "";
  }
  fillData(data) {
    this.fillGeneralDeleteData(data);
    this.userTypeToken = data.userTypeToken || "";
  }
}
