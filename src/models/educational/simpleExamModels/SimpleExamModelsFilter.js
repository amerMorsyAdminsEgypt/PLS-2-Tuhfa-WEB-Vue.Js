import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";
import { getLanguage } from "./../../../utils/functions";
import { LANGUAGES } from "./../../../utils/constants";
import i18n from "./../../../i18n";

export default class SimpleExamModelsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.language = getLanguage();
    switch (this.language) {
      case LANGUAGES.arEG:
        this.itemName = `${i18n.t("code")}: {fullCode} - ${i18n.t(
          "title"
        )}:  {simpleExamModelTitleAr} - ${i18n.t(
          "type"
        )}: {examTypeNameAr} - ${i18n.t(
          "general.degree"
        )}: {simpleExamModelDegree}`;
        break;
      case LANGUAGES.enUS:
        this.itemName = `${i18n.t("code")}: {fullCode} - ${i18n.t(
          "title"
        )}:  {simpleExamModelTitleEn} - ${i18n.t(
          "type"
        )}: {examTypeNameEn} - ${i18n.t(
          "general.degree"
        )}: {simpleExamModelDegree}`;
        break;
    }

    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.simpleExamModels.activationTypeTokens || [];
    this.educationalCategoryToken = "";
    this.simpleExamModelToken = "";
    this.examTypeToken = "";
    this.simpleExamParagraphDataInclude = false;
    this.educationalCategoryDataInclude = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.simpleExamModelToken = data.simpleExamModelToken || "";
      this.examTypeToken = data.examTypeToken || "";
      this.simpleExamParagraphDataInclude =
        data.simpleExamParagraphDataInclude || false;
      this.educationalCategoryDataInclude =
        data.educationalCategoryDataInclude || false;
    } else {
      this.setInitialValue();
    }
  }
}
