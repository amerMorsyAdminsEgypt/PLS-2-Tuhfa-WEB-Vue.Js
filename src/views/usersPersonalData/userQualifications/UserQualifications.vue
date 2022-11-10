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
      :btnAddTitle="$t('UserQualifications.add')"
      :btnAddName="'UserQualificationAdd'"
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
        <UserQualificationTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setUserQualificationData="
            userQualifications.userQualification.fillData($event)
          "
          :userQualificationsData="userQualifications.userQualificationsData"
          :defaultImg="userQualifications.userQualification.defaultImg"
          :filterData="userQualifications.filterData"
          :userTypeToken="userTypeToken"
        />

        <UserQualificationCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setUserQualificationData="
            userQualifications.userQualification.fillData($event)
          "
          :userQualificationsData="userQualifications.userQualificationsData"
          :defaultImg="userQualifications.userQualification.defaultImg"
          :filterData="userQualifications.filterData"
          :userTypeToken="userTypeToken"
        />

        <ActionsData :actionsData="userQualifications.userQualification" />
        <UserQualificationInfo
          :userQualification="userQualifications.userQualification"
        />
        <UserQualificationDelete
          :userQualification="userQualifications.userQualification"
          v-on:refresh="getAllUserQualifications()"
        />
        <UserQualificationChangeActivationType
          :userQualification="userQualifications.userQualification"
          v-on:refresh="getAllUserQualifications()"
          :userTypeToken="userTypeToken"
        />
        <CustomBottomSheetQRCode
          :refName="'UserQualificationQRCode'"
          :code="userQualifications.userQualification.fullCode"
          :codeTitle="$t('UserQualifications.code')"
          :name="
            userQualifications.userQualification.userQualificationNameCurrent
          "
          :nameTitle="$t('UserQualifications.name')"
          :nameIcon="'UserQualifications.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="userQualifications.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <UserQualificationFilter
        :theFilterData="userQualifications.filterData"
        v-on:search="search($event)"
      />

      <UserQualificationAdd
        :userQualification="userQualifications.userQualification"
        v-on:refresh="getAllUserQualifications()"
        :userToken="userToken"
        :userTypeToken="userTypeToken"
      />
      <UserQualificationUpdate
        :userQualification="userQualifications.userQualification"
        v-on:refresh="getAllUserQualifications()"
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
import UserQualificationAdd from "./components/UserQualificationAdd.vue";
import UserQualificationUpdate from "./components/UserQualificationUpdate.vue";
import UserQualificationCards from "./components/UserQualificationCards.vue";
import UserQualificationTable from "./components/UserQualificationTable.vue";
import UserQualificationInfo from "./components/UserQualificationInfo.vue";
import UserQualificationDelete from "./components/UserQualificationDelete.vue";
import UserQualificationChangeActivationType from "./components/UserQualificationChangeActivationType.vue";
import UserQualificationFilter from "./components/UserQualificationFilter.vue";
import UserQualifications from "./../../../models/usersPersonalData/userQualifications/UserQualifications";
import apiUserQualification from "./../../../api/usersPersonalData/userQualifications";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import UserDataMixin from "./../UserDataMixin";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasAdminsEgyptQualificationAdd,
  hasAdminsEgyptQualificationViewActive,
  hasAdminsEgyptQualificationViewBlocked,
  hasAdminsEgyptQualificationViewArchive,
  hasMasterAdminQualificationAdd,
  hasMasterAdminQualificationViewActive,
  hasMasterAdminQualificationViewArchive,
  hasMasterAdminQualificationViewBlocked,
  hasEmployeeQualificationAdd,
  hasEmployeeQualificationViewActive,
  hasEmployeeQualificationViewArchive,
  hasEmployeeQualificationViewBlocked,
  hasStudentQualificationAdd,
  hasStudentQualificationViewActive,
  hasStudentQualificationViewArchive,
  hasStudentQualificationViewBlocked,
  hasSupplierQualificationAdd,
  hasSupplierQualificationViewActive,
  hasSupplierQualificationViewArchive,
  hasSupplierQualificationViewBlocked,
  hasParentQualificationAdd,
  hasParentQualificationViewActive,
  hasParentQualificationViewArchive,
  hasParentQualificationViewBlocked,
  hasClientQualificationAdd,
  hasClientQualificationViewActive,
  hasClientQualificationViewArchive,
  hasClientQualificationViewBlocked,
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
    UserQualificationAdd,
    UserQualificationUpdate,
    UserQualificationCards,
    UserQualificationTable,
    UserQualificationInfo,
    UserQualificationDelete,
    UserQualificationChangeActivationType,
    UserQualificationFilter,
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
      return this.userQualifications.userQualificationsData.length != 0;
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
          status = checkPrivilege(hasAdminsEgyptQualificationAdd());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminQualificationAdd());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeQualificationAdd());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentQualificationAdd());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierQualificationAdd());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentQualificationAdd());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientQualificationAdd());
          break;
      }
      return status;
    },
    modelName: function () {
      let name = "";
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          name = "adminsEgyptQualification";
          break;
        case USER_TYPE.MasterAdmin:
          name = "masterAdminQualification";
          break;
        case USER_TYPE.Employee:
          name = "employeeQualification";
          break;
        case USER_TYPE.Student:
          name = "studentQualification";
          break;
        case USER_TYPE.Supplier:
          name = "supplierQualification";
          break;
        case USER_TYPE.Parent:
          name = "parentQualification";
          break;
        case USER_TYPE.Client:
          name = "clientQualification";
          break;
      }
      return name;
    },
  },
  data() {
    return {
      userQualifications: new UserQualifications(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      tabPrivilages: {},
      mainCurrentTab: "",
    };
  },
  methods: {
    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasAdminsEgyptQualificationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptQualificationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptQualificationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminQualificationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminQualificationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminQualificationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeeQualificationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeQualificationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeQualificationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentQualificationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentQualificationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentQualificationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierQualificationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierQualificationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierQualificationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasParentQualificationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentQualificationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentQualificationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientQualificationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientQualificationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientQualificationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userQualifications.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    changePagination(pagination) {
      this.userQualifications.filterData.fillData(pagination);
      this.getAllUserQualifications();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens(this.modelName, data);
      this.userQualifications.filterData.activationTypeTokens = data;
      this.getAllUserQualifications();
    },
    search(data) {
      this.userQualifications.filterData.fillData(data);
      this.getAllUserQualifications();
    },
    async getAllUserQualifications() {
      this.isLoading = true;
      try {
        this.userQualifications.filterData.userTypeToken = this.userTypeToken;
        this.userQualifications.filterData.userToken = this.userToken;
        this.userQualifications.filterData.userDataInclude = true;
        this.userQualifications.filterData.relativeRelationTypeDataInclude = true;

        this.userQualifications.userQualificationsData = [];
        const response = await apiUserQualification.getAll(
          this.userQualifications.filterData
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
        this.userQualifications.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.userQualifications.filterData.activationTypeTokens =
      this.generalSetting[this.modelName].activationTypeTokens;
    if (this.userDetailsLoaded) {
      this.getAllUserQualifications();
    }
  },
  watch: {
    userDetailsLoaded: function (val) {
      if (val) {
        this.getAllUserQualifications();
      }
    },
  },
};
</script>
