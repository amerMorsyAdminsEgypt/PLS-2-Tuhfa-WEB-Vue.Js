import { getPlacesDialog } from "./../../../utils/dialogsOfApi";

export default class QuotationDetailsPriceReliance {
  constructor(data = "") {
    if (data) this.fillData(data);
    else this.setInitialValue();
  }
  setInitialValue() {
    this.storeItemFullCode = "";
    this.storeItemNameCurrent = "";
    this.priceQuotationDetailsToken = "";
    this.placeTypeToken = "";
    this.approvedPricePlaceToken = "";
    this.approvedPriceStoreItemsAmount = 0;
    this.affiliateOperationAmount = 0;
    this.placeTokensOptions = [];
  }
  fillData(data) {
    if (data) {
      this.storeItemFullCode = data.storeItemFullCode || "";
      this.storeItemNameCurrent = data.storeItemNameCurrent || "";
      this.priceQuotationDetailsToken = data.priceQuotationDetailsToken || "";
      this.placeTypeToken = data.placeTypeToken || "";
      this.approvedPricePlaceToken = data.approvedPricePlaceToken || "";
      this.approvedPriceStoreItemsAmount =
        data.approvedPriceStoreItemsAmount || 0;
      this.affiliateOperationAmount = data.affiliateOperationAmount || 0;
      // this.placeTokensOptions = data.placeTokensOptions || [];
      this.placeTypeTokenChanged(data.placeTypeToken);
    } else {
      this.setInitialValue();
    }
  }

  async placeTypeTokenChanged(token) {
    this.placeTokensOptions = [];
    if (token) {
      let params = { placeTypeToken: token };
      this.placeTokensOptions = await getPlacesDialog(params);
    }
  }
}
