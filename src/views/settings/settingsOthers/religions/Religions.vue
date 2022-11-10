<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('religions', $event)"
      :viewType="generalSetting.religions.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.religions.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Religions.add')"
      :btnAddName="'ReligionAdd'"
      :btnAddStatus="checkPrivilege(hasReligionAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <ReligionTable
          v-if="generalSetting.religions.viewType == VIEW_TYPES.table"
          v-on:setReligionData="religions.religion.fillData($event)"
          :religionsData="religions.religionsData"
          :defaultImg="religions.religion.defaultImg"
          :filterData="religions.filterData"
        />

        <ReligionCards
          v-else-if="generalSetting.religions.viewType == VIEW_TYPES.cards"
          v-on:setReligionData="religions.religion.fillData($event)"
          :religionsData="religions.religionsData"
          :defaultImg="religions.religion.defaultImg"
          :filterData="religions.filterData"
        />

        <ActionsData :actionsData="religions.religion" />
        <ReligionInfo :religion="religions.religion" />
        <ReligionDelete
          :religion="religions.religion"
          v-on:refresh="getAllReligions()"
        />
        <ReligionChangeActivationType
          :religion="religions.religion"
          v-on:refresh="getAllReligions()"
        />
        <CustomBottomSheetQRCode
          :refName="'ReligionQRCode'"
          :code="religions.religion.fullCode"
          :codeTitle="$t('Religions.code')"
          :name="religions.religion.religionNameCurrent"
          :nameTitle="$t('Religions.name')"
          :nameIcon="'religions.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="religions.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ReligionFilter
        :theFilterData="religions.filterData"
        v-on:search="search($event)"
      />

      <ReligionAdd
        :religion="religions.religion"
        v-on:refresh="getAllReligions()"
      />
      <ReligionUpdate
        :religion="religions.religion"
        v-on:refresh="getAllReligions()"
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
import ReligionAdd from "./components/ReligionAdd.vue";
import ReligionUpdate from "./components/ReligionUpdate.vue";
import ReligionCards from "./components/ReligionCards.vue";
import ReligionTable from "./components/ReligionTable.vue";
import ReligionInfo from "./components/ReligionInfo.vue";
import ReligionDelete from "./components/ReligionDelete.vue";
import ReligionChangeActivationType from "./components/ReligionChangeActivationType.vue";
import ReligionFilter from "./components/ReligionFilter.vue";
import Religions from "./../../../../models/settings/settingsOthers/religions/Religions";
import apiReligion from "./../../../../api/settings/settingsOthers/religions";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasReligionAdd,
  hasReligionViewActive,
  hasReligionViewArchive,
  hasReligionViewBlocked,
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
    ReligionAdd,
    ReligionUpdate,
    ReligionCards,
    ReligionTable,
    ReligionInfo,
    ReligionDelete,
    ReligionChangeActivationType,
    ReligionFilter,
  },
  computed: {
    hasData() {
      return this.religions.religionsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasReligionViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.religions.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasReligionViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.religions.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasReligionViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.religions.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      religions: new Religions(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasReligionAdd,
    changePagination(pagination) {
      this.religions.filterData.fillData(pagination);
      this.getAllReligions();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("religions", data);
      this.religions.filterData.activationTypeTokens = data;
      this.getAllReligions();
    },
    search(data) {
      this.religions.filterData.fillData(data);
      this.getAllReligions();
    },
    async getAllReligions() {
      this.isLoading = true;
      try {
        this.religions.religionsData = [];
        const response = await apiReligion.getAll(this.religions.filterData);
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
        this.religions.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllReligions();
  },
};
</script>
