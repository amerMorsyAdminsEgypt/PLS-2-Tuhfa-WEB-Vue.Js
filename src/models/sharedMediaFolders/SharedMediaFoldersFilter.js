import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
import store from "./../../store";

export default class SharedMediaFoldersFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.sharedMediaFolders.activationTypeTokens ||
      [];
    this.sharedMediaFolderParentInfoDataInclude = true;
    this.mainModuleInfoDataInclude = true;
    this.sharedMediaFolderToken = "";
    this.parentSharedMediaFolderToken = "";
    this.mainModuleToken = "";
    this.sharedMediaFolderTypeToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.sharedMediaFolderParentInfoDataInclude =
        data.sharedMediaFolderParentInfoDataInclude ?? true;
      this.mainModuleInfoDataInclude = data.mainModuleInfoDataInclude ?? true;
      this.sharedMediaFolderToken = data.sharedMediaFolderToken ?? "";
      this.parentSharedMediaFolderToken =
        data.parentSharedMediaFolderToken ?? "";
      this.mainModuleToken = data.mainModuleToken ?? "";
      this.sharedMediaFolderTypeToken = data.sharedMediaFolderTypeToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
