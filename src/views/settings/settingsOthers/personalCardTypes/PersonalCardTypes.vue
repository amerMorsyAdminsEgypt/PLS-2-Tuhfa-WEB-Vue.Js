<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('personalCardTypes', $event)"
      :viewType="generalSetting.personalCardTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.personalCardTypes.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('PersonalCardTypes.add')"
      :btnAddName="'PersonalCardTypeAdd'"
      :btnAddStatus="checkPrivilege(hasPersonalCardTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <PersonalCardTypeTable
          v-if="generalSetting.personalCardTypes.viewType == VIEW_TYPES.table"
          v-on:setPersonalCardTypeData="
            personalCardTypes.personalCardType.fillData($event)
          "
          :personalCardTypesData="personalCardTypes.personalCardTypesData"
          :defaultImg="personalCardTypes.personalCardType.defaultImg"
          :filterData="personalCardTypes.filterData"
        />

        <PersonalCardTypeCards
          v-else-if="
            generalSetting.personalCardTypes.viewType == VIEW_TYPES.cards
          "
          v-on:setPersonalCardTypeData="
            personalCardTypes.personalCardType.fillData($event)
          "
          :personalCardTypesData="personalCardTypes.personalCardTypesData"
          :defaultImg="personalCardTypes.personalCardType.defaultImg"
          :filterData="personalCardTypes.filterData"
        />

        <ActionsData :actionsData="personalCardTypes.personalCardType" />
        <PersonalCardTypeInfo
          :personalCardType="personalCardTypes.personalCardType"
        />
        <PersonalCardTypeDelete
          :personalCardType="personalCardTypes.personalCardType"
          v-on:refresh="getAllPersonalCardTypes()"
        />
        <PersonalCardTypeChangeActivationType
          :personalCardType="personalCardTypes.personalCardType"
          v-on:refresh="getAllPersonalCardTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'PersonalCardTypeQRCode'"
          :code="personalCardTypes.personalCardType.fullCode"
          :codeTitle="$t('PersonalCardTypes.code')"
          :name="personalCardTypes.personalCardType.personalCardTypeNameCurrent"
          :nameTitle="$t('PersonalCardTypes.name')"
          :nameIcon="'personalCardTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="personalCardTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <PersonalCardTypeFilter
        :theFilterData="personalCardTypes.filterData"
        v-on:search="search($event)"
      />

      <PersonalCardTypeAdd
        :personalCardType="personalCardTypes.personalCardType"
        v-on:refresh="getAllPersonalCardTypes()"
      />
      <PersonalCardTypeUpdate
        :personalCardType="personalCardTypes.personalCardType"
        v-on:refresh="getAllPersonalCardTypes()"
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
import PersonalCardTypeAdd from "./components/PersonalCardTypeAdd.vue";
import PersonalCardTypeUpdate from "./components/PersonalCardTypeUpdate.vue";
import PersonalCardTypeCards from "./components/PersonalCardTypeCards.vue";
import PersonalCardTypeTable from "./components/PersonalCardTypeTable.vue";
import PersonalCardTypeInfo from "./components/PersonalCardTypeInfo.vue";
import PersonalCardTypeDelete from "./components/PersonalCardTypeDelete.vue";
import PersonalCardTypeChangeActivationType from "./components/PersonalCardTypeChangeActivationType.vue";
import PersonalCardTypeFilter from "./components/PersonalCardTypeFilter.vue";
import PersonalCardTypes from "./../../../../models/settings/settingsOthers/personalCardTypes/PersonalCardTypes";
import apiPersonalCardType from "./../../../../api/settings/settingsOthers/personalCardTypes";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasPersonalCardTypeAdd,
  hasPersonalCardTypeViewActive,
  hasPersonalCardTypeViewArchive,
  hasPersonalCardTypeViewBlocked,
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
    PersonalCardTypeAdd,
    PersonalCardTypeUpdate,
    PersonalCardTypeCards,
    PersonalCardTypeTable,
    PersonalCardTypeInfo,
    PersonalCardTypeDelete,
    PersonalCardTypeChangeActivationType,
    PersonalCardTypeFilter,
  },
  computed: {
    hasData() {
      return this.personalCardTypes.personalCardTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasPersonalCardTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.personalCardTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPersonalCardTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.personalCardTypes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPersonalCardTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.personalCardTypes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      personalCardTypes: new PersonalCardTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasPersonalCardTypeAdd,
    changePagination(pagination) {
      this.personalCardTypes.filterData.fillData(pagination);
      this.getAllPersonalCardTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("personalCardTypes", data);
      this.personalCardTypes.filterData.activationTypeTokens = data;
      this.getAllPersonalCardTypes();
    },
    search(data) {
      this.personalCardTypes.filterData.fillData(data);
      this.getAllPersonalCardTypes();
    },
    async getAllPersonalCardTypes() {
      this.isLoading = true;
      try {
        this.personalCardTypes.personalCardTypesData = [];
        const response = await apiPersonalCardType.getAll(
          this.personalCardTypes.filterData
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
        this.personalCardTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllPersonalCardTypes();
  },
};
</script>
