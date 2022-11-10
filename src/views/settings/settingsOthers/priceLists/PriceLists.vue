<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('priceLists', $event)"
      :viewType="generalSetting.priceLists.viewType"
      :viewTypeStatus="false"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.priceLists.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('PriceLists.add')"
      :btnAddName="'PriceListAdd'"
      :btnAddStatus="checkPrivilege(hasPriceListAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <PriceListTable
          v-if="generalSetting.priceLists.viewType == VIEW_TYPES.table"
          v-on:setPriceListData="priceLists.priceList.fillData($event)"
          :priceListsData="priceLists.priceListsData"
          :defaultImg="priceLists.priceList.defaultImg"
          :filterData="priceLists.filterData"
        />

        <PriceListCards
          v-else-if="generalSetting.priceLists.viewType == VIEW_TYPES.cards"
          v-on:setPriceListData="priceLists.priceList.fillData($event)"
          :priceListsData="priceLists.priceListsData"
          :defaultImg="priceLists.priceList.defaultImg"
          :filterData="priceLists.filterData"
        />

        <ActionsData :actionsData="priceLists.priceList" />
        <PriceListInfo :priceList="priceLists.priceList" />
        <PriceListDelete
          :priceList="priceLists.priceList"
          v-on:refresh="getAllPriceLists()"
        />
        <PriceListChangeActivationType
          :priceList="priceLists.priceList"
          v-on:refresh="getAllPriceLists()"
        />
        <CustomBottomSheetQRCode
          :refName="'PriceListQRCode'"
          :code="priceLists.priceList.fullCode"
          :codeTitle="$t('PriceLists.code')"
          :name="priceLists.priceList.priceListNameCurrent"
          :nameTitle="$t('PriceLists.name')"
          :nameIcon="'PriceLists.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="priceLists.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <PriceListFilter
        :theFilterData="priceLists.filterData"
        v-on:search="search($event)"
      />

      <PriceListAdd
        :priceList="priceLists.priceList"
        v-on:refresh="getAllPriceLists()"
      />
      <PriceListUpdate
        :priceList="priceLists.priceList"
        v-on:refresh="getAllPriceLists()"
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
import PriceListAdd from "./components/PriceListAdd.vue";
import PriceListUpdate from "./components/PriceListUpdate.vue";
import PriceListCards from "./components/PriceListCards.vue";
import PriceListTable from "./components/PriceListTable.vue";
import PriceListInfo from "./components/PriceListInfo.vue";
import PriceListDelete from "./components/PriceListDelete.vue";
import PriceListChangeActivationType from "./components/PriceListChangeActivationType.vue";
import PriceListFilter from "./components/PriceListFilter.vue";
import PriceLists from "./../../../../models/settings/settingsOthers/priceLists/PriceLists";
import apiPriceList from "./../../../../api/settings/settingsOthers/priceLists";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasPriceListAdd,
  hasPriceListViewActive,
  hasPriceListViewArchive,
  hasPriceListViewBlocked,
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
    PriceListAdd,
    PriceListUpdate,
    PriceListCards,
    PriceListTable,
    PriceListInfo,
    PriceListDelete,
    PriceListChangeActivationType,
    PriceListFilter,
  },
  computed: {
    hasData() {
      return this.priceLists.priceListsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasPriceListViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.priceLists.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPriceListViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.priceLists.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPriceListViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.priceLists.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      priceLists: new PriceLists(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  props: ["educationalCategoryToken"],
  methods: {
    checkPrivilege,
    hasPriceListAdd,
    changePagination(pagination) {
      this.priceLists.filterData.fillData(pagination);
      this.getAllPriceLists();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("priceLists", data);
      this.priceLists.filterData.activationTypeTokens = data;
      this.getAllPriceLists();
    },
    search(data) {
      this.priceLists.filterData.fillData(data);
      this.getAllPriceLists();
    },
    async getAllPriceLists() {
      this.isLoading = true;
      try {
        this.priceLists.priceListsData = [];
        const response = await apiPriceList.getAll(this.priceLists.filterData);
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
        this.priceLists.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async setFilter() {
      let educationalCategoryToken =
        this.educationalCategoryToken ||
        this.$route.params.educationalCategoryToken;

      this.priceLists.filterData.educationalCategoryToken =
        educationalCategoryToken;
    },
  },
  async created() {
    await this.setFilter();
    this.getAllPriceLists();
  },
};
</script>
