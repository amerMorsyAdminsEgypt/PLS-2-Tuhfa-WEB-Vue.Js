<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('geographicalDistributions', $event)"
      :viewType="generalSetting.geographicalDistributions.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.geographicalDistributions.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('GeographicalDistributions.add')"
      :btnAddName="'GeographicalDistributionAdd'"
      :btnAddStatus="checkPrivilege(hasGeographicalDistributionAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <GeographicalDistributionTabs />

      <template v-if="hasData">
        <GeographicalDistributionTable
          v-if="
            generalSetting.geographicalDistributions.viewType ==
            VIEW_TYPES.table
          "
          v-on:setGeographicalDistributionData="
            geographicalDistributions.geographicalDistribution.fillData($event)
          "
          :geographicalDistributionsData="
            geographicalDistributions.geographicalDistributionsData
          "
          :defaultImg="
            geographicalDistributions.geographicalDistribution.defaultImg
          "
          :filterData="geographicalDistributions.filterData"
        />

        <GeographicalDistributionCards
          v-else-if="
            generalSetting.geographicalDistributions.viewType ==
            VIEW_TYPES.cards
          "
          v-on:setGeographicalDistributionData="
            geographicalDistributions.geographicalDistribution.fillData($event)
          "
          :geographicalDistributionsData="
            geographicalDistributions.geographicalDistributionsData
          "
          :defaultImg="
            geographicalDistributions.geographicalDistribution.defaultImg
          "
          :filterData="geographicalDistributions.filterData"
        />

        <ActionsData
          :actionsData="geographicalDistributions.geographicalDistribution"
        />
        <GeographicalDistributionInfo
          :geographicalDistribution="
            geographicalDistributions.geographicalDistribution
          "
        />
        <GeographicalDistributionDelete
          :geographicalDistribution="
            geographicalDistributions.geographicalDistribution
          "
          v-on:refresh="getAllGeographicalDistributions()"
        />
        <GeographicalDistributionChangeActivationType
          :geographicalDistribution="
            geographicalDistributions.geographicalDistribution
          "
          v-on:refresh="getAllGeographicalDistributions()"
        />
        <CustomBottomSheetQRCode
          :refName="'GeographicalDistributionQRCode'"
          :code="geographicalDistributions.geographicalDistribution.fullCode"
          :codeTitle="$t('GeographicalDistributions.code')"
          :name="
            geographicalDistributions.geographicalDistribution
              .geographicalDistributionNameCurrent
          "
          :nameTitle="$t('GeographicalDistributions.name')"
          :nameIcon="'geographicalDistributions.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="geographicalDistributions.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <GeographicalDistributionFilter
        :theFilterData="geographicalDistributions.filterData"
        v-on:search="search($event)"
      />

      <GeographicalDistributionAdd
        :geographicalDistribution="
          geographicalDistributions.geographicalDistribution
        "
        v-on:refresh="getAllGeographicalDistributions()"
      />
      <GeographicalDistributionUpdate
        :geographicalDistribution="
          geographicalDistributions.geographicalDistribution
        "
        v-on:refresh="getAllGeographicalDistributions()"
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
import GeographicalDistributionAdd from "./components/GeographicalDistributionAdd.vue";
import GeographicalDistributionUpdate from "./components/GeographicalDistributionUpdate.vue";
import GeographicalDistributionCards from "./components/GeographicalDistributionCards.vue";
import GeographicalDistributionTable from "./components/GeographicalDistributionTable.vue";
import GeographicalDistributionTabs from "./components/GeographicalDistributionTabs.vue";
import GeographicalDistributionInfo from "./components/GeographicalDistributionInfo.vue";
import GeographicalDistributionDelete from "./components/GeographicalDistributionDelete.vue";
import GeographicalDistributionChangeActivationType from "./components/GeographicalDistributionChangeActivationType.vue";
import GeographicalDistributionFilter from "./components/GeographicalDistributionFilter.vue";
import GeographicalDistributions from "./../../../../models/settings/settingsOthers/geographicalDistributions/GeographicalDistributions";
import apiGeographicalDistribution from "./../../../../api/settings/settingsOthers/geographicalDistributions";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasGeographicalDistributionAdd,
  hasGeographicalDistributionViewActive,
  hasGeographicalDistributionViewArchive,
  hasGeographicalDistributionViewBlocked,
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
    GeographicalDistributionAdd,
    GeographicalDistributionUpdate,
    GeographicalDistributionCards,
    GeographicalDistributionTable,
    GeographicalDistributionTabs,
    GeographicalDistributionInfo,
    GeographicalDistributionDelete,
    GeographicalDistributionChangeActivationType,
    GeographicalDistributionFilter,
  },
  computed: {
    hasData() {
      return (
        this.geographicalDistributions.geographicalDistributionsData.length != 0
      );
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasGeographicalDistributionViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.geographicalDistributions.activationStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasGeographicalDistributionViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.geographicalDistributions.activationStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasGeographicalDistributionViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.geographicalDistributions.activationStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  props: {
    parentGeographicalDistributionToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      geographicalDistributions: new GeographicalDistributions(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasGeographicalDistributionAdd,
    changePagination(pagination) {
      this.geographicalDistributions.filterData.fillData(pagination);
      this.getAllGeographicalDistributions();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("geographicalDistributions", data);
      this.geographicalDistributions.filterData.activationTypeTokens = data;
      this.getAllGeographicalDistributions();
    },
    search(data) {
      this.geographicalDistributions.filterData.fillData(data);
      this.getAllGeographicalDistributions();
    },
    async getAllGeographicalDistributions() {
      this.isLoading = true;
      try {
        this.geographicalDistributions.geographicalDistributionsData = [];
        this.geographicalDistributions.filterData.parentGeographicalDistributionToken =
          this.parentGeographicalDistributionToken;
        this.geographicalDistributions.filterData.getOnlyParentGeographicalDistributions =
          this.parentGeographicalDistributionToken ? false : true;

        const response = await apiGeographicalDistribution.getAll(
          this.geographicalDistributions.filterData
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
        this.geographicalDistributions.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  watch: {
    parentGeographicalDistributionToken: function () {
      this.getAllGeographicalDistributions();
    },
  },
  async created() {
    this.getAllGeographicalDistributions();
  },
};
</script>
