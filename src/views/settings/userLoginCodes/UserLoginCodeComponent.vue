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
      :btnAddTitle="$t('UserLoginCodes.add')"
      :btnAddName="'UserLoginCodeAdd'"
      :btnAddStatus="hasPrivilegeAdd"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <UserSettingsTabs :key="userTypeToken" :userTypeToken="userTypeToken" />

      <template v-if="hasData">
        <UserLoginCodesTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setUserLoginCodeData="setUserLoginCodeData($event)"
          :userLoginCodesData="userLoginCodes.userLoginCodesData"
          :defaultImg="userLoginCodes.userLoginCode.defaultImg"
          :filterData="userLoginCodes.filterData"
          :modelName="modelName"
        />

        <UserLoginCodesCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setUserLoginCodeData="setUserLoginCodeData($event)"
          :userLoginCodesData="userLoginCodes.userLoginCodesData"
          :defaultImg="userLoginCodes.userLoginCode.defaultImg"
          :filterData="userLoginCodes.filterData"
          :modelName="modelName"
        />

        <ActionsData :actionsData="userLoginCodes.userLoginCode" />
        <UserLoginCodeInfo :userLoginCode="userLoginCodes.userLoginCode" />
        <UserLoginCodeDelete
          :userLoginCode="userLoginCodes.userLoginCode"
          v-on:refresh="refresh()"
        />
        <UserLoginCodeChangeActivationType
          :userLoginCode="userLoginCodes.userLoginCode"
          v-on:refresh="refresh()"
        />
        <CustomBottomSheetQRCode
          :refName="'UserLoginCodeQRCode'"
          :code="userLoginCodes.userLoginCode.fullCode"
          :codeTitle="$t('UserLoginCodes.code')"
          :name="userLoginCodes.userLoginCode.userLoginCodeNameCurrent"
          :nameTitle="$t('UserLoginCodes.name')"
          :nameIcon="'UserLoginCodes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="userLoginCodes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <UserLoginCodeFilter
        :theFilterData="userLoginCodes.filterData"
        v-on:search="search($event)"
      />

      <UserLoginCodeAdd
        :userLoginCode="userLoginCodes.userLoginCode"
        :userTypeToken="userTypeToken"
        v-on:refresh="refresh()"
      />
      <UserLoginCodeUpdate
        :userLoginCode="userLoginCodes.userLoginCode"
        :userTypeToken="userTypeToken"
        v-on:refresh="refresh()"
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
import UserLoginCodeAdd from "./components/UserLoginCodeAdd.vue";
import UserLoginCodeUpdate from "./components/UserLoginCodeUpdate.vue";
import UserLoginCodesCards from "./components/UserLoginCodesCards.vue";
import UserLoginCodesTable from "./components/UserLoginCodesTable.vue";
import UserSettingsTabs from "./../../../views/settings/UserSettingsTabs.vue";
import UserLoginCodeInfo from "./components/UserLoginCodeInfo.vue";
import UserLoginCodeDelete from "./components/UserLoginCodeDelete.vue";
import UserLoginCodeChangeActivationType from "./components/UserLoginCodeChangeActivationType.vue";
import UserLoginCodeFilter from "./components/UserLoginCodeFilter.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import UserLoginCodes from "./../../../models/settings/userLoginCodes/UserLoginCodes";
import apiUserLoginCode from "./../../../api/settings/userLoginCode";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasAdminsEgyptLoginCodeViewActive,
  hasAdminsEgyptLoginCodeViewArchive,
  hasAdminsEgyptLoginCodeViewBlocked,
  hasMasterAdminLoginCodeViewActive,
  hasMasterAdminLoginCodeViewArchive,
  hasMasterAdminLoginCodeViewBlocked,
  hasEmployeeLoginCodeViewActive,
  hasEmployeeLoginCodeViewArchive,
  hasEmployeeLoginCodeViewBlocked,
  hasStudentLoginCodeViewActive,
  hasStudentLoginCodeViewArchive,
  hasStudentLoginCodeViewBlocked,
  hasSupplierLoginCodeViewActive,
  hasSupplierLoginCodeViewArchive,
  hasSupplierLoginCodeViewBlocked,
  hasParentLoginCodeViewActive,
  hasParentLoginCodeViewArchive,
  hasParentLoginCodeViewBlocked,
  hasClientLoginCodeViewActive,
  hasClientLoginCodeViewArchive,
  hasClientLoginCodeViewBlocked,
  hasAdminsEgyptLoginCodeAdd,
  hasMasterAdminLoginCodeAdd,
  hasEmployeeLoginCodeAdd,
  hasStudentLoginCodeAdd,
  hasSupplierLoginCodeAdd,
  hasParentLoginCodeAdd,
  hasClientLoginCodeAdd,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    UserLoginCodeAdd,
    UserLoginCodeUpdate,
    UserLoginCodesCards,
    UserLoginCodesTable,
    UserSettingsTabs,
    UserLoginCodeInfo,
    UserLoginCodeDelete,
    UserLoginCodeChangeActivationType,
    UserLoginCodeFilter,
    CustomPagination,
  },
  computed: {
    ...mapGetters(["generalSetting"]),
    hasData() {
      return this.userLoginCodes.userLoginCodesData.length != 0;
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
        case "adminsEgyptLoginCode":
          options = this.getActivationTypeTokenOptionAdminsEgypt();
          break;
        case "masterAdminLoginCode":
          options = this.getActivationTypeTokenOptionMasterAdmin();
          break;
        case "employeeLoginCode":
          options = this.getActivationTypeTokenOptionEmployee();
          break;
        case "studentLoginCode":
          options = this.getActivationTypeTokenOptionStudent();
          break;
        case "supplierLoginCode":
          options = this.getActivationTypeTokenOptionSupplier();
          break;
        case "parentLoginCode":
          options = this.getActivationTypeTokenOptionParent();
          break;
        case "clientLoginCode":
          options = this.getActivationTypeTokenOptionClient();
          break;
      }
      return options;
    },
    hasPrivilegeAdd() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgyptLoginCode":
          status = checkPrivilege(hasAdminsEgyptLoginCodeAdd());
          break;
        case "masterAdminLoginCode":
          status = checkPrivilege(hasMasterAdminLoginCodeAdd());
          break;
        case "employeeLoginCode":
          status = checkPrivilege(hasEmployeeLoginCodeAdd());
          break;
        case "studentLoginCode":
          status = checkPrivilege(hasStudentLoginCodeAdd());
          break;
        case "supplierLoginCode":
          status = checkPrivilege(hasSupplierLoginCodeAdd());
          break;
        case "parentLoginCode":
          status = checkPrivilege(hasParentLoginCodeAdd());
          break;
        case "clientLoginCode":
          status = checkPrivilege(hasClientLoginCodeAdd());
          break;
      }
      return status;
    },
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
    userToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isLoading: false,
      userLoginCodes: new UserLoginCodes(this.modelName),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasAdminsEgyptLoginCodeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptLoginCodeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptLoginCodeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminLoginCodeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminLoginCodeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminLoginCodeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeeLoginCodeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeLoginCodeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeLoginCodeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentLoginCodeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentLoginCodeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentLoginCodeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierLoginCodeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierLoginCodeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierLoginCodeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasParentLoginCodeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentLoginCodeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentLoginCodeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientLoginCodeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientLoginCodeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientLoginCodeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userLoginCodes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    changePagination(pagination) {
      this.userLoginCodes.filterData.fillData(pagination);
      this.getAllUserLoginCodes();
    },
    setUserLoginCodeData(data) {
      this.userLoginCodes.userLoginCode.fillData(data);
    },
    async changeActivationType(data) {
      await this.updateActivationTypeTokens(this.modelName, data);
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
      setTimeout(() => {
        this.getAllUserLoginCodes();
      }, 1);
    },
    refresh() {
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
      setTimeout(() => {
        this.getAllUserLoginCodes();
      }, 1);
    },
    search(data = null) {
      if (data) this.userLoginCodes.filterData.fillData(data);
      this.refresh();
    },
    async getAllUserLoginCodes() {
      this.isLoading = true;
      try {
        this.userLoginCodes.userLoginCodesData = [];
        const response = await apiUserLoginCode.getAll(
          this.userLoginCodes.filterData
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
        this.userLoginCodes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async updateFilterData() {
      this.userLoginCodes.filterData.activationTypeTokens =
        this.generalSetting[this.modelName].activationTypeTokens;
      this.userLoginCodes.filterData.userTypeToken = this.userTypeToken;
      this.userLoginCodes.userLoginCode.userTypeToken = this.userTypeToken;
      this.userLoginCodes.filterData.userToken = this.userToken;
      this.userLoginCodes.userLoginCode.userToken = this.userToken;
    },
  },
  async created() {
    await this.updateFilterData();
    this.getAllUserLoginCodes();
  },
};
</script>
