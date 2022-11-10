import BaseEntityModel from "./../../general/BaseEntityModel";
import EducationalPeriod from "./../educationalPeriods/EducationalPeriod";
import EducationalCategoryInfoData from "./../educationalCategories/EducationalCategoryInfoData";
import EducationalGroupWeekDay from "./EducationalGroupWeekDay";
import { getDialogOfDaysOfWeek } from "./../../../utils/dialogsOfConstantsLists";
import defaultImg from "@/assets/images/EducationalGroups.svg";

export default class EducationalGroup extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.educationalGroupToken = "";
    this.educationalGroupNameCurrent = "";
    this.educationalGroupNameAr = "";
    this.educationalGroupNameEn = "";
    this.educationalGroupNameUnd = "";
    this.educationalGroupDescriptionCurrent = "";
    this.educationalGroupDescriptionAr = "";
    this.educationalGroupDescriptionEn = "";
    this.educationalGroupDescriptionUnd = "";
    this.educationalGroupNotes = "";
    this.educationalGroupImageIsDefault = false;
    this.educationalGroupImagePath = "";
    this.educationalGroupImageSizeBytes = 0;
    this.educationalGroupImageSizeTextCurrent = "";
    this.educationalGroupStartDateTime = "";
    this.educationalGroupStartDateTimeCustomized = "";
    this.educationalGroupStartDate = "";
    this.educationalGroupStartTime = "";
    this.educationalGroupEndDateTime = "";
    this.educationalGroupEndDateTimeCustomized = "";
    this.educationalGroupEndDate = "";
    this.educationalGroupEndTime = "";
    this.educationalGroupEndStatus = false;
    this.isHaveScheduleStatus = false;
    this.educationalGroupDurationCurrent = "";
    this.educationalGroupTimeZoneToken = "";

    this.educationalGroupMaximumStudentsNumber = 0;
    this.educationalGroupMinimumStudentsNumber = 0;
    this.educationalGroupClosedStateTypeToken = "";
    this.oldOducationalGroupClosedStateTypeToken = ""; //added by me
    this.educationalGroupClosedStateTypeNameCurrent = "";
    this.educationalGroupClosedStateTypeNameAr = "";
    this.educationalGroupClosedStateTypeNameEn = "";
    this.educationalGroupClosedStateTypeNameUnd = "";
    this.educationalGroupTerminationTypeToken = "";
    this.oldEducationalGroupTerminationTypeToken = ""; //added by me
    this.educationalGroupTerminationTypeNameCurrent = "";
    this.educationalGroupTerminationTypeNameAr = "";
    this.educationalGroupTerminationTypeNameEn = "";
    this.educationalGroupTerminationTypeNameUnd = "";

    this.educationalPeriodToken = "";
    this.educationalPeriodData = new EducationalPeriod();
    this.educationalCategoryToken = "";
    this.educationalCategoryData = new EducationalCategoryInfoData();
    this.educationalGroupWeekDayData = [];
    this.educationalGroupRatingStatisticData = null;
    this.setInitialGroupWeekDays();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.educationalGroupToken = data.educationalGroupToken || "";
      this.educationalGroupNameCurrent = data.educationalGroupNameCurrent || "";
      this.educationalGroupNameAr = data.educationalGroupNameAr || "";
      this.educationalGroupNameEn = data.educationalGroupNameEn || "";
      this.educationalGroupNameUnd = data.educationalGroupNameUnd || "";
      this.educationalGroupDescriptionCurrent =
        data.educationalGroupDescriptionCurrent || "";
      this.educationalGroupDescriptionAr =
        data.educationalGroupDescriptionAr || "";
      this.educationalGroupDescriptionEn =
        data.educationalGroupDescriptionEn || "";
      this.educationalGroupDescriptionUnd =
        data.educationalGroupDescriptionUnd || "";
      this.educationalGroupNotes = data.educationalGroupNotes || "";
      this.educationalGroupImageIsDefault =
        data.educationalGroupImageIsDefault || false;
      this.educationalGroupImagePath = data.educationalGroupImagePath || "";
      this.educationalGroupImageSizeBytes =
        data.educationalGroupImageSizeBytes || 0;
      this.educationalGroupImageSizeTextCurrent =
        data.educationalGroupImageSizeTextCurrent || "";
      this.educationalGroupStartDateTime =
        data.educationalGroupStartDateTime || "";
      this.educationalGroupStartDateTimeCustomized =
        data.educationalGroupStartDateTimeCustomized || "";
      this.educationalGroupStartDate = data.educationalGroupStartDate || "";
      this.educationalGroupStartTime = data.educationalGroupStartTime || "";
      this.educationalGroupEndDateTime = data.educationalGroupEndDateTime || "";
      this.educationalGroupEndDateTimeCustomized =
        data.educationalGroupEndDateTimeCustomized || "";
      this.educationalGroupEndDate = data.educationalGroupEndDate || "";
      this.educationalGroupEndTime = data.educationalGroupEndTime || "";
      this.educationalGroupEndStatus = data.educationalGroupEndStatus || false;
      this.isHaveScheduleStatus = data.isHaveScheduleStatus || false;
      this.educationalGroupDurationCurrent =
        data.educationalGroupDurationCurrent || "";
      this.educationalGroupTimeZoneToken =
        data.educationalGroupTimeZoneToken || "";
      this.educationalGroupMaximumStudentsNumber =
        data.educationalGroupMaximumStudentsNumber ?? 0;
      this.educationalGroupMinimumStudentsNumber =
        data.educationalGroupMinimumStudentsNumber ?? 0;
      this.educationalGroupClosedStateTypeToken =
        data.educationalGroupClosedStateTypeToken ?? "";
      this.oldOducationalGroupClosedStateTypeToken =
        data.educationalGroupClosedStateTypeToken ?? ""; // added by me
      this.educationalGroupClosedStateTypeNameCurrent =
        data.educationalGroupClosedStateTypeNameCurrent ?? "";
      this.educationalGroupClosedStateTypeNameAr =
        data.educationalGroupClosedStateTypeNameAr ?? "";
      this.educationalGroupClosedStateTypeNameEn =
        data.educationalGroupClosedStateTypeNameEn ?? "";
      this.educationalGroupClosedStateTypeNameUnd =
        data.educationalGroupClosedStateTypeNameUnd ?? "";
      this.educationalGroupTerminationTypeToken =
        data.educationalGroupTerminationTypeToken ?? "";
      this.oldEducationalGroupTerminationTypeToken =
        data.educationalGroupTerminationTypeToken ?? ""; // added by me
      this.educationalGroupTerminationTypeNameCurrent =
        data.educationalGroupTerminationTypeNameCurrent ?? "";
      this.educationalGroupTerminationTypeNameAr =
        data.educationalGroupTerminationTypeNameAr ?? "";
      this.educationalGroupTerminationTypeNameEn =
        data.educationalGroupTerminationTypeNameEn ?? "";
      this.educationalGroupTerminationTypeNameUnd =
        data.educationalGroupTerminationTypeNameUnd ?? "";
      this.educationalPeriodToken = data.educationalPeriodToken || "";
      this.educationalPeriodData.fillData(data.educationalPeriodData);
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.educationalCategoryData.fillData(data.educationalCategoryData);
      this.educationalGroupWeekDayData = data.educationalGroupWeekDayData || [];
      this.educationalGroupRatingStatisticData =
        data.educationalGroupRatingStatisticData || null;
    } else {
      this.setInitialValue();
    }
  }
  setInitialGroupWeekDays() {
    let daysOfWeek = getDialogOfDaysOfWeek();
    this.educationalGroupWeekDayData = [];

    daysOfWeek.forEach((element, index) => {
      let obj = {
        dayToken: element.value,
        dayNameCurrent: element.text,
      };
      this.educationalGroupWeekDayData.push(new EducationalGroupWeekDay());
      this.educationalGroupWeekDayData[index].fillData(obj);
    });
  }
}
