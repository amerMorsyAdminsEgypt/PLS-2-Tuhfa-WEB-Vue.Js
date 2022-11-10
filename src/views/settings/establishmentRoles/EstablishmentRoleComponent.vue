<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType(modelName, $event)"
      :viewType="viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypesTokensOptions="getActivationTypeTokenOptions"
      :activationTypeTokens="activationTypeTokens"
      :activationTypeStatus="true"
      :btnAddTitle="$t('EstablishmentRoles.add')"
      :btnAddName="'EstablishmentRoleAdd'"
      :btnAddStatus="hasPrivilegeAdd"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <UserSettingsTabs :key="userTypeToken" :userTypeToken="userTypeToken" />

      <template v-if="hasData">
        <EstablishmentRoleTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setEstablishmentRoleData="setEstablishmentRoleData($event)"
          :establishmentRolesData="establishmentRoles.establishmentRolesData"
          :defaultImg="establishmentRoles.establishmentRole.defaultImg"
          :filterData="establishmentRoles.filterData"
          :modelName="modelName"
        />

        <EstablishmentRoleCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setEstablishmentRoleData="setEstablishmentRoleData($event)"
          :establishmentRolesData="establishmentRoles.establishmentRolesData"
          :defaultImg="establishmentRoles.establishmentRole.defaultImg"
          :filterData="establishmentRoles.filterData"
          :modelName="modelName"
        />

        <ActionsData :actionsData="establishmentRoles.establishmentRole" />
        <EstablishmentRoleInfo
          :establishmentRole="establishmentRoles.establishmentRole"
        />
        <EstablishmentRoleDelete
          :establishmentRole="establishmentRoles.establishmentRole"
          v-on:refresh="refresh()"
        />
        <EstablishmentRoleChangeActivationType
          :establishmentRole="establishmentRoles.establishmentRole"
          v-on:refresh="refresh()"
          :modelName="modelName"
        />
        <CustomBottomSheetQRCode
          :refName="'EstablishmentRoleQRCode'"
          :code="establishmentRoles.establishmentRole.fullCode"
          :codeTitle="$t('EstablishmentRoles.code')"
          :name="
            establishmentRoles.establishmentRole.establishmentRoleNameCurrent
          "
          :nameTitle="$t('EstablishmentRoles.name')"
          :nameIcon="'establishment-role.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="establishmentRoles.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <EstablishmentRoleFilter
        :theFilterData="establishmentRoles.filterData"
        v-on:search="search($event)"
      />

      <EstablishmentRoleAdd
        :establishmentRole="establishmentRoles.establishmentRole"
        v-on:refresh="refresh()"
      />
      <EstablishmentRoleUpdate
        :establishmentRole="establishmentRoles.establishmentRole"
        v-on:refresh="refresh()"
        :modelName="modelName"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../utils/constantLists";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import EstablishmentRoleAdd from "./components/EstablishmentRoleAdd.vue";
import EstablishmentRoleUpdate from "./components/EstablishmentRoleUpdate.vue";
import EstablishmentRoleCards from "./components/EstablishmentRoleCards.vue";
import EstablishmentRoleTable from "./components/EstablishmentRoleTable.vue";
import UserSettingsTabs from "./../../../views/settings/UserSettingsTabs.vue";
import EstablishmentRoleInfo from "./components/EstablishmentRoleInfo.vue";
import EstablishmentRoleDelete from "./components/EstablishmentRoleDelete.vue";
import EstablishmentRoleChangeActivationType from "./components/EstablishmentRoleChangeActivationType.vue";
import EstablishmentRoleFilter from "./components/EstablishmentRoleFilter.vue";
import EstablishmentRoles from "./../../../models/settings/establishmentRoles/EstablishmentRoles";
import apiEstablishmentRole from "./../../../api/settings/establishmentRole";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasAdminsEgyptEstablishmentsRoleViewActive,
  hasAdminsEgyptEstablishmentsRoleViewArchive,
  hasAdminsEgyptEstablishmentsRoleViewBlocked,
  hasMasterAdminEstablishmentsRoleViewActive,
  hasMasterAdminEstablishmentsRoleViewArchive,
  hasMasterAdminEstablishmentsRoleViewBlocked,
  hasEmployeeEstablishmentsRoleViewActive,
  hasEmployeeEstablishmentsRoleViewArchive,
  hasEmployeeEstablishmentsRoleViewBlocked,
  hasStudentEstablishmentsRoleViewActive,
  hasStudentEstablishmentsRoleViewArchive,
  hasStudentEstablishmentsRoleViewBlocked,
  hasSupplierEstablishmentsRoleViewActive,
  hasSupplierEstablishmentsRoleViewArchive,
  hasSupplierEstablishmentsRoleViewBlocked,
  hasParentEstablishmentsRoleViewActive,
  hasParentEstablishmentsRoleViewArchive,
  hasParentEstablishmentsRoleViewBlocked,
  hasClientEstablishmentsRoleViewActive,
  hasClientEstablishmentsRoleViewArchive,
  hasClientEstablishmentsRoleViewBlocked,
  hasAdminsEgyptEstablishmentsRoleAdd,
  hasMasterAdminEstablishmentsRoleAdd,
  hasEmployeeEstablishmentsRoleAdd,
  hasStudentEstablishmentsRoleAdd,
  hasSupplierEstablishmentsRoleAdd,
  hasParentEstablishmentsRoleAdd,
  hasClientEstablishmentsRoleAdd,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    EstablishmentRoleAdd,
    EstablishmentRoleUpdate,
    EstablishmentRoleCards,
    EstablishmentRoleTable,
    UserSettingsTabs,
    EstablishmentRoleInfo,
    EstablishmentRoleDelete,
    EstablishmentRoleChangeActivationType,
    EstablishmentRoleFilter,
  },
  props: {
    userTypeToken: {
      type: String,
      default: "",
    },
    modelName: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["generalSetting"]),
    hasData() {
      return this.establishmentRoles.establishmentRolesData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.modelName].viewType;
    },
    activationTypeTokens() {
      return this.generalSetting[this.modelName].activationTypeTokens;
    },
    getActivationTypeTokenOptions() {
      let options = [];
      switch (this.modelName) {
        case "adminsEgyptEstablishmentsRole":
          options = this.getActivationTypeTokenOptionAdminsEgypt();
          break;
        case "masterAdminEstablishmentsRole":
          options = this.getActivationTypeTokenOptionMasterAdmin();
          break;
        case "employeeEstablishmentsRole":
          options = this.getActivationTypeTokenOptionEmployee();
          break;
        case "studentEstablishmentsRole":
          options = this.getActivationTypeTokenOptionStudent();
          break;
        case "supplierEstablishmentsRole":
          options = this.getActivationTypeTokenOptionSupplier();
          break;
        case "parentEstablishmentsRole":
          options = this.getActivationTypeTokenOptionParent();
          break;
        case "clientEstablishmentsRole":
          options = this.getActivationTypeTokenOptionClient();
          break;
      }
      return options;
    },
    hasPrivilegeAdd() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgyptEstablishmentsRole":
          status = checkPrivilege(hasAdminsEgyptEstablishmentsRoleAdd());
          break;
        case "masterAdminEstablishmentsRole":
          status = checkPrivilege(hasMasterAdminEstablishmentsRoleAdd());
          break;
        case "employeeEstablishmentsRole":
          status = checkPrivilege(hasEmployeeEstablishmentsRoleAdd());
          break;
        case "studentEstablishmentsRole":
          status = checkPrivilege(hasStudentEstablishmentsRoleAdd());
          break;
        case "supplierEstablishmentsRole":
          status = checkPrivilege(hasSupplierEstablishmentsRoleAdd());
          break;
        case "parentEstablishmentsRole":
          status = checkPrivilege(hasParentEstablishmentsRoleAdd());
          break;
        case "clientEstablishmentsRole":
          status = checkPrivilege(hasClientEstablishmentsRoleAdd());
          break;
      }
      return status;
    },
  },
  data() {
    return {
      establishmentRoles: new EstablishmentRoles(this.modelName),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,

    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasAdminsEgyptEstablishmentsRoleViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptEstablishmentsRoleViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptEstablishmentsRoleViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminEstablishmentsRoleViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminEstablishmentsRoleViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminEstablishmentsRoleViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeeEstablishmentsRoleViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeEstablishmentsRoleViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeEstablishmentsRoleViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentEstablishmentsRoleViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentEstablishmentsRoleViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentEstablishmentsRoleViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierEstablishmentsRoleViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierEstablishmentsRoleViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierEstablishmentsRoleViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasParentEstablishmentsRoleViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentEstablishmentsRoleViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentEstablishmentsRoleViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientEstablishmentsRoleViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientEstablishmentsRoleViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientEstablishmentsRoleViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.establishmentRoles.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    changePagination(pagination) {
      this.establishmentRoles.filterData.fillData(pagination);
      this.getAllEstablishmentRoles();
    },
    setEstablishmentRoleData(data) {
      this.establishmentRoles.establishmentRole.fillData(data);
    },
    async changeActivationType(data) {
      await this.updateActivationTypeTokens(this.modelName, data);
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
      setTimeout(() => {
        this.getAllEstablishmentRoles();
      }, 1);
    },
    refresh() {
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
      setTimeout(() => {
        this.getAllEstablishmentRoles();
      }, 1);
    },
    search(data = null) {
      if (data) this.establishmentRoles.filterData.fillData(data);
      this.refresh();
    },
    async getAllEstablishmentRoles() {
      this.isLoading = true;
      try {
        this.establishmentRoles.establishmentRolesData = [];
        const response = await apiEstablishmentRole.getAll(
          this.establishmentRoles.filterData
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
        this.establishmentRoles.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async updateFilterData() {
      this.establishmentRoles.filterData.activationTypeTokens =
        this.generalSetting[this.modelName].activationTypeTokens;
      this.establishmentRoles.filterData.userTypeToken = this.userTypeToken;
      this.establishmentRoles.establishmentRole.userTypeToken =
        this.userTypeToken;
    },
  },
  async created() {
    await this.updateFilterData();
    this.getAllEstablishmentRoles();
  },
};
</script>
