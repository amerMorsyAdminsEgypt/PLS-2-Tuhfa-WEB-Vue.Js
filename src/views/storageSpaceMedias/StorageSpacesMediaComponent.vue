<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType(modelName, $event)"
      :viewType="generalSetting[modelName].viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting[modelName].activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('StorageSpaces.media.add')"
      :btnAddName="'StorageSpaceMediaAdd'"
      :btnAddStatus="hasPrivilegeAdd"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <b-tabs v-if="mediaTypesOptions">
        <b-tab
          v-for="(option, index) in mediaTypesOptions"
          :key="index"
          @click="filterByMediaType(option.itemToken)"
          :title-item-class="'custom-tab-outer-li tab-container-media'"
          :active="currentTab == option.currentTab ? true : false"
        >
          <template #title>
            <span v-b-popover.hover.bottomright="`${option.itemName}`">
              <img :src="`${option.itemImagePath}`" class="icon-tab" />
              <span>{{ option.itemName }}</span>
              <span class="badge badge-dark" style="margin-inline-start: 8px">
                {{ option.count }}
              </span>
            </span>
          </template>
        </b-tab>
      </b-tabs>
      <template v-if="hasData">
        <StorageSpaceMediaTable
          v-if="generalSetting[modelName].viewType == VIEW_TYPES.table"
          v-on:setStorageSpaceMediaData="
            storageSpaceMedias.storageSpaceMedia.fillData($event)
          "
          :storageSpaceMediaData="storageSpaceMedias.storageSpaceMediaData"
          :defaultImg="storageSpaceMedias.storageSpaceMedia.defaultImg"
          :filterData="storageSpaceMedias.filterData"
        />

        <StorageSpaceMediaCards
          v-else-if="generalSetting[modelName].viewType == VIEW_TYPES.cards"
          v-on:setStorageSpaceMediaData="
            storageSpaceMedias.storageSpaceMedia.fillData($event)
          "
          :storageSpaceMediasData="storageSpaceMedias.storageSpaceMediaData"
          :defaultImg="storageSpaceMedias.storageSpaceMedia.defaultImg"
          :filterData="storageSpaceMedias.filterData"
        />

        <ActionsData :actionsData="storageSpaceMedias.storageSpaceMedia" />
        <StorageSpaceMediaInfo
          :storageSpaceMedia="storageSpaceMedias.storageSpaceMedia"
          :mainToken="storageSpaceMedias.filterData.mainToken"
        />
        <StorageSpaceMediaDelete
          :storageSpaceMedia="storageSpaceMedias.storageSpaceMedia"
          v-on:refresh="getAllStorageSpaceMedias()"
        />
        <StorageSpaceMediaChangeActivationType
          :storageSpaceMedia="storageSpaceMedias.storageSpaceMedia"
          v-on:refresh="getAllStorageSpaceMedias()"
        />
        <CustomBottomSheetQRCode
          :refName="'StorageSpaceMediaQRCode'"
          :code="storageSpaceMedias.storageSpaceMedia.fullCode"
          :codeTitle="$t('StorageSpaces.media.code')"
          :name="
            storageSpaceMedias.storageSpaceMedia.storageSpaceMediaNameCurrent
          "
          :nameTitle="$t('StorageSpaces.media.name')"
          :nameIcon="'media.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="storageSpaceMedias.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <StorageSpaceMediaFilter
        :theFilterData="storageSpaceMedias.filterData"
        v-on:search="search($event)"
      />

      <StorageSpaceMediaAdd
        :storageSpaceMedia="storageSpaceMedias.storageSpaceMedia"
        v-on:refresh="getAllStorageSpaceMedias()"
        :mainToken="storageSpaceMedias.filterData.mainToken"
      />
      <StorageSpaceMediaUpdate
        :storageSpaceMedia="storageSpaceMedias.storageSpaceMedia"
        v-on:refresh="getAllStorageSpaceMedias()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../utils/constants";
import {
  ACTIVATION_TYPE,
  MEDIA_TYPE_TOKENS,
} from "./../../utils/constantLists";
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import StorageSpaceMediaAdd from "./components/StorageSpaceMediaAdd.vue";
import StorageSpaceMediaUpdate from "./components/StorageSpaceMediaUpdate.vue";
import StorageSpaceMediaCards from "./components/StorageSpaceMediaCards.vue";
import StorageSpaceMediaTable from "./components/StorageSpaceMediaTable.vue";
import StorageSpaceMediaInfo from "./components/StorageSpaceMediaInfo.vue";
import StorageSpaceMediaDelete from "./components/StorageSpaceMediaDelete.vue";
import StorageSpaceMediaChangeActivationType from "./components/StorageSpaceMediaChangeActivationType.vue";
import StorageSpaceMediaFilter from "./components/StorageSpaceMediaFilter.vue";
import StorageSpaceMedias from "./../../models/storageSpaceMedias/StorageSpaceMedias";
import apiStorageSpaceMedia from "./../../api/storageSpaceMedia";
import { getDialogOfActivationTypes } from "./../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import {
  checkPrivilege,
  fullPathFileFromServer,
} from "./../../utils/functions";
import {
  hasStorageSpaceMediaAdminsEgyptAdd,
  hasStorageSpaceMediaAdminsEgyptViewActive,
  hasStorageSpaceMediaAdminsEgyptViewArchive,
  hasStorageSpaceMediaAdminsEgyptViewBlocked,
  hasStorageSpaceMediaMasterAdminAdd,
  hasStorageSpaceMediaMasterAdminViewActive,
  hasStorageSpaceMediaMasterAdminViewArchive,
  hasStorageSpaceMediaMasterAdminViewBlocked,
  hasStorageSpaceMediaEmployeeAdd,
  hasStorageSpaceMediaEmployeeViewActive,
  hasStorageSpaceMediaEmployeeViewArchive,
  hasStorageSpaceMediaEmployeeViewBlocked,
  hasStorageSpaceMediaStudentAdd,
  hasStorageSpaceMediaStudentViewActive,
  hasStorageSpaceMediaStudentViewArchive,
  hasStorageSpaceMediaStudentViewBlocked,
  hasStorageSpaceMediaSupplierAdd,
  hasStorageSpaceMediaSupplierViewActive,
  hasStorageSpaceMediaSupplierViewArchive,
  hasStorageSpaceMediaSupplierViewBlocked,
  hasStorageSpaceMediaParentAdd,
  hasStorageSpaceMediaParentViewActive,
  hasStorageSpaceMediaParentViewArchive,
  hasStorageSpaceMediaParentViewBlocked,
  hasStorageSpaceMediaClientAdd,
  hasStorageSpaceMediaClientViewActive,
  hasStorageSpaceMediaClientViewArchive,
  hasStorageSpaceMediaClientViewBlocked,
  // ## Place ##
  hasStorageSpaceMediaPlaceMasterAdminAdd,
  hasStorageSpaceMediaPlaceEmployeeAdd,
  hasStorageSpaceMediaPlaceStudentAdd,
  hasStorageSpaceMediaPlaceSupplierAdd,
  hasStorageSpaceMediaPlaceParentAdd,
  hasStorageSpaceMediaPlaceClientAdd,
  hasStorageSpaceMediaPlaceOtherAdd,
  hasStorageSpaceMediaPlaceMasterAdminViewActive,
  hasStorageSpaceMediaPlaceEmployeeViewActive,
  hasStorageSpaceMediaPlaceStudentViewActive,
  hasStorageSpaceMediaPlaceSupplierViewActive,
  hasStorageSpaceMediaPlaceParentViewActive,
  hasStorageSpaceMediaPlaceClientViewActive,
  hasStorageSpaceMediaPlaceOtherViewActive,
  hasStorageSpaceMediaPlaceMasterAdminViewArchive,
  hasStorageSpaceMediaPlaceEmployeeViewArchive,
  hasStorageSpaceMediaPlaceStudentViewArchive,
  hasStorageSpaceMediaPlaceSupplierViewArchive,
  hasStorageSpaceMediaPlaceParentViewArchive,
  hasStorageSpaceMediaPlaceClientViewArchive,
  hasStorageSpaceMediaPlaceOtherViewArchive,
  hasStorageSpaceMediaPlaceMasterAdminViewBlocked,
  hasStorageSpaceMediaPlaceEmployeeViewBlocked,
  hasStorageSpaceMediaPlaceStudentViewBlocked,
  hasStorageSpaceMediaPlaceSupplierViewBlocked,
  hasStorageSpaceMediaPlaceParentViewBlocked,
  hasStorageSpaceMediaPlaceClientViewBlocked,
  hasStorageSpaceMediaPlaceOtherViewBlocked,
  hasStorageSpaceMediaEducationalGroupAdd,
  hasStorageSpaceMediaEducationalGroupViewActive,
  hasStorageSpaceMediaEducationalGroupViewArchive,
  hasStorageSpaceMediaEducationalGroupViewBlocked,
  hasStorageSpaceMediaEducationalCategoryAdd,
  hasStorageSpaceMediaEducationalCategoryViewActive,
  hasStorageSpaceMediaEducationalCategoryViewArchive,
  hasStorageSpaceMediaEducationalCategoryViewBlocked,
} from "./../../utils/privilegeHelper";
// tabs
import imgImage from "@/assets/images/photo.svg";
import imgVideo from "@/assets/images/video.svg";
import imgAudio from "@/assets/images/voice.svg";
import imgPdf from "@/assets/images/pdf.svg";
import imgExcel from "@/assets/images/excel.svg";
import imgWord from "@/assets/images/word.svg";
import imgPowerPoint from "@/assets/images/ppt.svg";
import imgOther from "@/assets/images/media.svg";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    StorageSpaceMediaAdd,
    StorageSpaceMediaUpdate,
    StorageSpaceMediaCards,
    StorageSpaceMediaTable,
    StorageSpaceMediaInfo,
    StorageSpaceMediaDelete,
    StorageSpaceMediaChangeActivationType,
    StorageSpaceMediaFilter,
  },
  computed: {
    //#region tabs
    countImage() {
      return this.storageSpaceMedias.storageSpaceMediaStatistics
        .totalImageFilesCount;
    },
    countVideo() {
      return this.storageSpaceMedias.storageSpaceMediaStatistics
        .totalVideoFilesCount;
    },
    countAudio() {
      return this.storageSpaceMedias.storageSpaceMediaStatistics
        .totalAudioFilesCount;
    },
    countPdf() {
      return this.storageSpaceMedias.storageSpaceMediaStatistics
        .totalPdfFilesCount;
    },
    countExcel() {
      return this.storageSpaceMedias.storageSpaceMediaStatistics
        .totalExcelFilesCount;
    },
    countWord() {
      return this.storageSpaceMedias.storageSpaceMediaStatistics
        .totalWordFilesCount;
    },
    countPowerPoint() {
      return this.storageSpaceMedias.storageSpaceMediaStatistics
        .totalPowerPointFilesCount;
    },
    countOther() {
      return this.storageSpaceMedias.storageSpaceMediaStatistics
        .totalOtherFilesCount;
    },
    mediaTypesOptions() {
      let tabOptions = [];

      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.image,
        itemName: this.$t("MediaTypes.image"),
        itemImagePath: imgImage,
        currentTab: "image",
        count: this.countImage,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.video,
        itemName: this.$t("MediaTypes.video"),
        itemImagePath: imgVideo,
        currentTab: "video",
        count: this.countVideo,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.audio,
        itemName: this.$t("MediaTypes.audio"),
        itemImagePath: imgAudio,
        currentTab: "audio",
        count: this.countAudio,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.pdf,
        itemName: this.$t("MediaTypes.pdf"),
        itemImagePath: imgPdf,
        currentTab: "pdf",
        count: this.countPdf,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.excel,
        itemName: this.$t("MediaTypes.excel"),
        itemImagePath: imgExcel,
        currentTab: "excel",
        count: this.countExcel,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.word,
        itemName: this.$t("MediaTypes.word"),
        itemImagePath: imgWord,
        currentTab: "word",
        count: this.countWord,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.powerPoint,
        itemName: this.$t("MediaTypes.powerPoint"),
        itemImagePath: imgPowerPoint,
        currentTab: "powerPoint",
        count: this.countPowerPoint,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.other,
        itemName: this.$t("MediaTypes.other"),
        itemImagePath: imgOther,
        currentTab: "other",
        count: this.countOther,
      });

      return tabOptions;
    },

    //#endregion tabs

    hasData() {
      return this.storageSpaceMedias.storageSpaceMediaData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let options = [];
      switch (this.modelName) {
        case "storageSpaceMediasAdminsEgypt":
          options = this.getActivationTypeTokenOptionAdminsEgypt();
          break;
        case "storageSpaceMediasMasterAdmin":
          options = this.getActivationTypeTokenOptionMasterAdmin();
          break;
        case "storageSpaceMediasEmployees":
          options = this.getActivationTypeTokenOptionEmployees();
          break;
        case "storageSpaceMediasStudents":
          options = this.getActivationTypeTokenOptionStudent();
          break;
        case "storageSpaceMediasSuppliers":
          options = this.getActivationTypeTokenOptionSupplier();
          break;
        case "storageSpaceMediasParents":
          options = this.getActivationTypeTokenOptionParent();
          break;
        case "storageSpaceMediasClients":
          options = this.getActivationTypeTokenOptionClient();
          break;
        // #### place ###
        case "storageSpaceMediasPlaceMasterAdmin":
          options = this.getActivationTypeTokenOptionPlaceMasterAdmin();
          break;
        case "storageSpaceMediasPlaceEmployees":
          options = this.getActivationTypeTokenOptionPlaceEmployee();
          break;
        case "storageSpaceMediasPlaceStudents":
          options = this.getActivationTypeTokenOptionPlaceStudent();
          break;
        case "storageSpaceMediasPlaceSuppliers":
          options = this.getActivationTypeTokenOptionPlaceSupplier();
          break;
        case "storageSpaceMediasPlaceParents":
          options = this.getActivationTypeTokenOptionPlaceParent();
          break;
        case "storageSpaceMediasPlaceClients":
          options = this.getActivationTypeTokenOptionPlaceClient();
          break;
        case "storageSpaceMediasPlaceOthers":
          options = this.getActivationTypeTokenOptionPlaceOther();
          break;
        case "storageSpaceMediasEducationalGroup":
          options = this.getActivationTypeTokenOptionEducationalGroup();
          break;
        case "storageSpaceMediasEducationalCategory":
          options = this.getActivationTypeTokenOptionEducationalCategory();
          break;
        default:
          break;
      }
      return options;
    },
    hasPrivilegeAdd() {
      let status = false;
      switch (this.modelName) {
        case "storageSpaceMediasAdminsEgypt":
          status = checkPrivilege(hasStorageSpaceMediaAdminsEgyptAdd());
          break;
        case "storageSpaceMediasMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMediaMasterAdminAdd());
          break;
        case "storageSpaceMediasEmployees":
          status = checkPrivilege(hasStorageSpaceMediaEmployeeAdd());
          break;
        case "storageSpaceMediasStudents":
          status = checkPrivilege(hasStorageSpaceMediaStudentAdd());
          break;
        case "storageSpaceMediasSuppliers":
          status = checkPrivilege(hasStorageSpaceMediaSupplierAdd());
          break;
        case "storageSpaceMediasParents":
          status = checkPrivilege(hasStorageSpaceMediaParentAdd());
          break;
        case "storageSpaceMediasClients":
          status = checkPrivilege(hasStorageSpaceMediaClientAdd());
          break;
        // ## place ##
        case "storageSpaceMediasPlaceMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMediaPlaceMasterAdminAdd());
          break;
        case "storageSpaceMediasPlaceEmployees":
          status = checkPrivilege(hasStorageSpaceMediaPlaceEmployeeAdd());
          break;
        case "storageSpaceMediasPlaceStudents":
          status = checkPrivilege(hasStorageSpaceMediaPlaceStudentAdd());
          break;
        case "storageSpaceMediasPlaceSuppliers":
          status = checkPrivilege(hasStorageSpaceMediaPlaceSupplierAdd());
          break;
        case "storageSpaceMediasPlaceParents":
          status = checkPrivilege(hasStorageSpaceMediaPlaceParentAdd());
          break;
        case "storageSpaceMediasPlaceClients":
          status = checkPrivilege(hasStorageSpaceMediaPlaceClientAdd());
          break;
        case "storageSpaceMediasPlaceOthers":
          status = checkPrivilege(hasStorageSpaceMediaPlaceOtherAdd());
          break;
        case "storageSpaceMediasEducationalGroup":
          status = checkPrivilege(hasStorageSpaceMediaEducationalGroupAdd());
          break;
        case "storageSpaceMediasEducationalCategory":
          status = checkPrivilege(hasStorageSpaceMediaEducationalCategoryAdd());
          break;
        default:
          break;
      }
      return status;
    },
  },
  props: {
    // modelName: {
    //   type: String,
    //   default: "",
    // },
    // storageSpaceMediaTypeToken: {
    //   type: String,
    //   default: "",
    // },
    // mainToken: {
    //   type: String,
    //   default: "",
    // },
  },
  data() {
    return {
      currentTab: "",
      storageSpaceMedias: new StorageSpaceMedias(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      modelName: this.$route.meta.modelName,
      storageSpaceMediaTypeToken: this.$route.meta.storageSpaceMediaTypeToken,
      mainToken: this.$route.params.mainToken,
      storageSpaceToken: this.$route.params.storageSpaceToken,
    };
  },
  methods: {
    checkPrivilege,
    fullPathFileFromServer,
    changePagination(pagination) {
      this.storageSpaceMedias.filterData.fillData(pagination);
      this.getAllStorageSpaceMedias();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens(this.modelName, data);
      this.storageSpaceMedias.filterData.activationTypeTokens = data;
      this.getAllStorageSpaceMedias();
    },
    search(data) {
      this.storageSpaceMedias.filterData.fillData(data);
      this.getAllStorageSpaceMedias();
    },
    async getAllStorageSpaceMedias() {
      this.isLoading = true;
      try {
        this.storageSpaceMedias.filterData.activationTypeTokens =
          this.generalSetting[this.modelName].activationTypeTokens;
        this.storageSpaceMedias.filterData.storageSpaceMediaTypeToken =
          this.storageSpaceMediaTypeToken;

        this.storageSpaceMedias.storageSpaceMediaData = [];
        const response = await apiStorageSpaceMedia.getAll(
          this.storageSpaceMedias.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.storageSpaceMedias.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },

    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaAdminsEgyptViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaAdminsEgyptViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaAdminsEgyptViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaMasterAdminViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaMasterAdminViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaMasterAdminViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployees() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaEmployeeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaEmployeeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaEmployeeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaStudentViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaStudentViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaStudentViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaSupplierViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaSupplierViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaSupplierViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaParentViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaParentViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaParentViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaClientViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaClientViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaClientViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    // ## place ##
    getActivationTypeTokenOptionPlaceMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaPlaceMasterAdminViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceMasterAdminViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceMasterAdminViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceEmployee() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaPlaceEmployeeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceEmployeeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceEmployeeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceStudent() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaPlaceStudentViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceStudentViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceStudentViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceSupplier() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaPlaceSupplierViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceSupplierViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceSupplierViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceParent() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaPlaceParentViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceParentViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceParentViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceClient() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaPlaceClientViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceClientViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceClientViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceOther() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaPlaceOtherViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceOtherViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaPlaceOtherViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEducationalGroup() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaEducationalGroupViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaEducationalGroupViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMediaEducationalGroupViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEducationalCategory() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMediaEducationalCategoryViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (
        checkPrivilege(hasStorageSpaceMediaEducationalCategoryViewArchive())
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (
        checkPrivilege(hasStorageSpaceMediaEducationalCategoryViewBlocked())
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaceMedias.storageSpaceMediaStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    filterByMediaType(mediaTypeToken) {
      this.currentTab = mediaTypeToken;
      this.storageSpaceMedias.filterData.storageSpaceMediaFileTypeToken =
        mediaTypeToken;
      this.getAllStorageSpaceMedias();
    },
  },
  async created() {
    this.storageSpaceMedias.filterData.mainToken = this.mainToken;
    this.storageSpaceMedias.filterData.storageSpaceToken =
      this.storageSpaceToken;
    this.filterByMediaType(MEDIA_TYPE_TOKENS.image);
    this.storageSpaceMedias.filterData.storageSpaceMediaFileTypeToken =
      this.currentTab;
    this.getAllStorageSpaceMedias();
  },
};
</script>
