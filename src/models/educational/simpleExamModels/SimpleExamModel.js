import EducationalCategoryInfoData from "./../educationalCategories/EducationalCategoryInfoData";
import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/SimpleExamModels.svg";

export default class SimpleExamModel extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.simpleExamModelToken = "";
    this.simpleExamModelTitleCurrent = "";
    this.simpleExamModelTitleAr = "";
    this.simpleExamModelTitleEn = "";
    this.simpleExamModelTitleUnd = "";
    this.simpleExamModelDescriptionCurrent = "";
    this.simpleExamModelDescriptionAr = "";
    this.simpleExamModelDescriptionEn = "";
    this.simpleExamModelDescriptionUnd = "";
    this.simpleExamModelNotes = "";
    this.simpleExamModelImageIsDefault = true;
    this.simpleExamModelImagePath = "";
    this.simpleExamModelImageSizeBytes = 0;
    this.simpleExamModelImageSizeTextCurrent = "";
    this.examTypeToken = "";
    this.examTypeNameCurrent = "";
    this.simpleExamModelDegree = 0;
    this.educationalCategoryToken = "";
    this.educationalCategoryData = new EducationalCategoryInfoData();
    this.simpleExamParagraphsData = [];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.simpleExamModelToken = data.simpleExamModelToken || "";
      this.simpleExamModelTitleCurrent = data.simpleExamModelTitleCurrent || "";
      this.simpleExamModelTitleAr = data.simpleExamModelTitleAr || "";
      this.simpleExamModelTitleEn = data.simpleExamModelTitleEn || "";
      this.simpleExamModelTitleUnd = data.simpleExamModelTitleUnd || "";
      this.simpleExamModelDescriptionCurrent =
        data.simpleExamModelDescriptionCurrent || "";
      this.simpleExamModelDescriptionAr =
        data.simpleExamModelDescriptionAr || "";
      this.simpleExamModelDescriptionEn =
        data.simpleExamModelDescriptionEn || "";
      this.simpleExamModelDescriptionUnd =
        data.simpleExamModelDescriptionUnd || "";
      this.simpleExamModelNotes = data.simpleExamModelNotes || "";
      this.simpleExamModelImageIsDefault =
        data.simpleExamModelImageIsDefault || true;
      this.simpleExamModelImagePath = data.simpleExamModelImagePath || "";
      this.simpleExamModelImageSizeBytes =
        data.simpleExamModelImageSizeBytes || "";
      this.simpleExamModelImageSizeTextCurrent =
        data.simpleExamModelImageSizeTextCurrent || "";
      this.examTypeToken = data.examTypeToken || "";
      this.examTypeNameCurrent = data.examTypeNameCurrent || "";
      this.simpleExamModelDegree = data.simpleExamModelDegree || 0;
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.educationalCategoryData.fillData(data.educationalCategoryData);
      this.simpleExamParagraphsData = data.simpleExamParagraphsData || [];
    } else {
      this.setInitialValue();
    }
  }
}
