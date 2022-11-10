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
import SectorsFilter from "./SectorsFilter";
import SectorImg from "@/assets/images/sectors.svg";

export default class Sector extends BaseEntityModel {
  basicImport = new BasicImport();
  helper = new Helper();
  activationTypeToken =
    store.getters.generalSetting.sectors.activationTypeTokens;
  defaultImg = SectorImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.mediaFile = "";
    this.sectorToken = "";
    this.sectorNameCurrent = "";
    this.sectorNameAr = "";
    this.sectorNameEn = "";
    this.sectorNameUnd = "";
    this.sectorDescriptionCurrent = "";
    this.sectorDescriptionAr = "";
    this.sectorDescriptionEn = "";
    this.sectorDescriptionUnd = "";
    this.sectorNotes = "";
    this.sectorImagePath = "";
    this.sectorArchiveStatus = "";
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.sectorToken = data.sectorToken;
    this.sectorNameCurrent = data.sectorNameCurrent;
    this.sectorNameAr = data.sectorNameAr;
    this.sectorNameEn = data.sectorNameEn;
    this.sectorNameUnd = data.sectorNameUnd;
    this.sectorDescriptionCurrent = data.sectorDescriptionCurrent;
    this.sectorDescriptionAr = data.sectorDescriptionAr;
    this.sectorDescriptionEn = data.sectorDescriptionEn;
    this.sectorDescriptionUnd = data.sectorDescriptionUnd;
    this.sectorNotes = data.sectorNotes;
    this.sectorImagePath = data.sectorImagePath;
    this.sectorArchiveStatus = data.sectorArchiveStatus;
  }

  async getAllSectors(pagination, filterData = new SectorsFilter()) {
    let sortTokens = this.helper.getSortTokensText(pagination.sortTokens);
    let activationTypeToken = this.helper.getActivationTypeTokenText(
      store.getters.generalSetting.sectors.activationTypeTokens
    );

    return await axios.get(
      `/api/Sectors/GetAllSectors?paginationStatus=${pagination.paginationStatus}&pageSize=${pagination.pageSize}&page=${pagination.selfPage}${sortTokens}${activationTypeToken}&filterStatus=true&textSearch=${filterData.textSearch}&creationDateTimeFrom=${filterData.creationDateTimeFrom}&creationDateTimeTo=${filterData.creationDateTimeTo}&lastUpdateDateTimeFrom=${filterData.lastUpdateDateTimeFrom}&lastUpdateDateTimeTo=${filterData.lastUpdateDateTimeTo}&lastArchiveDateTimeFrom=${filterData.lastArchiveDateTimeFrom}&lastArchiveDateTimeTo=${filterData.lastArchiveDateTimeTo}&lastRestoreDateTimeFrom=${filterData.lastRestoreDateTimeFrom}&lastRestoreDateTimeTo=${filterData.lastRestoreDateTimeTo}`,
      this.basicImport.apiHeader
    );
  }

  async getSectorDialog(filterData = new SectorsFilter()) {
    let options = [];
    try {
      let response = await axios.get(
        `/api/Sectors/GetSectorDialog?filterStatus=true&textSearch=${filterData.textSearch}&itemName={fullCode} - {sectorName${this.basicImport.formatedLanguage}}`,
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
              : SectorImg,
          });
        }
      } else if (response.data.status == STATUS.INVALID_TOKEN) {
        store.dispatch("logoutUser", response.data.msg);
      } else {
        options.push({
          value: "",
          text: response.data.msg,
          image: SectorImg,
        });
      }
    } catch (error) {
      options.push({
        value: "",
        text: i18n.t("errorCatch"),
        image: SectorImg,
      });
    }
    return options;
  }

  async getSectorDetails() {
    return await axios.get(
      `/api/Sectors/GetSectorDetails?token=${this.sectorToken}`,
      this.basicImport.apiHeader
    );
  }

  async addOrUpdateSector() {
    var formData = new FormData();
    formData.append("mediaFile", this.mediaFile);
    formData.append("sectorToken", this.sectorToken);
    formData.append("fullCode", this.fullCode);
    formData.append("sectorNameAr", this.sectorNameAr);
    formData.append("sectorNameEn", this.sectorNameEn);
    formData.append("sectorNameUnd", this.sectorNameUnd);
    formData.append("sectorDescriptionAr", this.sectorDescriptionAr);
    formData.append("sectorDescriptionEn", this.sectorDescriptionEn);
    formData.append("sectorDescriptionUnd", this.sectorDescriptionUnd);
    formData.append("sectorNotes", this.sectorNotes);

    if (this.sectorToken == "" || this.sectorToken == undefined) {
      return await axios.post(
        `/api/Sectors/AddSector`,
        formData,
        this.basicImport.apiHeader
      );
    } else {
      return await axios.post(
        `/api/Sectors/UpdateSector`,
        formData,
        this.basicImport.apiHeader
      );
    }
  }

  async changeActivationTypeSector() {
    var formData = new FormData();
    formData.append("token", this.sectorToken);
    formData.append("activationTypeToken", this.activationTypeToken);

    return await axios.post(
      `/api/Sectors/ChangeActivationTypeSector`,
      formData,
      this.basicImport.apiHeader
    );
  }

  async deleteSector() {
    var formData = new FormData();
    formData.append("token", this.sectorToken);

    return await axios.post(
      `/api/Sectors/DeleteSector`,
      formData,
      this.basicImport.apiHeader
    );
  }
}
//#endregion model
