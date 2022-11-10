import { getUserAuthorizeToken } from "./../../../utils/functions";
import EducationalCategoryInfoData from "./../educationalCategories/EducationalCategoryInfoData";
import defaultImg from "@/assets/images/SimpleExamModels.svg";

export default class SimpleExamModelModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userAuthorizeToken = getUserAuthorizeToken();
    this.fullCode = "";
    this.simpleExamModelToken = "";
    this.simpleExamModelTitleAr = "";
    this.simpleExamModelTitleEn = "";
    this.simpleExamModelTitleUnd = "";
    this.simpleExamModelDescriptionAr = "";
    this.simpleExamModelDescriptionEn = "";
    this.simpleExamModelDescriptionUnd = "";
    this.simpleExamModelNotes = "";
    this.examTypeToken = "";
    this.simpleExamModelDegree = 0;
    this.educationalCategoryToken = "";
    this.educationalCategoryData = new EducationalCategoryInfoData();
    this.simpleExamParagraphsData = [];
  }
  fillData(data) {
    if (data) {
      this.fullCode = data.fullCode || "";
      this.simpleExamModelToken = data.simpleExamModelToken || "";
      this.simpleExamModelTitleAr = data.simpleExamModelTitleAr || "";
      this.simpleExamModelTitleEn = data.simpleExamModelTitleEn || "";
      this.simpleExamModelTitleUnd = data.simpleExamModelTitleUnd || "";
      this.simpleExamModelDescriptionAr =
        data.simpleExamModelDescriptionAr || "";
      this.simpleExamModelDescriptionEn =
        data.simpleExamModelDescriptionEn || "";
      this.simpleExamModelDescriptionUnd =
        data.simpleExamModelDescriptionUnd || "";
      this.simpleExamModelNotes = data.simpleExamModelNotes || "";
      this.examTypeToken = data.examTypeToken || "";
      this.simpleExamModelDegree = data.simpleExamModelDegree || 0;
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.educationalCategoryData.fillData(data.educationalCategoryData);
      this.simpleExamParagraphsData = data.simpleExamParagraphsData || [];
    } else {
      this.setInitialValue();
    }
  }
}
