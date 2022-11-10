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
      :btnAddTitle="$t('UserScientificDegrees.add')"
      :btnAddName="'UserScientificDegreeAdd'"
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
        <UserScientificDegreeTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setUserScientificDegreeData="
            userScientificDegrees.userScientificDegree.fillData($event)
          "
          :userScientificDegreesData="
            userScientificDegrees.userScientificDegreesData
          "
          :defaultImg="userScientificDegrees.userScientificDegree.defaultImg"
          :filterData="userScientificDegrees.filterData"
          :userTypeToken="userTypeToken"
        />

        <UserScientificDegreeCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setUserScientificDegreeData="
            userScientificDegrees.userScientificDegree.fillData($event)
          "
          :userScientificDegreesData="
            userScientificDegrees.userScientificDegreesData
          "
          :defaultImg="userScientificDegrees.userScientificDegree.defaultImg"
          :filterData="userScientificDegrees.filterData"
          :userTypeToken="userTypeToken"
        />

        <ActionsData
          :actionsData="userScientificDegrees.userScientificDegree"
        />
        <UserScientificDegreeInfo
          :userScientificDegree="userScientificDegrees.userScientificDegree"
        />
        <UserScientificDegreeDelete
          :userScientificDegree="userScientificDegrees.userScientificDegree"
          v-on:refresh="getAllUserScientificDegrees()"
        />
        <UserScientificDegreeChangeActivationType
          :userScientificDegree="userScientificDegrees.userScientificDegree"
          v-on:refresh="getAllUserScientificDegrees()"
          :userTypeToken="userTypeToken"
        />
        <CustomBottomSheetQRCode
          :refName="'UserScientificDegreeQRCode'"
          :code="userScientificDegrees.userScientificDegree.fullCode"
          :codeTitle="$t('UserScientificDegrees.code')"
          :name="
            userScientificDegrees.userScientificDegree
              .userScientificDegreeNameCurrent
          "
          :nameTitle="$t('UserScientificDegrees.name')"
          :nameIcon="'UserScientificDegrees.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="userScientificDegrees.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <UserScientificDegreeFilter
        :theFilterData="userScientificDegrees.filterData"
        v-on:search="search($event)"
      />

      <UserScientificDegreeAdd
        :userScientificDegree="userScientificDegrees.userScientificDegree"
        v-on:refresh="getAllUserScientificDegrees()"
        :userToken="userToken"
        :userTypeToken="userTypeToken"
      />
      <UserScientificDegreeUpdate
        :userScientificDegree="userScientificDegrees.userScientificDegree"
        v-on:refresh="getAllUserScientificDegrees()"
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
import UserScientificDegreeAdd from "./components/UserScientificDegreeAdd.vue";
import UserScientificDegreeUpdate from "./components/UserScientificDegreeUpdate.vue";
import UserScientificDegreeCards from "./components/UserScientificDegreeCards.vue";
import UserScientificDegreeTable from "./components/UserScientificDegreeTable.vue";
import UserScientificDegreeInfo from "./components/UserScientificDegreeInfo.vue";
import UserScientificDegreeDelete from "./components/UserScientificDegreeDelete.vue";
import UserScientificDegreeChangeActivationType from "./components/UserScientificDegreeChangeActivationType.vue";
import UserScientificDegreeFilter from "./components/UserScientificDegreeFilter.vue";
import UserScientificDegrees from "./../../../models/usersPersonalData/userScientificDegrees/UserScientificDegrees";
import apiUserScientificDegree from "./../../../api/usersPersonalData/userScientificDegrees";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import UserDataMixin from "./../UserDataMixin";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasAdminsEgyptScientificDegreeAdd,
  hasAdminsEgyptScientificDegreeViewActive,
  hasAdminsEgyptScientificDegreeViewBlocked,
  hasAdminsEgyptScientificDegreeViewArchive,
  hasMasterAdminScientificDegreeAdd,
  hasMasterAdminScientificDegreeViewActive,
  hasMasterAdminScientificDegreeViewArchive,
  hasMasterAdminScientificDegreeViewBlocked,
  hasEmployeeScientificDegreeAdd,
  hasEmployeeScientificDegreeViewActive,
  hasEmployeeScientificDegreeViewArchive,
  hasEmployeeScientificDegreeViewBlocked,
  hasStudentScientificDegreeAdd,
  hasStudentScientificDegreeViewActive,
  hasStudentScientificDegreeViewArchive,
  hasStudentScientificDegreeViewBlocked,
  hasSupplierScientificDegreeAdd,
  hasSupplierScientificDegreeViewActive,
  hasSupplierScientificDegreeViewArchive,
  hasSupplierScientificDegreeViewBlocked,
  hasParentScientificDegreeAdd,
  hasParentScientificDegreeViewActive,
  hasParentScientificDegreeViewArchive,
  hasParentScientificDegreeViewBlocked,
  hasClientScientificDegreeAdd,
  hasClientScientificDegreeViewActive,
  hasClientScientificDegreeViewArchive,
  hasClientScientificDegreeViewBlocked,
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
    UserScientificDegreeAdd,
    UserScientificDegreeUpdate,
    UserScientificDegreeCards,
    UserScientificDegreeTable,
    UserScientificDegreeInfo,
    UserScientificDegreeDelete,
    UserScientificDegreeChangeActivationType,
    UserScientificDegreeFilter,
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
      return this.userScientificDegrees.userScientificDegreesData.length != 0;
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
          status = checkPrivilege(hasAdminsEgyptScientificDegreeAdd());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminScientificDegreeAdd());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeScientificDegreeAdd());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentScientificDegreeAdd());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierScientificDegreeAdd());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentScientificDegreeAdd());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientScientificDegreeAdd());
          break;
      }
      return status;
    },
    modelName: function () {
      let name = "";
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          name = "adminsEgyptScientificDegree";
          break;
        case USER_TYPE.MasterAdmin:
          name = "masterAdminScientificDegree";
          break;
        case USER_TYPE.Employee:
          name = "employeeScientificDegree";
          break;
        case USER_TYPE.Student:
          name = "studentScientificDegree";
          break;
        case USER_TYPE.Supplier:
          name = "supplierScientificDegree";
          break;
        case USER_TYPE.Parent:
          name = "parentScientificDegree";
          break;
        case USER_TYPE.Client:
          name = "clientScientificDegree";
          break;
      }
      return name;
    },
  },
  data() {
    return {
      userScientificDegrees: new UserScientificDegrees(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      tabPrivilages: {},
      mainCurrentTab: "",
    };
  },
  methods: {
    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasAdminsEgyptScientificDegreeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptScientificDegreeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalArchivedCount ||
          0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptScientificDegreeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalBlockedCount ||
          0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminScientificDegreeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminScientificDegreeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalArchivedCount ||
          0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminScientificDegreeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalBlockedCount ||
          0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeeScientificDegreeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeScientificDegreeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalArchivedCount ||
          0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeScientificDegreeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalBlockedCount ||
          0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentScientificDegreeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentScientificDegreeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalArchivedCount ||
          0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentScientificDegreeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalBlockedCount ||
          0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierScientificDegreeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierScientificDegreeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalArchivedCount ||
          0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierScientificDegreeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalBlockedCount ||
          0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasParentScientificDegreeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentScientificDegreeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalArchivedCount ||
          0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentScientificDegreeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalBlockedCount ||
          0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientScientificDegreeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientScientificDegreeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalArchivedCount ||
          0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientScientificDegreeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userScientificDegrees.activationStatistics.totalBlockedCount ||
          0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    changePagination(pagination) {
      this.userScientificDegrees.filterData.fillData(pagination);
      this.getAllUserScientificDegrees();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens(this.modelName, data);
      this.userScientificDegrees.filterData.activationTypeTokens = data;
      this.getAllUserScientificDegrees();
    },
    search(data) {
      this.userScientificDegrees.filterData.fillData(data);
      this.getAllUserScientificDegrees();
    },
    async getAllUserScientificDegrees() {
      this.isLoading = true;
      try {
        this.userScientificDegrees.filterData.userTypeToken =
          this.userTypeToken;
        this.userScientificDegrees.filterData.userToken = this.userToken;
        this.userScientificDegrees.filterData.userDataInclude = true;
        this.userScientificDegrees.filterData.relativeRelationTypeDataInclude = true;

        this.userScientificDegrees.userScientificDegreesData = [];
        const response = await apiUserScientificDegree.getAll(
          this.userScientificDegrees.filterData
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
        this.userScientificDegrees.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.userScientificDegrees.filterData.activationTypeTokens =
      this.generalSetting[this.modelName].activationTypeTokens;
    if (this.userDetailsLoaded) {
      this.getAllUserScientificDegrees();
    }
  },
  watch: {
    userDetailsLoaded: function (val) {
      if (val) {
        this.getAllUserScientificDegrees();
      }
    },
  },
};
</script>
