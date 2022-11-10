import BaseEntityModel from "./../../general/BaseEntityModel";
import EducationalGroupInfoData from "./../educationalGroups/EducationalGroupInfoData";
import SimpleExamModelInfoData from "./../simpleExamModels/SimpleExamModelInfoData";
import defaultImg from "@/assets/images/GroupScheduleExams.svg";

export default class GroupScheduleExam extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.groupScheduleExamToken = "";
    this.groupScheduleExamNameCurrent = "";
    this.groupScheduleExamNameAr = "";
    this.groupScheduleExamNameEn = "";
    this.groupScheduleExamNameUnd = "";
    this.groupScheduleExamDescriptionCurrent = "";
    this.groupScheduleExamDescriptionAr = "";
    this.groupScheduleExamDescriptionEn = "";
    this.groupScheduleExamDescriptionUnd = "";
    this.groupScheduleExamNotes = "";
    this.groupScheduleExamImageIsDefault = false;
    this.groupScheduleExamImagePath = "";
    this.groupScheduleExamImageSizeBytes = 0;
    this.groupScheduleExamImageSizeTextCurrent = "";
    this.groupScheduleExamImageSizeTextAr = "";
    this.groupScheduleExamImageSizeTextEn = "";
    this.groupScheduleExamImageSizeTextUnd = "";
    this.startExamDateTime = "";
    this.startExamDataTimeCustomized = "";
    this.startExamDate = "";
    this.startExamTime = "";
    this.endExamDateTime = "";
    this.endExamDateTimeCustomized = "";
    this.endExamDate = "";
    this.endExamTime = "";
    this.durationCurrent = "";
    this.educationalCategoryToken = "";
    this.educationalCategoryInfoData = "";
    this.educationalGroupToken = "";
    this.educationalGroupInfoData = new EducationalGroupInfoData();
    this.simpleExamModelToken = "";
    this.simpleExamModelInfoData = new SimpleExamModelInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.groupScheduleExamToken = data.groupScheduleExamToken || "";
      this.groupScheduleExamNameCurrent =
        data.groupScheduleExamNameCurrent || "";
      this.groupScheduleExamNameAr = data.groupScheduleExamNameAr || "";
      this.groupScheduleExamNameEn = data.groupScheduleExamNameEn || "";
      this.groupScheduleExamNameUnd = data.groupScheduleExamNameUnd || "";
      this.groupScheduleExamDescriptionCurrent =
        data.groupScheduleExamDescriptionCurrent || "";
      this.groupScheduleExamDescriptionAr =
        data.groupScheduleExamDescriptionAr || "";
      this.groupScheduleExamDescriptionEn =
        data.groupScheduleExamDescriptionEn || "";
      this.groupScheduleExamDescriptionUnd =
        data.groupScheduleExamDescriptionUnd || "";
      this.groupScheduleExamNotes = data.groupScheduleExamNotes || "";
      this.groupScheduleExamImageIsDefault =
        data.groupScheduleExamImageIsDefault || false;
      this.groupScheduleExamImagePath = data.groupScheduleExamImagePath || "";
      this.groupScheduleExamImageSizeBytes =
        data.groupScheduleExamImageSizeBytes || 0;
      this.groupScheduleExamImageSizeTextCurrent =
        data.groupScheduleExamImageSizeTextCurrent || "";
      this.groupScheduleExamImageSizeTextAr =
        data.groupScheduleExamImageSizeTextAr || "";
      this.groupScheduleExamImageSizeTextEn =
        data.groupScheduleExamImageSizeTextEn || "";
      this.groupScheduleExamImageSizeTextUnd =
        data.groupScheduleExamImageSizeTextUnd || "";
      this.startExamDateTime = data.startExamDateTime || "";
      this.startExamDataTimeCustomized = data.startExamDataTimeCustomized || "";
      this.startExamDate = data.startExamDate || "";
      this.startExamTime = data.startExamTime || "";
      this.endExamDateTime = data.endExamDateTime || "";
      this.endExamDateTimeCustomized = data.endExamDateTimeCustomized || "";
      this.endExamDate = data.endExamDate || "";
      this.endExamTime = data.endExamTime || "";
      this.durationCurrent = data.durationCurrent || "";
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.educationalCategoryInfoData = data.educationalCategoryInfoData || "";
      this.educationalGroupToken = data.educationalGroupToken || "";
      this.educationalGroupInfoData.fillData(data.educationalGroupInfoData);
      this.simpleExamModelToken = data.simpleExamModelToken || "";
      this.simpleExamModelInfoData.fillData(data.simpleExamModelInfoData);
    } else {
      this.setInitialValue();
    }
  }
}
