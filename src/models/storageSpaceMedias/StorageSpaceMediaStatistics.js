import ActivationStatistics from "./../general/ActivationStatistics";

export default class StorageSpaceMediaStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setStorageSpaceMediaStatisticsInitialValue();
  }
  setStorageSpaceMediaStatisticsInitialValue() {
    this.setInitialValue();
    this.totalImageFilesCount = 0;
    this.totalImageFilesPercentage = 0;
    this.totalImageFilesPercentageText = "";
    this.totalVideoFilesCount = 0;
    this.totalVideoFilesPercentage = 0;
    this.totalVideoFilesPercentageText = "";
    this.totalAudioFilesCount = 0;
    this.totalAudioFilesPercentage = 0;
    this.totalAudioFilesPercentageText = "";
    this.totalWordFilesCount = 0;
    this.totalWordFilesPercentage = 0;
    this.totalWordFilesPercentageText = "";
    this.totalPdfFilesCount = 0;
    this.totalPdfFilesPercentage = 0;
    this.totalPdfFilesPercentageText = "";
    this.totalExcelFilesCount = 0;
    this.totalExcelFilesPercentage = 0;
    this.totalExcelFilesPercentageText = "";
    this.totalPowerPointFilesCount = 0;
    this.totalPowerPointFilesPercentage = 0;
    this.totalPowerPointFilesPercentageText = "";
    this.totalOtherFilesCount = 0;
    this.totalOtherFilesPercentage = 0;
    this.totalOtherFilesPercentageText = "";
  }
  fillStorageSpaceMediaStatisticsData(data) {
    if (data) {
      this.fillData(data);
      this.totalImageFilesCount = data.totalImageFilesCount || 0;
      this.totalImageFilesPercentage = data.totalImageFilesPercentage || 0;
      this.totalImageFilesPercentageText =
        data.totalImageFilesPercentageText || "";
      this.totalVideoFilesCount = data.totalVideoFilesCount || 0;
      this.totalVideoFilesPercentage = data.totalVideoFilesPercentage || 0;
      this.totalVideoFilesPercentageText =
        data.totalVideoFilesPercentageText || "";
      this.totalAudioFilesCount = data.totalAudioFilesCount || 0;
      this.totalAudioFilesPercentage = data.totalAudioFilesPercentage || 0;
      this.totalAudioFilesPercentageText =
        data.totalAudioFilesPercentageText || "";
      this.totalWordFilesCount = data.totalWordFilesCount || 0;
      this.totalWordFilesPercentage = data.totalWordFilesPercentage || 0;
      this.totalWordFilesPercentageText =
        data.totalWordFilesPercentageText || "";
      this.totalPdfFilesCount = data.totalPdfFilesCount || 0;
      this.totalPdfFilesPercentage = data.totalPdfFilesPercentage || 0;
      this.totalPdfFilesPercentageText = data.totalPdfFilesPercentageText || "";
      this.totalExcelFilesCount = data.totalExcelFilesCount || 0;
      this.totalExcelFilesPercentage = data.totalExcelFilesPercentage || 0;
      this.totalExcelFilesPercentageText =
        data.totalExcelFilesPercentageText || "";
      this.totalPowerPointFilesCount = data.totalPowerPointFilesCount || 0;
      this.totalPowerPointFilesPercentage =
        data.totalPowerPointFilesPercentage || 0;
      this.totalPowerPointFilesPercentageText =
        data.totalPowerPointFilesPercentageText || "";
      this.totalOtherFilesCount = data.totalOtherFilesCount || 0;
      this.totalOtherFilesPercentage = data.totalOtherFilesPercentage || 0;
      this.totalOtherFilesPercentageText =
        data.totalOtherFilesPercentageText || "";
    } else {
      this.setStorageSpaceMediaStatisticsInitialValue();
    }
  }
}
