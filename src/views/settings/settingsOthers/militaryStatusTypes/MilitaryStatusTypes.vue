<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('militaryStatusTypes', $event)"
      :viewType="generalSetting.militaryStatusTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.militaryStatusTypes.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('MilitaryStatusTypes.add')"
      :btnAddName="'MilitaryStatusTypeAdd'"
      :btnAddStatus="checkPrivilege(hasMilitaryStatusTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <MilitaryStatusTypeTable
          v-if="generalSetting.militaryStatusTypes.viewType == VIEW_TYPES.table"
          v-on:setMilitaryStatusTypeData="
            militaryStatusTypes.militaryStatusType.fillData($event)
          "
          :militaryStatusTypesData="militaryStatusTypes.militaryStatusTypesData"
          :defaultImg="militaryStatusTypes.militaryStatusType.defaultImg"
          :filterData="militaryStatusTypes.filterData"
        />

        <MilitaryStatusTypeCards
          v-else-if="
            generalSetting.militaryStatusTypes.viewType == VIEW_TYPES.cards
          "
          v-on:setMilitaryStatusTypeData="
            militaryStatusTypes.militaryStatusType.fillData($event)
          "
          :militaryStatusTypesData="militaryStatusTypes.militaryStatusTypesData"
          :defaultImg="militaryStatusTypes.militaryStatusType.defaultImg"
          :filterData="militaryStatusTypes.filterData"
        />

        <ActionsData :actionsData="militaryStatusTypes.militaryStatusType" />
        <MilitaryStatusTypeInfo
          :militaryStatusType="militaryStatusTypes.militaryStatusType"
        />
        <MilitaryStatusTypeDelete
          :militaryStatusType="militaryStatusTypes.militaryStatusType"
          v-on:refresh="getAllMilitaryStatusTypes()"
        />
        <MilitaryStatusTypeChangeActivationType
          :militaryStatusType="militaryStatusTypes.militaryStatusType"
          v-on:refresh="getAllMilitaryStatusTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'MilitaryStatusTypeQRCode'"
          :code="militaryStatusTypes.militaryStatusType.fullCode"
          :codeTitle="$t('MilitaryStatusTypes.code')"
          :name="
            militaryStatusTypes.militaryStatusType.militaryStatusTypeNameCurrent
          "
          :nameTitle="$t('MilitaryStatusTypes.name')"
          :nameIcon="'militaryStatus.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="militaryStatusTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <MilitaryStatusTypeFilter
        :theFilterData="militaryStatusTypes.filterData"
        v-on:search="search($event)"
      />

      <MilitaryStatusTypeAdd
        :militaryStatusType="militaryStatusTypes.militaryStatusType"
        v-on:refresh="getAllMilitaryStatusTypes()"
      />
      <MilitaryStatusTypeUpdate
        :militaryStatusType="militaryStatusTypes.militaryStatusType"
        v-on:refresh="getAllMilitaryStatusTypes()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "../../../../utils/constants";
import { ACTIVATION_TYPE } from "../../../../utils/constantLists";
import DashboardNavbar from "../../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "../../../../components/general/ExceptionWithImg.vue";
import ActionsData from "../../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "../../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "../../../../components/general/CustomPagination.vue";
import MilitaryStatusTypeAdd from "./components/MilitaryStatusTypeAdd.vue";
import MilitaryStatusTypeUpdate from "./components/MilitaryStatusTypeUpdate.vue";
import MilitaryStatusTypeCards from "./components/MilitaryStatusTypeCards.vue";
import MilitaryStatusTypeTable from "./components/MilitaryStatusTypeTable.vue";
import MilitaryStatusTypeInfo from "./components/MilitaryStatusTypeInfo.vue";
import MilitaryStatusTypeDelete from "./components/MilitaryStatusTypeDelete.vue";
import MilitaryStatusTypeChangeActivationType from "./components/MilitaryStatusTypeChangeActivationType.vue";
import MilitaryStatusTypeFilter from "./components/MilitaryStatusTypeFilter.vue";
import MilitaryStatusTypes from "../../../../models/settings/settingsOthers/militaryStatusTypes/MilitaryStatusTypes";
import apiMilitaryStatusType from "../../../../api/settings/settingsOthers/militaryStatusTypes";
import { getDialogOfActivationTypes } from "../../../../utils/dialogsOfConstantsLists";
import generalMixin from "../../../../utils/generalMixin";
import generalSettingsMixin from "../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "../../../../utils/functions";
import {
  hasMilitaryStatusTypeAdd,
  hasMilitaryStatusTypeViewActive,
  hasMilitaryStatusTypeViewArchive,
  hasMilitaryStatusTypeViewBlocked,
} from "../../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    MilitaryStatusTypeAdd,
    MilitaryStatusTypeUpdate,
    MilitaryStatusTypeCards,
    MilitaryStatusTypeTable,
    MilitaryStatusTypeInfo,
    MilitaryStatusTypeDelete,
    MilitaryStatusTypeChangeActivationType,
    MilitaryStatusTypeFilter,
  },
  computed: {
    hasData() {
      return this.militaryStatusTypes.militaryStatusTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasMilitaryStatusTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.militaryStatusTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMilitaryStatusTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.militaryStatusTypes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMilitaryStatusTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.militaryStatusTypes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      militaryStatusTypes: new MilitaryStatusTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasMilitaryStatusTypeAdd,
    changePagination(pagination) {
      this.militaryStatusTypes.filterData.fillData(pagination);
      this.getAllMilitaryStatusTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("militaryStatusTypes", data);
      this.militaryStatusTypes.filterData.activationTypeTokens = data;
      this.getAllMilitaryStatusTypes();
    },
    search(data) {
      this.militaryStatusTypes.filterData.fillData(data);
      this.getAllMilitaryStatusTypes();
    },
    async getAllMilitaryStatusTypes() {
      this.isLoading = true;
      try {
        this.militaryStatusTypes.militaryStatusTypesData = [];
        const response = await apiMilitaryStatusType.getAll(
          this.militaryStatusTypes.filterData
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
        this.militaryStatusTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllMilitaryStatusTypes();
  },
};
</script>
