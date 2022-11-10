import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/expensesTypes.svg";

export default class ExpensesType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.expensesTypeToken = "";
    this.expensesTypeNameCurrent = "";
    this.expensesTypeNameAr = "";
    this.expensesTypeNameEn = "";
    this.expensesTypeNameUnd = "";
    this.expensesTypeDefaultPrice = "";
    this.expensesTypeDescriptionCurrent = "";
    this.expensesTypeDescriptionAr = "";
    this.expensesTypeDescriptionEn = "";
    this.expensesTypeDescriptionUnd = "";
    this.expensesTypeNotes = "";
    this.expensesTypeImageIsDefault = false;
    this.expensesTypeImagePath = "";
    this.expensesTypeImageSizeBytes = 0;
    this.expensesTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.expensesTypeToken = data.expensesTypeToken ?? "";
      this.expensesTypeNameCurrent = data.expensesTypeNameCurrent ?? "";
      this.expensesTypeNameAr = data.expensesTypeNameAr ?? "";
      this.expensesTypeNameEn = data.expensesTypeNameEn ?? "";
      this.expensesTypeNameUnd = data.expensesTypeNameUnd ?? "";
      this.expensesTypeDefaultPrice = data.expensesTypeDefaultPrice ?? "";
      this.expensesTypeDescriptionCurrent =
        data.expensesTypeDescriptionCurrent ?? "";
      this.expensesTypeDescriptionAr = data.expensesTypeDescriptionAr ?? "";
      this.expensesTypeDescriptionEn = data.expensesTypeDescriptionEn ?? "";
      this.expensesTypeDescriptionUnd = data.expensesTypeDescriptionUnd ?? "";
      this.expensesTypeNotes = data.expensesTypeNotes ?? "";
      this.expensesTypeImageIsDefault =
        data.expensesTypeImageIsDefault ?? false;
      this.expensesTypeImagePath = data.expensesTypeImagePath ?? "";
      this.expensesTypeImageSizeBytes = data.expensesTypeImageSizeBytes ?? 0;
      this.expensesTypeImageSizeTextCurrent =
        data.expensesTypeImageSizeTextCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
