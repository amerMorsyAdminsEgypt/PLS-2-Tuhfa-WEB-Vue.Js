<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('bloodTypes', $event)"
      :viewType="generalSetting.bloodTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.bloodTypes.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('BloodTypes.add')"
      :btnAddName="'BloodTypeAdd'"
      :btnAddStatus="checkPrivilege(hasBloodTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <BloodTypeTable
          v-if="generalSetting.bloodTypes.viewType == VIEW_TYPES.table"
          v-on:setBloodTypeData="bloodTypes.bloodType.fillData($event)"
          :bloodTypesData="bloodTypes.bloodTypesData"
          :defaultImg="bloodTypes.bloodType.defaultImg"
          :filterData="bloodTypes.filterData"
        />

        <BloodTypeCards
          v-else-if="generalSetting.bloodTypes.viewType == VIEW_TYPES.cards"
          v-on:setBloodTypeData="bloodTypes.bloodType.fillData($event)"
          :bloodTypesData="bloodTypes.bloodTypesData"
          :defaultImg="bloodTypes.bloodType.defaultImg"
          :filterData="bloodTypes.filterData"
        />

        <ActionsData :actionsData="bloodTypes.bloodType" />
        <BloodTypeInfo :bloodType="bloodTypes.bloodType" />
        <BloodTypeDelete
          :bloodType="bloodTypes.bloodType"
          v-on:refresh="getAllBloodTypes()"
        />
        <BloodTypeChangeActivationType
          :bloodType="bloodTypes.bloodType"
          v-on:refresh="getAllBloodTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'BloodTypeQRCode'"
          :code="bloodTypes.bloodType.fullCode"
          :codeTitle="$t('BloodTypes.code')"
          :name="bloodTypes.bloodType.bloodTypeNameCurrent"
          :nameTitle="$t('BloodTypes.name')"
          :nameIcon="'BloodTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="bloodTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <BloodTypeFilter
        :theFilterData="bloodTypes.filterData"
        v-on:search="search($event)"
      />

      <BloodTypeAdd
        :bloodType="bloodTypes.bloodType"
        v-on:refresh="getAllBloodTypes()"
      />
      <BloodTypeUpdate
        :bloodType="bloodTypes.bloodType"
        v-on:refresh="getAllBloodTypes()"
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
import BloodTypeAdd from "./components/BloodTypeAdd.vue";
import BloodTypeUpdate from "./components/BloodTypeUpdate.vue";
import BloodTypeCards from "./components/BloodTypeCards.vue";
import BloodTypeTable from "./components/BloodTypeTable.vue";
import BloodTypeInfo from "./components/BloodTypeInfo.vue";
import BloodTypeDelete from "./components/BloodTypeDelete.vue";
import BloodTypeChangeActivationType from "./components/BloodTypeChangeActivationType.vue";
import BloodTypeFilter from "./components/BloodTypeFilter.vue";
import BloodTypes from "./../../../../models/settings/settingsOthers/bloodTypes/BloodTypes";
import apiBloodType from "./../../../../api/settings/settingsOthers/bloodTypes";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasBloodTypeAdd,
  hasBloodTypeViewActive,
  hasBloodTypeViewArchive,
  hasBloodTypeViewBlocked,
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
    BloodTypeAdd,
    BloodTypeUpdate,
    BloodTypeCards,
    BloodTypeTable,
    BloodTypeInfo,
    BloodTypeDelete,
    BloodTypeChangeActivationType,
    BloodTypeFilter,
  },
  computed: {
    hasData() {
      return this.bloodTypes.bloodTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasBloodTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.bloodTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasBloodTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.bloodTypes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasBloodTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.bloodTypes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      bloodTypes: new BloodTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasBloodTypeAdd,
    changePagination(pagination) {
      this.bloodTypes.filterData.fillData(pagination);
      this.getAllBloodTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("bloodTypes", data);
      this.bloodTypes.filterData.activationTypeTokens = data;
      this.getAllBloodTypes();
    },
    search(data) {
      this.bloodTypes.filterData.fillData(data);
      this.getAllBloodTypes();
    },
    async getAllBloodTypes() {
      this.isLoading = true;
      try {
        this.bloodTypes.bloodTypesData = [];
        const response = await apiBloodType.getAll(this.bloodTypes.filterData);
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
        this.bloodTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllBloodTypes();
  },
};
</script>
