<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('gradingPlans', $event)"
      :viewType="generalSetting.gradingPlans.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.gradingPlans.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('GradingPlans.add')"
      :btnAddName="'GradingPlanAdd'"
      :btnAddStatus="checkPrivilege(hasGradingPlanAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <GradingPlanTable
          v-if="generalSetting.gradingPlans.viewType == VIEW_TYPES.table"
          v-on:setGradingPlanData="gradingPlans.gradingPlan.fillData($event)"
          :gradingPlansData="gradingPlans.gradingPlansData"
          :defaultImg="gradingPlans.gradingPlan.defaultImg"
          :filterData="gradingPlans.filterData"
        />

        <GradingPlanCards
          v-else-if="generalSetting.gradingPlans.viewType == VIEW_TYPES.cards"
          v-on:setGradingPlanData="gradingPlans.gradingPlan.fillData($event)"
          :gradingPlansData="gradingPlans.gradingPlansData"
          :defaultImg="gradingPlans.gradingPlan.defaultImg"
          :filterData="gradingPlans.filterData"
        />

        <ActionsData :actionsData="gradingPlans.gradingPlan" />
        <GradingPlanInfo :gradingPlan="gradingPlans.gradingPlan" />
        <GradingPlanDelete
          :gradingPlan="gradingPlans.gradingPlan"
          v-on:refresh="getAllGradingPlans()"
        />
        <GradingPlanChangeActivationType
          :gradingPlan="gradingPlans.gradingPlan"
          v-on:refresh="getAllGradingPlans()"
        />
        <CustomBottomSheetQRCode
          :refName="'GradingPlanQRCode'"
          :code="gradingPlans.gradingPlan.fullCode"
          :codeTitle="$t('GradingPlans.code')"
          :name="gradingPlans.gradingPlan.gradingPlanNameCurrent"
          :nameTitle="$t('GradingPlans.name')"
          :nameIcon="'GradingPlans.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="gradingPlans.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <GradingPlanFilter
        :theFilterData="gradingPlans.filterData"
        v-on:search="search($event)"
      />

      <GradingPlanAdd
        :gradingPlan="gradingPlans.gradingPlan"
        v-on:refresh="getAllGradingPlans()"
      />
      <GradingPlanUpdate
        :gradingPlan="gradingPlans.gradingPlan"
        v-on:refresh="getAllGradingPlans()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../../utils/constantLists";
import DashboardNavbar from "./../../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../../components/general/CustomPagination.vue";
import GradingPlanAdd from "./components/GradingPlanAdd.vue";
import GradingPlanUpdate from "./components/GradingPlanUpdate.vue";
import GradingPlanCards from "./components/GradingPlanCards.vue";
import GradingPlanTable from "./components/GradingPlanTable.vue";
import GradingPlanInfo from "./components/GradingPlanInfo.vue";
import GradingPlanDelete from "./components/GradingPlanDelete.vue";
import GradingPlanChangeActivationType from "./components/GradingPlanChangeActivationType.vue";
import GradingPlanFilter from "./components/GradingPlanFilter.vue";
import GradingPlans from "./../../../../models/settings/settingsOthers/gradingPlans/GradingPlans";
import apiGradingPlan from "./../../../../api/settings/settingsOthers/gradingPlans";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasGradingPlanAdd,
  hasGradingPlanViewActive,
  hasGradingPlanViewArchive,
  hasGradingPlanViewBlocked,
} from "./../../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    GradingPlanAdd,
    GradingPlanUpdate,
    GradingPlanCards,
    GradingPlanTable,
    GradingPlanInfo,
    GradingPlanDelete,
    GradingPlanChangeActivationType,
    GradingPlanFilter,
  },
  computed: {
    hasData() {
      return this.gradingPlans.gradingPlansData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasGradingPlanViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.gradingPlans.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasGradingPlanViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.gradingPlans.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasGradingPlanViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.gradingPlans.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      gradingPlans: new GradingPlans(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasGradingPlanAdd,
    changePagination(pagination) {
      this.gradingPlans.filterData.fillData(pagination);
      this.getAllGradingPlans();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("gradingPlans", data);
      this.gradingPlans.filterData.activationTypeTokens = data;
      this.getAllGradingPlans();
    },
    search(data) {
      this.gradingPlans.filterData.fillData(data);
      this.getAllGradingPlans();
    },
    async getAllGradingPlans() {
      this.isLoading = true;
      try {
        this.gradingPlans.gradingPlansData = [];
        const response = await apiGradingPlan.getAll(
          this.gradingPlans.filterData
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
        this.gradingPlans.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllGradingPlans();
  },
};
</script>
