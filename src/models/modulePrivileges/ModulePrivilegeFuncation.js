export default class ModulePrivilegeFuncation {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.moduleToken = "";
    this.funcationToken = "";
    this.funcationWithModuleToken = "";
    this.funcationNameCurrent = "";
    this.funcationNameAr = "";
    this.funcationNameEn = "";
    this.funcationNameUnd = "";
    this.funcationImagePath = "";
    this.funcationPrivilegeStatus = "";
    this.appearanceStatus = "";
  }
  fillData(data) {
    this.moduleToken = data.moduleToken;
    this.funcationToken = data.funcationToken;
    this.funcationWithModuleToken = data.funcationWithModuleToken;
    this.funcationNameCurrent = data.funcationNameCurrent;
    this.funcationNameAr = data.funcationNameAr;
    this.funcationNameEn = data.funcationNameEn;
    this.funcationNameUnd = data.funcationNameUnd;
    this.funcationImagePath = data.funcationImagePath;
    this.funcationPrivilegeStatus = data.funcationPrivilegeStatus;
    this.appearanceStatus = data.appearanceStatus;
  }
}
