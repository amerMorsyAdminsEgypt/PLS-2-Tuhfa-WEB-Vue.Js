//#region basicImport
import axios from "axios";
import i18n from "./../../../../i18n";
import store from "./../../../../store";
import { STATUS, BASE_URL } from "./../../../../utils/constants";
import BaseEntityModel from "./../../../general/BaseEntityModel";
import BasicImport from "./../../../general/BasicImport";
import Helper from "./../../../general/Helper";
//#endregion basicImport

//#region model
import GovernoratesFilter from "./GovernoratesFilter";
import GovernorateImg from "@/assets/images/governorates.svg";

export default class Governorate extends BaseEntityModel {
  basicImport = new BasicImport();
  helper = new Helper();
  activationTypeToken =
    store.getters.generalSetting.governorates.activationTypeTokens;
  defaultImg = GovernorateImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.mediaFile = "";
    this.governorateToken = "";
    this.countryToken = "";
    this.governorateNameCurrent = "";
    this.governorateNameAr = "";
    this.governorateNameEn = "";
    this.governorateNameUnd = "";
    this.governorateDescriptionCurrent = "";
    this.governorateDescriptionAr = "";
    this.governorateDescriptionEn = "";
    this.governorateDescriptionUnd = "";
    this.governorateNotes = "";
    this.governorateImagePath = "";
    this.governorateArchiveStatus = "";
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.governorateToken = data.governorateToken;
    this.countryToken = data.countryToken;
    this.governorateNameCurrent = data.governorateNameCurrent;
    this.governorateNameAr = data.governorateNameAr;
    this.governorateNameEn = data.governorateNameEn;
    this.governorateNameUnd = data.governorateNameUnd;
    this.governorateDescriptionCurrent = data.governorateDescriptionCurrent;
    this.governorateDescriptionAr = data.governorateDescriptionAr;
    this.governorateDescriptionEn = data.governorateDescriptionEn;
    this.governorateDescriptionUnd = data.governorateDescriptionUnd;
    this.governorateNotes = data.governorateNotes;
    this.governorateImagePath = data.governorateImagePath;
    this.governorateArchiveStatus = data.governorateArchiveStatus;
  }

  async getAllGovernorates(pagination, filterData = new GovernoratesFilter()) {
    let sortTokens = this.helper.getSortTokensText(pagination.sortTokens);
    let activationTypeToken = this.helper.getActivationTypeTokenText(
      store.getters.generalSetting.governorates.activationTypeTokens
    );

    return await axios.get(
      `/api/Governorates/GetAllGovernorates?paginationStatus=${pagination.paginationStatus}&pageSize=${pagination.pageSize}&page=${pagination.selfPage}${sortTokens}${activationTypeToken}&filterStatus=true&textSearch=${filterData.textSearch}&creationDateTimeFrom=${filterData.creationDateTimeFrom}&creationDateTimeTo=${filterData.creationDateTimeTo}&lastUpdateDateTimeFrom=${filterData.lastUpdateDateTimeFrom}&lastUpdateDateTimeTo=${filterData.lastUpdateDateTimeTo}&lastArchiveDateTimeFrom=${filterData.lastArchiveDateTimeFrom}&lastArchiveDateTimeTo=${filterData.lastArchiveDateTimeTo}&lastRestoreDateTimeFrom=${filterData.lastRestoreDateTimeFrom}&lastRestoreDateTimeTo=${filterData.lastRestoreDateTimeTo}`,
      this.basicImport.apiHeader
    );
  }

  async getGovernorateDialog(filterData = new GovernoratesFilter()) {
    let options = [];
    try {
      let response = await axios.get(
        `/api/Governorates/GetGovernorateDialog?filterStatus=true&textSearch=${filterData.textSearch}&countryToken=${filterData.countryToken}&itemName={fullCode} - {governorateName${this.basicImport.formatedLanguage}}`,
        this.basicImport.apiHeader
      );
      const itemsData = response.data.itemsData;
      if (response.data.status == STATUS.SUCCESS) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["itemToken"],
            text: itemsData[item]["itemName"],
            image: itemsData[item]["itemImagePath"]
              ? BASE_URL + itemsData[item]["itemImagePath"]
              : GovernorateImg,
          });
        }
      } else if (response.data.status == STATUS.INVALID_TOKEN) {
        store.dispatch("logoutUser", response.data.msg);
      } else {
        options.push({
          value: "",
          text: response.data.msg,
          image: GovernorateImg,
        });
      }
    } catch (error) {
      options.push({
        value: "",
        text: i18n.t("errorCatch"),
        image: GovernorateImg,
      });
    }
    return options;
  }

  async getGovernorateDetails() {
    return await axios.get(
      `/api/Governorates/GetGovernorateDetails?token=${this.governorateToken}`,
      this.basicImport.apiHeader
    );
  }

  async addOrUpdateGovernorate() {
    var formData = new FormData();
    formData.append("mediaFile", this.mediaFile);
    formData.append("governorateToken", this.governorateToken);
    formData.append("countryToken", this.countryToken);
    formData.append("fullCode", this.fullCode);
    formData.append("governorateNameAr", this.governorateNameAr);
    formData.append("governorateNameEn", this.governorateNameEn);
    formData.append("governorateNameUnd", this.governorateNameUnd);
    formData.append("governorateDescriptionAr", this.governorateDescriptionAr);
    formData.append("governorateDescriptionEn", this.governorateDescriptionEn);
    formData.append(
      "governorateDescriptionUnd",
      this.governorateDescriptionUnd
    );
    formData.append("governorateNotes", this.governorateNotes);

    if (this.governorateToken == "" || this.governorateToken == undefined) {
      return await axios.post(
        `/api/Governorates/AddGovernorate`,
        formData,
        this.basicImport.apiHeader
      );
    } else {
      return await axios.post(
        `/api/Governorates/UpdateGovernorate`,
        formData,
        this.basicImport.apiHeader
      );
    }
  }

  async changeActivationTypeGovernorate() {
    var formData = new FormData();
    formData.append("token", this.governorateToken);
    formData.append("activationTypeToken", this.activationTypeToken);

    return await axios.post(
      `/api/Governorates/ChangeActivationTypeGovernorate`,
      formData,
      this.basicImport.apiHeader
    );
  }

  async deleteGovernorate() {
    var formData = new FormData();
    formData.append("token", this.governorateToken);

    return await axios.post(
      `/api/Governorates/DeleteGovernorate`,
      formData,
      this.basicImport.apiHeader
    );
  }
}
//#endregion model
