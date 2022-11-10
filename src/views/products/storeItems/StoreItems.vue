<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('storeItems', $event)"
      :viewType="generalSetting.storeItems.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.storeItems.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('StoreItems.add')"
      :btnAddName="'StoreItemAdd'"
      :btnAddStatus="checkPrivilege(hasStoreItemAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <StoreItemTabs />

      <template v-if="hasData">
        <StoreItemTable
          v-if="generalSetting.storeItems.viewType == VIEW_TYPES.table"
          v-on:setStoreItemData="storeItems.storeItem.fillData($event)"
          :storeItemsData="storeItems.storeItemsData"
          :defaultImg="storeItems.storeItem.defaultImg"
          :filterData="storeItems.filterData"
        />

        <StoreItemCards
          v-else-if="generalSetting.storeItems.viewType == VIEW_TYPES.cards"
          v-on:setStoreItemData="storeItems.storeItem.fillData($event)"
          :storeItemsData="storeItems.storeItemsData"
          :defaultImg="storeItems.storeItem.defaultImg"
          :filterData="storeItems.filterData"
        />

        <ActionsData :actionsData="storeItems.storeItem" />
        <StoreItemInfo :token="storeItems.storeItem.storeItemToken" />
        <StoreItemDelete
          :storeItem="storeItems.storeItem"
          v-on:refresh="getAllStoreItems()"
        />
        <StoreItemChangeActivationType
          :storeItem="storeItems.storeItem"
          v-on:refresh="getAllStoreItems()"
        />
        <CustomBottomSheetQRCode
          :refName="'StoreItemQRCode'"
          :code="storeItems.storeItem.fullCode"
          :codeTitle="$t('StoreItems.code')"
          :name="storeItems.storeItem.storeItemNameCurrent"
          :nameTitle="$t('StoreItems.name')"
          :nameIcon="'StoreItems.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="storeItems.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <StoreItemFilter
        :theFilterData="storeItems.filterData"
        v-on:search="search($event)"
      />

      <StoreItemAdd
        :storeItem="storeItems.storeItem"
        v-on:refresh="getAllStoreItems()"
      />
      <StoreItemUpdate
        :token="storeItems.storeItem.storeItemToken"
        v-on:refresh="getAllStoreItems()"
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
import StoreItemAdd from "./components/StoreItemAdd.vue";
import StoreItemUpdate from "./components/StoreItemUpdate.vue";
import StoreItemCards from "./components/StoreItemCards.vue";
import StoreItemTable from "./components/StoreItemTable.vue";
import StoreItemTabs from "./components/StoreItemTabs.vue";
import StoreItemInfo from "./components/StoreItemInfo.vue";
import StoreItemDelete from "./components/StoreItemDelete.vue";
import StoreItemChangeActivationType from "./components/StoreItemChangeActivationType.vue";
import StoreItemFilter from "./components/StoreItemFilter.vue";
import StoreItems from "./../../../models/products/storeItems/StoreItems";
import apiStoreItem from "./../../../api/products/storeItems";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasStoreItemAdd,
  hasStoreItemViewActive,
  hasStoreItemViewArchive,
  hasStoreItemViewBlocked,
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
    StoreItemAdd,
    StoreItemUpdate,
    StoreItemCards,
    StoreItemTable,
    StoreItemTabs,
    StoreItemInfo,
    StoreItemDelete,
    StoreItemChangeActivationType,
    StoreItemFilter,
  },
  props: {
    parentStoreItemToken: {
      type: String,
      default: "",
    },
  },
  computed: {
    hasData() {
      return this.storeItems.storeItemsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasStoreItemViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.storeItems.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStoreItemViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.storeItems.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStoreItemViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.storeItems.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      storeItems: new StoreItems(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasStoreItemAdd,
    changePagination(pagination) {
      this.storeItems.filterData.fillData(pagination);
      this.getAllStoreItems();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("storeItems", data);
      this.storeItems.filterData.activationTypeTokens = data;
      this.getAllStoreItems();
    },
    search(data) {
      this.storeItems.filterData.fillData(data);
      this.getAllStoreItems();
    },
    async getAllStoreItems() {
      this.isLoading = true;
      try {
        this.storeItems.filterData.propertyTypesDataInclude = true;

        this.storeItems.filterData.parentStoreItemToken =
          this.parentStoreItemToken;
        this.storeItems.filterData.getOnlyParentStoreItems = this
          .parentStoreItemToken
          ? false
          : true;

        this.storeItems.storeItemsData = [];
        const response = await apiStoreItem.getAll(this.storeItems.filterData);
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
        this.storeItems.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  watch: {
    parentStoreItemToken: function () {
      this.getAllStoreItems();
    },
  },
  async created() {
    this.getAllStoreItems();
  },
};
</script>
