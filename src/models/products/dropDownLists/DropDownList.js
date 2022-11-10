import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/DropDownLists.svg";

export default class DropDownList extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.dropDownListToken = "";
    this.dropDownListNameCurrent = "";
    this.dropDownListNameAr = "";
    this.dropDownListNameEn = "";
    this.dropDownListNameUnd = "";
    this.dropDownListDescriptionCurrent = "";
    this.dropDownListDescriptionAr = "";
    this.dropDownListDescriptionEn = "";
    this.dropDownListDescriptionUnd = "";
    this.dropDownListNotes = "";
    this.dropDownListImageIsDefault = false;
    this.dropDownListImagePath = "";
    this.dropDownListImageSizeBytes = 0;
    this.dropDownListImageSizeTextCurrent = "";
    this.dropDownListIsMultipleSelectStatus = false;
    this.dropDownListItemsData = [];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.dropDownListToken = data.dropDownListToken ?? "";
      this.dropDownListNameCurrent = data.dropDownListNameCurrent ?? "";
      this.dropDownListNameAr = data.dropDownListNameAr ?? "";
      this.dropDownListNameEn = data.dropDownListNameEn ?? "";
      this.dropDownListNameUnd = data.dropDownListNameUnd ?? "";
      this.dropDownListDescriptionCurrent =
        data.dropDownListDescriptionCurrent ?? "";
      this.dropDownListDescriptionAr = data.dropDownListDescriptionAr ?? "";
      this.dropDownListDescriptionEn = data.dropDownListDescriptionEn ?? "";
      this.dropDownListDescriptionUnd = data.dropDownListDescriptionUnd ?? "";
      this.dropDownListNotes = data.dropDownListNotes ?? "";
      this.dropDownListImageIsDefault =
        data.dropDownListImageIsDefault ?? false;
      this.dropDownListImagePath = data.dropDownListImagePath ?? "";
      this.dropDownListImageSizeBytes = data.dropDownListImageSizeBytes ?? 0;
      this.dropDownListImageSizeTextCurrent =
        data.dropDownListImageSizeTextCurrent ?? "";
      this.dropDownListIsMultipleSelectStatus =
        data.dropDownListIsMultipleSelectStatus ?? false;
      this.dropDownListItemsData = data.dropDownListItemsData ?? [];
    } else {
      this.setInitialValue();
    }
  }
}
