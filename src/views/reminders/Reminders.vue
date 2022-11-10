<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('reminders', $event)"
      :viewType="generalSetting.reminders.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.reminders.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Reminders.add')"
      :btnAddName="'ReminderAdd'"
      :btnAddStatus="checkPrivilege(hasReminderAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <div v-if="reminders.reminderPlan.reminderPlanToken" class="statistics">
        <b-button v-b-toggle.reminderPlan class="btn btn-lg btn-collapse">
          {{ $t("ReminderPlans.data") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse id="reminderPlan">
          <div class="my-card row">
            <DataLabelGroup
              :className="'col-md-6'"
              :value="reminders.reminderPlan.reminderPlanNameCurrent"
              :title="$t('ReminderPlans.nameAr')"
              :imgName="'reminderPlans.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                isDataExist(
                  reminders.reminderPlan.priorityTypeInfoBeforeTimeData
                    .priorityTypeNameCurrent
                )
              "
              :title="$t('ReminderPlans.priorityTypeBeforeTime')"
              :imgName="'priorityTypes.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                isDataExist(
                  reminders.reminderPlan.priorityTypeInfoOnTimeData
                    .priorityTypeNameCurrent
                )
              "
              :title="$t('ReminderPlans.priorityTypeOnTime')"
              :imgName="'priorityTypes.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                isDataExist(
                  reminders.reminderPlan.priorityTypeInfoAfterTimeData
                    .priorityTypeNameCurrent
                )
              "
              :title="$t('ReminderPlans.priorityTypeAfterTime')"
              :imgName="'priorityTypes.svg'"
            />
            <div
              class="my-card row"
              v-if="
                reminders.reminderPlan.reminderPlansDetailsDataBeforeTime.length
              "
            >
              <span class="my-card-title">{{
                $t("ReminderPlans.detailsBeforeTime")
              }}</span>
              <table class="my-table mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{{ $t("Colors.name") }}</th>
                    <th>{{ $t("PriorityTypes.name") }}</th>
                    <th>{{ $t("ReminderPlans.durationFrom") }}</th>
                    <th>{{ $t("ReminderPlans.durationTo") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(type, index) in reminders.reminderPlan
                      .reminderPlansDetailsDataBeforeTime"
                    :key="index"
                  >
                    <td>{{ ++index }}</td>
                    <td>
                      {{
                        isDataExist(type.priorityTypeInfoData.colorNameCurrent)
                      }}
                    </td>
                    <td>
                      {{
                        isDataExist(
                          type.priorityTypeInfoData.priorityTypeNameCurrent
                        )
                      }}
                    </td>
                    <td>
                      {{ isDataExist(type.reminderDurationFrom) }}
                    </td>
                    <td>
                      {{ isDataExist(type.reminderDurationTo) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="my-card row"
              v-if="
                reminders.reminderPlan.reminderPlansDetailsDataAfterTime.length
              "
            >
              <span class="my-card-title">{{
                $t("ReminderPlans.detailsAfterTime")
              }}</span>
              <table class="my-table mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{{ $t("Colors.name") }}</th>
                    <th>{{ $t("PriorityTypes.name") }}</th>
                    <th>{{ $t("ReminderPlans.durationFrom") }}</th>
                    <th>{{ $t("ReminderPlans.durationTo") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(type, index) in reminders.reminderPlan
                      .reminderPlansDetailsDataAfterTime"
                    :key="index"
                  >
                    <td>{{ ++index }}</td>
                    <td>
                      {{
                        isDataExist(type.priorityTypeInfoData.colorNameCurrent)
                      }}
                    </td>
                    <td>
                      {{
                        isDataExist(
                          type.priorityTypeInfoData.priorityTypeNameCurrent
                        )
                      }}
                    </td>
                    <td>
                      {{ isDataExist(type.reminderDurationFrom) }}
                    </td>
                    <td>
                      {{ isDataExist(type.reminderDurationTo) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </b-collapse>
      </div>
      <template v-if="hasData">
        <ReminderTable
          v-if="generalSetting.reminders.viewType == VIEW_TYPES.table"
          v-on:setReminderData="reminders.reminder.fillData($event)"
          :remindersData="reminders.remindersData"
          :defaultImg="reminders.reminder.defaultImg"
          :filterData="reminders.filterData"
        />

        <ReminderCards
          v-else-if="generalSetting.reminders.viewType == VIEW_TYPES.cards"
          v-on:setReminderData="reminders.reminder.fillData($event)"
          :remindersData="reminders.remindersData"
          :defaultImg="reminders.reminder.defaultImg"
          :filterData="reminders.filterData"
        />

        <ActionsData :actionsData="reminders.reminder" />
        <ReminderInfo :reminder="reminders.reminder" />
        <ReminderDelete
          :reminder="reminders.reminder"
          v-on:refresh="getAllReminders()"
        />
        <ReminderChangeActivationType
          :reminder="reminders.reminder"
          v-on:refresh="getAllReminders()"
        />
        <CustomBottomSheetQRCode
          :refName="'ReminderQRCode'"
          :code="reminders.reminder.fullCode"
          :codeTitle="$t('Reminders.code')"
          :name="reminders.reminder.reminderTitleCurrent"
          :nameTitle="$t('Reminders.title')"
          :nameIcon="'reminders.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="reminders.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ReminderFilter
        :theFilterData="reminders.filterData"
        v-on:search="search($event)"
      />

      <ReminderAdd
        :reminder="reminders.reminder"
        v-on:refresh="getAllReminders()"
      />
      <ReminderUpdate
        :reminder="reminders.reminder"
        v-on:refresh="getAllReminders()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../utils/constants";
import { ACTIVATION_TYPE } from "./../../utils/constantLists";
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../components/general/PreLoader.vue";
import DataLabelGroup from "./../../components/general/DataLabelGroup.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import ReminderAdd from "./components/ReminderAdd.vue";
import ReminderUpdate from "./components/ReminderUpdate.vue";
import ReminderCards from "./components/ReminderCards.vue";
import ReminderTable from "./components/ReminderTable.vue";
import ReminderInfo from "./components/ReminderInfo.vue";
import ReminderDelete from "./components/ReminderDelete.vue";
import ReminderChangeActivationType from "./components/ReminderChangeActivationType.vue";
import ReminderFilter from "./components/ReminderFilter.vue";
import Reminders from "./../../models/reminders/Reminders";
import apiReminder from "./../../api/reminder";
import { getDialogOfActivationTypes } from "./../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { checkPrivilege, isDataExist } from "./../../utils/functions";
import {
  hasReminderAdd,
  hasReminderViewActive,
  hasReminderViewArchive,
  hasReminderViewBlocked,
} from "./../../utils/privilegeHelper";
import PriorityTypes from "./../../models/settings/settingsOthers/priorityTypes/PriorityTypes";
import apiPriorityType from "./../../api/settings/settingsOthers/priorityTypes";
import { PRIORITY_SCOPE_TYPE_TOKENS } from "./../../utils/constantLists";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    DataLabelGroup,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    ReminderAdd,
    ReminderUpdate,
    ReminderCards,
    ReminderTable,
    ReminderInfo,
    ReminderDelete,
    ReminderChangeActivationType,
    ReminderFilter,
  },
  computed: {
    hasData() {
      return this.reminders.remindersData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasReminderViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.reminders.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasReminderViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.reminders.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasReminderViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.reminders.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      reminders: new Reminders(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      priorityTypes: new PriorityTypes(),
    };
  },
  methods: {
    checkPrivilege,
    isDataExist,
    hasReminderAdd,
    changePagination(pagination) {
      this.reminders.filterData.fillData(pagination);
      this.getAllReminders();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("reminders", data);
      this.reminders.filterData.activationTypeTokens = data;
      this.getAllReminders();
    },
    search(data) {
      this.reminders.filterData.fillData(data);
      this.getAllReminders();
    },
    async getAllReminders() {
      this.isLoading = true;
      try {
        this.reminders.remindersData = [];
        const response = await apiReminder.getAll(this.reminders.filterData);
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
        this.reminders.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async getAllPriorityTypes() {
      this.isLoading = true;
      try {
        this.priorityTypes.priorityTypesData = [];
        this.priorityTypes.filterData.priorityScopeTypeToken =
          PRIORITY_SCOPE_TYPE_TOKENS.Reminder;
        const response = await apiPriorityType.getAll(
          this.priorityTypes.filterData
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
        this.priorityTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllPriorityTypes();
    this.getAllReminders();
  },
};
</script>
