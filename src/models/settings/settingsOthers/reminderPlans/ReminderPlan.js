import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/reminderPlans.svg";
import PriorityTypeInfoData from "./../priorityTypes/PriorityTypeInfoData";
import { DURATION_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default class ReminderPlan extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.reminderPlanToken = "";
    this.reminderPlanNameCurrent = "";
    this.reminderPlanNameAr = "";
    this.reminderPlanNameEn = "";
    this.reminderPlanNameUnd = "";
    this.priorityTypeBeforeTimeToken = "";
    this.priorityTypeAfterTimeToken = "";
    this.priorityTypeOnTimeToken = "";
    this.reminderPlanDescriptionCurrent = "";
    this.reminderPlanDescriptionAr = "";
    this.reminderPlanDescriptionEn = "";
    this.reminderPlanDescriptionUnd = "";
    this.reminderPlanNotes = "";
    this.reminderPlanImageIsDefault = false;
    this.reminderPlanActivationStatus = true;
    this.reminderPlanImagePath = "";
    this.reminderPlanImageSizeBytes = 0;
    this.reminderPlanImageSizeTextCurrent = "";
    this.priorityTypeInfoBeforeTimeData = new PriorityTypeInfoData();
    this.priorityTypeInfoAfterTimeData = new PriorityTypeInfoData();
    this.priorityTypeInfoOnTimeData = new PriorityTypeInfoData();
    this.reminderPlansDetailsData = [];
    this.reminderPlansDetailsDataAfterTime = [];
    this.reminderPlansDetailsDataBeforeTime = [];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.reminderPlanToken = data.reminderPlanToken ?? "";
      this.reminderPlanNameCurrent = data.reminderPlanNameCurrent ?? "";
      this.reminderPlanNameAr = data.reminderPlanNameAr ?? "";
      this.reminderPlanNameEn = data.reminderPlanNameEn ?? "";
      this.reminderPlanNameUnd = data.reminderPlanNameUnd ?? "";
      this.priorityTypeBeforeTimeToken = data.priorityTypeBeforeTimeToken ?? "";
      this.priorityTypeAfterTimeToken = data.priorityTypeAfterTimeToken ?? "";
      this.priorityTypeOnTimeToken = data.priorityTypeOnTimeToken ?? "";
      this.reminderPlanDescriptionCurrent =
        data.reminderPlanDescriptionCurrent ?? "";
      this.reminderPlanDescriptionAr = data.reminderPlanDescriptionAr ?? "";
      this.reminderPlanDescriptionEn = data.reminderPlanDescriptionEn ?? "";
      this.reminderPlanDescriptionUnd = data.reminderPlanDescriptionUnd ?? "";
      this.reminderPlanNotes = data.reminderPlanNotes ?? "";
      this.reminderPlanImageIsDefault = data.reminderPlanImageIsDefault ?? "";
      this.reminderPlanActivationStatus =
        data.reminderPlanActivationStatus ?? true;
      this.reminderPlanImagePath = data.reminderPlanImagePath ?? "";
      this.reminderPlanImageSizeBytes = data.reminderPlanImageSizeBytes ?? "";
      this.reminderPlanImageSizeTextCurrent =
        data.reminderPlanImageSizeTextCurrent ?? "";
      this.priorityTypeInfoBeforeTimeData.fillPriorityTypeInfoData(
        data.priorityTypeInfoBeforeTimeData
      );
      this.priorityTypeInfoAfterTimeData.fillPriorityTypeInfoData(
        data.priorityTypeInfoAfterTimeData
      );
      this.priorityTypeInfoOnTimeData.fillPriorityTypeInfoData(
        data.priorityTypeInfoOnTimeData
      );
      this.reminderPlansDetailsData = data.reminderPlansDetailsData ?? [];
      this.reminderPlansDetailsDataAfterTime =
        data.reminderPlansDetailsData.filter(
          (x) => x.durationTypeToken == DURATION_TYPE_TOKENS.AfterTime
        );
      this.setDetailsDataAfterTimeDurationFrom();
      this.setDetailsDataAfterTimeDurationTo();
      this.reminderPlansDetailsDataBeforeTime =
        data.reminderPlansDetailsData.filter(
          (x) => x.durationTypeToken == DURATION_TYPE_TOKENS.BeforeTime
        );
      this.setDetailsDataBeforeTimeDurationFrom();
      this.setDetailsDataBeforeTimeDurationTo();
    } else {
      this.setInitialValue();
    }
  }
  setDetailsDataAfterTimeDurationFrom() {
    if (this.reminderPlansDetailsDataAfterTime.length) {
      this.reminderPlansDetailsDataAfterTime.forEach(function (element) {
        if (element.reminderDurationFrom) {
          let arr = element.reminderDurationFrom.split(":");
          element.durationFromHours = arr[0];
          element.durationFromMinutes = arr[1];
          element.durationFromSeconds = arr[2];
        }
      });
    }
  }
  setDetailsDataAfterTimeDurationTo() {
    if (this.reminderPlansDetailsDataAfterTime.length) {
      this.reminderPlansDetailsDataAfterTime.forEach(function (element) {
        if (element.reminderDurationTo) {
          let arr = element.reminderDurationTo.split(":");
          element.durationToHours = arr[0];
          element.durationToMinutes = arr[1];
          element.durationToSeconds = arr[2];
        }
      });
    }
  }
  setDetailsDataBeforeTimeDurationFrom() {
    if (this.reminderPlansDetailsDataBeforeTime.length) {
      this.reminderPlansDetailsDataBeforeTime.forEach(function (element) {
        if (element.reminderDurationFrom) {
          let arr = element.reminderDurationFrom.split(":");
          element.durationFromHours = arr[0];
          element.durationFromMinutes = arr[1];
          element.durationFromSeconds = arr[2];
        }
      });
    }
  }
  setDetailsDataBeforeTimeDurationTo() {
    if (this.reminderPlansDetailsDataBeforeTime.length) {
      this.reminderPlansDetailsDataBeforeTime.forEach(function (element) {
        if (element.reminderDurationTo) {
          let arr = element.reminderDurationTo.split(":");
          element.durationToHours = arr[0];
          element.durationToMinutes = arr[1];
          element.durationToSeconds = arr[2];
        }
      });
    }
  }
}
