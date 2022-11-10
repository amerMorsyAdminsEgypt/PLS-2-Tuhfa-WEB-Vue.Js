import BaseEntityModel from "./../../general/BaseEntityModel";
import EducationalCategoryInfoData from "./EducationalCategoryInfoData";
import SystemComponentInfoData from "./../../systemConfiguration/systemComponents/SystemComponentInfoData";
import SystemComponentsHierarchyInfoData from "./../../systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchyInfoData";
import GradingPlan from "./../../settings/settingsOthers/gradingPlans/GradingPlan";
import defaultImg from "@/assets/images/EducationalCategories.svg";

export default class EducationalCategory extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.educationalCategoryToken = "";
    this.educationalCategoryNameCurrent = "";
    this.educationalCategoryNameAr = "";
    this.educationalCategoryNameEn = "";
    this.educationalCategoryNameUnd = "";
    this.educationalCategoryDescriptionCurrent = "";
    this.educationalCategoryDescriptionAr = "";
    this.educationalCategoryDescriptionEn = "";
    this.educationalCategoryDescriptionUnd = "";
    this.educationalCategoryImageIsDefault = false;
    this.educationalCategoryImagePath = "";
    this.educationalCategoryImageSizeBytes = "";
    this.educationalCategoryImageSizeTextCurrent = "";
    this.educationalCategoryNotes = "";
    this.parentEducationalCategoryToken = null;
    this.parentEducationalCategoryData = new EducationalCategoryInfoData();
    this.systemComponentToken = "";
    this.systemComponentData = new SystemComponentInfoData();
    this.systemComponentHierarchyToken = "";
    this.systemComponentsHierarchyData =
      new SystemComponentsHierarchyInfoData();
    this.gradingPlanToken = "";
    this.gradingPlanData = new GradingPlan();
    this.educationalCategorySuccessDegree = 0;
    this.educationalCategoryFinalDegree = 0;
    this.attendanceStatus = false;
    this.attendanceSuccessDegree = 0;
    this.attendanceFinalDegree = 0;
    this.finalExamStatus = false;
    this.finalExamSuccessDegree = 0;
    this.finalExamFinalDegree = 0;
    this.midtermExamStatus = false;
    this.midtermExamSuccessDegree = 0;
    this.midtermExamFinalDegree = 0;
    this.oralExamStatus = false;
    this.oralExamSuccessDegree = 0;
    this.oralExamFinalDegree = 0;
    this.periodicalExamStatus = false;
    this.periodicalExamCount = 0;
    this.periodicalExamSuccessDegree = 0;
    this.periodicalExamFinalDegree = 0;
    this.reExamStatus = false;
    this.maxCountNumberReExam = 0;
    this.calculationInGrandTotalStatus = false;
    this.totalFailureEducationalCategory = 0;
    this.failingStatusOnParentEducationalCategory = false;
    this.isHaveChildrenStatus = false;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.educationalCategoryNameCurrent =
        data.educationalCategoryNameCurrent || "";
      this.educationalCategoryNameAr = data.educationalCategoryNameAr || "";
      this.educationalCategoryNameEn = data.educationalCategoryNameEn || "";
      this.educationalCategoryNameUnd = data.educationalCategoryNameUnd || "";
      this.educationalCategoryDescriptionCurrent =
        data.educationalCategoryDescriptionCurrent || "";
      this.educationalCategoryDescriptionAr =
        data.educationalCategoryDescriptionAr || "";
      this.educationalCategoryDescriptionEn =
        data.educationalCategoryDescriptionEn || "";
      this.educationalCategoryDescriptionUnd =
        data.educationalCategoryDescriptionUnd || "";
      this.educationalCategoryImageIsDefault =
        data.educationalCategoryImageIsDefault || false;
      this.educationalCategoryImagePath =
        data.educationalCategoryImagePath || "";
      this.educationalCategoryImageSizeBytes =
        data.educationalCategoryImageSizeBytes || "";
      this.educationalCategoryImageSizeTextCurrent =
        data.educationalCategoryImageSizeTextCurrent || "";
      this.educationalCategoryNotes = data.educationalCategoryNotes || "";
      this.parentEducationalCategoryToken =
        data.parentEducationalCategoryToken || null;
      this.parentEducationalCategoryData.fillData(
        data.parentEducationalCategoryData
      );
      this.systemComponentToken = data.systemComponentToken || "";
      this.systemComponentData.fillData(data.systemComponentData);
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken || "";
      this.systemComponentsHierarchyData.fillData(
        data.systemComponentsHierarchyData
      );
      this.gradingPlanToken = data.gradingPlanToken || "";
      this.gradingPlanData.fillData(data.gradingPlanData);
      this.educationalCategorySuccessDegree =
        data.educationalCategorySuccessDegree || 0;
      this.educationalCategoryFinalDegree =
        data.educationalCategoryFinalDegree || 0;
      this.attendanceStatus = data.attendanceStatus || false;
      this.attendanceSuccessDegree = data.attendanceSuccessDegree || 0;
      this.attendanceFinalDegree = data.attendanceFinalDegree || 0;
      this.finalExamStatus = data.finalExamStatus || false;
      this.finalExamSuccessDegree = data.finalExamSuccessDegree || 0;
      this.finalExamFinalDegree = data.finalExamFinalDegree || 0;
      this.midtermExamStatus = data.midtermExamStatus || false;
      this.midtermExamSuccessDegree = data.midtermExamSuccessDegree || 0;
      this.midtermExamFinalDegree = data.midtermExamFinalDegree || 0;
      this.oralExamStatus = data.oralExamStatus || false;
      this.oralExamSuccessDegree = data.oralExamSuccessDegree || 0;
      this.oralExamFinalDegree = data.oralExamFinalDegree || 0;
      this.periodicalExamStatus = data.periodicalExamStatus || false;
      this.periodicalExamCount = data.periodicalExamCount || 0;
      this.periodicalExamSuccessDegree = data.periodicalExamSuccessDegree || 0;
      this.periodicalExamFinalDegree = data.periodicalExamFinalDegree || 0;
      this.reExamStatus = data.reExamStatus || false;
      this.maxCountNumberReExam = data.maxCountNumberReExam || 0;
      this.calculationInGrandTotalStatus =
        data.calculationInGrandTotalStatus || false;
      this.totalFailureEducationalCategory =
        data.totalFailureEducationalCategory || 0;
      this.failingStatusOnParentEducationalCategory =
        data.failingStatusOnParentEducationalCategory || false;
      this.isHaveChildrenStatus = data.isHaveChildrenStatus || false;
    } else {
      this.setInitialValue();
    }
  }
}
