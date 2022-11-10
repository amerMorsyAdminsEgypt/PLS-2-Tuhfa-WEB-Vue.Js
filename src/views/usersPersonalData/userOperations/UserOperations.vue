<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType(modelName, $event)"
      :viewType="viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting[modelName].activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('UserOperations.add')"
      :btnAddName="'UserOperationAdd'"
      :btnAddStatus="hasPrivilegeAdd"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
      :additionalSheetName="'UserInfo'"
      :additionalSheetTitle="$t('Users.data')"
      :additionalSheetIcon="'info.svg'"
      :additionalSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <UserInfo :userToken="user.userToken" />
      <UserDataTabs />

      <template v-if="hasData">
        <UserOperationTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setUserOperationData="
            userOperations.userOperation.fillData($event)
          "
          :userOperationsData="userOperations.userOperationsData"
          :defaultImg="userOperations.userOperation.defaultImg"
          :filterData="userOperations.filterData"
          :userTypeToken="userTypeToken"
        />

        <UserOperationCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setUserOperationData="
            userOperations.userOperation.fillData($event)
          "
          :userOperationsData="userOperations.userOperationsData"
          :defaultImg="userOperations.userOperation.defaultImg"
          :filterData="userOperations.filterData"
          :userTypeToken="userTypeToken"
        />

        <ActionsData :actionsData="userOperations.userOperation" />
        <UserOperationInfo :userOperation="userOperations.userOperation" />
        <UserOperationDelete
          :userOperation="userOperations.userOperation"
          :userTypeToken="userTypeToken"
          v-on:refresh="getAllUserOperations()"
        />
        <UserOperationChangeActivationType
          :userOperation="userOperations.userOperation"
          v-on:refresh="getAllUserOperations()"
          :userTypeToken="userTypeToken"
        />
        <CustomBottomSheetQRCode
          :refName="'UserOperationQRCode'"
          :code="userOperations.userOperation.fullCode"
          :codeTitle="$t('UserOperations.code')"
          :name="userOperations.userOperation.userOperationNameCurrent"
          :nameTitle="$t('UserOperations.name')"
          :nameIcon="'UserOperations.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="userOperations.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <UserOperationFilter
        :theFilterData="userOperations.filterData"
        v-on:search="search($event)"
      />

      <UserOperationAdd
        :userOperation="userOperations.userOperation"
        v-on:refresh="getAllUserOperations()"
        :userToken="userToken"
        :userTypeToken="userTypeToken"
      />
      <UserOperationUpdate
        :userOperation="userOperations.userOperation"
        v-on:refresh="getAllUserOperations()"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import { ACTIVATION_TYPE, USER_TYPE } from "./../../../utils/constantLists";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import UserInfo from "./../../../components/users/UserInfo.vue";
// import MainTabs from "./../components/MainTabs.vue";
import UserDataTabs from "./../components/UserDataTabs.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import UserOperationAdd from "./components/UserOperationAdd.vue";
import UserOperationUpdate from "./components/UserOperationUpdate.vue";
import UserOperationCards from "./components/UserOperationCards.vue";
import UserOperationTable from "./components/UserOperationTable.vue";
import UserOperationInfo from "./components/UserOperationInfo.vue";
import UserOperationDelete from "./components/UserOperationDelete.vue";
import UserOperationChangeActivationType from "./components/UserOperationChangeActivationType.vue";
import UserOperationFilter from "./components/UserOperationFilter.vue";
import UserOperations from "./../../../models/usersPersonalData/userOperations/UserOperations";
import apiUserOperation from "./../../../api/usersPersonalData/userOperations";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import UserDataMixin from "./../UserDataMixin";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasAdminsEgyptOperationAdd,
  hasAdminsEgyptOperationViewActive,
  hasAdminsEgyptOperationViewBlocked,
  hasAdminsEgyptOperationViewArchive,
  hasMasterAdminOperationAdd,
  hasMasterAdminOperationViewActive,
  hasMasterAdminOperationViewArchive,
  hasMasterAdminOperationViewBlocked,
  hasEmployeeOperationAdd,
  hasEmployeeOperationViewActive,
  hasEmployeeOperationViewArchive,
  hasEmployeeOperationViewBlocked,
  hasStudentOperationAdd,
  hasStudentOperationViewActive,
  hasStudentOperationViewArchive,
  hasStudentOperationViewBlocked,
  hasSupplierOperationAdd,
  hasSupplierOperationViewActive,
  hasSupplierOperationViewArchive,
  hasSupplierOperationViewBlocked,
  hasParentOperationAdd,
  hasParentOperationViewActive,
  hasParentOperationViewArchive,
  hasParentOperationViewBlocked,
  hasClientOperationAdd,
  hasClientOperationViewActive,
  hasClientOperationViewArchive,
  hasClientOperationViewBlocked,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [UserDataMixin, generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    UserInfo,
    // MainTabs,
    UserDataTabs,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    UserOperationAdd,
    UserOperationUpdate,
    UserOperationCards,
    UserOperationTable,
    UserOperationInfo,
    UserOperationDelete,
    UserOperationChangeActivationType,
    UserOperationFilter,
  },
  props: {
    userTypeToken: {
      type: String,
      default: "",
    },
    userToken: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["generalSetting"]),
    hasData() {
      return this.userOperations.userOperationsData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.modelName].viewType;
    },
    activationTypesTokensOptions: function () {
      let options = [];
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          options = this.getActivationTypeTokenOptionAdminsEgypt();
          break;
        case USER_TYPE.MasterAdmin:
          options = this.getActivationTypeTokenOptionMasterAdmin();
          break;
        case USER_TYPE.Employee:
          options = this.getActivationTypeTokenOptionEmployee();
          break;
        case USER_TYPE.Student:
          options = this.getActivationTypeTokenOptionStudent();
          break;
        case USER_TYPE.Supplier:
          options = this.getActivationTypeTokenOptionSupplier();
          break;
        case USER_TYPE.Parent:
          options = this.getActivationTypeTokenOptionParent();
          break;
        case USER_TYPE.Client:
          options = this.getActivationTypeTokenOptionClient();
          break;
      }
      return options;
    },

    hasPrivilegeAdd() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptOperationAdd());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminOperationAdd());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeOperationAdd());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentOperationAdd());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierOperationAdd());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentOperationAdd());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientOperationAdd());
          break;
      }
      return status;
    },
    modelName: function () {
      let name = "";
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          name = "adminsEgyptOperation";
          break;
        case USER_TYPE.MasterAdmin:
          name = "masterAdminOperation";
          break;
        case USER_TYPE.Employee:
          name = "employeeOperation";
          break;
        case USER_TYPE.Student:
          name = "studentOperation";
          break;
        case USER_TYPE.Supplier:
          name = "supplierOperation";
          break;
        case USER_TYPE.Parent:
          name = "parentOperation";
          break;
        case USER_TYPE.Client:
          name = "clientOperation";
          break;
      }
      return name;
    },
  },
  data() {
    return {
      userOperations: new UserOperations(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      tabPrivilages: {},
      mainCurrentTab: "",
    };
  },
  methods: {
    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasAdminsEgyptOperationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptOperationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptOperationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminOperationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminOperationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminOperationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeeOperationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeOperationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeOperationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentOperationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentOperationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentOperationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierOperationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierOperationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierOperationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasParentOperationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentOperationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentOperationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientOperationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientOperationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientOperationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userOperations.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    changePagination(pagination) {
      this.userOperations.filterData.fillData(pagination);
      this.getAllUserOperations();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens(this.modelName, data);
      this.userOperations.filterData.activationTypeTokens = data;
      this.getAllUserOperations();
    },
    search(data) {
      this.userOperations.filterData.fillData(data);
      this.getAllUserOperations();
    },
    async getAllUserOperations() {
      this.isLoading = true;
      try {
        this.userOperations.filterData.userTypeToken = this.userTypeToken;
        this.userOperations.filterData.userToken = this.userToken;
        this.userOperations.filterData.userDataInclude = true;
        this.userOperations.filterData.operationTypeDataInclude = true;
        this.userOperations.filterData.bodyPartDataInclude = true;

        this.userOperations.userOperationsData = [];
        const response = await apiUserOperation.getAll(
          this.userOperations.filterData
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
        this.userOperations.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.userOperations.filterData.activationTypeTokens =
      this.generalSetting[this.modelName].activationTypeTokens;
    if (this.userDetailsLoaded) {
      this.getAllUserOperations();
    }
  },
  watch: {
    userDetailsLoaded: function (val) {
      if (val) {
        this.getAllUserOperations();
      }
    },
  },
};
</script>
