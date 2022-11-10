<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('dropDownLists', $event)"
      :viewType="generalSetting.dropDownLists.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.dropDownLists.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('DropDownLists.add')"
      :btnAddName="'DropDownListAdd'"
      :btnAddStatus="checkPrivilege(hasDropDownListAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <StoreItemTabs />

      <template v-if="hasData">
        <DropDownListTable
          v-if="generalSetting.dropDownLists.viewType == VIEW_TYPES.table"
          v-on:setDropDownListData="dropDownLists.dropDownList.fillData($event)"
          :dropDownListsData="dropDownLists.dropDownListsData"
          :defaultImg="dropDownLists.dropDownList.defaultImg"
          :filterData="dropDownLists.filterData"
        />

        <DropDownListCards
          v-else-if="generalSetting.dropDownLists.viewType == VIEW_TYPES.cards"
          v-on:setDropDownListData="dropDownLists.dropDownList.fillData($event)"
          :dropDownListsData="dropDownLists.dropDownListsData"
          :defaultImg="dropDownLists.dropDownList.defaultImg"
          :filterData="dropDownLists.filterData"
        />

        <ActionsData :actionsData="dropDownLists.dropDownList" />
        <DropDownListInfo
          :token="dropDownLists.dropDownList.dropDownListToken"
        />
        <DropDownListDelete
          :dropDownList="dropDownLists.dropDownList"
          v-on:refresh="getAllDropDownLists()"
        />
        <DropDownListChangeActivationType
          :dropDownList="dropDownLists.dropDownList"
          v-on:refresh="getAllDropDownLists()"
        />
        <CustomBottomSheetQRCode
          :refName="'DropDownListQRCode'"
          :code="dropDownLists.dropDownList.fullCode"
          :codeTitle="$t('DropDownLists.code')"
          :name="dropDownLists.dropDownList.dropDownListNameCurrent"
          :nameTitle="$t('DropDownLists.name')"
          :nameIcon="'DropDownLists.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="dropDownLists.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <DropDownListFilter
        :theFilterData="dropDownLists.filterData"
        v-on:search="search($event)"
      />

      <DropDownListAdd
        :dropDownList="dropDownLists.dropDownList"
        v-on:refresh="getAllDropDownLists()"
      />
      <DropDownListUpdate
        :token="dropDownLists.dropDownList.dropDownListToken"
        v-on:refresh="getAllDropDownLists()"
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
import DropDownListAdd from "./components/DropDownListAdd.vue";
import DropDownListUpdate from "./components/DropDownListUpdate.vue";
import DropDownListCards from "./components/DropDownListCards.vue";
import DropDownListTable from "./components/DropDownListTable.vue";
import DropDownListInfo from "./components/DropDownListInfo.vue";
import DropDownListDelete from "./components/DropDownListDelete.vue";
import DropDownListChangeActivationType from "./components/DropDownListChangeActivationType.vue";
import DropDownListFilter from "./components/DropDownListFilter.vue";
import DropDownLists from "./../../../models/products/dropDownLists/DropDownLists";
import apiDropDownList from "./../../../api/products/dropDownLists";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasDropDownListAdd,
  hasDropDownListViewActive,
  hasDropDownListViewArchive,
  hasDropDownListViewBlocked,
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
    DropDownListAdd,
    DropDownListUpdate,
    DropDownListCards,
    DropDownListTable,
    DropDownListInfo,
    DropDownListDelete,
    DropDownListChangeActivationType,
    DropDownListFilter,
  },
  computed: {
    hasData() {
      return this.dropDownLists.dropDownListsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasDropDownListViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.dropDownLists.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasDropDownListViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.dropDownLists.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasDropDownListViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.dropDownLists.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      dropDownLists: new DropDownLists(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasDropDownListAdd,
    changePagination(pagination) {
      this.dropDownLists.filterData.fillData(pagination);
      this.getAllDropDownLists();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("dropDownLists", data);
      this.dropDownLists.filterData.activationTypeTokens = data;
      this.getAllDropDownLists();
    },
    search(data) {
      this.dropDownLists.filterData.fillData(data);
      this.getAllDropDownLists();
    },
    async getAllDropDownLists() {
      this.isLoading = true;
      try {
        this.dropDownLists.dropDownListsData = [];
        const response = await apiDropDownList.getAll(
          this.dropDownLists.filterData
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
        this.dropDownLists.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllDropDownLists();
  },
};
</script>
