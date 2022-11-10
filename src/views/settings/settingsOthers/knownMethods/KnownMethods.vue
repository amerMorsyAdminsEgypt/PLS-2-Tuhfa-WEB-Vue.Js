<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('knownMethods', $event)"
      :viewType="generalSetting.knownMethods.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.knownMethods.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('KnownMethods.add')"
      :btnAddName="'KnownMethodAdd'"
      :btnAddStatus="checkPrivilege(hasKnownMethodAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <KnownMethodTable
          v-if="generalSetting.knownMethods.viewType == VIEW_TYPES.table"
          v-on:setKnownMethodData="knownMethods.knownMethod.fillData($event)"
          :knownMethodsData="knownMethods.knownMethodsData"
          :defaultImg="knownMethods.knownMethod.defaultImg"
          :filterData="knownMethods.filterData"
        />

        <KnownMethodCards
          v-else-if="generalSetting.knownMethods.viewType == VIEW_TYPES.cards"
          v-on:setKnownMethodData="knownMethods.knownMethod.fillData($event)"
          :knownMethodsData="knownMethods.knownMethodsData"
          :defaultImg="knownMethods.knownMethod.defaultImg"
          :filterData="knownMethods.filterData"
        />

        <ActionsData :actionsData="knownMethods.knownMethod" />
        <KnownMethodInfo :knownMethod="knownMethods.knownMethod" />
        <KnownMethodDelete
          :knownMethod="knownMethods.knownMethod"
          v-on:refresh="getAllKnownMethods()"
        />
        <KnownMethodChangeActivationType
          :knownMethod="knownMethods.knownMethod"
          v-on:refresh="getAllKnownMethods()"
        />
        <CustomBottomSheetQRCode
          :refName="'KnownMethodQRCode'"
          :code="knownMethods.knownMethod.fullCode"
          :codeTitle="$t('KnownMethods.code')"
          :name="knownMethods.knownMethod.knownMethodNameCurrent"
          :nameTitle="$t('KnownMethods.name')"
          :nameIcon="'knownMethods.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="knownMethods.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <KnownMethodFilter
        :theFilterData="knownMethods.filterData"
        v-on:search="search($event)"
      />

      <KnownMethodAdd
        :knownMethod="knownMethods.knownMethod"
        v-on:refresh="getAllKnownMethods()"
      />
      <KnownMethodUpdate
        :knownMethod="knownMethods.knownMethod"
        v-on:refresh="getAllKnownMethods()"
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
import KnownMethodAdd from "./components/KnownMethodAdd.vue";
import KnownMethodUpdate from "./components/KnownMethodUpdate.vue";
import KnownMethodCards from "./components/KnownMethodCards.vue";
import KnownMethodTable from "./components/KnownMethodTable.vue";
import KnownMethodInfo from "./components/KnownMethodInfo.vue";
import KnownMethodDelete from "./components/KnownMethodDelete.vue";
import KnownMethodChangeActivationType from "./components/KnownMethodChangeActivationType.vue";
import KnownMethodFilter from "./components/KnownMethodFilter.vue";
import KnownMethods from "./../../../../models/settings/settingsOthers/knownMethods/KnownMethods";
import apiKnownMethod from "./../../../../api/settings/settingsOthers/knownMethods";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasKnownMethodAdd,
  hasKnownMethodViewActive,
  hasKnownMethodViewArchive,
  hasKnownMethodViewBlocked,
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
    KnownMethodAdd,
    KnownMethodUpdate,
    KnownMethodCards,
    KnownMethodTable,
    KnownMethodInfo,
    KnownMethodDelete,
    KnownMethodChangeActivationType,
    KnownMethodFilter,
  },
  computed: {
    hasData() {
      return this.knownMethods.knownMethodsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasKnownMethodViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.knownMethods.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasKnownMethodViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.knownMethods.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasKnownMethodViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.knownMethods.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      knownMethods: new KnownMethods(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasKnownMethodAdd,
    changePagination(pagination) {
      this.knownMethods.filterData.fillData(pagination);
      this.getAllKnownMethods();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("knownMethods", data);
      this.knownMethods.filterData.activationTypeTokens = data;
      this.getAllKnownMethods();
    },
    search(data) {
      this.knownMethods.filterData.fillData(data);
      this.getAllKnownMethods();
    },
    async getAllKnownMethods() {
      this.isLoading = true;
      try {
        this.knownMethods.knownMethodsData = [];
        const response = await apiKnownMethod.getAll(
          this.knownMethods.filterData
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
        this.knownMethods.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllKnownMethods();
  },
};
</script>
