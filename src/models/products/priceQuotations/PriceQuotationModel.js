import { getUserAuthorizeToken } from "./../../../utils/functions";
import PriceQuotationDetailsItem from "./PriceQuotationDetailsItem";
import defaultImg from "@/assets/images/PriceQuotations.svg";

export default class PriceQuotationModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userAuthorizeToken = getUserAuthorizeToken();
    this.fullCode = "";
    this.priceQuotationDescriptionAr = "";
    this.priceQuotationDescriptionEn = "";
    this.priceQuotationDescriptionUnd = "";
    this.priceQuotationNotes = "";
    this.placeTypeToken = "";
    this.requestPlaceToken = "";
    this.reportTemplateToken = "";
    this.usersSalesTokenList = [];
    this.priceQuotationDetails = [new PriceQuotationDetailsItem()];
  }
  fillData(data) {
    if (data) {
      this.fullCode = data.fullCode || "";
      this.priceQuotationDescriptionAr = data.priceQuotationDescriptionAr || "";
      this.priceQuotationDescriptionEn = data.priceQuotationDescriptionEn || "";
      this.priceQuotationDescriptionUnd =
        data.priceQuotationDescriptionUnd || "";
      this.priceQuotationNotes = data.priceQuotationNotes || "";
      this.placeTypeToken = data.placeTypeToken || "";
      this.requestPlaceToken = data.requestPlaceToken || "";
      this.reportTemplateToken = data.reportTemplateToken || "";
      this.usersSalesTokenList = data.usersSalesTokenList || [];
      this.priceQuotationDetails = data.priceQuotationDetails || [
        new PriceQuotationDetailsItem(),
      ];
    } else {
      this.setInitialValue();
    }
  }
}
