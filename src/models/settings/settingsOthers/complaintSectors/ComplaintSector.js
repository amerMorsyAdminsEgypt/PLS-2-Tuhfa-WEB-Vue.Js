import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/complaintSectors.svg";

export default class ComplaintSector extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.mediaFile = "";
    this.complaintSectorToken = "";
    this.complaintSectorNameCurrent = "";
    this.complaintSectorNameAr = "";
    this.complaintSectorNameEn = "";
    this.complaintSectorNameUnd = "";
    this.complaintSectorDescriptionCurrent = "";
    this.complaintSectorDescriptionAr = "";
    this.complaintSectorDescriptionEn = "";
    this.complaintSectorDescriptionUnd = "";
    this.complaintSectorNotes = "";
    this.complaintSectorImageIsDefault = false;
    this.complaintSectorImagePath = "";
    this.complaintSectorImageSizeBytes = 0;
    this.complaintSectorImageSizeTextCurrent = "";
    this.complaintScopeTypeTokens = [];
    this.complaintSectorsScopesData = [];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.complaintSectorToken = data.complaintSectorToken || "";
      this.complaintSectorNameCurrent = data.complaintSectorNameCurrent || "";
      this.complaintSectorNameAr = data.complaintSectorNameAr || "";
      this.complaintSectorNameEn = data.complaintSectorNameEn || "";
      this.complaintSectorNameUnd = data.complaintSectorNameUnd || "";
      this.complaintSectorDescriptionCurrent =
        data.complaintSectorDescriptionCurrent || "";
      this.complaintSectorDescriptionAr =
        data.complaintSectorDescriptionAr || "";
      this.complaintSectorDescriptionEn =
        data.complaintSectorDescriptionEn || "";
      this.complaintSectorDescriptionUnd =
        data.complaintSectorDescriptionUnd || "";
      this.complaintSectorNotes = data.complaintSectorNotes || "";
      this.complaintSectorImageIsDefault =
        data.complaintSectorImageIsDefault || "";
      this.complaintSectorImagePath = data.complaintSectorImagePath || "";
      this.complaintSectorImageSizeBytes =
        data.complaintSectorImageSizeBytes || "";
      this.complaintSectorImageSizeTextCurrent =
        data.complaintSectorImageSizeTextCurrent || "";
      this.complaintSectorsScopesData = data.complaintSectorsScopesData || [];
      // set lists
      this.complaintScopeTypeTokens = data.complaintSectorsScopesData
        .filter((x) => x)
        .map((x) => x.complaintScopeTypeToken);
    } else {
      this.setInitialValue();
    }
  }
}
