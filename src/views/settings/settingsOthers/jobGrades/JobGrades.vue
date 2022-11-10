<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('jobGrades', $event)"
      :viewType="generalSetting.jobGrades.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.jobGrades.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('JobGrades.add')"
      :btnAddName="'JobGradeAdd'"
      :btnAddStatus="checkPrivilege(hasJobGradeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <JobGradeTabs />

      <template v-if="hasData">
        <JobGradeTable
          v-if="generalSetting.jobGrades.viewType == VIEW_TYPES.table"
          v-on:setJobGradeData="jobGrades.jobGrade.fillData($event)"
          :jobGradesData="jobGrades.jobGradesData"
          :defaultImg="jobGrades.jobGrade.defaultImg"
          :filterData="jobGrades.filterData"
        />

        <JobGradeCards
          v-else-if="generalSetting.jobGrades.viewType == VIEW_TYPES.cards"
          v-on:setJobGradeData="jobGrades.jobGrade.fillData($event)"
          :jobGradesData="jobGrades.jobGradesData"
          :defaultImg="jobGrades.jobGrade.defaultImg"
          :filterData="jobGrades.filterData"
        />

        <ActionsData :actionsData="jobGrades.jobGrade" />
        <JobGradeInfo :jobGrade="jobGrades.jobGrade" />
        <JobGradeDelete
          :jobGrade="jobGrades.jobGrade"
          v-on:refresh="getAllJobGrades()"
        />
        <JobGradeChangeActivationType
          :jobGrade="jobGrades.jobGrade"
          v-on:refresh="getAllJobGrades()"
        />
        <CustomBottomSheetQRCode
          :refName="'JobGradeQRCode'"
          :code="jobGrades.jobGrade.fullCode"
          :codeTitle="$t('JobGrades.code')"
          :name="jobGrades.jobGrade.jobGradeNameCurrent"
          :nameTitle="$t('JobGrades.name')"
          :nameIcon="'jobGrade.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="jobGrades.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <JobGradeFilter
        :theFilterData="jobGrades.filterData"
        v-on:search="search($event)"
      />

      <JobGradeAdd
        :jobGrade="jobGrades.jobGrade"
        v-on:refresh="getAllJobGrades()"
      />
      <JobGradeUpdate
        :jobGrade="jobGrades.jobGrade"
        v-on:refresh="getAllJobGrades()"
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
import JobGradeAdd from "./components/JobGradeAdd.vue";
import JobGradeUpdate from "./components/JobGradeUpdate.vue";
import JobGradeCards from "./components/JobGradeCards.vue";
import JobGradeTable from "./components/JobGradeTable.vue";
import JobGradeTabs from "./components/JobGradeTabs.vue";
import JobGradeInfo from "./components/JobGradeInfo.vue";
import JobGradeDelete from "./components/JobGradeDelete.vue";
import JobGradeChangeActivationType from "./components/JobGradeChangeActivationType.vue";
import JobGradeFilter from "./components/JobGradeFilter.vue";
import JobGrades from "./../../../../models/settings/settingsOthers/jobGrades/JobGrades";
import apiJobGrade from "./../../../../api/settings/settingsOthers/jobGrades";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasJobGradeAdd,
  hasJobGradeViewActive,
  hasJobGradeViewArchive,
  hasJobGradeViewBlocked,
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
    JobGradeAdd,
    JobGradeUpdate,
    JobGradeCards,
    JobGradeTable,
    JobGradeTabs,
    JobGradeInfo,
    JobGradeDelete,
    JobGradeChangeActivationType,
    JobGradeFilter,
  },
  computed: {
    hasData() {
      return this.jobGrades.jobGradesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasJobGradeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.jobGrades.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasJobGradeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.jobGrades.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasJobGradeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.jobGrades.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  props: {
    parentJobGradeToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      jobGrades: new JobGrades(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasJobGradeAdd,
    changePagination(pagination) {
      this.jobGrades.filterData.fillData(pagination);
      this.getAllJobGrades();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("jobGrades", data);
      this.jobGrades.filterData.activationTypeTokens = data;
      this.getAllJobGrades();
    },
    search(data) {
      this.jobGrades.filterData.fillData(data);
      this.getAllJobGrades();
    },
    async getAllJobGrades() {
      this.isLoading = true;
      try {
        this.jobGrades.jobGradesData = [];
        this.jobGrades.filterData.parentJobGradeToken =
          this.parentJobGradeToken;
        this.jobGrades.filterData.getOnlyParentJobGrades = this
          .parentJobGradeToken
          ? false
          : true;

        const response = await apiJobGrade.getAll(this.jobGrades.filterData);
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
        this.jobGrades.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  watch: {
    parentJobGradeToken: function () {
      this.getAllJobGrades();
    },
  },
  async created() {
    this.getAllJobGrades();
  },
};
</script>
