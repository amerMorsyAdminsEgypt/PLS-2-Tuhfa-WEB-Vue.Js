<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('educationalStages', $event)"
      :viewType="generalSetting.educationalStages.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.educationalStages.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('EducationalStages.add')"
      :btnAddName="'EducationalStageAdd'"
      :btnAddStatus="checkPrivilege(hasEducationalStageAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <EducationalStageTable
          v-if="generalSetting.educationalStages.viewType == VIEW_TYPES.table"
          v-on:setEducationalStageData="
            educationalStages.educationalStage.fillData($event)
          "
          :educationalStagesData="educationalStages.educationalStagesData"
          :defaultImg="educationalStages.educationalStage.defaultImg"
          :filterData="educationalStages.filterData"
        />

        <EducationalStageCards
          v-else-if="
            generalSetting.educationalStages.viewType == VIEW_TYPES.cards
          "
          v-on:setEducationalStageData="
            educationalStages.educationalStage.fillData($event)
          "
          :educationalStagesData="educationalStages.educationalStagesData"
          :defaultImg="educationalStages.educationalStage.defaultImg"
          :filterData="educationalStages.filterData"
        />

        <ActionsData :actionsData="educationalStages.educationalStage" />
        <EducationalStageInfo
          :educationalStage="educationalStages.educationalStage"
        />
        <EducationalStageDelete
          :educationalStage="educationalStages.educationalStage"
          v-on:refresh="getAllEducationalStages()"
        />
        <EducationalStageChangeActivationType
          :educationalStage="educationalStages.educationalStage"
          v-on:refresh="getAllEducationalStages()"
        />
        <CustomBottomSheetQRCode
          :refName="'EducationalStageQRCode'"
          :code="educationalStages.educationalStage.fullCode"
          :codeTitle="$t('EducationalStages.code')"
          :name="educationalStages.educationalStage.educationalStageNameCurrent"
          :nameTitle="$t('EducationalStages.name')"
          :nameIcon="'educationalStages.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="educationalStages.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <EducationalStageFilter
        :theFilterData="educationalStages.filterData"
        v-on:search="search($event)"
      />

      <EducationalStageAdd
        :educationalStage="educationalStages.educationalStage"
        v-on:refresh="getAllEducationalStages()"
      />
      <EducationalStageUpdate
        :educationalStage="educationalStages.educationalStage"
        v-on:refresh="getAllEducationalStages()"
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

import EducationalStageAdd from "./components/EducationalStageAdd.vue";
import EducationalStageUpdate from "./components/EducationalStageUpdate.vue";
import EducationalStageCards from "./components/EducationalStageCards.vue";
import EducationalStageTable from "./components/EducationalStageTable.vue";
import EducationalStageInfo from "./components/EducationalStageInfo.vue";
import EducationalStageDelete from "./components/EducationalStageDelete.vue";
import EducationalStageChangeActivationType from "./components/EducationalStageChangeActivationType.vue";
import EducationalStageFilter from "./components/EducationalStageFilter.vue";

import EducationalStages from "./../../../../models/settings/settingsOthers/educationalStages/EducationalStages";
import apiEducationalStage from "./../../../../api/settings/settingsOthers/educationalStages";

import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasEducationalStageAdd,
  hasEducationalStageViewActive,
  hasEducationalStageViewArchive,
  hasEducationalStageViewBlocked,
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
    EducationalStageAdd,
    EducationalStageUpdate,
    EducationalStageCards,
    EducationalStageTable,
    EducationalStageInfo,
    EducationalStageDelete,
    EducationalStageChangeActivationType,
    EducationalStageFilter,
  },
  computed: {
    hasData() {
      return this.educationalStages.educationalStagesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasEducationalStageViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.educationalStages.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEducationalStageViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.educationalStages.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEducationalStageViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.educationalStages.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      educationalStages: new EducationalStages(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasEducationalStageAdd,
    changePagination(pagination) {
      this.educationalStages.filterData.fillData(pagination);
      this.getAllEducationalStages();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("educationalStages", data);
      this.educationalStages.filterData.activationTypeTokens = data;
      this.getAllEducationalStages();
    },
    search(data) {
      this.educationalStages.filterData.fillData(data);
      this.getAllEducationalStages();
    },
    async getAllEducationalStages() {
      this.isLoading = true;
      try {
        this.educationalStages.educationalStagesData = [];
        const response = await apiEducationalStage.getAll(
          this.educationalStages.filterData
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
        this.educationalStages.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllEducationalStages();
  },
};
</script>
