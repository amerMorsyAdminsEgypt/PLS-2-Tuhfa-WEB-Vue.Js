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
      :btnAddTitle="$t('StorageSpaces.add')"
      :btnAddName="'StorageSpaceAdd'"
      :btnAddStatus="hasPrivilegeAdd"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <StorageSpaceTable
          v-if="generalSetting[modelName].viewType == VIEW_TYPES.table"
          v-on:setStorageSpaceData="storageSpaces.storageSpace.fillData($event)"
          :storageSpacesData="storageSpaces.storageSpacesData"
          :defaultImg="storageSpaces.storageSpace.defaultImg"
          :filterData="storageSpaces.filterData"
        />

        <StorageSpaceCards
          v-else-if="generalSetting[modelName].viewType == VIEW_TYPES.cards"
          v-on:setStorageSpaceData="storageSpaces.storageSpace.fillData($event)"
          :storageSpacesData="storageSpaces.storageSpacesData"
          :defaultImg="storageSpaces.storageSpace.defaultImg"
          :filterData="storageSpaces.filterData"
        />

        <ActionsData :actionsData="storageSpaces.storageSpace" />
        <StorageSpaceInfo :storageSpace="storageSpaces.storageSpace" />
        <StorageSpaceDelete
          :storageSpace="storageSpaces.storageSpace"
          v-on:refresh="getAllStorageSpaces()"
        />
        <StorageSpaceChangeActivationType
          :storageSpace="storageSpaces.storageSpace"
          v-on:refresh="getAllStorageSpaces()"
        />
        <CustomBottomSheetQRCode
          :refName="'StorageSpaceQRCode'"
          :code="storageSpaces.storageSpace.fullCode"
          :codeTitle="$t('StorageSpaces.code')"
          :name="storageSpaces.storageSpace.storageSpaceNameCurrent"
          :nameTitle="$t('StorageSpaces.name')"
          :nameIcon="'StorageSpaces.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="storageSpaces.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <StorageSpaceFilter
        :theFilterData="storageSpaces.filterData"
        v-on:search="search($event)"
      />

      <StorageSpaceAdd
        :storageSpace="storageSpaces.storageSpace"
        v-on:refresh="getAllStorageSpaces()"
        :mainToken="storageSpaces.filterData.mainToken"
      />
      <StorageSpaceUpdate
        :storageSpace="storageSpaces.storageSpace"
        v-on:refresh="getAllStorageSpaces()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../utils/constants";
import { ACTIVATION_TYPE } from "./../../utils/constantLists";
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import StorageSpaceAdd from "./components/StorageSpaceAdd.vue";
import StorageSpaceUpdate from "./components/StorageSpaceUpdate.vue";
import StorageSpaceCards from "./components/StorageSpaceCards.vue";
import StorageSpaceTable from "./components/StorageSpaceTable.vue";
import StorageSpaceInfo from "./components/StorageSpaceInfo.vue";
import StorageSpaceDelete from "./components/StorageSpaceDelete.vue";
import StorageSpaceChangeActivationType from "./components/StorageSpaceChangeActivationType.vue";
import StorageSpaceFilter from "./components/StorageSpaceFilter.vue";
import StorageSpaces from "./../../models/storageSpaces/StorageSpaces";
import apiStorageSpace from "./../../api/storageSpace";
import { getDialogOfActivationTypes } from "./../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../utils/functions";
import {
  hasStorageSpaceAdminsEgyptAdd,
  hasStorageSpaceAdminsEgyptViewActive,
  hasStorageSpaceAdminsEgyptViewArchive,
  hasStorageSpaceAdminsEgyptViewBlocked,
  hasStorageSpaceMasterAdminAdd,
  hasStorageSpaceMasterAdminViewActive,
  hasStorageSpaceMasterAdminViewArchive,
  hasStorageSpaceMasterAdminViewBlocked,
  hasStorageSpaceEmployeeAdd,
  hasStorageSpaceEmployeeViewActive,
  hasStorageSpaceEmployeeViewArchive,
  hasStorageSpaceEmployeeViewBlocked,
  hasStorageSpaceStudentAdd,
  hasStorageSpaceStudentViewActive,
  hasStorageSpaceStudentViewArchive,
  hasStorageSpaceStudentViewBlocked,
  hasStorageSpaceSupplierAdd,
  hasStorageSpaceSupplierViewActive,
  hasStorageSpaceSupplierViewArchive,
  hasStorageSpaceSupplierViewBlocked,
  hasStorageSpaceParentAdd,
  hasStorageSpaceParentViewActive,
  hasStorageSpaceParentViewArchive,
  hasStorageSpaceParentViewBlocked,
  hasStorageSpaceClientAdd,
  hasStorageSpaceClientViewActive,
  hasStorageSpaceClientViewArchive,
  hasStorageSpaceClientViewBlocked,
  // ## Place ##
  hasStorageSpacePlaceMasterAdminAdd,
  hasStorageSpacePlaceEmployeeAdd,
  hasStorageSpacePlaceStudentAdd,
  hasStorageSpacePlaceSupplierAdd,
  hasStorageSpacePlaceParentAdd,
  hasStorageSpacePlaceClientAdd,
  hasStorageSpacePlaceOtherAdd,
  hasStorageSpacePlaceMasterAdminViewActive,
  hasStorageSpacePlaceEmployeeViewActive,
  hasStorageSpacePlaceStudentViewActive,
  hasStorageSpacePlaceSupplierViewActive,
  hasStorageSpacePlaceParentViewActive,
  hasStorageSpacePlaceClientViewActive,
  hasStorageSpacePlaceOtherViewActive,
  hasStorageSpacePlaceMasterAdminViewArchive,
  hasStorageSpacePlaceEmployeeViewArchive,
  hasStorageSpacePlaceStudentViewArchive,
  hasStorageSpacePlaceSupplierViewArchive,
  hasStorageSpacePlaceParentViewArchive,
  hasStorageSpacePlaceClientViewArchive,
  hasStorageSpacePlaceOtherViewArchive,
  hasStorageSpacePlaceMasterAdminViewBlocked,
  hasStorageSpacePlaceEmployeeViewBlocked,
  hasStorageSpacePlaceStudentViewBlocked,
  hasStorageSpacePlaceSupplierViewBlocked,
  hasStorageSpacePlaceParentViewBlocked,
  hasStorageSpacePlaceClientViewBlocked,
  hasStorageSpacePlaceOtherViewBlocked,
  hasStorageSpaceEducationalGroupAdd,
  hasStorageSpaceEducationalCategoryAdd,
  hasStorageSpaceEducationalGroupViewActive,
  hasStorageSpaceEducationalGroupViewArchive,
  hasStorageSpaceEducationalGroupViewBlocked,
  hasStorageSpaceEducationalCategoryViewActive,
  hasStorageSpaceEducationalCategoryViewArchive,
  hasStorageSpaceEducationalCategoryViewBlocked,
} from "./../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    StorageSpaceAdd,
    StorageSpaceUpdate,
    StorageSpaceCards,
    StorageSpaceTable,
    StorageSpaceInfo,
    StorageSpaceDelete,
    StorageSpaceChangeActivationType,
    StorageSpaceFilter,
  },
  computed: {
    hasData() {
      return this.storageSpaces.storageSpacesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let options = [];
      switch (this.modelName) {
        case "storageSpacesAdminsEgypt":
          options = this.getActivationTypeTokenOptionAdminsEgypt();
          break;
        case "storageSpacesMasterAdmin":
          options = this.getActivationTypeTokenOptionMasterAdmin();
          break;
        case "storageSpacesEmployees":
          options = this.getActivationTypeTokenOptionEmployees();
          break;
        case "storageSpacesStudents":
          options = this.getActivationTypeTokenOptionStudent();
          break;
        case "storageSpacesSuppliers":
          options = this.getActivationTypeTokenOptionSupplier();
          break;
        case "storageSpacesParents":
          options = this.getActivationTypeTokenOptionParent();
          break;
        case "storageSpacesClients":
          options = this.getActivationTypeTokenOptionClient();
          break;
        // #### place ###
        case "storageSpacesPlaceMasterAdmin":
          options = this.getActivationTypeTokenOptionPlaceMasterAdmin();
          break;
        case "storageSpacesPlaceEmployees":
          options = this.getActivationTypeTokenOptionPlaceEmployee();
          break;
        case "storageSpacesPlaceStudents":
          options = this.getActivationTypeTokenOptionPlaceStudent();
          break;
        case "storageSpacesPlaceSuppliers":
          options = this.getActivationTypeTokenOptionPlaceSupplier();
          break;
        case "storageSpacesPlaceParents":
          options = this.getActivationTypeTokenOptionPlaceParent();
          break;
        case "storageSpacesPlaceClients":
          options = this.getActivationTypeTokenOptionPlaceClient();
          break;
        case "storageSpacesPlaceOthers":
          options = this.getActivationTypeTokenOptionPlaceOther();
          break;
        case "storageSpacesEducationalGroup":
          options = this.getActivationTypeTokenOptionEducationalGroup();
          break;
        case "storageSpacesEducationalCategory":
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
        case "storageSpacesAdminsEgypt":
          status = checkPrivilege(hasStorageSpaceAdminsEgyptAdd());
          break;
        case "storageSpacesMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMasterAdminAdd());
          break;
        case "storageSpacesEmployees":
          status = checkPrivilege(hasStorageSpaceEmployeeAdd());
          break;
        case "storageSpacesStudents":
          status = checkPrivilege(hasStorageSpaceStudentAdd());
          break;
        case "storageSpacesSuppliers":
          status = checkPrivilege(hasStorageSpaceSupplierAdd());
          break;
        case "storageSpacesParents":
          status = checkPrivilege(hasStorageSpaceParentAdd());
          break;
        case "storageSpacesClients":
          status = checkPrivilege(hasStorageSpaceClientAdd());
          break;
        // ## place ##
        case "storageSpacesPlaceMasterAdmin":
          status = checkPrivilege(hasStorageSpacePlaceMasterAdminAdd());
          break;
        case "storageSpacesPlaceEmployees":
          status = checkPrivilege(hasStorageSpacePlaceEmployeeAdd());
          break;
        case "storageSpacesPlaceStudents":
          status = checkPrivilege(hasStorageSpacePlaceStudentAdd());
          break;
        case "storageSpacesPlaceSuppliers":
          status = checkPrivilege(hasStorageSpacePlaceSupplierAdd());
          break;
        case "storageSpacesPlaceParents":
          status = checkPrivilege(hasStorageSpacePlaceParentAdd());
          break;
        case "storageSpacesPlaceClients":
          status = checkPrivilege(hasStorageSpacePlaceClientAdd());
          break;
        case "storageSpacesPlaceOthers":
          status = checkPrivilege(hasStorageSpacePlaceOtherAdd());
          break;
        case "storageSpacesEducationalGroup":
          status = checkPrivilege(hasStorageSpaceEducationalGroupAdd());
          break;
        case "storageSpacesEducationalCategory":
          status = checkPrivilege(hasStorageSpaceEducationalCategoryAdd());
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
    // storageSpaceTypeToken: {
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
      storageSpaces: new StorageSpaces(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      modelName: this.$route.meta.modelName,
      storageSpaceTypeToken: this.$route.meta.storageSpaceTypeToken,
      mainToken: this.$route.params.mainToken,
    };
  },
  methods: {
    checkPrivilege,
    changePagination(pagination) {
      this.storageSpaces.filterData.fillData(pagination);
      this.getAllStorageSpaces();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens(this.modelName, data);
      this.storageSpaces.filterData.activationTypeTokens = data;
      this.getAllStorageSpaces();
    },
    search(data) {
      this.storageSpaces.filterData.fillData(data);
      this.getAllStorageSpaces();
    },
    async getAllStorageSpaces() {
      this.isLoading = true;
      try {
        this.storageSpaces.filterData.activationTypeTokens =
          this.generalSetting[this.modelName].activationTypeTokens;
        this.storageSpaces.filterData.storageSpaceTypeToken =
          this.storageSpaceTypeToken;
        this.storageSpaces.filterData.getOnlyParentStatus = true;

        this.storageSpaces.storageSpacesData = [];
        const response = await apiStorageSpace.getAll(
          this.storageSpaces.filterData
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
        this.storageSpaces.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },

    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceAdminsEgyptViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceAdminsEgyptViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceAdminsEgyptViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceMasterAdminViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMasterAdminViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceMasterAdminViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployees() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceEmployeeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceEmployeeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceEmployeeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceStudentViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceStudentViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceStudentViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceSupplierViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceSupplierViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceSupplierViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceParentViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceParentViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceParentViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceClientViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceClientViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceClientViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    // ## place ##
    getActivationTypeTokenOptionPlaceMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasStorageSpacePlaceMasterAdminViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceMasterAdminViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceMasterAdminViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceEmployee() {
      let arr = [];
      if (checkPrivilege(hasStorageSpacePlaceEmployeeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceEmployeeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceEmployeeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceStudent() {
      let arr = [];
      if (checkPrivilege(hasStorageSpacePlaceStudentViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceStudentViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceStudentViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceSupplier() {
      let arr = [];
      if (checkPrivilege(hasStorageSpacePlaceSupplierViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceSupplierViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceSupplierViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceParent() {
      let arr = [];
      if (checkPrivilege(hasStorageSpacePlaceParentViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceParentViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceParentViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceClient() {
      let arr = [];
      if (checkPrivilege(hasStorageSpacePlaceClientViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceClientViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceClientViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceOther() {
      let arr = [];
      if (checkPrivilege(hasStorageSpacePlaceOtherViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceOtherViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceOtherViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },

    getActivationTypeTokenOptionEducationalGroup() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceEducationalGroupViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceEducationalGroupViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceEducationalGroupViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEducationalCategory() {
      let arr = [];
      if (checkPrivilege(hasStorageSpaceEducationalCategoryViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceEducationalCategoryViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpaceEducationalCategoryViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
  },
  async created() {
    this.storageSpaces.filterData.mainToken = this.mainToken;
    this.getAllStorageSpaces();
  },
};
</script>
