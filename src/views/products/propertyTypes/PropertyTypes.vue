<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('propertyTypes', $event)"
      :viewType="generalSetting.propertyTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.propertyTypes.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('PropertyTypes.add')"
      :btnAddName="'PropertyTypeAdd'"
      :btnAddStatus="checkPrivilege(hasPropertyTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <StoreItemTabs />

      <template v-if="hasData">
        <PropertyTypeTable
          v-if="generalSetting.propertyTypes.viewType == VIEW_TYPES.table"
          v-on:setPropertyTypeData="propertyTypes.propertyType.fillData($event)"
          :propertyTypesData="propertyTypes.propertyTypesData"
          :defaultImg="propertyTypes.propertyType.defaultImg"
          :filterData="propertyTypes.filterData"
        />

        <PropertyTypeCards
          v-else-if="generalSetting.propertyTypes.viewType == VIEW_TYPES.cards"
          v-on:setPropertyTypeData="propertyTypes.propertyType.fillData($event)"
          :propertyTypesData="propertyTypes.propertyTypesData"
          :defaultImg="propertyTypes.propertyType.defaultImg"
          :filterData="propertyTypes.filterData"
        />

        <ActionsData :actionsData="propertyTypes.propertyType" />
        <PropertyTypeInfo
          :token="propertyTypes.propertyType.propertyTypeToken"
        />
        <PropertyTypeDelete
          :propertyType="propertyTypes.propertyType"
          v-on:refresh="getAllPropertyTypes()"
        />
        <PropertyTypeChangeActivationType
          :propertyType="propertyTypes.propertyType"
          v-on:refresh="getAllPropertyTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'PropertyTypeQRCode'"
          :code="propertyTypes.propertyType.fullCode"
          :codeTitle="$t('PropertyTypes.code')"
          :name="propertyTypes.propertyType.propertyTypeNameCurrent"
          :nameTitle="$t('PropertyTypes.name')"
          :nameIcon="'PropertyTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="propertyTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <PropertyTypeFilter
        :theFilterData="propertyTypes.filterData"
        v-on:search="search($event)"
      />

      <PropertyTypeAdd
        :propertyType="propertyTypes.propertyType"
        v-on:refresh="getAllPropertyTypes()"
      />
      <PropertyTypeUpdate
        :token="propertyTypes.propertyType.propertyTypeToken"
        v-on:refresh="getAllPropertyTypes()"
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
import StoreItemTabs from "./../storeItems/components/StoreItemTabs.vue";
import PropertyTypeAdd from "./components/PropertyTypeAdd.vue";
import PropertyTypeUpdate from "./components/PropertyTypeUpdate.vue";
import PropertyTypeCards from "./components/PropertyTypeCards.vue";
import PropertyTypeTable from "./components/PropertyTypeTable.vue";
import PropertyTypeInfo from "./components/PropertyTypeInfo.vue";
import PropertyTypeDelete from "./components/PropertyTypeDelete.vue";
import PropertyTypeChangeActivationType from "./components/PropertyTypeChangeActivationType.vue";
import PropertyTypeFilter from "./components/PropertyTypeFilter.vue";
import PropertyTypes from "./../../../models/products/propertyTypes/PropertyTypes";
import apiPropertyType from "./../../../api/products/propertyTypes";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasPropertyTypeAdd,
  hasPropertyTypeViewActive,
  hasPropertyTypeViewArchive,
  hasPropertyTypeViewBlocked,
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
    StoreItemTabs,
    PropertyTypeAdd,
    PropertyTypeUpdate,
    PropertyTypeCards,
    PropertyTypeTable,
    PropertyTypeInfo,
    PropertyTypeDelete,
    PropertyTypeChangeActivationType,
    PropertyTypeFilter,
  },
  props: ["propertyTypeToken"],
  computed: {
    hasData() {
      return this.propertyTypes.propertyTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasPropertyTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.propertyTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPropertyTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.propertyTypes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPropertyTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.propertyTypes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      propertyTypes: new PropertyTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasPropertyTypeAdd,
    changePagination(pagination) {
      this.propertyTypes.filterData.fillData(pagination);
      this.getAllPropertyTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("propertyTypes", data);
      this.propertyTypes.filterData.activationTypeTokens = data;
      this.getAllPropertyTypes();
    },
    search(data) {
      this.propertyTypes.filterData.fillData(data);
      this.getAllPropertyTypes();
    },
    async getAllPropertyTypes() {
      this.isLoading = true;
      try {
        this.propertyTypes.propertyTypesData = [];
        const response = await apiPropertyType.getAll(
          this.propertyTypes.filterData
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
        this.propertyTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    let propertyTypeToken =
      this.propertyTypeToken || this.$route.params.propertyTypeToken;
    this.propertyTypes.filterData.propertyTypeToken = propertyTypeToken;

    this.getAllPropertyTypes();
  },
};
</script>
