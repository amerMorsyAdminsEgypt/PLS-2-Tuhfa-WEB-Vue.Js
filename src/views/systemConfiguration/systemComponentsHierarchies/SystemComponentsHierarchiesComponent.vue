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
      :btnAddTitle="$t('SystemComponentsHierarchies.add')"
      :btnAddName="'SystemComponentsHierarchyAdd'"
      :btnAddStatus="hasPrivilegeAdd"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <EducationalCategoryTabs
        v-if="systemTypeToken == SYSTEM_TYPE.EducationalActivity"
      />

      <PlaceTabs v-if="systemTypeToken == SYSTEM_TYPE.Place" />

      <GeographicalDistributionTabs
        v-if="systemTypeToken == SYSTEM_TYPE.GeographicalDistribution"
      />

      <JobGradeTabs v-if="systemTypeToken == SYSTEM_TYPE.JobGrade" />

      <StoreItemTabs v-if="systemTypeToken == SYSTEM_TYPE.StoreItem" />

      <BodyPartTabs v-if="systemTypeToken == SYSTEM_TYPE.BodyPart" />

      <template v-if="hasData">
        <SystemComponentsHierarchyTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setSystemComponentsHierarchyData="
            systemComponentsHierarchies.systemComponentsHierarchy.fillData(
              $event
            )
          "
          :systemComponentsHierarchiesData="
            systemComponentsHierarchies.systemComponentsHierarchiesData
          "
          :defaultImg="
            systemComponentsHierarchies.systemComponentsHierarchy.defaultImg
          "
          :filterData="systemComponentsHierarchies.filterData"
          :modelName="modelName"
        />

        <SystemComponentsHierarchyCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setSystemComponentsHierarchyData="
            systemComponentsHierarchies.systemComponentsHierarchy.fillData(
              $event
            )
          "
          :systemComponentsHierarchiesData="
            systemComponentsHierarchies.systemComponentsHierarchiesData
          "
          :defaultImg="
            systemComponentsHierarchies.systemComponentsHierarchy.defaultImg
          "
          :filterData="systemComponentsHierarchies.filterData"
          :modelName="modelName"
        />

        <ActionsData
          :actionsData="systemComponentsHierarchies.systemComponentsHierarchy"
        />

        <SystemComponentsHierarchyInfo
          :systemComponentsHierarchy="
            systemComponentsHierarchies.systemComponentsHierarchy
          "
        />

        <SystemComponentsHierarchyDelete
          :systemComponentsHierarchy="
            systemComponentsHierarchies.systemComponentsHierarchy
          "
          v-on:refresh="
            updateFilterData();
            getAllSystemComponentsHierarchies();
          "
        />

        <SystemComponentsHierarchyChangeActivationType
          :systemComponentsHierarchy="
            systemComponentsHierarchies.systemComponentsHierarchy
          "
          v-on:refresh="
            updateFilterData();
            getAllSystemComponentsHierarchies();
          "
        />

        <CustomBottomSheetQRCode
          :refName="'SystemComponentsHierarchyQRCode'"
          :code="systemComponentsHierarchies.systemComponentsHierarchy.fullCode"
          :codeTitle="$t('SystemComponentsHierarchies.code')"
          :name="
            systemComponentsHierarchies.systemComponentsHierarchy
              .systemComponentsHierarchyNameCurrent
          "
          :nameTitle="$t('SystemComponentsHierarchies.name')"
          :nameIcon="'systemComponentsHierarchies.svg'"
        />
      </template>

      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="systemComponentsHierarchies.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <SystemComponentsHierarchyFilter
        :theFilterData="systemComponentsHierarchies.filterData"
        v-on:search="search($event)"
      />

      <SystemComponentsHierarchyAdd
        :systemComponentsHierarchy="
          systemComponentsHierarchies.systemComponentsHierarchy
        "
        :systemTypeToken="systemTypeToken"
        :modelName="modelName"
        v-on:refresh="
          updateFilterData();
          getAllSystemComponentsHierarchies();
        "
      />
      <SystemComponentsHierarchyUpdate
        :systemComponentsHierarchy="
          systemComponentsHierarchies.systemComponentsHierarchy
        "
        :systemTypeToken="systemTypeToken"
        :modelName="modelName"
        v-on:refresh="
          updateFilterData();
          getAllSystemComponentsHierarchies();
        "
      />
    </div>
  </div>
</template>

<script>
import SystemComponentsHierarchyAdd from "./components/SystemComponentsHierarchyAdd.vue";
import SystemComponentsHierarchyUpdate from "./components/SystemComponentsHierarchyUpdate.vue";
import SystemComponentsHierarchyCards from "./components/SystemComponentsHierarchyCards.vue";
import SystemComponentsHierarchyTable from "./components/SystemComponentsHierarchyTable.vue";
import SystemComponentsHierarchyInfo from "./components/SystemComponentsHierarchyInfo.vue";
import SystemComponentsHierarchyDelete from "./components/SystemComponentsHierarchyDelete.vue";
import SystemComponentsHierarchyChangeActivationType from "./components/SystemComponentsHierarchyChangeActivationType.vue";
import SystemComponentsHierarchyFilter from "./components/SystemComponentsHierarchyFilter.vue";

import EducationalCategoryTabs from "./../../../views/educational/educationalCategories/components/EducationalCategoryTabs.vue";
import PlaceTabs from "./../../../views/places/components/PlaceTabs.vue";
import GeographicalDistributionTabs from "./../../../views/settings/settingsOthers/geographicalDistributions/components/GeographicalDistributionTabs.vue";
import BodyPartTabs from "./../../../views/settings/settingsOthers/bodyParts/components/BodyPartTabs.vue";
import JobGradeTabs from "./../../../views/settings/settingsOthers/jobGrades/components/JobGradeTabs.vue";
import StoreItemTabs from "./../../../views/products/storeItems/components/StoreItemTabs.vue";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";

import SystemComponentsHierarchies from "./../../../models/systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchies";
import apiSystemComponentsHierarchy from "./../../../api/systemComponentsHierarchy";

import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import { ACTIVATION_TYPE, SYSTEM_TYPE } from "./../../../utils/constantLists";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasSystemComponentsHierarchyPlaceAdd,
  hasSystemComponentsHierarchyPlaceViewActive,
  hasSystemComponentsHierarchyPlaceViewArchive,
  hasSystemComponentsHierarchyPlaceViewBlocked,
  hasSystemComponentsHierarchyEducationalCategoryAdd,
  hasSystemComponentsHierarchyEducationalCategoryViewActive,
  hasSystemComponentsHierarchyEducationalCategoryViewArchive,
  hasSystemComponentsHierarchyEducationalCategoryViewBlocked,
  hasSystemComponentsHierarchyGeographicalDistributionAdd,
  hasSystemComponentsHierarchyGeographicalDistributionViewActive,
  hasSystemComponentsHierarchyGeographicalDistributionViewArchive,
  hasSystemComponentsHierarchyGeographicalDistributionViewBlocked,
  hasSystemComponentsHierarchyJobGradeAdd,
  hasSystemComponentsHierarchyJobGradeViewActive,
  hasSystemComponentsHierarchyJobGradeViewArchive,
  hasSystemComponentsHierarchyJobGradeViewBlocked,
  hasSystemComponentsHierarchyStoreItemAdd,
  hasSystemComponentsHierarchyBodyPartAdd,
  hasSystemComponentsHierarchyStoreItemViewActive,
  hasSystemComponentsHierarchyStoreItemViewArchive,
  hasSystemComponentsHierarchyStoreItemViewBlocked,
  hasSystemComponentsHierarchyBodyPartViewActive,
  hasSystemComponentsHierarchyBodyPartViewArchive,
  hasSystemComponentsHierarchyBodyPartViewBlocked,
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
    SystemComponentsHierarchyAdd,
    SystemComponentsHierarchyUpdate,
    SystemComponentsHierarchyCards,
    SystemComponentsHierarchyTable,
    SystemComponentsHierarchyInfo,
    SystemComponentsHierarchyDelete,
    SystemComponentsHierarchyChangeActivationType,
    SystemComponentsHierarchyFilter,
    EducationalCategoryTabs,
    PlaceTabs,
    GeographicalDistributionTabs,
    BodyPartTabs,
    JobGradeTabs,
    StoreItemTabs,
  },
  computed: {
    hasData() {
      return (
        this.systemComponentsHierarchies.systemComponentsHierarchiesData
          .length != 0
      );
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
        case "systemComponentsHierarchyPlace":
          options = this.getActivationTypeTokenOptionPlace();
          break;
        case "systemComponentsHierarchyEducationalCategory":
          options = this.getActivationTypeTokenOptionEducationalCategory();
          break;
        case "systemComponentsHierarchyGeographicalDistribution":
          options = this.getActivationTypeTokenOptionGeographicalDistribution();
          break;
        case "systemComponentsHierarchyJobGrade":
          options = this.getActivationTypeTokenOptionJobGrade();
          break;
        case "systemComponentsHierarchyStoreItem":
          options = this.getActivationTypeTokenOptionStoreItem();
          break;
        case "systemComponentsHierarchyBodyPart":
          options = this.getActivationTypeTokenOptionBodyPart();
          break;
      }
      return options;
    },
    hasPrivilegeAdd() {
      let status = false;
      switch (this.modelName) {
        case "systemComponentsHierarchyPlace":
          status = checkPrivilege(hasSystemComponentsHierarchyPlaceAdd());
          break;
        case "systemComponentsHierarchyEducationalCategory":
          status = checkPrivilege(
            hasSystemComponentsHierarchyEducationalCategoryAdd()
          );
          break;
        case "systemComponentsHierarchyGeographicalDistribution":
          status = checkPrivilege(
            hasSystemComponentsHierarchyGeographicalDistributionAdd()
          );
          break;
        case "systemComponentsHierarchyJobGrade":
          status = checkPrivilege(hasSystemComponentsHierarchyJobGradeAdd());
          break;
        case "systemComponentsHierarchyStoreItem":
          status = checkPrivilege(hasSystemComponentsHierarchyStoreItemAdd());
          break;
        case "systemComponentsHierarchyBodyPart":
          status = checkPrivilege(hasSystemComponentsHierarchyBodyPartAdd());
          break;
      }
      return status;
    },
  },
  data() {
    return {
      systemComponentsHierarchies: new SystemComponentsHierarchies(
        this.modelName
      ),
      VIEW_TYPES,
      SYSTEM_TYPE,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  props: {
    systemTypeToken: {
      type: String,
      default: "",
    },
    modelName: {
      type: String,
      default: "",
    },
  },
  methods: {
    checkPrivilege,
    getActivationTypeTokenOptionPlace() {
      let arr = [];
      if (checkPrivilege(hasSystemComponentsHierarchyPlaceViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentsHierarchyPlaceViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentsHierarchyPlaceViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEducationalCategory() {
      let arr = [];
      if (
        checkPrivilege(
          hasSystemComponentsHierarchyEducationalCategoryViewActive()
        )
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (
        checkPrivilege(
          hasSystemComponentsHierarchyEducationalCategoryViewArchive()
        )
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (
        checkPrivilege(
          hasSystemComponentsHierarchyEducationalCategoryViewBlocked()
        )
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionGeographicalDistribution() {
      let arr = [];
      if (
        checkPrivilege(
          hasSystemComponentsHierarchyGeographicalDistributionViewActive()
        )
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (
        checkPrivilege(
          hasSystemComponentsHierarchyGeographicalDistributionViewArchive()
        )
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (
        checkPrivilege(
          hasSystemComponentsHierarchyGeographicalDistributionViewBlocked()
        )
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionJobGrade() {
      let arr = [];
      if (checkPrivilege(hasSystemComponentsHierarchyJobGradeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentsHierarchyJobGradeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentsHierarchyJobGradeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStoreItem() {
      let arr = [];
      if (checkPrivilege(hasSystemComponentsHierarchyStoreItemViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentsHierarchyStoreItemViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentsHierarchyStoreItemViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionBodyPart() {
      let arr = [];
      if (checkPrivilege(hasSystemComponentsHierarchyBodyPartViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentsHierarchyBodyPartViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentsHierarchyBodyPartViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.systemComponentsHierarchies.activationStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },

    changePagination(pagination) {
      this.systemComponentsHierarchies.filterData.fillData(pagination);
      this.updateFilterData();
      this.getAllSystemComponentsHierarchies();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens(this.modelName, data);
      this.updateFilterData();
      this.getAllSystemComponentsHierarchies();
    },
    search(data) {
      this.systemComponentsHierarchies.filterData.fillData(data);
      this.updateFilterData();
      this.getAllSystemComponentsHierarchies();
    },
    async getAllSystemComponentsHierarchies() {
      this.isLoading = true;
      try {
        this.systemComponentsHierarchies.systemComponentsHierarchiesData = [];
        const response = await apiSystemComponentsHierarchy.getAll(
          this.systemComponentsHierarchies.filterData
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
        this.systemComponentsHierarchies.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async updateFilterData() {
      this.systemComponentsHierarchies.filterData.activationTypeTokens =
        this.generalSetting[this.modelName].activationTypeTokens;
      this.systemComponentsHierarchies.filterData.systemTypeToken =
        this.systemTypeToken;
      this.systemComponentsHierarchies.systemComponentsHierarchy.systemTypeToken =
        this.systemTypeToken;
    },
  },
  async created() {
    await this.updateFilterData();
    await this.getAllSystemComponentsHierarchies();
  },
};
</script>
