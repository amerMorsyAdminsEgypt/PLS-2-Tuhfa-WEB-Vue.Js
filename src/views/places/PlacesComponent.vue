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
      :btnAddTitle="$t('Places.add')"
      :btnAddName="'PlaceAdd'"
      :btnAddStatus="hasPrivilegeAdd"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <UserSettingsTabs
        v-if="placeTypeToken != PLACE_TYPE_TOKENS.Other"
        :key="userTypeToken"
        :userTypeToken="userTypeToken"
      />

      <template v-if="hasData">
        <PlacesTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setPlaceData="
            setPlaceData($event);
            setFilterReport($event);
          "
          :placesData="places.placesData"
          :defaultImg="places.place.defaultImg"
          :filterData="places.filterData"
          :modelName="modelName"
        />
        <PlacesCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setPlaceData="
            setPlaceData($event);
            setFilterReport($event);
          "
          :placesData="places.placesData"
          :defaultImg="places.place.defaultImg"
          :filterData="places.filterData"
          :modelName="modelName"
        />

        <EducationalScheduleTimePlaceReportFilter
          :filterReport="filterReport"
          v-on:isLoading="isLoading = $event"
        />

        <ActionsData :actionsData="places.place" />
        <PlaceInfo :place="places.place" />
        <PlaceDelete :place="places.place" v-on:refresh="refresh()" />
        <PlaceChangeActivationType
          :place="places.place"
          v-on:refresh="refresh()"
        />
        <CustomBottomSheetQRCode
          :refName="'PlaceQRCode'"
          :code="places.place.fullCode"
          :codeTitle="$t('Places.code')"
          :name="places.place.placeNameCurrent"
          :nameTitle="$t('Places.name')"
          :nameIcon="'places.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="places.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <PlaceFilter
        :theFilterData="places.filterData"
        v-on:search="search($event)"
      />

      <PlaceAdd
        :place="places.place"
        :placeTypeToken="placeTypeToken"
        :modelName="modelName"
        v-on:refresh="refresh()"
      />
      <PlaceUpdate
        :place="places.place"
        :placeTypeToken="placeTypeToken"
        :modelName="modelName"
        v-on:refresh="refresh()"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { STATUS, VIEW_TYPES } from "./../../utils/constants";
import { ACTIVATION_TYPE } from "./../../utils/constantLists";
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../components/general/CustomBottomSheetQRCode.vue";
import EducationalScheduleTimePlaceReportFilter from "./../reports/components/EducationalScheduleTimePlaceReportFilter.vue";
import PlaceAdd from "./components/PlaceAdd.vue";
import PlaceUpdate from "./components/PlaceUpdate.vue";
import PlacesCards from "./components/PlacesCards.vue";
import PlacesTable from "./components/PlacesTable.vue";
import PlaceInfo from "./components/PlaceInfo.vue";
import PlaceDelete from "./components/PlaceDelete.vue";
import PlaceChangeActivationType from "./components/PlaceChangeActivationType.vue";
import PlaceFilter from "./components/PlaceFilter.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import Places from "./../../models/places/Places";
import apiPlace from "./../../api/place";
import { getDialogOfActivationTypes } from "./../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../utils/functions";
import UserSettingsTabs from "./../../views/settings/UserSettingsTabs.vue";
import {
  hasPlaceMasterAdminAdd,
  hasPlaceMasterAdminViewActive,
  hasPlaceMasterAdminViewArchive,
  hasPlaceMasterAdminViewBlocked,
  hasPlaceEmployeeAdd,
  hasPlaceEmployeeViewActive,
  hasPlaceEmployeeViewArchive,
  hasPlaceEmployeeViewBlocked,
  hasPlaceStudentAdd,
  hasPlaceStudentViewActive,
  hasPlaceStudentViewArchive,
  hasPlaceStudentViewBlocked,
  hasPlaceClientAdd,
  hasPlaceClientViewActive,
  hasPlaceClientViewArchive,
  hasPlaceClientViewBlocked,
  hasPlaceSupplierAdd,
  hasPlaceSupplierViewActive,
  hasPlaceSupplierViewArchive,
  hasPlaceSupplierViewBlocked,
  hasPlaceParentAdd,
  hasPlaceParentViewActive,
  hasPlaceParentViewArchive,
  hasPlaceParentViewBlocked,
  hasPlaceOtherAdd,
  hasPlaceOtherViewActive,
  hasPlaceOtherViewArchive,
  hasPlaceOtherViewBlocked,
} from "./../../utils/privilegeHelper";
import EducationalScheduleTimes from "./../../models/educational/educationalScheduleTimes/EducationalScheduleTimes";
import { FILTER_REPORT_TYPES } from "./../../utils/constants";
import { PLACE_TYPE_TOKENS, USER_TYPE } from "./../../utils/constantLists";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    EducationalScheduleTimePlaceReportFilter,
    PlaceAdd,
    UserSettingsTabs,
    PlaceUpdate,
    PlacesCards,
    PlacesTable,
    PlaceInfo,
    PlaceDelete,
    PlaceChangeActivationType,
    PlaceFilter,
    CustomPagination,
  },
  computed: {
    ...mapGetters(["generalSetting"]),
    hasData() {
      return this.places.placesData.length != 0;
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
        case "placeMasterAdmins":
          options = this.getActivationTypeTokenOptionPlaceMasterAdmin();
          break;
        case "placeEmployees":
          options = this.getActivationTypeTokenOptionPlaceEmployee();
          break;
        case "placeStudents":
          options = this.getActivationTypeTokenOptionPlaceStudent();
          break;
        case "placeClients":
          options = this.getActivationTypeTokenOptionPlaceClient();
          break;
        case "placeSuppliers":
          options = this.getActivationTypeTokenOptionPlaceSupplier();
          break;
        case "placeParents":
          options = this.getActivationTypeTokenOptionPlaceParent();
          break;
        case "placeOthers":
          options = this.getActivationTypeTokenOptionPlaceOther();
          break;
      }
      return options;
    },
    hasPrivilegeAdd() {
      let status = false;
      switch (this.modelName) {
        case "placeMasterAdmins":
          status = checkPrivilege(hasPlaceMasterAdminAdd());
          break;
        case "placeEmployees":
          status = checkPrivilege(hasPlaceEmployeeAdd());
          break;
        case "placeStudents":
          status = checkPrivilege(hasPlaceStudentAdd());
          break;
        case "placeClients":
          status = checkPrivilege(hasPlaceClientAdd());
          break;
        case "placeSuppliers":
          status = checkPrivilege(hasPlaceSupplierAdd());
          break;
        case "placeParents":
          status = checkPrivilege(hasPlaceParentAdd());
          break;
        case "placeOthers":
          status = checkPrivilege(hasPlaceOtherAdd());
          break;
      }
      return status;
    },
    userTypeToken() {
      let userTypeToken = "";
      switch (this.placeTypeToken) {
        case PLACE_TYPE_TOKENS.MasterAdmin:
          userTypeToken = USER_TYPE.MasterAdmin;
          break;
        case PLACE_TYPE_TOKENS.Employee:
          userTypeToken = USER_TYPE.Employee;
          break;
        case PLACE_TYPE_TOKENS.Student:
          userTypeToken = USER_TYPE.Student;
          break;
        case PLACE_TYPE_TOKENS.Supplier:
          userTypeToken = USER_TYPE.Supplier;
          break;
        case PLACE_TYPE_TOKENS.Parent:
          userTypeToken = USER_TYPE.Parent;
          break;
        case PLACE_TYPE_TOKENS.Client:
          userTypeToken = USER_TYPE.Client;
          break;
      }
      return userTypeToken;
    },
  },
  props: {
    placeTypeToken: {
      type: String,
      default: "",
    },
    modelName: {
      type: String,
      default: "",
    },
    parentPlaceToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      places: new Places(this.modelName),
      filterReport: new EducationalScheduleTimes(FILTER_REPORT_TYPES.Place)
        .filterReport,
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      PLACE_TYPE_TOKENS,
    };
  },
  methods: {
    checkPrivilege,

    getActivationTypeTokenOptionPlaceMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasPlaceMasterAdminViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.places.placesStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceMasterAdminViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber = this.places.placesStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceMasterAdminViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber = this.places.placesStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceEmployee() {
      let arr = [];
      if (checkPrivilege(hasPlaceEmployeeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.places.placesStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceEmployeeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber = this.places.placesStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceEmployeeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber = this.places.placesStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceStudent() {
      let arr = [];
      if (checkPrivilege(hasPlaceStudentViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.places.placesStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceStudentViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber = this.places.placesStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceStudentViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber = this.places.placesStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceClient() {
      let arr = [];
      if (checkPrivilege(hasPlaceClientViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.places.placesStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceClientViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber = this.places.placesStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceClientViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber = this.places.placesStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceSupplier() {
      let arr = [];
      if (checkPrivilege(hasPlaceSupplierViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.places.placesStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceSupplierViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber = this.places.placesStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceSupplierViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber = this.places.placesStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceParent() {
      let arr = [];
      if (checkPrivilege(hasPlaceParentViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.places.placesStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceParentViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber = this.places.placesStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceParentViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber = this.places.placesStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionPlaceOther() {
      let arr = [];
      if (checkPrivilege(hasPlaceOtherViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.places.placesStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceOtherViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber = this.places.placesStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPlaceOtherViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber = this.places.placesStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },

    async setFilterReport(place) {
      try {
        this.filterReport.systemComponentHierarchyTokenPlace =
          place.systemComponentsHierarchyData.systemComponentsHierarchyToken;

        this.filterReport.systemComponentTokenPlace =
          place.systemComponentData.systemComponentToken;

        this.filterReport.placeToken = place.placeToken;
        this.filterReport.placeTypeToken = place.placeTypeToken;
      } catch (error) {
        this.filterReport.systemComponentHierarchyTokenPlace = "";

        this.filterReport.systemComponentTokenPlace = "";

        this.filterReport.placeToken = "";
        this.filterReport.placeTypeToken = "";
      }
    },
    async setPlaceData(data) {
      this.places.place.fillData(data);
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
    },
    async changePagination(pagination) {
      this.places.filterData.fillData(pagination);
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
      setTimeout(() => {
        this.getAllPlaces();
      }, 1);
    },
    async changeActivationType(data) {
      await this.updateActivationTypeTokens(this.modelName, data);
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
      setTimeout(() => {
        this.getAllPlaces();
      }, 1);
    },
    refresh() {
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
      setTimeout(() => {
        this.getAllPlaces();
      }, 1);
    },
    search(data) {
      this.places.filterData.fillData(data);
      this.refresh();
    },
    async getAllPlaces() {
      this.isLoading = true;
      try {
        this.places.placesData = [];
        this.places.filterData.geographicalDistributionDataInclude = true;
        this.places.filterData.systemComponentDataInclude = true;
        this.places.filterData.systemComponentsHierarchyDataInclude = true;
        this.places.filterData.fullTreeDataInclude = true;
        this.places.filterData.getOnlyParentPlaces = this.parentPlaceToken
          ? false
          : true;

        const response = await apiPlace.getAll(this.places.filterData);
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
        this.places.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },

    async updateFilterData() {
      this.places.filterData.activationTypeTokens =
        this.generalSetting[this.modelName].activationTypeTokens;
      this.places.filterData.placeTypeToken = this.placeTypeToken;
      this.places.place.placeTypeToken = this.placeTypeToken;
    },
  },
  watch: {
    parentPlaceToken: function () {
      this.refresh();
    },
  },
  async created() {
    this.places.filterData.parentPlaceToken = this.parentPlaceToken;
    await this.updateFilterData();
    this.getAllPlaces();
  },
};
</script>
