import BaseEntityModel from "./../../general/BaseEntityModel";
import PlaceInfoData from "./../../places/PlaceInfoData";
import ReportTemplateInfoData from "./ReportTemplateInfoData";
import LastPriceQuotationHistoryWorkInfoData from "./LastPriceQuotationHistoryWorkInfoData";
import defaultImg from "@/assets/images/PriceQuotations.svg";

export default class PriceQuotation extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.priceQuotationToken = "";
    this.priceQuotationDescriptionCurrent = "";
    this.priceQuotationDescriptionAr = "";
    this.priceQuotationDescriptionEn = "";
    this.priceQuotationDescriptionUnd = "";
    this.priceQuotationImageIsDefault = false;
    this.priceQuotationImagePath = "";
    this.priceQuotationImageSizeBytes = 0;
    this.priceQuotationImageSizeTextCurrent = "";
    this.priceQuotationNotes = "";
    this.priceQuotationHistoryWorkTypeToken = "";
    this.priceQuotationStatusNameCurrent = "";
    this.feeTypeToken = "";
    this.feeTypeNameCurrent = "";
    this.feeTypeValue = 0;
    this.feeTypeValueWithCurrency = "";
    this.feeTypeValueText = "";
    this.totalPriceBeforeAnyEffect = 0;
    this.totalPriceBeforeAnyEffectWithCurrency = "";
    this.totalPriceBeforeAnyEffectText = "";
    this.totalPriceWithFeeType = 0;
    this.totalPriceWithFeeTypeWithCurrency = "";
    this.totalPriceWithFeeTypeText = "";
    this.taxStatus = false;
    this.taxPercent = 0;
    this.taxValue = 0;
    this.taxValueWithCurrency = "";
    this.taxValueText = "";
    this.totalPriceFinalWithTax = 0;
    this.totalPriceFinalWithTaxCurrency = "";
    this.totalPriceFinalWithTaxText = "";
    this.requestPlaceToken = "";
    this.requestPlaceInfoData = new PlaceInfoData();
    this.reportTemplateToken = "";
    this.reportTemplateInfoData = new ReportTemplateInfoData();
    this.lastPriceQuotationHistoryWorkToken = "";
    this.lastPriceQuotationHistoryWorkInfoData =
      new LastPriceQuotationHistoryWorkInfoData();
    this.priceQuotationUsersSalesData = [];
    this.priceQuotationDetails = [];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.priceQuotationToken = data.priceQuotationToken ?? "";
      this.priceQuotationDescriptionCurrent =
        data.priceQuotationDescriptionCurrent ?? "";
      this.priceQuotationDescriptionAr = data.priceQuotationDescriptionAr ?? "";
      this.priceQuotationDescriptionEn = data.priceQuotationDescriptionEn ?? "";
      this.priceQuotationDescriptionUnd =
        data.priceQuotationDescriptionUnd ?? "";
      this.priceQuotationImageIsDefault =
        data.priceQuotationImageIsDefault ?? false;
      this.priceQuotationImagePath = data.priceQuotationImagePath ?? "";
      this.priceQuotationImageSizeBytes =
        data.priceQuotationImageSizeBytes ?? 0;
      this.priceQuotationImageSizeTextCurrent =
        data.priceQuotationImageSizeTextCurrent ?? "";
      this.priceQuotationNotes = data.priceQuotationNotes ?? "";
      this.priceQuotationHistoryWorkTypeToken =
        data.priceQuotationHistoryWorkTypeToken ?? "";
      this.priceQuotationStatusNameCurrent =
        data.priceQuotationStatusNameCurrent ?? "";
      this.feeTypeToken = data.feeTypeToken ?? "";
      this.feeTypeNameCurrent = data.feeTypeNameCurrent ?? "";
      this.feeTypeValue = data.feeTypeValue ?? 0;
      this.feeTypeValueWithCurrency = data.feeTypeValueWithCurrency ?? "";
      this.feeTypeValueText = data.feeTypeValueText ?? "";
      this.totalPriceBeforeAnyEffect = data.totalPriceBeforeAnyEffect ?? 0;
      this.totalPriceBeforeAnyEffectWithCurrency =
        data.totalPriceBeforeAnyEffectWithCurrency ?? "";
      this.totalPriceBeforeAnyEffectText =
        data.totalPriceBeforeAnyEffectText ?? "";
      this.totalPriceWithFeeType = data.totalPriceWithFeeType ?? 0;
      this.totalPriceWithFeeTypeWithCurrency =
        data.totalPriceWithFeeTypeWithCurrency ?? "";
      this.totalPriceWithFeeTypeText = data.totalPriceWithFeeTypeText ?? "";
      this.taxStatus = data.taxStatus ?? false;
      this.taxPercent = data.taxPercent ?? 0;
      this.taxValue = data.taxValue ?? 0;
      this.taxValueWithCurrency = data.taxValueWithCurrency ?? "";
      this.taxValueText = data.taxValueText ?? "";
      this.totalPriceFinalWithTax = data.totalPriceFinalWithTax ?? 0;
      this.totalPriceFinalWithTaxCurrency =
        data.totalPriceFinalWithTaxCurrency ?? "";
      this.totalPriceFinalWithTaxText = data.totalPriceFinalWithTaxText ?? "";
      this.requestPlaceToken = data.requestPlaceToken ?? "";
      this.requestPlaceInfoData.fillData(data.requestPlaceInfoData);
      this.reportTemplateToken = data.reportTemplateToken ?? "";
      this.reportTemplateInfoData.fillData(data.reportTemplateInfoData);
      this.lastPriceQuotationHistoryWorkToken =
        data.lastPriceQuotationHistoryWorkToken ?? "";
      this.lastPriceQuotationHistoryWorkInfoData.fillData(
        data.lastPriceQuotationHistoryWorkInfoData
      );
      this.priceQuotationUsersSalesData =
        data.priceQuotationUsersSalesData ?? [];
      this.priceQuotationDetails = data.priceQuotationDetails ?? [];
    } else {
      this.setInitialValue();
    }
  }
}
