<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('communicationTypes', $event)"
      :viewType="generalSetting.communicationTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.communicationTypes.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('CommunicationTypes.add')"
      :btnAddName="'CommunicationTypeAdd'"
      :btnAddStatus="checkPrivilege(hasCommunicationTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <CommunicationTypeTable
          v-if="generalSetting.communicationTypes.viewType == VIEW_TYPES.table"
          v-on:setCommunicationTypeData="
            communicationTypes.communicationType.fillData($event)
          "
          :communicationTypesData="communicationTypes.communicationTypesData"
          :defaultImg="communicationTypes.communicationType.defaultImg"
          :filterData="communicationTypes.filterData"
        />

        <CommunicationTypeCards
          v-else-if="
            generalSetting.communicationTypes.viewType == VIEW_TYPES.cards
          "
          v-on:setCommunicationTypeData="
            communicationTypes.communicationType.fillData($event)
          "
          :communicationTypesData="communicationTypes.communicationTypesData"
          :defaultImg="communicationTypes.communicationType.defaultImg"
          :filterData="communicationTypes.filterData"
        />

        <ActionsData :actionsData="communicationTypes.communicationType" />
        <CommunicationTypeInfo
          :communicationType="communicationTypes.communicationType"
        />
        <CommunicationTypeDelete
          :communicationType="communicationTypes.communicationType"
          v-on:refresh="getAllCommunicationTypes()"
        />
        <CommunicationTypeChangeActivationType
          :communicationType="communicationTypes.communicationType"
          v-on:refresh="getAllCommunicationTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'CommunicationTypeQRCode'"
          :code="communicationTypes.communicationType.fullCode"
          :codeTitle="$t('CommunicationTypes.code')"
          :name="
            communicationTypes.communicationType.communicationTypeNameCurrent
          "
          :nameTitle="$t('CommunicationTypes.name')"
          :nameIcon="'communicationTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="communicationTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <CommunicationTypeFilter
        :theFilterData="communicationTypes.filterData"
        v-on:search="search($event)"
      />

      <CommunicationTypeAdd
        :communicationType="communicationTypes.communicationType"
        v-on:refresh="getAllCommunicationTypes()"
      />
      <CommunicationTypeUpdate
        :communicationType="communicationTypes.communicationType"
        v-on:refresh="getAllCommunicationTypes()"
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
import CommunicationTypeAdd from "./components/CommunicationTypeAdd.vue";
import CommunicationTypeUpdate from "./components/CommunicationTypeUpdate.vue";
import CommunicationTypeCards from "./components/CommunicationTypeCards.vue";
import CommunicationTypeTable from "./components/CommunicationTypeTable.vue";
import CommunicationTypeInfo from "./components/CommunicationTypeInfo.vue";
import CommunicationTypeDelete from "./components/CommunicationTypeDelete.vue";
import CommunicationTypeChangeActivationType from "./components/CommunicationTypeChangeActivationType.vue";
import CommunicationTypeFilter from "./components/CommunicationTypeFilter.vue";
import CommunicationTypes from "./../../../../models/settings/settingsOthers/communicationTypes/CommunicationTypes";
import apiCommunicationType from "./../../../../api/settings/settingsOthers/communicationTypes";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasCommunicationTypeAdd,
  hasCommunicationTypeViewActive,
  hasCommunicationTypeViewArchive,
  hasCommunicationTypeViewBlocked,
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
    CommunicationTypeAdd,
    CommunicationTypeUpdate,
    CommunicationTypeCards,
    CommunicationTypeTable,
    CommunicationTypeInfo,
    CommunicationTypeDelete,
    CommunicationTypeChangeActivationType,
    CommunicationTypeFilter,
  },
  computed: {
    hasData() {
      return this.communicationTypes.communicationTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasCommunicationTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.communicationTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasCommunicationTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.communicationTypes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasCommunicationTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.communicationTypes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      communicationTypes: new CommunicationTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasCommunicationTypeAdd,
    changePagination(pagination) {
      this.communicationTypes.filterData.fillData(pagination);
      this.getAllCommunicationTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("communicationTypes", data);
      this.communicationTypes.filterData.activationTypeTokens = data;
      this.getAllCommunicationTypes();
    },
    search(data) {
      this.communicationTypes.filterData.fillData(data);
      this.getAllCommunicationTypes();
    },
    async getAllCommunicationTypes() {
      this.isLoading = true;
      try {
        this.communicationTypes.communicationTypesData = [];
        const response = await apiCommunicationType.getAll(
          this.communicationTypes.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.communicationTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllCommunicationTypes();
  },
};
</script>
