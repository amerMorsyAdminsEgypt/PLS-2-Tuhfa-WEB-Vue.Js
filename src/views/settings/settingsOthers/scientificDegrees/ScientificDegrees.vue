<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('scientificDegrees', $event)"
      :viewType="generalSetting.scientificDegrees.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.scientificDegrees.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('ScientificDegrees.add')"
      :btnAddName="'ScientificDegreeAdd'"
      :btnAddStatus="checkPrivilege(hasScientificDegreeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <ScientificDegreeTable
          v-if="generalSetting.scientificDegrees.viewType == VIEW_TYPES.table"
          v-on:setScientificDegreeData="
            scientificDegrees.scientificDegree.fillData($event)
          "
          :scientificDegreesData="scientificDegrees.scientificDegreesData"
          :defaultImg="scientificDegrees.scientificDegree.defaultImg"
          :filterData="scientificDegrees.filterData"
        />

        <ScientificDegreeCards
          v-else-if="
            generalSetting.scientificDegrees.viewType == VIEW_TYPES.cards
          "
          v-on:setScientificDegreeData="
            scientificDegrees.scientificDegree.fillData($event)
          "
          :scientificDegreesData="scientificDegrees.scientificDegreesData"
          :defaultImg="scientificDegrees.scientificDegree.defaultImg"
          :filterData="scientificDegrees.filterData"
        />

        <ActionsData :actionsData="scientificDegrees.scientificDegree" />
        <ScientificDegreeInfo
          :scientificDegree="scientificDegrees.scientificDegree"
        />
        <ScientificDegreeDelete
          :scientificDegree="scientificDegrees.scientificDegree"
          v-on:refresh="getAllScientificDegrees()"
        />
        <ScientificDegreeChangeActivationType
          :scientificDegree="scientificDegrees.scientificDegree"
          v-on:refresh="getAllScientificDegrees()"
        />
        <CustomBottomSheetQRCode
          :refName="'ScientificDegreeQRCode'"
          :code="scientificDegrees.scientificDegree.fullCode"
          :codeTitle="$t('ScientificDegrees.code')"
          :name="scientificDegrees.scientificDegree.scientificDegreeNameCurrent"
          :nameTitle="$t('ScientificDegrees.name')"
          :nameIcon="'scientificDegrees.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="scientificDegrees.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ScientificDegreeFilter
        :theFilterData="scientificDegrees.filterData"
        v-on:search="search($event)"
      />

      <ScientificDegreeAdd
        :scientificDegree="scientificDegrees.scientificDegree"
        v-on:refresh="getAllScientificDegrees()"
      />
      <ScientificDegreeUpdate
        :scientificDegree="scientificDegrees.scientificDegree"
        v-on:refresh="getAllScientificDegrees()"
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
import ScientificDegreeAdd from "./components/ScientificDegreeAdd.vue";
import ScientificDegreeUpdate from "./components/ScientificDegreeUpdate.vue";
import ScientificDegreeCards from "./components/ScientificDegreeCards.vue";
import ScientificDegreeTable from "./components/ScientificDegreeTable.vue";
import ScientificDegreeInfo from "./components/ScientificDegreeInfo.vue";
import ScientificDegreeDelete from "./components/ScientificDegreeDelete.vue";
import ScientificDegreeChangeActivationType from "./components/ScientificDegreeChangeActivationType.vue";
import ScientificDegreeFilter from "./components/ScientificDegreeFilter.vue";
import ScientificDegrees from "./../../../../models/settings/settingsOthers/scientificDegrees/ScientificDegrees";
import apiScientificDegree from "./../../../../api/settings/settingsOthers/scientificDegrees";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasScientificDegreeAdd,
  hasScientificDegreeViewActive,
  hasScientificDegreeViewArchive,
  hasScientificDegreeViewBlocked,
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
    ScientificDegreeAdd,
    ScientificDegreeUpdate,
    ScientificDegreeCards,
    ScientificDegreeTable,
    ScientificDegreeInfo,
    ScientificDegreeDelete,
    ScientificDegreeChangeActivationType,
    ScientificDegreeFilter,
  },
  computed: {
    hasData() {
      return this.scientificDegrees.scientificDegreesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasScientificDegreeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.scientificDegrees.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasScientificDegreeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.scientificDegrees.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasScientificDegreeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.scientificDegrees.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      scientificDegrees: new ScientificDegrees(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasScientificDegreeAdd,
    changePagination(pagination) {
      this.scientificDegrees.filterData.fillData(pagination);
      this.getAllScientificDegrees();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("scientificDegrees", data);
      this.scientificDegrees.filterData.activationTypeTokens = data;
      this.getAllScientificDegrees();
    },
    search(data) {
      this.scientificDegrees.filterData.fillData(data);
      this.getAllScientificDegrees();
    },
    async getAllScientificDegrees() {
      this.isLoading = true;
      try {
        this.scientificDegrees.scientificDegreesData = [];
        const response = await apiScientificDegree.getAll(
          this.scientificDegrees.filterData
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
        this.scientificDegrees.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllScientificDegrees();
  },
};
</script>
