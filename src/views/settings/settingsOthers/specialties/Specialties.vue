<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('specialties', $event)"
      :viewType="generalSetting.specialties.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.specialties.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Specialties.add')"
      :btnAddName="'SpecialtyAdd'"
      :btnAddStatus="checkPrivilege(hasSpecialtyAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <SpecialtyTable
          v-if="generalSetting.specialties.viewType == VIEW_TYPES.table"
          v-on:setSpecialtyData="specialties.specialty.fillData($event)"
          :specialtiesData="specialties.specialtiesData"
          :defaultImg="specialties.specialty.defaultImg"
          :filterData="specialties.filterData"
        />

        <SpecialtyCards
          v-else-if="generalSetting.specialties.viewType == VIEW_TYPES.cards"
          v-on:setSpecialtyData="specialties.specialty.fillData($event)"
          :specialtiesData="specialties.specialtiesData"
          :defaultImg="specialties.specialty.defaultImg"
          :filterData="specialties.filterData"
        />

        <ActionsData :actionsData="specialties.specialty" />
        <SpecialtyInfo :specialty="specialties.specialty" />
        <SpecialtyDelete
          :specialty="specialties.specialty"
          v-on:refresh="getAllSpecialties()"
        />
        <SpecialtyChangeActivationType
          :specialty="specialties.specialty"
          v-on:refresh="getAllSpecialties()"
        />
        <CustomBottomSheetQRCode
          :refName="'SpecialtyQRCode'"
          :code="specialties.specialty.fullCode"
          :codeTitle="$t('Specialties.code')"
          :name="specialties.specialty.specialtieNameCurrent"
          :nameTitle="$t('Specialties.name')"
          :nameIcon="'specialties.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="specialties.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <SpecialtyFilter
        :theFilterData="specialties.filterData"
        v-on:search="search($event)"
      />

      <SpecialtyAdd
        :specialty="specialties.specialty"
        v-on:refresh="getAllSpecialties()"
      />
      <SpecialtyUpdate
        :specialty="specialties.specialty"
        v-on:refresh="getAllSpecialties()"
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
import SpecialtyAdd from "./components/SpecialtyAdd.vue";
import SpecialtyUpdate from "./components/SpecialtyUpdate.vue";
import SpecialtyCards from "./components/SpecialtyCards.vue";
import SpecialtyTable from "./components/SpecialtyTable.vue";
import SpecialtyInfo from "./components/SpecialtyInfo.vue";
import SpecialtyDelete from "./components/SpecialtyDelete.vue";
import SpecialtyChangeActivationType from "./components/SpecialtyChangeActivationType.vue";
import SpecialtyFilter from "./components/SpecialtyFilter.vue";
import Specialties from "./../../../../models/settings/settingsOthers/specialties/Specialties";
import apiSpecialty from "./../../../../api/settings/settingsOthers/specialties";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasSpecialtyAdd,
  hasSpecialtyViewActive,
  hasSpecialtyViewArchive,
  hasSpecialtyViewBlocked,
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
    SpecialtyAdd,
    SpecialtyUpdate,
    SpecialtyCards,
    SpecialtyTable,
    SpecialtyInfo,
    SpecialtyDelete,
    SpecialtyChangeActivationType,
    SpecialtyFilter,
  },
  computed: {
    hasData() {
      return this.specialties.specialtiesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasSpecialtyViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.specialties.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSpecialtyViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.specialties.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSpecialtyViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.specialties.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      specialties: new Specialties(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasSpecialtyAdd,
    changePagination(pagination) {
      this.specialties.filterData.fillData(pagination);
      this.getAllSpecialties();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("specialties", data);
      this.specialties.filterData.activationTypeTokens = data;
      this.getAllSpecialties();
    },
    search(data) {
      this.specialties.filterData.fillData(data);
      this.getAllSpecialties();
    },
    async getAllSpecialties() {
      this.isLoading = true;
      try {
        this.specialties.specialtiesData = [];
        const response = await apiSpecialty.getAll(this.specialties.filterData);
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
        this.specialties.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllSpecialties();
  },
};
</script>
