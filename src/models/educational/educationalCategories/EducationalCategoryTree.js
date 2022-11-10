import defaultImg from "@/assets/images/EducationalCategories.svg";
import imgEducationalJoiningApplications from "@/assets/images/EducationalJoiningApplications.svg";
import imgEducationalGroups from "@/assets/images/EducationalGroups.svg";
import imgPriceLists from "@/assets/images/PriceLists.svg";
import imgInfo from "@/assets/images/info.svg";
import imgQrCode from "@/assets/images/qr-code.svg";
import imgEdit from "@/assets/images/pencil.svg";
import imgDelete from "@/assets/images/trash.svg";
import imgChangeActivationType from "@/assets/images/changeActivationType.svg";
import { CUSTOM_TREE_ACTION_TYPE } from "./../../../utils/constantLists";
import {
  fullPathFileFromServer,
  checkPrivilege,
} from "./../../../utils/functions";
import {
  hasEducationalJoiningApplication,
  hasEducationalGroup,
  hasPriceList,
  hasEducationalCategoryEdit,
  hasEducationalCategoryFinaleDelete,
  hasEducationalCategoryChangeActivationType,
} from "./../../../utils/privilegeHelper";
import i18n from "./../../../i18n";

export default class EducationalCategoryTree {
  constructor(data = "") {
    if (data) this.fillData(data);
    else this.setInitialValue();
  }
  setInitialValue() {
    this.name = "";
    this.image = "";
    this.actions = [];
    this.children = [];
  }
  fillData(data) {
    if (data) {
      this.name = data.itemNameCurrent || "";
      this.image =
        fullPathFileFromServer(data.itemImagePath, defaultImg) || defaultImg;

      this.actions = [];
      if (checkPrivilege(hasEducationalJoiningApplication()))
        this.actions.push({
          type: CUSTOM_TREE_ACTION_TYPE.link,
          title: i18n.t("EducationalJoiningApplications.modelName"),
          icon: imgEducationalJoiningApplications,
          route: {
            name: "EducationalJoiningApplications",
            params: { educationalCategoryToken: data.itemToken },
          },
        });

      if (checkPrivilege(hasEducationalGroup()))
        this.actions.push({
          type: CUSTOM_TREE_ACTION_TYPE.link,
          title: i18n.t("EducationalGroups.modelName"),
          icon: imgEducationalGroups,
          route: {
            name: "EducationalGroups",
            params: { educationalCategoryToken: data.itemToken },
          },
        });

      if (checkPrivilege(hasPriceList()))
        this.actions.push({
          type: CUSTOM_TREE_ACTION_TYPE.link,
          title: i18n.t("PriceLists.modelName"),
          icon: imgPriceLists,
          route: {
            name: "PriceLists",
            params: { educationalCategoryToken: data.itemToken },
          },
        });

      this.actions.push({
        type: CUSTOM_TREE_ACTION_TYPE.bottomSheet,
        title: i18n.t("info"),
        icon: imgInfo,
        actionName: "EducationalCategoryInfo",
        data: { educationalCategoryToken: data.itemToken },
      });

      this.actions.push({
        type: CUSTOM_TREE_ACTION_TYPE.bottomSheet,
        title: i18n.t("general.qrCode"),
        icon: imgQrCode,
        actionName: "EducationalCategoryQRCode",
        data: {
          fullCode: data.itemFullCode,
          educationalCategoryNameCurrent: data.itemNameCurrent,
        },
      });

      if (checkPrivilege(hasEducationalCategoryEdit()))
        this.actions.push({
          type: CUSTOM_TREE_ACTION_TYPE.bottomSheet,
          title: i18n.t("edit"),
          icon: imgEdit,
          actionName: "EducationalCategoryUpdate",
          data: { educationalCategoryToken: data.itemToken },
        });

      if (checkPrivilege(hasEducationalCategoryFinaleDelete()))
        this.actions.push({
          type: CUSTOM_TREE_ACTION_TYPE.modal,
          title: i18n.t("delete"),
          icon: imgDelete,
          actionName: "EducationalCategoryDelete",
          data: {
            educationalCategoryToken: data.itemToken,
            educationalCategoryNameCurrent: data.itemNameCurrent,
          },
        });

      if (checkPrivilege(hasEducationalCategoryChangeActivationType()))
        this.actions.push({
          type: CUSTOM_TREE_ACTION_TYPE.modal,
          title: i18n.t("changeActivationType"),
          icon: imgChangeActivationType,
          actionName: "EducationalCategoryChangeActivationType",
          data: {
            educationalCategoryToken: data.itemToken,
            educationalCategoryNameCurrent: data.itemNameCurrent,
            activationTypeToken: data.itemActivationTypeToken,
          },
        });

      this.children = data.childrenData
        ? data.childrenData.map((item) => new EducationalCategoryTree(item))
        : [];
    } else {
      this.setInitialValue();
    }
  }
}
