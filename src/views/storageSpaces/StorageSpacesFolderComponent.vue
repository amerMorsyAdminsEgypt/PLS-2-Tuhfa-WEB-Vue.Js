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
      <StorageSpaceTabs />

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
import StorageSpaceTabs from "./components/StorageSpaceTabs.vue";
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
  hasStorageSpacePlaceAdd,
  hasStorageSpacePlaceViewActive,
  hasStorageSpacePlaceViewArchive,
  hasStorageSpacePlaceViewBlocked,
  hasStorageSpaceEducationalGroupAdd,
  hasStorageSpaceEducationalGroupViewActive,
  hasStorageSpaceEducationalGroupViewArchive,
  hasStorageSpaceEducationalGroupViewBlocked,
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
    StorageSpaceTabs,
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
        case "storageSpacesPlaces":
          options = this.getActivationTypeTokenOptionPlaces();
          break;
        case "storageSpacesEducationalGroup":
          options = this.getActivationTypeTokenOptionEducationalGroup();
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
        case "storageSpacesPlaces":
          status = checkPrivilege(hasStorageSpacePlaceAdd());
          break;
        case "storageSpacesEducationalGroup":
          status = checkPrivilege(hasStorageSpaceEducationalGroupAdd());
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
      storageSpaceParentToken: this.$route.params.storageSpaceParentToken,
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
    getActivationTypeTokenOptionPlaces() {
      let arr = [];
      if (checkPrivilege(hasStorageSpacePlaceViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storageSpaces.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStorageSpacePlaceViewBlocked())) {
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
  },
  async created() {
    this.storageSpaces.filterData.mainToken = this.mainToken;
    this.storageSpaces.filterData.storageSpaceParentToken =
      this.storageSpaceParentToken;
    this.getAllStorageSpaces();
  },
};
</script>
