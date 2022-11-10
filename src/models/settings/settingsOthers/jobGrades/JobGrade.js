import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/jobGrade.svg";
import JobGradeInfoData from "./JobGradeInfoData";
import SystemComponentInfoData from "./../../../systemConfiguration/systemComponents/SystemComponentInfoData";
import SystemComponentsHierarchyInfoData from "./../../../systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchyInfoData";

export default class JobGrade extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.mediaFile = "";
    this.jobGradeToken = "";
    this.jobGradeNameCurrent = "";
    this.jobGradeNameEn = "";
    this.jobGradeNameAr = "";
    this.jobGradeNameUnd = "";
    this.jobGradeDescriptionCurrent = "";
    this.jobGradeDescriptionAr = "";
    this.jobGradeDescriptionEn = "";
    this.jobGradeDescriptionUnd = "";
    this.jobGradeImageIsDefault = "";
    this.jobGradeImagePath = "";
    this.jobGradeImageSizeBytes = "";
    this.jobGradeImageSizeTextCurrent = "";
    this.jobGradeNotes = "";
    this.parentJobGradeToken = "";
    this.systemComponentToken = "";
    this.systemComponentHierarchyToken = "";
    this.parentJobGradeData = new JobGradeInfoData();
    this.systemComponentData = new SystemComponentInfoData();
    this.systemComponentsHierarchyData =
      new SystemComponentsHierarchyInfoData();
    this.isHaveChildrenStatus = false;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.jobGradeToken = data.jobGradeToken ?? "";
      this.jobGradeNameCurrent = data.jobGradeNameCurrent ?? "";
      this.jobGradeNameEn = data.jobGradeNameEn ?? "";
      this.jobGradeNameAr = data.jobGradeNameAr ?? "";
      this.jobGradeNameUnd = data.jobGradeNameUnd ?? "";
      this.jobGradeDescriptionCurrent = data.jobGradeDescriptionCurrent ?? "";
      this.jobGradeDescriptionAr = data.jobGradeDescriptionAr ?? "";
      this.jobGradeDescriptionEn = data.jobGradeDescriptionEn ?? "";
      this.jobGradeDescriptionUnd = data.jobGradeDescriptionUnd ?? "";
      this.jobGradeImageIsDefault = data.jobGradeImageIsDefault ?? "";
      this.jobGradeImagePath = data.jobGradeImagePath ?? "";
      this.jobGradeImageSizeBytes = data.jobGradeImageSizeBytes ?? "";
      this.jobGradeImageSizeTextCurrent =
        data.jobGradeImageSizeTextCurrent ?? "";
      this.jobGradeNotes = data.jobGradeNotes ?? "";
      this.parentJobGradeToken = data.parentJobGradeToken ?? "";
      this.systemComponentToken = data.systemComponentToken ?? "";
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken ?? "";
      this.parentJobGradeData.fillData(data.parentJobGradeData);
      this.systemComponentData.fillData(data.systemComponentData);
      this.systemComponentsHierarchyData.fillData(
        data.systemComponentsHierarchyData
      );
      this.isHaveChildrenStatus = data.isHaveChildrenStatus ?? false;
    } else {
      this.setInitialValue();
    }
  }
}
