<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('relativeRelationTypes', $event)"
      :viewType="generalSetting.relativeRelationTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.relativeRelationTypes.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('RelativeRelationTypes.add')"
      :btnAddName="'RelativeRelationTypeAdd'"
      :btnAddStatus="checkPrivilege(hasRelativeRelationTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <RelativeRelationTypeTable
          v-if="
            generalSetting.relativeRelationTypes.viewType == VIEW_TYPES.table
          "
          v-on:setRelativeRelationTypeData="
            relativeRelationTypes.relativeRelationType.fillData($event)
          "
          :relativeRelationTypesData="
            relativeRelationTypes.relativeRelationTypesData
          "
          :defaultImg="relativeRelationTypes.relativeRelationType.defaultImg"
          :filterData="relativeRelationTypes.filterData"
        />

        <RelativeRelationTypeCards
          v-else-if="
            generalSetting.relativeRelationTypes.viewType == VIEW_TYPES.cards
          "
          v-on:setRelativeRelationTypeData="
            relativeRelationTypes.relativeRelationType.fillData($event)
          "
          :relativeRelationTypesData="
            relativeRelationTypes.relativeRelationTypesData
          "
          :defaultImg="relativeRelationTypes.relativeRelationType.defaultImg"
          :filterData="relativeRelationTypes.filterData"
        />

        <ActionsData
          :actionsData="relativeRelationTypes.relativeRelationType"
        />
        <RelativeRelationTypeInfo
          :relativeRelationType="relativeRelationTypes.relativeRelationType"
        />
        <RelativeRelationTypeDelete
          :relativeRelationType="relativeRelationTypes.relativeRelationType"
          v-on:refresh="getAllRelativeRelationTypes()"
        />
        <RelativeRelationTypeChangeActivationType
          :relativeRelationType="relativeRelationTypes.relativeRelationType"
          v-on:refresh="getAllRelativeRelationTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'RelativeRelationTypeQRCode'"
          :code="relativeRelationTypes.relativeRelationType.fullCode"
          :codeTitle="$t('RelativeRelationTypes.code')"
          :name="
            relativeRelationTypes.relativeRelationType
              .relativeRelationTypeNameCurrent
          "
          :nameTitle="$t('RelativeRelationTypes.name')"
          :nameIcon="'RelativeRelationTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="relativeRelationTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <RelativeRelationTypeFilter
        :theFilterData="relativeRelationTypes.filterData"
        v-on:search="search($event)"
      />

      <RelativeRelationTypeAdd
        :relativeRelationType="relativeRelationTypes.relativeRelationType"
        v-on:refresh="getAllRelativeRelationTypes()"
      />
      <RelativeRelationTypeUpdate
        :relativeRelationType="relativeRelationTypes.relativeRelationType"
        v-on:refresh="getAllRelativeRelationTypes()"
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
import RelativeRelationTypeAdd from "./components/RelativeRelationTypeAdd.vue";
import RelativeRelationTypeUpdate from "./components/RelativeRelationTypeUpdate.vue";
import RelativeRelationTypeCards from "./components/RelativeRelationTypeCards.vue";
import RelativeRelationTypeTable from "./components/RelativeRelationTypeTable.vue";
import RelativeRelationTypeInfo from "./components/RelativeRelationTypeInfo.vue";
import RelativeRelationTypeDelete from "./components/RelativeRelationTypeDelete.vue";
import RelativeRelationTypeChangeActivationType from "./components/RelativeRelationTypeChangeActivationType.vue";
import RelativeRelationTypeFilter from "./components/RelativeRelationTypeFilter.vue";
import RelativeRelationTypes from "./../../../../models/settings/settingsOthers/relativeRelationTypes/RelativeRelationTypes";
import apiRelativeRelationType from "./../../../../api/settings/settingsOthers/relativeRelationTypes";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasRelativeRelationTypeAdd,
  hasRelativeRelationTypeViewActive,
  hasRelativeRelationTypeViewArchive,
  hasRelativeRelationTypeViewBlocked,
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
    RelativeRelationTypeAdd,
    RelativeRelationTypeUpdate,
    RelativeRelationTypeCards,
    RelativeRelationTypeTable,
    RelativeRelationTypeInfo,
    RelativeRelationTypeDelete,
    RelativeRelationTypeChangeActivationType,
    RelativeRelationTypeFilter,
  },
  computed: {
    hasData() {
      return this.relativeRelationTypes.relativeRelationTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasRelativeRelationTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.relativeRelationTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasRelativeRelationTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.relativeRelationTypes.activationStatistics.totalArchivedCount ||
          0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasRelativeRelationTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.relativeRelationTypes.activationStatistics.totalBlockedCount ||
          0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      relativeRelationTypes: new RelativeRelationTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasRelativeRelationTypeAdd,
    changePagination(pagination) {
      this.relativeRelationTypes.filterData.fillData(pagination);
      this.getAllRelativeRelationTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("relativeRelationTypes", data);
      this.relativeRelationTypes.filterData.activationTypeTokens = data;
      this.getAllRelativeRelationTypes();
    },
    search(data) {
      this.relativeRelationTypes.filterData.fillData(data);
      this.getAllRelativeRelationTypes();
    },
    async getAllRelativeRelationTypes() {
      this.isLoading = true;
      try {
        this.relativeRelationTypes.relativeRelationTypesData = [];
        const response = await apiRelativeRelationType.getAll(
          this.relativeRelationTypes.filterData
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
        this.relativeRelationTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllRelativeRelationTypes();
  },
};
</script>
