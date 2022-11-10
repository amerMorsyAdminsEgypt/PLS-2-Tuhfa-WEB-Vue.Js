<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('educationalGroups', $event)"
      :viewType="generalSetting.educationalGroups.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.educationalGroups.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('EducationalGroups.add')"
      :btnAddName="'EducationalGroupAdd'"
      :btnAddStatus="checkPrivilege(hasEducationalGroupAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <EducationalGroupTabs
        :educationalGroupStatistics="
          educationalGroups.educationalGroupStatistics
        "
        :theFilterData="educationalGroups.filterData"
        v-on:search="search($event)"
        v-on:currentTabUpdated="currentTab = $event"
      />

      <template v-if="hasData">
        <EducationalGroupTable
          v-if="generalSetting.educationalGroups.viewType == VIEW_TYPES.table"
          v-on:setEducationalGroupData="
            educationalGroups.educationalGroup.fillData($event);
            educationalGroups.educationalGroupModel.fillData($event);
            educationalGroups.educationalGroupAddStudents.fillData($event);
          "
          :educationalGroupsData="educationalGroups.educationalGroupsData"
          :defaultImg="educationalGroups.educationalGroup.defaultImg"
          :filterData="educationalGroups.filterData"
          :currentTab="currentTab"
        />

        <EducationalGroupCards
          v-else-if="
            generalSetting.educationalGroups.viewType == VIEW_TYPES.cards
          "
          v-on:setEducationalGroupData="
            educationalGroups.educationalGroup.fillData($event);
            educationalGroups.educationalGroupModel.fillData($event);
            educationalGroups.educationalGroupAddStudents.fillData($event);
          "
          :educationalGroupsData="educationalGroups.educationalGroupsData"
          :defaultImg="educationalGroups.educationalGroup.defaultImg"
          :filterData="educationalGroups.filterData"
          :currentTab="currentTab"
        />

        <ActionsData :actionsData="educationalGroups.educationalGroup" />
        <EducationalGroupInfo
          :educationalGroup="educationalGroups.educationalGroup"
        />

        <MediaPackageCodesFilter
          v-on:isLoading="isLoading = $event"
          :joinInEducationalGroupToken="
            educationalGroups.educationalGroup.educationalGroupToken
          "
        />
        <EducationalGroupDelete
          :educationalGroup="educationalGroups.educationalGroup"
          v-on:refresh="getAllEducationalGroups()"
        />
        <EducationalGroupChangeActivationType
          :educationalGroup="educationalGroups.educationalGroup"
          v-on:refresh="getAllEducationalGroups()"
        />
        <EducationalGroupClose
          :educationalGroup="educationalGroups.educationalGroup"
          :currentTab="currentTab"
          v-on:refresh="getAllEducationalGroups()"
        />
        <EducationalGroupFinish
          :educationalGroup="educationalGroups.educationalGroup"
          :currentTab="currentTab"
          v-on:refresh="getAllEducationalGroups()"
        />
        <CustomBottomSheetQRCode
          :refName="'EducationalGroupQRCode'"
          :code="educationalGroups.educationalGroup.fullCode"
          :codeTitle="$t('EducationalGroups.code')"
          :name="educationalGroups.educationalGroup.educationalGroupNameCurrent"
          :nameTitle="$t('EducationalGroups.name')"
          :nameIcon="'EducationalGroups.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="educationalGroups.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <EducationalGroupFilter
        :theFilterData="educationalGroups.filterData"
        v-on:search="search($event)"
      />

      <EducationalGroupAdd
        :educationalGroup="educationalGroups.educationalGroupModel"
        v-on:refresh="getAllEducationalGroups()"
      />
      <EducationalGroupUpdate
        :educationalGroup="educationalGroups.educationalGroupModel"
        :currentTab="currentTab"
        v-on:refresh="getAllEducationalGroups()"
      />
      <EducationalGroupAddStudents
        :educationalGroup="educationalGroups.educationalGroupAddStudents"
        v-on:refresh="getAllEducationalGroups()"
      />
      <EducationalGroupTransferAdd
        :educationalGroupToken="
          educationalGroups.educationalGroup.educationalGroupToken
        "
        v-on:refresh="getAllEducationalGroups()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../utils/constantLists";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import EducationalGroupAdd from "./components/EducationalGroupAdd.vue";
import EducationalGroupUpdate from "./components/EducationalGroupUpdate.vue";
import EducationalGroupAddStudents from "./components/EducationalGroupAddStudents.vue";
import EducationalGroupCards from "./components/EducationalGroupCards.vue";
import EducationalGroupTabs from "./components/EducationalGroupTabs.vue";
import EducationalGroupTable from "./components/EducationalGroupTable.vue";
import EducationalGroupInfo from "./components/EducationalGroupInfo.vue";
import MediaPackageCodesFilter from "./../../reports/components/MediaPackageCodesFilter.vue";
import EducationalGroupDelete from "./components/EducationalGroupDelete.vue";
import EducationalGroupChangeActivationType from "./components/EducationalGroupChangeActivationType.vue";
import EducationalGroupClose from "./components/EducationalGroupClose.vue";
import EducationalGroupFinish from "./components/EducationalGroupFinish.vue";
import EducationalGroupFilter from "./components/EducationalGroupFilter.vue";
import EducationalGroupTransferAdd from "./../educationalGroupTransfers/components/EducationalGroupTransferAdd.vue";
import EducationalGroups from "./../../../models/educational/educationalGroups/EducationalGroups";
import apiEducationalGroup from "./../../../api/educational/educationalGroups";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasEducationalGroupAdd,
  hasEducationalGroupViewActive,
  hasEducationalGroupViewArchive,
  hasEducationalGroupViewBlocked,
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
    EducationalGroupAdd,
    EducationalGroupUpdate,
    EducationalGroupAddStudents,
    EducationalGroupCards,
    EducationalGroupTabs,
    EducationalGroupTable,
    EducationalGroupInfo,
    MediaPackageCodesFilter,
    EducationalGroupDelete,
    EducationalGroupChangeActivationType,
    EducationalGroupClose,
    EducationalGroupFinish,
    EducationalGroupFilter,
    EducationalGroupTransferAdd,
  },
  computed: {
    hasData() {
      return this.educationalGroups.educationalGroupsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasEducationalGroupViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.educationalGroups.educationalGroupStatistics.totalActiveCount ||
          0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEducationalGroupViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.educationalGroups.educationalGroupStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEducationalGroupViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.educationalGroups.educationalGroupStatistics.totalBlockedCount ||
          0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  props: {
    educationalCategoryToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      educationalGroups: new EducationalGroups(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      currentTab: "",
    };
  },
  methods: {
    checkPrivilege,
    hasEducationalGroupAdd,
    changePagination(pagination) {
      this.educationalGroups.filterData.fillData(pagination);
      this.getAllEducationalGroups();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("educationalGroups", data);
      this.educationalGroups.filterData.activationTypeTokens = data;
      this.getAllEducationalGroups();
    },
    search(data) {
      this.educationalGroups.filterData.fillData(data);
      this.getAllEducationalGroups();
    },
    async getAllEducationalGroups() {
      this.isLoading = true;
      try {
        this.educationalGroups.filterData.educationalCategoryInfoDataInclude = true;
        this.educationalGroups.filterData.educationalPeriodDataInclude = true;
        this.educationalGroups.filterData.educationalGroupWeekDayDataInclude = true;
        this.educationalGroups.educationalGroupsData = [];
        const response = await apiEducationalGroup.getAll(
          this.educationalGroups.filterData
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
        this.educationalGroups.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.educationalGroups.filterData.educationalCategoryToken =
      this.educationalCategoryToken;
    this.getAllEducationalGroups();
  },
};
</script>
