import { getYearsMonthsDaysFromDays } from "./../../utils/functions";

export default class MediaPackageLicenceData {
  constructor() {
    this.durationFromActivationStatus = false;
    this.durationFromActivation = "";
    this.durationFromActivationText = "";
    this.activationInFixedDurationStatus = true;
    this.activationDateTimeFrom = "";
    this.activationDateTimeFromCustomized = "";
    this.activationDateFrom = "";
    this.activationTimeFrom = "";
    this.activationDateTimeTo = "";
    this.activationDateTimeToCustomized = "";
    this.activationDateTo = "";
    this.activationTimeTo = "";
    this.fixedDurationText = "";
    // added by me
    this.toNumberInYears = 0;
    this.toNumberInMonths = 0;
    this.toNumberInDays = 0;
    this.toNumberInHours = 0;
    this.toNumberInMinutes = 0;
    // this.toNumberInSeconds = "";
    // "50.00:00",
    // durationFromActivationStatus
  }
  fillData(data) {
    if (data) {
      this.durationFromActivationStatus =
        data.durationFromActivationStatus ?? false;
      this.durationFromActivation = data.durationFromActivation ?? "";
      this.durationFromActivationText = data.durationFromActivationText ?? "";
      this.activationInFixedDurationStatus =
        data.activationInFixedDurationStatus ?? false;
      this.activationDateTimeFrom = data.activationDateTimeFrom ?? "";
      this.activationDateTimeFromCustomized =
        data.activationDateTimeFromCustomized ?? "";
      this.activationDateFrom = data.activationDateFrom ?? "";
      this.activationTimeFrom = data.activationTimeFrom ?? "";
      this.activationDateTimeTo = data.activationDateTimeTo ?? "";
      this.activationDateTimeToCustomized =
        data.activationDateTimeToCustomized ?? "";
      this.activationDateTo = data.activationDateTo ?? "";
      this.activationTimeTo = data.activationTimeTo ?? "";
      this.fixedDurationText = data.fixedDurationText ?? "";
      this.spreadDurationFromActivation(data.durationFromActivation);
    }
  }
  spreadDurationFromActivation(durationFromActivation) {
    if (durationFromActivation && this.durationFromActivationStatus) {
      let arrOfDaysHoursMinuts = durationFromActivation.split(".");
      let numberOfDays = arrOfDaysHoursMinuts[0];
      let response = getYearsMonthsDaysFromDays(numberOfDays);
      this.toNumberInYears = response.years;
      this.toNumberInMonths = response.months;
      this.toNumberInDays = response.days;
      let arrOfHoursMinuts = arrOfDaysHoursMinuts[1].split(":");
      this.toNumberInHours = arrOfHoursMinuts[0];
      this.toNumberInMinutes = arrOfHoursMinuts[1];
    }
  }
}
