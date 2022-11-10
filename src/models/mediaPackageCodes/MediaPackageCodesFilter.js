import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
// import store from "./../../store";

export default class MediaPackageCodesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.joinInEducationalCategoryInfoDataInclude = true;
    this.joinInEducationalGroupInfoDataInclude = true;
    this.mediaPackageInfoDataInclude = true;
    this.userStudentInfoDataInclude = true;
    this.mediaPackageCodeUsedTypeToken = "";
    this.mediaPackageCodeToken = "";
    this.educationalCategoryToken = "";
    this.userStudentToken = "";
    this.mediaPackageToken = "";
    this.joinInEducationalCategoryToken = "";
    this.joinInEducationalGroupToken = "";
    this.sendTo = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.joinInEducationalCategoryInfoDataInclude =
        data.joinInEducationalCategoryInfoDataInclude ?? true;
      this.joinInEducationalGroupInfoDataInclude =
        data.joinInEducationalGroupInfoDataInclude ?? true;
      this.mediaPackageInfoDataInclude =
        data.mediaPackageInfoDataInclude ?? true;
      this.userStudentInfoDataInclude = data.userStudentInfoDataInclude ?? true;
      this.mediaPackageCodeUsedTypeToken =
        data.mediaPackageCodeUsedTypeToken ?? "";
      this.mediaPackageCodeToken = data.mediaPackageCodeToken ?? "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.userStudentToken = data.userStudentToken ?? "";
      this.mediaPackageToken = data.mediaPackageToken ?? "";
      this.joinInEducationalCategoryToken =
        data.joinInEducationalCategoryToken ?? "";
      this.joinInEducationalGroupToken = data.joinInEducationalGroupToken ?? "";
      this.sendTo = data.sendTo ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
