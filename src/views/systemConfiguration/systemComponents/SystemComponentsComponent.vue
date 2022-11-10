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
      :btnAddTitle="$t('SystemComponents.add')"
      :btnAddName="'SystemComponentAdd'"
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
        <SystemComponentTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setSystemComponentData="
            systemComponents.systemComponent.fillData($event)
          "
          :systemComponentsData="systemComponents.systemComponentsData"
          :defaultImg="systemComponents.systemComponent.defaultImg"
          :filterData="systemComponents.filterData"
          :modelName="modelName"
        />

        <SystemComponentCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setSystemComponentData="
            systemComponents.systemComponent.fillData($event)
          "
          :systemComponentsData="systemComponents.systemComponentsData"
          :defaultImg="systemComponents.systemComponent.defaultImg"
          :filterData="systemComponents.filterData"
          :modelName="modelName"
        />

        <ActionsData :actionsData="systemComponents.systemComponent" />

        <SystemComponentInfo
          :systemComponent="systemComponents.systemComponent"
        />

        <SystemComponentDelete
          :systemComponent="systemComponents.systemComponent"
          v-on:refresh="
            updateFilterData();
            getAllSystemComponents();
          "
        />

        <SystemComponentChangeActivationType
          :systemComponent="systemComponents.systemComponent"
          v-on:refresh="
            updateFilterData();
            getAllSystemComponents();
          "
        />

        <CustomBottomSheetQRCode
          :refName="'SystemComponentQRCode'"
          :code="systemComponents.systemComponent.fullCode"
          :codeTitle="$t('SystemComponents.code')"
          :name="systemComponents.systemComponent.systemComponentNameCurrent"
          :nameTitle="$t('SystemComponents.name')"
          :nameIcon="'systemComponents.svg'"
        />
      </template>

      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="systemComponents.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <SystemComponentFilter
        :theFilterData="systemComponents.filterData"
        v-on:search="search($event)"
      />

      <SystemComponentAdd
        :systemComponent="systemComponents.systemComponent"
        :systemTypeToken="systemTypeToken"
        v-on:refresh="
          updateFilterData();
          getAllSystemComponents();
        "
      />
      <SystemComponentUpdate
        :systemComponent="systemComponents.systemComponent"
        :systemTypeToken="systemTypeToken"
        v-on:refresh="
          updateFilterData();
          getAllSystemComponents();
        "
      />
    </div>
  </div>
</template>

<script>
import SystemComponentAdd from "./components/SystemComponentAdd.vue";
import SystemComponentUpdate from "./components/SystemComponentUpdate.vue";
import SystemComponentCards from "./components/SystemComponentCards.vue";
import SystemComponentTable from "./components/SystemComponentTable.vue";
import SystemComponentInfo from "./components/SystemComponentInfo.vue";
import SystemComponentDelete from "./components/SystemComponentDelete.vue";
import SystemComponentChangeActivationType from "./components/SystemComponentChangeActivationType.vue";
import SystemComponentFilter from "./components/SystemComponentFilter.vue";

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

import SystemComponents from "./../../../models/systemConfiguration/systemComponents/SystemComponents";
import apiSystemComponent from "./../../../api/systemComponent";

import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import { ACTIVATION_TYPE, SYSTEM_TYPE } from "./../../../utils/constantLists";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasSystemComponentPlaceAdd,
  hasSystemComponentPlaceViewActive,
  hasSystemComponentPlaceViewArchive,
  hasSystemComponentPlaceViewBlocked,
  hasSystemComponentEducationalCategoryAdd,
  hasSystemComponentEducationalCategoryViewActive,
  hasSystemComponentEducationalCategoryViewArchive,
  hasSystemComponentEducationalCategoryViewBlocked,
  hasSystemComponentGeographicalDistributionAdd,
  hasSystemComponentGeographicalDistributionViewActive,
  hasSystemComponentGeographicalDistributionViewArchive,
  hasSystemComponentGeographicalDistributionViewBlocked,
  hasSystemComponentJobGradeAdd,
  hasSystemComponentJobGradeViewActive,
  hasSystemComponentJobGradeViewArchive,
  hasSystemComponentJobGradeViewBlocked,
  hasSystemComponentStoreItemAdd,
  hasSystemComponentBodyPartAdd,
  hasSystemComponentStoreItemViewActive,
  hasSystemComponentStoreItemViewArchive,
  hasSystemComponentStoreItemViewBlocked,
  hasSystemComponentBodyPartViewActive,
  hasSystemComponentBodyPartViewArchive,
  hasSystemComponentBodyPartViewBlocked,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PlaceTabs,
    GeographicalDistributionTabs,
    BodyPartTabs,
    JobGradeTabs,
    StoreItemTabs,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    SystemComponentAdd,
    SystemComponentUpdate,
    SystemComponentCards,
    SystemComponentTable,
    SystemComponentInfo,
    SystemComponentDelete,
    SystemComponentChangeActivationType,
    SystemComponentFilter,
    EducationalCategoryTabs,
  },
  computed: {
    hasData() {
      return this.systemComponents.systemComponentsData.length != 0;
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
        case "systemComponentPlace":
          options = this.getActivationTypeTokenOptionPlace();
          break;
        case "systemComponentEducationalCategory":
          options = this.getActivationTypeTokenOptionEducationalCategory();
          break;
        case "systemComponentGeographicalDistribution":
          options = this.getActivationTypeTokenOptionGeographicalDistribution();
          break;
        case "systemComponentJobGrade":
          options = this.getActivationTypeTokenOptionJobGrade();
          break;
        case "systemComponentStoreItem":
          options = this.getActivationTypeTokenOptionStoreItem();
          break;
        case "systemComponentBodyPart":
          options = this.getActivationTypeTokenOptionBodyPart();
          break;
      }
      return options;
    },
    hasPrivilegeAdd() {
      let status = false;
      switch (this.modelName) {
        case "systemComponentPlace":
          status = checkPrivilege(hasSystemComponentPlaceAdd());
          break;
        case "systemComponentEducationalCategory":
          status = checkPrivilege(hasSystemComponentEducationalCategoryAdd());
          break;
        case "systemComponentGeographicalDistribution":
          status = checkPrivilege(
            hasSystemComponentGeographicalDistributionAdd()
          );
          break;
        case "systemComponentJobGrade":
          status = checkPrivilege(hasSystemComponentJobGradeAdd());
          break;
        case "systemComponentStoreItem":
          status = checkPrivilege(hasSystemComponentStoreItemAdd());
          break;
        case "systemComponentBodyPart":
          status = checkPrivilege(hasSystemComponentBodyPartAdd());
          break;
      }
      return status;
    },
  },
  data() {
    return {
      systemComponents: new SystemComponents(this.modelName),
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
      if (checkPrivilege(hasSystemComponentPlaceViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentPlaceViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentPlaceViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEducationalCategory() {
      let arr = [];
      if (checkPrivilege(hasSystemComponentEducationalCategoryViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentEducationalCategoryViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentEducationalCategoryViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionGeographicalDistribution() {
      let arr = [];
      if (
        checkPrivilege(hasSystemComponentGeographicalDistributionViewActive())
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (
        checkPrivilege(hasSystemComponentGeographicalDistributionViewArchive())
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (
        checkPrivilege(hasSystemComponentGeographicalDistributionViewBlocked())
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionJobGrade() {
      let arr = [];
      if (checkPrivilege(hasSystemComponentJobGradeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentJobGradeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentJobGradeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStoreItem() {
      let arr = [];
      if (checkPrivilege(hasSystemComponentStoreItemViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentStoreItemViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentStoreItemViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionBodyPart() {
      let arr = [];
      if (checkPrivilege(hasSystemComponentBodyPartViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentBodyPartViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSystemComponentBodyPartViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.systemComponents.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },

    changePagination(pagination) {
      this.systemComponents.filterData.fillData(pagination);
      this.updateFilterData();
      this.getAllSystemComponents();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens(this.modelName, data);
      this.updateFilterData();
      this.getAllSystemComponents();
    },
    search(data) {
      this.systemComponents.filterData.fillData(data);
      this.updateFilterData();
      this.getAllSystemComponents();
    },
    async getAllSystemComponents() {
      this.isLoading = true;
      try {
        this.systemComponents.systemComponentsData = [];
        const response = await apiSystemComponent.getAll(
          this.systemComponents.filterData
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
        this.systemComponents.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async updateFilterData() {
      this.systemComponents.filterData.activationTypeTokens =
        this.generalSetting[this.modelName].activationTypeTokens;
      this.systemComponents.filterData.systemTypeToken = this.systemTypeToken;
      this.systemComponents.systemComponent.systemTypeToken =
        this.systemTypeToken;
    },
  },
  async created() {
    await this.updateFilterData();
    await this.getAllSystemComponents();
  },
};
</script>
