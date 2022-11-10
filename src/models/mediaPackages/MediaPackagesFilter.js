import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
import store from "./../../store";

export default class MediaPackagesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();

    this.activationTypeTokens =
      store.getters.generalSetting.mediaPackages.activationTypeTokens || [];

    this.accountInfoDataInclude = true;
    this.educationalCategoryInfoDataInclude = true;
    this.mediaPackageMediaDataInclude = false;
    this.mediaPackageShowStatusTypeToken = "";
    this.educationalCategoryToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);

      this.accountInfoDataInclude = data.accountInfoDataInclude ?? false;
      this.mediaPackageMediaDataInclude =
        data.mediaPackageMediaDataInclude ?? false;
      this.mediaPackageShowStatusTypeToken =
        data.mediaPackageShowStatusTypeToken ?? "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
