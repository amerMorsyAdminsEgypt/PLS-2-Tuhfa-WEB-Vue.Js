import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
import store from "./../../store";

export default class SharedMediasFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.sharedMedias.activationTypeTokens || [];

    this.sharedMediaFolderInfoInclude = true;
    this.sharedMediaToken = "";
    this.sharedMediaFolderToken = "";
    this.sharedMediaFolderTypeToken = "";
    this.sharedMediaFileTypeToken = "";
    this.mainModuleToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);

      this.sharedMediaFolderInfoInclude =
        data.sharedMediaFolderInfoInclude ?? true;
      this.sharedMediaToken = data.sharedMediaToken ?? "";
      this.sharedMediaFolderToken = data.sharedMediaFolderToken ?? "";
      this.sharedMediaFolderTypeToken = data.sharedMediaFolderTypeToken ?? "";
      this.sharedMediaFileTypeToken = data.sharedMediaFileTypeToken ?? "";
      this.mainModuleToken = data.mainModuleToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
