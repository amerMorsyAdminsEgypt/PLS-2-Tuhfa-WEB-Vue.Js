export default class MediaPackageStatisticsData {
  constructor() {
    this.totalCountMedia = 0;
    this.totalCountFreeMedia = 0;
    this.totalCountFreeMediaPercentage = 0;
    this.totalCountFreeMediaPercentageText = "";
    this.totalCountPaidMedia = 0;
    this.totalCountPaidMediaPercentage = 0;
    this.totalCountPaidMediaPercentageText = "";
    this.totalNumberOfCoupons = 0;
    this.totalNumberOfCouponsUsed = 0;
    this.totalNumberOfCouponsUsedPercentage = 0;
    this.totalNumberOfCouponsUsedPercentageText = "";
    this.totalNumberOfCouponsNotUsed = 0;
    this.totalNumberOfCouponsNotUsedPercentage = 0;
    this.totalNumberOfCouponsNotUsedPercentageText = "";
    this.totalCountUsersSubscribed = 0; //can update while =0
  }
  fillData(data) {
    if (data) {
      this.totalCountMedia = data.totalCountMedia ?? 0;
      this.totalCountFreeMedia = data.totalCountFreeMedia ?? 0;
      this.totalCountFreeMediaPercentage =
        data.totalCountFreeMediaPercentage ?? 0;
      this.totalCountFreeMediaPercentageText =
        data.totalCountFreeMediaPercentageText ?? "";
      this.totalCountPaidMedia = data.totalCountPaidMedia ?? 0;
      this.totalCountPaidMediaPercentage =
        data.totalCountPaidMediaPercentage ?? 0;
      this.totalCountPaidMediaPercentageText =
        data.totalCountPaidMediaPercentageText ?? "";
      this.totalNumberOfCoupons = data.totalNumberOfCoupons ?? 0;
      this.totalNumberOfCouponsUsed = data.totalNumberOfCouponsUsed ?? 0;
      this.totalNumberOfCouponsUsedPercentage =
        data.totalNumberOfCouponsUsedPercentage ?? 0;
      this.totalNumberOfCouponsUsedPercentageText =
        data.totalNumberOfCouponsUsedPercentageText ?? "";
      this.totalNumberOfCouponsNotUsed = data.totalNumberOfCouponsNotUsed ?? 0;
      this.totalNumberOfCouponsNotUsedPercentage =
        data.totalNumberOfCouponsNotUsedPercentage ?? 0;
      this.totalNumberOfCouponsNotUsedPercentageText =
        data.totalNumberOfCouponsNotUsedPercentageText ?? "";
      this.totalCountUsersSubscribed = data.totalCountUsersSubscribed ?? 0;
    }
  }
}
