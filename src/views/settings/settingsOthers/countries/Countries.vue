<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('countries', $event)"
      :viewType="generalSetting.countries.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.countries.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Countries.add')"
      :btnAddName="'CountryAdd'"
      :btnAddStatus="checkPrivilege(hasCountryAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <CountryTable
          v-if="generalSetting.countries.viewType == VIEW_TYPES.table"
          v-on:setCountryData="countries.country.fillData($event)"
          :countriesData="countries.countriesData"
          :defaultImg="countries.country.defaultImg"
          :filterData="countries.filterData"
        />

        <CountryCards
          v-else-if="generalSetting.countries.viewType == VIEW_TYPES.cards"
          v-on:setCountryData="countries.country.fillData($event)"
          :countriesData="countries.countriesData"
          :defaultImg="countries.country.defaultImg"
          :filterData="countries.filterData"
        />

        <ActionsData :actionsData="countries.country" />
        <CountryInfo :country="countries.country" />
        <CountryDelete
          :country="countries.country"
          v-on:refresh="getAllCountries()"
        />
        <CountryChangeActivationType
          :country="countries.country"
          v-on:refresh="getAllCountries()"
        />
        <CustomBottomSheetQRCode
          :refName="'CountryQRCode'"
          :code="countries.country.fullCode"
          :codeTitle="$t('Countries.code')"
          :name="countries.country.nationalityNameCurrent"
          :nameTitle="$t('Countries.name')"
          :nameIcon="'countries.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="countries.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <CountryFilter
        :theFilterData="countries.filterData"
        v-on:search="search($event)"
      />

      <CountryAdd
        :country="countries.country"
        v-on:refresh="getAllCountries()"
      />
      <CountryUpdate
        :country="countries.country"
        v-on:refresh="getAllCountries()"
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
import CountryAdd from "./components/CountryAdd.vue";
import CountryUpdate from "./components/CountryUpdate.vue";
import CountryCards from "./components/CountryCards.vue";
import CountryTable from "./components/CountryTable.vue";
import CountryInfo from "./components/CountryInfo.vue";
import CountryDelete from "./components/CountryDelete.vue";
import CountryChangeActivationType from "./components/CountryChangeActivationType.vue";
import CountryFilter from "./components/CountryFilter.vue";
import Countries from "./../../../../models/settings/settingsOthers/countries/Countries";
import apiCountry from "./../../../../api/settings/settingsOthers/countries";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasCountryAdd,
  hasCountryViewActive,
  hasCountryViewArchive,
  hasCountryViewBlocked,
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
    CountryAdd,
    CountryUpdate,
    CountryCards,
    CountryTable,
    CountryInfo,
    CountryDelete,
    CountryChangeActivationType,
    CountryFilter,
  },
  computed: {
    hasData() {
      return this.countries.countriesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasCountryViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.countries.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasCountryViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.countries.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasCountryViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.countries.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      countries: new Countries(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasCountryAdd,
    changePagination(pagination) {
      this.countries.filterData.fillData(pagination);
      this.getAllCountries();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("countries", data);
      this.countries.filterData.activationTypeTokens = data;
      this.getAllCountries();
    },
    search(data) {
      this.countries.filterData.fillData(data);
      this.getAllCountries();
    },
    async getAllCountries() {
      this.isLoading = true;
      try {
        this.countries.countriesData = [];
        const response = await apiCountry.getAll(this.countries.filterData);
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
        this.countries.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllCountries();
  },
};
</script>
