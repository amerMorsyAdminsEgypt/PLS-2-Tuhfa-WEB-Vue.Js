import ActivationStatistics from "./../../general/ActivationStatistics";

export default class EducationalJoiningApplicationStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setEducationalJoiningApplicationStatisticsInitialValue();
  }
  setEducationalJoiningApplicationStatisticsInitialValue() {
    this.setInitialValue();
    this.totalUnderReviewCount = 0;
    this.totalAcceptedCount = 0;
    this.totalRejectedCount = 0;
    this.underReviewPercentage = 0;
    this.underReviewPercentageText = "";
    this.acceptedPercentage = 0;
    this.acceptedPercentageText = "";
    this.rejectedPercentage = 0;
    this.rejectedPercentageText = "";
  }
  fillEducationalJoiningApplicationStatisticsData(data) {
    if (data) {
      this.fillData(data);
      this.totalImageFilesCount = data.totalImageFilesCount || 0;
      this.totalUnderReviewCount = data.totalUnderReviewCount || 0;
      this.totalAcceptedCount = data.totalAcceptedCount || 0;
      this.totalRejectedCount = data.totalRejectedCount || 0;
      this.underReviewPercentage = data.underReviewPercentage || 0;
      this.underReviewPercentageText = data.underReviewPercentageText || "";
      this.acceptedPercentage = data.acceptedPercentage || 0;
      this.acceptedPercentageText = data.acceptedPercentageText || "";
      this.rejectedPercentage = data.rejectedPercentage || 0;
      this.rejectedPercentageText = data.rejectedPercentageText || "";
    } else {
      this.setEducationalJoiningApplicationStatisticsInitialValue();
    }
  }
}
