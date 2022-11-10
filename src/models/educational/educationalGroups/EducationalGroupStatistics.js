import ActivationStatistics from "./../../general/ActivationStatistics";

export default class EducationalGroupStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setEducationalGroupStatisticsInitialValue();
  }
  setEducationalGroupStatisticsInitialValue() {
    this.setInitialValue();
    this.countFinished = 0;
    this.countNotFinished = 0;
    this.countClosed = 0;
    this.countNotClosed = 0;
    this.finishedPercentage = 0;
    this.finishedPercentageText = "";
    this.notFinishedPercentage = 0;
    this.notFinishedPercentageText = "";
    this.closedPercentage = 0;
    this.closedPercentageText = "";
    this.notClosedPercentage = 0;
    this.notClosedPercentageText = "";
  }
  fillEducationalGroupStatisticsData(data) {
    if (data) {
      this.fillData(data);
      this.countFinished = data.countFinished ?? 0;
      this.countNotFinished = data.countNotFinished ?? 0;
      this.countClosed = data.countClosed ?? 0;
      this.countNotClosed = data.countNotClosed ?? 0;
      this.finishedPercentage = data.finishedPercentage ?? 0;
      this.finishedPercentageText = data.finishedPercentageText ?? "";
      this.notFinishedPercentage = data.notFinishedPercentage ?? 0;
      this.notFinishedPercentageText = data.notFinishedPercentageText ?? "";
      this.closedPercentage = data.closedPercentage ?? 0;
      this.closedPercentageText = data.closedPercentageText ?? "";
      this.notClosedPercentage = data.notClosedPercentage ?? 0;
      this.notClosedPercentageText = data.notClosedPercentageText ?? "";
    } else {
      this.setEducationalGroupStatisticsInitialValue();
    }
  }
}
