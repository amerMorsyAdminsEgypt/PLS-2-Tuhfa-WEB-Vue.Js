import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/GradingPlans.svg";
import GradingPlanSlicesData from "./GradingPlanSlicesData";

export default class GradingPlan extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.gradingPlanToken = "";
    this.gradingPlanNameCurrent = "";
    this.gradingPlanNameAr = "";
    this.gradingPlanNameEn = "";
    this.gradingPlanNameUnd = "";
    this.gradingPlanDescriptionCurrent = "";
    this.gradingPlanDescriptionAr = "";
    this.gradingPlanDescriptionEn = "";
    this.gradingPlanDescriptionUnd = "";
    this.gradingPlanNotes = "";
    this.gradingPlanImageIsDefault = false;
    this.gradingPlanImagePath = "";
    this.gradingPlanImageSizeBytes = 0;
    this.gradingPlanImageSizeTextCurrent = "";
    this.gradingPlanSlicesTypeToken = "";
    this.gradingPlanSlicesTypeNameCurrent = "";
    this.gradingPlanSlicesData = [new GradingPlanSlicesData()];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.gradingPlanToken = data.gradingPlanToken ?? "";
      this.gradingPlanNameCurrent = data.gradingPlanNameCurrent ?? "";
      this.gradingPlanNameAr = data.gradingPlanNameAr ?? "";
      this.gradingPlanNameEn = data.gradingPlanNameEn ?? "";
      this.gradingPlanNameUnd = data.gradingPlanNameUnd ?? "";
      this.gradingPlanDescriptionCurrent =
        data.gradingPlanDescriptionCurrent ?? "";
      this.gradingPlanDescriptionAr = data.gradingPlanDescriptionAr ?? "";
      this.gradingPlanDescriptionEn = data.gradingPlanDescriptionEn ?? "";
      this.gradingPlanDescriptionUnd = data.gradingPlanDescriptionUnd ?? "";
      this.gradingPlanNotes = data.gradingPlanNotes ?? "";
      this.gradingPlanImageIsDefault = data.gradingPlanImageIsDefault ?? false;
      this.gradingPlanImagePath = data.gradingPlanImagePath ?? "";
      this.gradingPlanImageSizeBytes = data.gradingPlanImageSizeBytes ?? 0;
      this.gradingPlanImageSizeTextCurrent =
        data.gradingPlanImageSizeTextCurrent ?? "";
      this.gradingPlanSlicesTypeToken = data.gradingPlanSlicesTypeToken ?? "";
      this.gradingPlanSlicesTypeNameCurrent =
        data.gradingPlanSlicesTypeNameCurrent ?? "";
      this.gradingPlanSlicesData = data.gradingPlanSlicesData ?? [
        new GradingPlanSlicesData(),
      ];
    } else {
      this.setInitialValue();
    }
  }
}
