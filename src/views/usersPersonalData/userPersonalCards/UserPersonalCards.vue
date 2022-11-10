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
      :btnAddTitle="$t('UserPersonalCards.add')"
      :btnAddName="'UserPersonalCardAdd'"
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
        <UserPersonalCardTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setUserPersonalCardData="
            userPersonalCards.userPersonalCard.fillData($event)
          "
          :userPersonalCardsData="userPersonalCards.userPersonalCardsData"
          :defaultImg="userPersonalCards.userPersonalCard.defaultImg"
          :filterData="userPersonalCards.filterData"
          :userTypeToken="userTypeToken"
        />

        <UserPersonalCardCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setUserPersonalCardData="
            userPersonalCards.userPersonalCard.fillData($event)
          "
          :userPersonalCardsData="userPersonalCards.userPersonalCardsData"
          :defaultImg="userPersonalCards.userPersonalCard.defaultImg"
          :filterData="userPersonalCards.filterData"
          :userTypeToken="userTypeToken"
        />

        <ActionsData :actionsData="userPersonalCards.userPersonalCard" />
        <UserPersonalCardInfo
          :userPersonalCard="userPersonalCards.userPersonalCard"
        />
        <UserPersonalCardDelete
          :userPersonalCard="userPersonalCards.userPersonalCard"
          v-on:refresh="getAllUserPersonalCards()"
        />
        <UserPersonalCardChangeActivationType
          :userPersonalCard="userPersonalCards.userPersonalCard"
          v-on:refresh="getAllUserPersonalCards()"
          :userTypeToken="userTypeToken"
        />
        <CustomBottomSheetQRCode
          :refName="'UserPersonalCardQRCode'"
          :code="userPersonalCards.userPersonalCard.fullCode"
          :codeTitle="$t('UserPersonalCards.code')"
          :name="userPersonalCards.userPersonalCard.userPersonalCardNameCurrent"
          :nameTitle="$t('UserPersonalCards.name')"
          :nameIcon="'UserPersonalCards.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="userPersonalCards.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <UserPersonalCardFilter
        :theFilterData="userPersonalCards.filterData"
        v-on:search="search($event)"
      />

      <UserPersonalCardAdd
        :userPersonalCard="userPersonalCards.userPersonalCard"
        v-on:refresh="getAllUserPersonalCards()"
        :userToken="userToken"
        :userTypeToken="userTypeToken"
      />
      <UserPersonalCardUpdate
        :userPersonalCard="userPersonalCards.userPersonalCard"
        v-on:refresh="getAllUserPersonalCards()"
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
import UserPersonalCardAdd from "./components/UserPersonalCardAdd.vue";
import UserPersonalCardUpdate from "./components/UserPersonalCardUpdate.vue";
import UserPersonalCardCards from "./components/UserPersonalCardCards.vue";
import UserPersonalCardTable from "./components/UserPersonalCardTable.vue";
import UserPersonalCardInfo from "./components/UserPersonalCardInfo.vue";
import UserPersonalCardDelete from "./components/UserPersonalCardDelete.vue";
import UserPersonalCardChangeActivationType from "./components/UserPersonalCardChangeActivationType.vue";
import UserPersonalCardFilter from "./components/UserPersonalCardFilter.vue";
import UserPersonalCards from "./../../../models/usersPersonalData/userPersonalCards/UserPersonalCards";
import apiUserPersonalCard from "./../../../api/usersPersonalData/userPersonalCards";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import UserDataMixin from "./../UserDataMixin";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasAdminsEgyptPersonalCardAdd,
  hasAdminsEgyptPersonalCardViewActive,
  hasAdminsEgyptPersonalCardViewBlocked,
  hasAdminsEgyptPersonalCardViewArchive,
  hasMasterAdminPersonalCardAdd,
  hasMasterAdminPersonalCardViewActive,
  hasMasterAdminPersonalCardViewArchive,
  hasMasterAdminPersonalCardViewBlocked,
  hasEmployeePersonalCardAdd,
  hasEmployeePersonalCardViewActive,
  hasEmployeePersonalCardViewArchive,
  hasEmployeePersonalCardViewBlocked,
  hasStudentPersonalCardAdd,
  hasStudentPersonalCardViewActive,
  hasStudentPersonalCardViewArchive,
  hasStudentPersonalCardViewBlocked,
  hasSupplierPersonalCardAdd,
  hasSupplierPersonalCardViewActive,
  hasSupplierPersonalCardViewArchive,
  hasSupplierPersonalCardViewBlocked,
  hasParentPersonalCardAdd,
  hasParentPersonalCardViewActive,
  hasParentPersonalCardViewArchive,
  hasParentPersonalCardViewBlocked,
  hasClientPersonalCardAdd,
  hasClientPersonalCardViewActive,
  hasClientPersonalCardViewArchive,
  hasClientPersonalCardViewBlocked,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [UserDataMixin, generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    // MainTabs,
    UserInfo,
    UserDataTabs,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    UserPersonalCardAdd,
    UserPersonalCardUpdate,
    UserPersonalCardCards,
    UserPersonalCardTable,
    UserPersonalCardInfo,
    UserPersonalCardDelete,
    UserPersonalCardChangeActivationType,
    UserPersonalCardFilter,
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
      return this.userPersonalCards.userPersonalCardsData.length != 0;
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
          status = checkPrivilege(hasAdminsEgyptPersonalCardAdd());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminPersonalCardAdd());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeePersonalCardAdd());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentPersonalCardAdd());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierPersonalCardAdd());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentPersonalCardAdd());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientPersonalCardAdd());
          break;
      }
      return status;
    },
    modelName: function () {
      let name = "";
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          name = "adminsEgyptPersonalCard";
          break;
        case USER_TYPE.MasterAdmin:
          name = "masterAdminPersonalCard";
          break;
        case USER_TYPE.Employee:
          name = "employeePersonalCard";
          break;
        case USER_TYPE.Student:
          name = "studentPersonalCard";
          break;
        case USER_TYPE.Supplier:
          name = "supplierPersonalCard";
          break;
        case USER_TYPE.Parent:
          name = "parentPersonalCard";
          break;
        case USER_TYPE.Client:
          name = "clientPersonalCard";
          break;
      }
      return name;
    },
  },
  data() {
    return {
      userPersonalCards: new UserPersonalCards(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      tabPrivilages: {},
      mainCurrentTab: "",
    };
  },
  methods: {
    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasAdminsEgyptPersonalCardViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptPersonalCardViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptPersonalCardViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminPersonalCardViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminPersonalCardViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminPersonalCardViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeePersonalCardViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeePersonalCardViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeePersonalCardViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentPersonalCardViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentPersonalCardViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentPersonalCardViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierPersonalCardViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierPersonalCardViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierPersonalCardViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasParentPersonalCardViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentPersonalCardViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentPersonalCardViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientPersonalCardViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientPersonalCardViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientPersonalCardViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userPersonalCards.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    changePagination(pagination) {
      this.userPersonalCards.filterData.fillData(pagination);
      this.getAllUserPersonalCards();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens(this.modelName, data);
      this.userPersonalCards.filterData.activationTypeTokens = data;
      this.getAllUserPersonalCards();
    },
    search(data) {
      this.userPersonalCards.filterData.fillData(data);
      this.getAllUserPersonalCards();
    },
    async getAllUserPersonalCards() {
      this.isLoading = true;
      try {
        this.userPersonalCards.filterData.userTypeToken = this.userTypeToken;
        this.userPersonalCards.filterData.userToken = this.userToken;
        this.userPersonalCards.filterData.userDataInclude = true;
        this.userPersonalCards.filterData.relativeRelationTypeDataInclude = true;

        this.userPersonalCards.userPersonalCardsData = [];
        const response = await apiUserPersonalCard.getAll(
          this.userPersonalCards.filterData
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
        this.userPersonalCards.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.userPersonalCards.filterData.activationTypeTokens =
      this.generalSetting[this.modelName].activationTypeTokens;
    if (this.userDetailsLoaded) {
      this.getAllUserPersonalCards();
    }
  },
  watch: {
    userDetailsLoaded: function (val) {
      if (val) {
        this.getAllUserPersonalCards();
      }
    },
  },
};
</script>
