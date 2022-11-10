import BaseEntityModel from "./../../general/BaseEntityModel";
import Establishment from "./Establishment";
import defaultImg from "@/assets/images/establishment-role.svg";

export default class EstablishmentRole extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue(userTypeToken = "") {
    this.mediaFile = "";
    this.establishmentRoleToken = "";
    this.authenticationLoginTypeToken = "";
    this.codeInLoginTypeToken = "";
    this.establishmentRoleNameCurrent = "";
    this.establishmentRoleNameEn = "";
    this.establishmentRoleNameAr = "";
    this.establishmentRoleNameUnd = "";
    this.establishmentRoleDescriptionCurrent = "";
    this.establishmentRoleDescriptionAr = "";
    this.establishmentRoleDescriptionEn = "";
    this.establishmentRoleDescriptionUnd = "";
    this.establishmentRoleImagePath = "";
    this.establishmentRoleNotes = "";
    this.userTypeToken = userTypeToken ?? "";
    this.activationTypeToken = "";
    this.userTypeNameCurrent = "";
    this.userTypeNameAr = "";
    this.userTypeNameEn = "";
    this.userTypeNameUnd = "";
    this.establishmentRoleDefaultStatus = false;
    this.establishmentRoleArchiveStatus = false;
    this.establishmentToken = "";
    this.establishmentData = new Establishment();
    this.modulePrivilegeData = [];
  }
  fillData(data) {
    if (data) {
      this.mediaFile = "";
      this.establishmentRoleToken = data.establishmentRoleToken || "";
      this.authenticationLoginTypeToken =
        data.authenticationLoginTypeToken || "";
      this.codeInLoginTypeToken = data.codeInLoginTypeToken || "";
      this.establishmentRoleNameCurrent =
        data.establishmentRoleNameCurrent || "";
      this.establishmentRoleNameEn = data.establishmentRoleNameEn || "";
      this.establishmentRoleNameAr = data.establishmentRoleNameAr || "";
      this.establishmentRoleNameUnd = data.establishmentRoleNameUnd || "";
      this.establishmentRoleDescriptionCurrent =
        data.establishmentRoleDescriptionCurrent || "";
      this.establishmentRoleDescriptionAr =
        data.establishmentRoleDescriptionAr || "";
      this.establishmentRoleDescriptionEn =
        data.establishmentRoleDescriptionEn || "";
      this.establishmentRoleDescriptionUnd =
        data.establishmentRoleDescriptionUnd || "";
      this.establishmentRoleImagePath = data.establishmentRoleImagePath || "";
      this.establishmentRoleNotes = data.establishmentRoleNotes || "";
      this.userTypeToken = data.userTypeToken || "";
      this.activationTypeToken = data.activationTypeToken ?? "";
      this.userTypeNameCurrent = data.userTypeNameCurrent || "";
      this.userTypeNameAr = data.userTypeNameAr || "";
      this.userTypeNameEn = data.userTypeNameEn || "";
      this.userTypeNameUnd = data.userTypeNameUnd || "";
      this.establishmentRoleDefaultStatus =
        data.establishmentRoleDefaultStatus || "";
      this.establishmentRoleArchiveStatus =
        data.establishmentRoleArchiveStatus || "";
      this.establishmentToken = data.establishmentToken || "";
      this.establishmentData.fillData(data.establishmentData);
      this.modulePrivilegeData = data.modulePrivilegeData || [];
    } else {
      this.setInitialValue();
    }
  }
}
