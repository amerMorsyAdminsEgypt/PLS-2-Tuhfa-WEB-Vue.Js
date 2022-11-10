import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/paymentMethods.svg";

export default class PaymentMethod extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.paymentMethodToken = "";
    this.paymentMethodNameCurrent = "";
    this.paymentMethodNameAr = "";
    this.paymentMethodNameEn = "";
    this.paymentMethodNameUnd = "";
    this.paymentMethodDescriptionCurrent = "";
    this.paymentMethodDescriptionAr = "";
    this.paymentMethodDescriptionEn = "";
    this.paymentMethodDescriptionUnd = "";
    this.paymentMethodNotes = "";
    this.paymentMethodImageIsDefault = false;
    this.paymentMethodImagePath = "";
    this.paymentMethodImageSizeBytes = 0;
    this.paymentMethodImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.paymentMethodToken = data.paymentMethodToken ?? "";
      this.paymentMethodNameCurrent = data.paymentMethodNameCurrent ?? "";
      this.paymentMethodNameAr = data.paymentMethodNameAr ?? "";
      this.paymentMethodNameEn = data.paymentMethodNameEn ?? "";
      this.paymentMethodNameUnd = data.paymentMethodNameUnd ?? "";
      this.paymentMethodDescriptionCurrent =
        data.paymentMethodDescriptionCurrent ?? "";
      this.paymentMethodDescriptionAr = data.paymentMethodDescriptionAr ?? "";
      this.paymentMethodDescriptionEn = data.paymentMethodDescriptionEn ?? "";
      this.paymentMethodDescriptionUnd = data.paymentMethodDescriptionUnd ?? "";
      this.paymentMethodNotes = data.paymentMethodNotes ?? "";
      this.paymentMethodImageIsDefault =
        data.paymentMethodImageIsDefault ?? false;
      this.paymentMethodImagePath = data.paymentMethodImagePath ?? "";
      this.paymentMethodImageSizeBytes = data.paymentMethodImageSizeBytes ?? 0;
      this.paymentMethodImageSizeTextCurrent =
        data.paymentMethodImageSizeTextCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
