import store from "@/store";
import { ACTIVATION_TYPE } from "./../../../utils/constantLists";
import { VIEW_TYPES } from "./../../../utils/constants";

export default class GeneralSettingModel {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.viewType = VIEW_TYPES.default;
    this.activationTypeTokens = [];

    if (
      store.getters.constantsListsData.listActivationType &&
      store.getters.constantsListsData.listActivationType.length
    ) {
      this.activationTypeTokens.push(
        store.getters.constantsListsData.listActivationType[0].itemToken
      );
    } else {
      this.activationTypeTokens.push(ACTIVATION_TYPE.default);
    }
  }

  fillData(data) {
    if (data) {
      this.viewType = data.viewType;
      this.activationTypeTokens = data.activationTypeTokens;
    } else {
      this.setInitialValue();
    }
  }
}
