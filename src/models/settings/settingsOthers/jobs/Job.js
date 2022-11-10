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
import Sector from "./../sectors/Sector";
import JobsFilter from "./JobsFilter";
import JobImg from "@/assets/images/jobs.svg";

export default class Job extends BaseEntityModel {
  basicImport = new BasicImport();
  helper = new Helper();
  activationTypeToken = store.getters.generalSetting.jobs.activationTypeTokens;
  defaultImg = JobImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.mediaFile = "";
    this.jobToken = "";
    this.jobNameCurrent = "";
    this.jobNameAr = "";
    this.jobNameEn = "";
    this.jobNameUnd = "";
    this.jobDescriptionCurrent = "";
    this.jobDescriptionAr = "";
    this.jobDescriptionEn = "";
    this.jobDescriptionUnd = "";
    this.jobNotes = "";
    this.jobImagePath = "";
    this.jobArchiveStatus = "";
    this.sectorToken = "";
    this.sectorData = new Sector();
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.jobToken = data.jobToken;
    this.jobNameCurrent = data.jobNameCurrent;
    this.jobNameAr = data.jobNameAr;
    this.jobNameEn = data.jobNameEn;
    this.jobNameUnd = data.jobNameUnd;
    this.jobDescriptionCurrent = data.jobDescriptionCurrent;
    this.jobDescriptionAr = data.jobDescriptionAr;
    this.jobDescriptionEn = data.jobDescriptionEn;
    this.jobDescriptionUnd = data.jobDescriptionUnd;
    this.jobNotes = data.jobNotes;
    this.jobImagePath = data.jobImagePath;
    this.jobArchiveStatus = data.jobArchiveStatus;
    this.sectorToken = data.sectorToken;
    this.sectorData.fillData(data.sectorData);
  }

  async getAllJobs(pagination, filterData = new JobsFilter()) {
    let sortTokens = this.helper.getSortTokensText(pagination.sortTokens);
    let activationTypeToken = this.helper.getActivationTypeTokenText(
      store.getters.generalSetting.jobs.activationTypeTokens
    );

    return await axios.get(
      `/api/Jobs/GetAllJobs?paginationStatus=${pagination.paginationStatus}&pageSize=${pagination.pageSize}&page=${pagination.selfPage}${sortTokens}${activationTypeToken}&filterStatus=true&textSearch=${filterData.textSearch}&creationDateTimeFrom=${filterData.creationDateTimeFrom}&creationDateTimeTo=${filterData.creationDateTimeTo}&lastUpdateDateTimeFrom=${filterData.lastUpdateDateTimeFrom}&lastUpdateDateTimeTo=${filterData.lastUpdateDateTimeTo}&lastArchiveDateTimeFrom=${filterData.lastArchiveDateTimeFrom}&lastArchiveDateTimeTo=${filterData.lastArchiveDateTimeTo}&lastRestoreDateTimeFrom=${filterData.lastRestoreDateTimeFrom}&lastRestoreDateTimeTo=${filterData.lastRestoreDateTimeTo}`,
      this.basicImport.apiHeader
    );
  }

  async getJobDialog(filterData = new JobsFilter()) {
    let options = [];
    try {
      let response = await axios.get(
        `/api/Jobs/GetJobDialog?filterStatus=true&textSearch=${filterData.textSearch}&sectorToken=${filterData.sectorToken}&itemName={fullCode} - {jobName${this.basicImport.formatedLanguage}}`,
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
              : JobImg,
          });
        }
      } else if (response.data.status == STATUS.INVALID_TOKEN) {
        store.dispatch("logoutUser", response.data.msg);
      } else {
        options.push({
          value: "",
          text: response.data.msg,
          image: JobImg,
        });
      }
    } catch (error) {
      options.push({
        value: "",
        text: i18n.t("errorCatch"),
        image: JobImg,
      });
    }
    return options;
  }

  async getJobDetails() {
    return await axios.get(
      `/api/Jobs/GetJobDetails?token=${this.jobToken}`,
      this.basicImport.apiHeader
    );
  }

  async addOrUpdateJob() {
    var formData = new FormData();
    formData.append("mediaFile", this.mediaFile);
    formData.append("jobToken", this.jobToken);
    formData.append("fullCode", this.fullCode);
    formData.append("jobNameAr", this.jobNameAr);
    formData.append("jobNameEn", this.jobNameEn);
    formData.append("jobNameUnd", this.jobNameUnd);
    formData.append("jobDescriptionAr", this.jobDescriptionAr);
    formData.append("jobDescriptionEn", this.jobDescriptionEn);
    formData.append("jobDescriptionUnd", this.jobDescriptionUnd);
    formData.append("jobNotes", this.jobNotes);
    formData.append("sectorToken", this.sectorToken);

    if (this.jobToken == "" || this.jobToken == undefined) {
      return await axios.post(
        `/api/Jobs/AddJob`,
        formData,
        this.basicImport.apiHeader
      );
    } else {
      return await axios.post(
        `/api/Jobs/UpdateJob`,
        formData,
        this.basicImport.apiHeader
      );
    }
  }

  async changeActivationTypeJob() {
    var formData = new FormData();
    formData.append("token", this.jobToken);
    formData.append("activationTypeToken", this.activationTypeToken);

    return await axios.post(
      `/api/Jobs/ChangeActivationTypeJob`,
      formData,
      this.basicImport.apiHeader
    );
  }

  async deleteJob() {
    var formData = new FormData();
    formData.append("token", this.jobToken);

    return await axios.post(
      `/api/Jobs/DeleteJob`,
      formData,
      this.basicImport.apiHeader
    );
  }
}
//#endregion model
