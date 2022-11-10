<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('complaintTypes', $event)"
      :viewType="generalSetting.complaintTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.complaintTypes.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('ComplaintTypes.add')"
      :btnAddName="'ComplaintTypeAdd'"
      :btnAddStatus="checkPrivilege(hasComplaintTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <ComplaintTypeTable
          v-if="generalSetting.complaintTypes.viewType == VIEW_TYPES.table"
          v-on:setComplaintTypeData="
            complaintTypes.complaintType.fillData($event)
          "
          :complaintTypesData="complaintTypes.complaintTypesData"
          :defaultImg="complaintTypes.complaintType.defaultImg"
          :filterData="complaintTypes.filterData"
        />

        <ComplaintTypeCards
          v-else-if="generalSetting.complaintTypes.viewType == VIEW_TYPES.cards"
          v-on:setComplaintTypeData="
            complaintTypes.complaintType.fillData($event)
          "
          :complaintTypesData="complaintTypes.complaintTypesData"
          :defaultImg="complaintTypes.complaintType.defaultImg"
          :filterData="complaintTypes.filterData"
        />

        <ActionsData :actionsData="complaintTypes.complaintType" />
        <ComplaintTypeInfo :complaintType="complaintTypes.complaintType" />
        <ComplaintTypeDelete
          :complaintType="complaintTypes.complaintType"
          v-on:refresh="getAllComplaintTypes()"
        />
        <ComplaintTypeChangeActivationType
          :complaintType="complaintTypes.complaintType"
          v-on:refresh="getAllComplaintTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'ComplaintTypeQRCode'"
          :code="complaintTypes.complaintType.fullCode"
          :codeTitle="$t('ComplaintTypes.code')"
          :name="complaintTypes.complaintType.complaintTypeNameCurrent"
          :nameTitle="$t('ComplaintTypes.name')"
          :nameIcon="'complaintTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="complaintTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ComplaintTypeFilter
        :theFilterData="complaintTypes.filterData"
        v-on:search="search($event)"
      />

      <ComplaintTypeAdd
        :complaintType="complaintTypes.complaintType"
        v-on:refresh="getAllComplaintTypes()"
      />
      <ComplaintTypeUpdate
        :complaintType="complaintTypes.complaintType"
        v-on:refresh="getAllComplaintTypes()"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { STATUS, VIEW_TYPES } from "./../../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../../utils/constantLists";
import DashboardNavbar from "./../../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../../components/general/CustomPagination.vue";
import ComplaintTypeAdd from "./components/ComplaintTypeAdd.vue";
import ComplaintTypeUpdate from "./components/ComplaintTypeUpdate.vue";
import ComplaintTypeCards from "./components/ComplaintTypeCards.vue";
import ComplaintTypeTable from "./components/ComplaintTypeTable.vue";
import ComplaintTypeInfo from "./components/ComplaintTypeInfo.vue";
import ComplaintTypeDelete from "./components/ComplaintTypeDelete.vue";
import ComplaintTypeChangeActivationType from "./components/ComplaintTypeChangeActivationType.vue";
import ComplaintTypeFilter from "./components/ComplaintTypeFilter.vue";
import ComplaintTypes from "./../../../../models/settings/settingsOthers/complaintTypes/ComplaintTypes";
import apiComplaintType from "./../../../../api/settings/settingsOthers/complaintTypes";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasComplaintTypeAdd,
  hasComplaintTypeViewActive,
  hasComplaintTypeViewArchive,
  hasComplaintTypeViewBlocked,
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
    ComplaintTypeAdd,
    ComplaintTypeUpdate,
    ComplaintTypeCards,
    ComplaintTypeTable,
    ComplaintTypeInfo,
    ComplaintTypeDelete,
    ComplaintTypeChangeActivationType,
    ComplaintTypeFilter,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
    hasData() {
      return this.complaintTypes.complaintTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasComplaintTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.complaintTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasComplaintTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.complaintTypes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasComplaintTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.complaintTypes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      complaintTypes: new ComplaintTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasComplaintTypeAdd,
    changePagination(pagination) {
      this.complaintTypes.filterData.fillData(pagination);
      this.getAllComplaintTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("complaintTypes", data);
      this.complaintTypes.filterData.activationTypeTokens = data;
      this.getAllComplaintTypes();
    },
    search(data) {
      this.complaintTypes.filterData.fillData(data);
      this.getAllComplaintTypes();
    },
    async getAllComplaintTypes() {
      this.isLoading = true;
      try {
        this.complaintTypes.complaintTypesData = [];
        const response = await apiComplaintType.getAll(
          this.complaintTypes.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.complaintTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllComplaintTypes();
  },
};
</script>
