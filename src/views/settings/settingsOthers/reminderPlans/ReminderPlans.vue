<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('reminderPlans', $event)"
      :viewType="generalSetting.reminderPlans.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.reminderPlans.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('ReminderPlans.add')"
      :btnAddName="'ReminderPlanAdd'"
      :btnAddStatus="checkPrivilege(hasReminderPlanAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <ReminderPlanTable
          v-if="generalSetting.reminderPlans.viewType == VIEW_TYPES.table"
          v-on:setReminderPlanData="reminderPlans.reminderPlan.fillData($event)"
          :reminderPlansData="reminderPlans.reminderPlansData"
          :defaultImg="reminderPlans.reminderPlan.defaultImg"
          :filterData="reminderPlans.filterData"
        />

        <ReminderPlanCards
          v-else-if="generalSetting.reminderPlans.viewType == VIEW_TYPES.cards"
          v-on:setReminderPlanData="reminderPlans.reminderPlan.fillData($event)"
          :reminderPlansData="reminderPlans.reminderPlansData"
          :defaultImg="reminderPlans.reminderPlan.defaultImg"
          :filterData="reminderPlans.filterData"
        />

        <ActionsData :actionsData="reminderPlans.reminderPlan" />
        <ReminderPlanInfo :reminderPlan="reminderPlans.reminderPlan" />
        <ReminderPlanDelete
          :reminderPlan="reminderPlans.reminderPlan"
          v-on:refresh="getAllReminderPlans()"
        />
        <ReminderPlanChangeActivationType
          :reminderPlan="reminderPlans.reminderPlan"
          v-on:refresh="getAllReminderPlans()"
        />
        <CustomBottomSheetQRCode
          :refName="'ReminderPlanQRCode'"
          :code="reminderPlans.reminderPlan.fullCode"
          :codeTitle="$t('ReminderPlans.code')"
          :name="reminderPlans.reminderPlan.reminderPlanNameCurrent"
          :nameTitle="$t('ReminderPlans.name')"
          :nameIcon="'reminderPlans.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="reminderPlans.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ReminderPlanFilter
        :theFilterData="reminderPlans.filterData"
        v-on:search="search($event)"
      />

      <ReminderPlanAdd
        :reminderPlan="reminderPlans.reminderPlan"
        v-on:refresh="getAllReminderPlans()"
      />
      <ReminderPlanUpdate
        :reminderPlan="reminderPlans.reminderPlan"
        v-on:refresh="getAllReminderPlans()"
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
import ReminderPlanAdd from "./components/ReminderPlanAdd.vue";
import ReminderPlanUpdate from "./components/ReminderPlanUpdate.vue";
import ReminderPlanCards from "./components/ReminderPlanCards.vue";
import ReminderPlanTable from "./components/ReminderPlanTable.vue";
import ReminderPlanInfo from "./components/ReminderPlanInfo.vue";
import ReminderPlanDelete from "./components/ReminderPlanDelete.vue";
import ReminderPlanChangeActivationType from "./components/ReminderPlanChangeActivationType.vue";
import ReminderPlanFilter from "./components/ReminderPlanFilter.vue";
import ReminderPlans from "./../../../../models/settings/settingsOthers/reminderPlans/ReminderPlans";
import apiReminderPlan from "./../../../../api/settings/settingsOthers/reminderPlans";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasReminderPlanAdd,
  hasReminderPlanViewActive,
  hasReminderPlanViewArchive,
  hasReminderPlanViewBlocked,
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
    ReminderPlanAdd,
    ReminderPlanUpdate,
    ReminderPlanCards,
    ReminderPlanTable,
    ReminderPlanInfo,
    ReminderPlanDelete,
    ReminderPlanChangeActivationType,
    ReminderPlanFilter,
  },
  computed: {
    hasData() {
      return this.reminderPlans.reminderPlansData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasReminderPlanViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.reminderPlans.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasReminderPlanViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.reminderPlans.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasReminderPlanViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.reminderPlans.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      reminderPlans: new ReminderPlans(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasReminderPlanAdd,
    changePagination(pagination) {
      this.reminderPlans.filterData.fillData(pagination);
      this.getAllReminderPlans();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("reminderPlans", data);
      this.reminderPlans.filterData.activationTypeTokens = data;
      this.getAllReminderPlans();
    },
    search(data) {
      this.reminderPlans.filterData.fillData(data);
      this.getAllReminderPlans();
    },
    async getAllReminderPlans() {
      this.isLoading = true;
      try {
        this.reminderPlans.reminderPlansData = [];
        const response = await apiReminderPlan.getAll(
          this.reminderPlans.filterData
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
        this.reminderPlans.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllReminderPlans();
  },
};
</script>
