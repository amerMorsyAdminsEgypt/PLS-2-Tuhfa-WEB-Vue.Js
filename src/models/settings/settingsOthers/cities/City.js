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
import CitiesFilter from "./CitiesFilter";
import CityImg from "@/assets/images/cities.svg";

export default class City extends BaseEntityModel {
  basicImport = new BasicImport();
  helper = new Helper();
  activationTypeToken =
    store.getters.generalSetting.cities.activationTypeTokens;
  defaultImg = CityImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.mediaFile = "";
    this.cityToken = "";
    this.governorateToken = "";
    this.countryToken = "";
    this.cityNameCurrent = "";
    this.cityNameAr = "";
    this.cityNameEn = "";
    this.cityNameUnd = "";
    this.cityDescriptionCurrent = "";
    this.cityDescriptionAr = "";
    this.cityDescriptionEn = "";
    this.cityDescriptionUnd = "";
    this.cityNotes = "";
    this.cityImagePath = "";
    this.cityArchiveStatus = "";
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.cityToken = data.cityToken;
    this.governorateToken = data.governorateToken;
    this.countryToken = data.countryToken;
    this.cityNameCurrent = data.cityNameCurrent;
    this.cityNameAr = data.cityNameAr;
    this.cityNameEn = data.cityNameEn;
    this.cityNameUnd = data.cityNameUnd;
    this.cityDescriptionCurrent = data.cityDescriptionCurrent;
    this.cityDescriptionAr = data.cityDescriptionAr;
    this.cityDescriptionEn = data.cityDescriptionEn;
    this.cityDescriptionUnd = data.cityDescriptionUnd;
    this.cityNotes = data.cityNotes;
    this.cityImagePath = data.cityImagePath;
    this.cityArchiveStatus = data.cityArchiveStatus;
  }

  async getAllCities(pagination, filterData = new CitiesFilter()) {
    let sortTokens = this.helper.getSortTokensText(pagination.sortTokens);
    let activationTypeToken = this.helper.getActivationTypeTokenText(
      store.getters.generalSetting.cities.activationTypeTokens
    );

    return await axios.get(
      `/api/Cities/GetAllCities?paginationStatus=${pagination.paginationStatus}&pageSize=${pagination.pageSize}&page=${pagination.selfPage}${sortTokens}${activationTypeToken}&filterStatus=true&textSearch=${filterData.textSearch}&governorateToken=${filterData.governorateToken}&creationDateTimeFrom=${filterData.creationDateTimeFrom}&creationDateTimeTo=${filterData.creationDateTimeTo}&lastUpdateDateTimeFrom=${filterData.lastUpdateDateTimeFrom}&lastUpdateDateTimeTo=${filterData.lastUpdateDateTimeTo}&lastArchiveDateTimeFrom=${filterData.lastArchiveDateTimeFrom}&lastArchiveDateTimeTo=${filterData.lastArchiveDateTimeTo}&lastRestoreDateTimeFrom=${filterData.lastRestoreDateTimeFrom}&lastRestoreDateTimeTo=${filterData.lastRestoreDateTimeTo}`,
      this.basicImport.apiHeader
    );
  }

  async getCityDialog(filterData = new CitiesFilter()) {
    let options = [];
    try {
      let response = await axios.get(
        `/api/Cities/GetCityDialog?filterStatus=true&textSearch=${filterData.textSearch}&itemName={fullCode} - {cityName${this.basicImport.formatedLanguage}}`,
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
              : CityImg,
          });
        }
      } else if (response.data.status == STATUS.INVALID_TOKEN) {
        store.dispatch("logoutUser", response.data.msg);
      } else {
        options.push({
          value: "",
          text: response.data.msg,
          image: CityImg,
        });
      }
    } catch (error) {
      options.push({
        value: "",
        text: i18n.t("errorCatch"),
        image: CityImg,
      });
    }
    return options;
  }

  async getCityDetails() {
    return await axios.get(
      `/api/Cities/GetCityDetails?token=${this.cityToken}`,
      this.basicImport.apiHeader
    );
  }

  async addOrUpdateCity() {
    var formData = new FormData();
    formData.append("mediaFile", this.mediaFile);
    formData.append("cityToken", this.cityToken);
    formData.append("governorateToken", this.governorateToken);
    formData.append("countryToken", this.countryToken);
    formData.append("fullCode", this.fullCode);
    formData.append("cityNameAr", this.cityNameAr);
    formData.append("cityNameEn", this.cityNameEn);
    formData.append("cityNameUnd", this.cityNameUnd);
    formData.append("cityDescriptionAr", this.cityDescriptionAr);
    formData.append("cityDescriptionEn", this.cityDescriptionEn);
    formData.append("cityDescriptionUnd", this.cityDescriptionUnd);
    formData.append("cityNotes", this.cityNotes);

    if (this.cityToken == "" || this.cityToken == undefined) {
      return await axios.post(
        `/api/Cities/AddCity`,
        formData,
        this.basicImport.apiHeader
      );
    } else {
      return await axios.post(
        `/api/Cities/UpdateCity`,
        formData,
        this.basicImport.apiHeader
      );
    }
  }

  async changeActivationTypeCity() {
    var formData = new FormData();
    formData.append("token", this.cityToken);
    formData.append("activationTypeToken", this.activationTypeToken);

    return await axios.post(
      `/api/Cities/ChangeActivationTypeCity`,
      formData,
      this.basicImport.apiHeader
    );
  }

  async deleteCity() {
    var formData = new FormData();
    formData.append("token", this.cityToken);

    return await axios.post(
      `/api/Cities/ArchiveCity`,
      formData,
      this.basicImport.apiHeader
    );
  }
}
//#endregion model
