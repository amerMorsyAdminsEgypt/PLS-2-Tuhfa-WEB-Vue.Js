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
import DistrictsFilter from "./DistrictsFilter";
import DistrictImg from "@/assets/images/districts.svg";

export default class District extends BaseEntityModel {
  basicImport = new BasicImport();
  helper = new Helper();
  activationTypeToken =
    store.getters.generalSetting.districts.activationTypeTokens;
  defaultImg = DistrictImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.mediaFile = "";
    this.districtToken = "";
    this.cityToken = "";
    this.governorateToken = "";
    this.countryToken = "";
    this.districtNameCurrent = "";
    this.districtNameAr = "";
    this.districtNameEn = "";
    this.districtNameUnd = "";
    this.districtDescriptionCurrent = "";
    this.districtDescriptionAr = "";
    this.districtDescriptionEn = "";
    this.districtDescriptionUnd = "";
    this.districtNotes = "";
    this.districtImagePath = "";
    this.districtArchiveStatus = "";
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.districtToken = data.districtToken;
    this.cityToken = data.cityToken;
    this.governorateToken = data.governorateToken;
    this.countryToken = data.countryToken;
    this.districtNameCurrent = data.districtNameCurrent;
    this.districtNameAr = data.districtNameAr;
    this.districtNameEn = data.districtNameEn;
    this.districtNameUnd = data.districtNameUnd;
    this.districtDescriptionCurrent = data.districtDescriptionCurrent;
    this.districtDescriptionAr = data.districtDescriptionAr;
    this.districtDescriptionEn = data.districtDescriptionEn;
    this.districtDescriptionUnd = data.districtDescriptionUnd;
    this.districtNotes = data.districtNotes;
    this.districtImagePath = data.districtImagePath;
    this.districtArchiveStatus = data.districtArchiveStatus;
  }

  async getAllDistricts(pagination, filterData = new DistrictsFilter()) {
    let sortTokens = this.helper.getSortTokensText(pagination.sortTokens);
    let activationTypeToken = this.helper.getActivationTypeTokenText(
      store.getters.generalSetting.districts.activationTypeTokens
    );

    return await axios.get(
      `/api/Districts/GetAllDistricts?paginationStatus=${pagination.paginationStatus}&pageSize=${pagination.pageSize}&page=${pagination.selfPage}${sortTokens}${activationTypeToken}&filterStatus=true&textSearch=${filterData.textSearch}&creationDateTimeFrom=${filterData.creationDateTimeFrom}&creationDateTimeTo=${filterData.creationDateTimeTo}&lastUpdateDateTimeFrom=${filterData.lastUpdateDateTimeFrom}&lastUpdateDateTimeTo=${filterData.lastUpdateDateTimeTo}&lastArchiveDateTimeFrom=${filterData.lastArchiveDateTimeFrom}&lastArchiveDateTimeTo=${filterData.lastArchiveDateTimeTo}&lastRestoreDateTimeFrom=${filterData.lastRestoreDateTimeFrom}&lastRestoreDateTimeTo=${filterData.lastRestoreDateTimeTo}`,
      this.basicImport.apiHeader
    );
  }

  async getDistrictDialog(filterData = new DistrictsFilter()) {
    let options = [];
    try {
      let response = await axios.get(
        `/api/Districts/GetDistrictDialog?filterStatus=true&textSearch=${filterData.textSearch}&countryToken=${filterData.countryToken}&itemName={fullCode} - {districtName${this.basicImport.formatedLanguage}}`,
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
              : DistrictImg,
          });
        }
      } else if (response.data.status == STATUS.INVALID_TOKEN) {
        store.dispatch("logoutUser", response.data.msg);
      } else {
        options.push({
          value: "",
          text: response.data.msg,
          image: DistrictImg,
        });
      }
    } catch (error) {
      options.push({
        value: "",
        text: i18n.t("errorCatch"),
        image: DistrictImg,
      });
    }
    return options;
  }

  async getDistrictDetails() {
    return await axios.get(
      `/api/Districts/GetDistrictDetails?token=${this.districtToken}`,
      this.basicImport.apiHeader
    );
  }

  async addOrUpdateDistrict() {
    var formData = new FormData();
    formData.append("mediaFile", this.mediaFile);
    formData.append("districtToken", this.districtToken);
    formData.append("cityToken", this.cityToken);
    formData.append("governorateToken", this.governorateToken);
    formData.append("countryToken", this.countryToken);
    formData.append("fullCode", this.fullCode);
    formData.append("districtNameAr", this.districtNameAr);
    formData.append("districtNameEn", this.districtNameEn);
    formData.append("districtNameUnd", this.districtNameUnd);
    formData.append("districtDescriptionAr", this.districtDescriptionAr);
    formData.append("districtDescriptionEn", this.districtDescriptionEn);
    formData.append("districtDescriptionUnd", this.districtDescriptionUnd);
    formData.append("districtNotes", this.districtNotes);

    if (this.districtToken == "" || this.districtToken == undefined) {
      return await axios.post(
        `/api/Districts/AddDistrict`,
        formData,
        this.basicImport.apiHeader
      );
    } else {
      return await axios.post(
        `/api/Districts/UpdateDistrict`,
        formData,
        this.basicImport.apiHeader
      );
    }
  }

  async changeActivationTypeDistrict() {
    var formData = new FormData();
    formData.append("token", this.districtToken);
    formData.append("activationTypeToken", this.activationTypeToken);

    return await axios.post(
      `/api/Districts/ChangeActivationTypeDistrict`,
      formData,
      this.basicImport.apiHeader
    );
  }

  async deleteDistrict() {
    var formData = new FormData();
    formData.append("token", this.districtToken);

    return await axios.post(
      `/api/Districts/DeleteDistrict`,
      formData,
      this.basicImport.apiHeader
    );
  }
}
//#endregion model
