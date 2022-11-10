export default class MediaPackageFinance {
  constructor() {
    this.offerStatus = false;
    this.mediaPackagePrice = 0;
    this.mediaPackagePriceText = "";
    this.mediaPackagePriceWithCurrency = "";
    this.mediaPackagePriceInOffer = 0;
    this.mediaPackagePriceInOfferText = "";
    this.mediaPackagePriceInOfferWithCurrency = "";
    this.mediaPackageActualPrice = 0;
    this.mediaPackageActualPriceText = "";
    this.mediaPackageActualPriceWithCurrency = "";
  }
  fillData(data) {
    if (data) {
      this.offerStatus = data.offerStatus ?? false;
      this.mediaPackagePrice = data.mediaPackagePrice ?? 0;
      this.mediaPackagePriceText = data.mediaPackagePriceText ?? "";
      this.mediaPackagePriceWithCurrency =
        data.mediaPackagePriceWithCurrency ?? "";
      this.mediaPackagePriceInOffer = data.mediaPackagePriceInOffer ?? 0;
      this.mediaPackagePriceInOfferText =
        data.mediaPackagePriceInOfferText ?? "";
      this.mediaPackagePriceInOfferWithCurrency =
        data.mediaPackagePriceInOfferWithCurrency ?? "";
      this.mediaPackageActualPrice = data.mediaPackageActualPrice ?? 0;
      this.mediaPackageActualPriceText = data.mediaPackageActualPriceText ?? "";
      this.mediaPackageActualPriceWithCurrency =
        data.mediaPackageActualPriceWithCurrency ?? "";
    }
  }
}
