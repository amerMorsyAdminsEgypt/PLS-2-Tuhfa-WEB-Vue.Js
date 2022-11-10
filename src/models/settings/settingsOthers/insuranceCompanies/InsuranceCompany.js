import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/insuranceCompanies.svg";

export default class InsuranceCompany extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.insuranceCompanyToken = "";
    this.insuranceCompanyNameCurrent = "";
    this.insuranceCompanyNameAr = "";
    this.insuranceCompanyNameEn = "";
    this.insuranceCompanyNameUnd = "";
    this.insuranceCompanyDescriptionCurrent = "";
    this.insuranceCompanyDescriptionAr = "";
    this.insuranceCompanyDescriptionEn = "";
    this.insuranceCompanyDescriptionUnd = "";
    this.insuranceCompanyNotes = "";
    this.insuranceCompanyImagePath = "";
    this.insuranceCompanyAddressCurrent = "";
    this.insuranceCompanyAddressAr = "";
    this.insuranceCompanyAddressEn = "";
    this.insuranceCompanyAddressUnd = "";
    this.insuranceCompanyCountryCodeName = "";
    this.insuranceCompanyCountryCode = "";
    this.insuranceCompanyPhone = "";
    this.insuranceCompanyPhoneWithCC = "";
    this.insuranceCompanyImageIsDefault = false;
    this.insuranceCompanyImageSizeBytes = 0;
    this.insuranceCompanyImageSizeTextCurrent = "";
    this.insuranceCompanyImageSizeTextAr = "";
    this.insuranceCompanyImageSizeTextEn = "";
    this.insuranceCompanyImageSizeTextUnd = "";
    this.insuranceCompanyArchiveStatus = false;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.insuranceCompanyToken = data.insuranceCompanyToken ?? "";
      this.insuranceCompanyNameCurrent = data.insuranceCompanyNameCurrent ?? "";
      this.insuranceCompanyNameAr = data.insuranceCompanyNameAr ?? "";
      this.insuranceCompanyNameEn = data.insuranceCompanyNameEn ?? "";
      this.insuranceCompanyNameUnd = data.insuranceCompanyNameUnd ?? "";
      this.insuranceCompanyDescriptionCurrent =
        data.insuranceCompanyDescriptionCurrent ?? "";
      this.insuranceCompanyDescriptionAr =
        data.insuranceCompanyDescriptionAr ?? "";
      this.insuranceCompanyDescriptionEn =
        data.insuranceCompanyDescriptionEn ?? "";
      this.insuranceCompanyDescriptionUnd =
        data.insuranceCompanyDescriptionUnd ?? "";
      this.insuranceCompanyNotes = data.insuranceCompanyNotes ?? "";
      this.insuranceCompanyImagePath = data.insuranceCompanyImagePath ?? "";
      this.insuranceCompanyAddressCurrent =
        data.insuranceCompanyAddressCurrent ?? "";
      this.insuranceCompanyAddressAr = data.insuranceCompanyAddressAr ?? "";
      this.insuranceCompanyAddressEn = data.insuranceCompanyAddressEn ?? "";
      this.insuranceCompanyAddressUnd = data.insuranceCompanyAddressUnd ?? "";
      this.insuranceCompanyCountryCodeName =
        data.insuranceCompanyCountryCodeName ?? "";
      this.insuranceCompanyCountryCode = data.insuranceCompanyCountryCode ?? "";
      this.insuranceCompanyPhone = data.insuranceCompanyPhone ?? "";
      this.insuranceCompanyPhoneWithCC = data.insuranceCompanyPhoneWithCC ?? "";
      this.insuranceCompanyImageIsDefault =
        data.insuranceCompanyImageIsDefault ?? false;
      this.insuranceCompanyImageSizeBytes =
        data.insuranceCompanyImageSizeBytes ?? 0;
      this.insuranceCompanyImageSizeTextCurrent =
        data.insuranceCompanyImageSizeTextCurrent ?? "";
      this.insuranceCompanyImageSizeTextAr =
        data.insuranceCompanyImageSizeTextAr ?? "";
      this.insuranceCompanyImageSizeTextEn =
        data.insuranceCompanyImageSizeTextEn ?? "";
      this.insuranceCompanyImageSizeTextUnd =
        data.insuranceCompanyImageSizeTextUnd ?? "";
      this.insuranceCompanyArchiveStatus =
        data.insuranceCompanyArchiveStatus ?? false;
    } else {
      this.setInitialValue();
    }
  }
}
