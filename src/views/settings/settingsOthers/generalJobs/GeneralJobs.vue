<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('generalJobs', $event)"
      :viewType="generalSetting.generalJobs.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.generalJobs.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('GeneralJobs.add')"
      :btnAddName="'GeneralJobAdd'"
      :btnAddStatus="checkPrivilege(hasGeneralJobAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <GeneralJobTable
          v-if="generalSetting.generalJobs.viewType == VIEW_TYPES.table"
          v-on:setGeneralJobData="generalJobs.generalJob.fillData($event)"
          :generalJobsData="generalJobs.generalJobsData"
          :defaultImg="generalJobs.generalJob.defaultImg"
          :filterData="generalJobs.filterData"
        />

        <GeneralJobCards
          v-else-if="generalSetting.generalJobs.viewType == VIEW_TYPES.cards"
          v-on:setGeneralJobData="generalJobs.generalJob.fillData($event)"
          :generalJobsData="generalJobs.generalJobsData"
          :defaultImg="generalJobs.generalJob.defaultImg"
          :filterData="generalJobs.filterData"
        />

        <ActionsData :actionsData="generalJobs.generalJob" />
        <GeneralJobInfo :generalJob="generalJobs.generalJob" />
        <GeneralJobDelete
          :generalJob="generalJobs.generalJob"
          v-on:refresh="getAllGeneralJobs()"
        />
        <GeneralJobChangeActivationType
          :generalJob="generalJobs.generalJob"
          v-on:refresh="getAllGeneralJobs()"
        />
        <CustomBottomSheetQRCode
          :refName="'GeneralJobQRCode'"
          :code="generalJobs.generalJob.fullCode"
          :codeTitle="$t('GeneralJobs.code')"
          :name="generalJobs.generalJob.generalJobNameCurrent"
          :nameTitle="$t('GeneralJobs.name')"
          :nameIcon="'generalJobs.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="generalJobs.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <GeneralJobFilter
        :theFilterData="generalJobs.filterData"
        v-on:search="search($event)"
      />

      <GeneralJobAdd
        :generalJob="generalJobs.generalJob"
        v-on:refresh="getAllGeneralJobs()"
      />
      <GeneralJobUpdate
        :generalJob="generalJobs.generalJob"
        v-on:refresh="getAllGeneralJobs()"
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
import GeneralJobAdd from "./components/GeneralJobAdd.vue";
import GeneralJobUpdate from "./components/GeneralJobUpdate.vue";
import GeneralJobCards from "./components/GeneralJobCards.vue";
import GeneralJobTable from "./components/GeneralJobTable.vue";
import GeneralJobInfo from "./components/GeneralJobInfo.vue";
import GeneralJobDelete from "./components/GeneralJobDelete.vue";
import GeneralJobChangeActivationType from "./components/GeneralJobChangeActivationType.vue";
import GeneralJobFilter from "./components/GeneralJobFilter.vue";
import GeneralJobs from "./../../../../models/settings/settingsOthers/generalJobs/GeneralJobs";
import apiGeneralJob from "./../../../../api/settings/settingsOthers/generalJobs";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasGeneralJobAdd,
  hasGeneralJobViewActive,
  hasGeneralJobViewArchive,
  hasGeneralJobViewBlocked,
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
    GeneralJobAdd,
    GeneralJobUpdate,
    GeneralJobCards,
    GeneralJobTable,
    GeneralJobInfo,
    GeneralJobDelete,
    GeneralJobChangeActivationType,
    GeneralJobFilter,
  },
  computed: {
    hasData() {
      return this.generalJobs.generalJobsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasGeneralJobViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.generalJobs.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasGeneralJobViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.generalJobs.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasGeneralJobViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.generalJobs.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      generalJobs: new GeneralJobs(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasGeneralJobAdd,
    changePagination(pagination) {
      this.generalJobs.filterData.fillData(pagination);
      this.getAllGeneralJobs();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("generalJobs", data);
      this.generalJobs.filterData.activationTypeTokens = data;
      this.getAllGeneralJobs();
    },
    search(data) {
      this.generalJobs.filterData.fillData(data);
      this.getAllGeneralJobs();
    },
    async getAllGeneralJobs() {
      this.isLoading = true;
      try {
        this.generalJobs.generalJobsData = [];
        const response = await apiGeneralJob.getAll(
          this.generalJobs.filterData
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
        this.generalJobs.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllGeneralJobs();
  },
};
</script>
