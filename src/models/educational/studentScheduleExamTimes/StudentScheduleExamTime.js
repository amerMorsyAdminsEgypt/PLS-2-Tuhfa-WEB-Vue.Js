import BaseEntityModel from "./../../general/BaseEntityModel";
import UserInfoData from "./../../users/UserInfoData";
import EducationalGroupInfoData from "./../educationalGroups/EducationalGroupInfoData";
import EducationalCategory from "./../educationalCategories/EducationalCategory";
import SimpleExamModelInfoData from "./../simpleExamModels/SimpleExamModelInfoData";
import defaultImg from "@/assets/images/StudentScheduleExamTimes.svg";

export default class StudentScheduleExamTime extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.sendTo = "";
    this.token = "";
    this.studentScheduleExamTimeToken = "";
    this.studentScheduleExamTimeNameCurrent = "";
    this.studentScheduleExamTimeNameAr = "";
    this.studentScheduleExamTimeNameEn = "";
    this.studentScheduleExamTimeNameUnd = "";
    this.startExamDateTime = "";
    this.startExamDataTimeCustomized = "";
    this.startExamDate = "";
    this.startExamTime = "";
    this.endExamDateTime = "";
    this.endExamDateTimeCustomized = "";
    this.endExamDate = "";
    this.endExamTime = "";
    this.durationCurrent = "";
    this.examSubmissionStatusToken = "";
    this.examSubmissionStatusNameCurrent = "";
    this.studentUserToken = "";
    this.studentUserInfoData = new UserInfoData();
    this.educationalGroupToken = "";
    this.educationalGroupInfoData = new EducationalGroupInfoData();
    this.educationalCategoryToken = "";
    this.educationalCategoryInfoData = new EducationalCategory();
    this.simpleExamModelToken = "";
    this.simpleExamModelInfoData = new SimpleExamModelInfoData();
    this.examFinalDegrees = 0;
    this.studentDegreesInExam = 0;
    this.studentSuccessPercentage = 0;
    this.studentSuccessPercentageText = "";
    this.studentMCQAnswersData = [];
    this.studentTrueFalseAnswersData = [];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.sendTo = data.sendTo ?? "";
      this.token = data.token ?? "";

      this.studentScheduleExamTimeToken =
        data.studentScheduleExamTimeToken || "";
      this.studentScheduleExamTimeNameCurrent =
        data.studentScheduleExamTimeNameCurrent || "";
      this.studentScheduleExamTimeNameAr =
        data.studentScheduleExamTimeNameAr || "";
      this.studentScheduleExamTimeNameEn =
        data.studentScheduleExamTimeNameEn || "";
      this.studentScheduleExamTimeNameUnd =
        data.studentScheduleExamTimeNameUnd || "";
      this.startExamDateTime = data.startExamDateTime || "";
      this.startExamDataTimeCustomized = data.startExamDataTimeCustomized || "";
      this.startExamDate = data.startExamDate || "";
      this.startExamTime = data.startExamTime || "";
      this.endExamDateTime = data.endExamDateTime || "";
      this.endExamDateTimeCustomized = data.endExamDateTimeCustomized || "";
      this.endExamDate = data.endExamDate || "";
      this.endExamTime = data.endExamTime || "";
      this.durationCurrent = data.durationCurrent || "";
      this.examSubmissionStatusToken = data.examSubmissionStatusToken || "";
      this.examSubmissionStatusNameCurrent =
        data.examSubmissionStatusNameCurrent || "";
      this.studentUserToken = data.studentUserToken || "";
      this.studentUserInfoData.fillData(data.studentUserInfoData);
      this.educationalGroupToken = data.educationalGroupToken || "";
      this.educationalGroupInfoData.fillData(data.educationalGroupInfoData);
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.educationalCategoryInfoData.fillData(
        data.educationalCategoryInfoData
      );
      this.simpleExamModelToken = data.simpleExamModelToken || "";
      this.simpleExamModelInfoData.fillData(data.simpleExamModelInfoData);
      this.examFinalDegrees = data.examFinalDegrees || 0;
      this.studentDegreesInExam = data.studentDegreesInExam || 0;
      this.studentSuccessPercentage = data.studentSuccessPercentage || 0;
      this.studentSuccessPercentageText =
        data.studentSuccessPercentageText || "";
      this.studentMCQAnswersData = data.studentMCQAnswersData || [];
      this.studentTrueFalseAnswersData = data.studentTrueFalseAnswersData || [];
    } else {
      this.setInitialValue();
    }
  }
}
