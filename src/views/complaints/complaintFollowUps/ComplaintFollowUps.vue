<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('complaintFollowUps', $event)"
      :viewType="generalSetting.complaintFollowUps.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.complaintFollowUps.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('ComplaintFollowUps.add')"
      :btnAddName="'ComplaintFollowUpAdd'"
      :btnAddStatus="ableToAdd"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <div class="padding">
        <b-button v-b-toggle.ComplaintsData class="btn btn-lg btn-collapse">
          {{ $t("Complaints.data") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse id="ComplaintsData">
          <ComplaintComponent
            :complaint="complaintFollowUps.complaint"
            :defaultImg="complaintFollowUps.complaint.defaultImg"
            :filterData="complaintFollowUps.filterData"
          />
        </b-collapse>
      </div>

      <template v-if="hasData">
        <ComplaintFollowUpTable
          v-if="generalSetting.complaintFollowUps.viewType == VIEW_TYPES.table"
          v-on:setComplaintFollowUpData="
            complaintFollowUps.complaintFollowUp.fillData($event)
          "
          :complaintFollowUpsData="complaintFollowUps.complaintFollowUpsData"
          :defaultImg="complaintFollowUps.complaintFollowUp.defaultImg"
          :filterData="complaintFollowUps.filterData"
        />

        <ComplaintFollowUpCards
          v-else-if="
            generalSetting.complaintFollowUps.viewType == VIEW_TYPES.cards
          "
          v-on:setComplaintFollowUpData="
            complaintFollowUps.complaintFollowUp.fillData($event)
          "
          :complaintFollowUpsData="complaintFollowUps.complaintFollowUpsData"
          :defaultImg="complaintFollowUps.complaintFollowUp.defaultImg"
          :filterData="complaintFollowUps.filterData"
        />

        <ActionsData :actionsData="complaintFollowUps.complaintFollowUp" />
        <ComplaintFollowUpInfo
          :complaintFollowUp="complaintFollowUps.complaintFollowUp"
        />
        <ComplaintFollowUpDelete
          :complaintFollowUp="complaintFollowUps.complaintFollowUp"
          v-on:refresh="getAllComplaintFollowUps()"
        />

        <ComplaintFollowUpChangeActivationType
          :complaintFollowUp="complaintFollowUps.complaintFollowUp"
          v-on:refresh="getAllComplaintFollowUps()"
        />
        <CustomBottomSheetQRCode
          :refName="'ComplaintFollowUpQRCode'"
          :code="complaintFollowUps.complaintFollowUp.fullCode"
          :codeTitle="$t('ComplaintFollowUps.code')"
          :name="
            complaintFollowUps.complaintFollowUp.complaintFollowUpTextCurrent
          "
          :nameTitle="$t('ComplaintFollowUps.text')"
          :nameIcon="'complaintFollowUps.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="complaintFollowUps.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ComplaintFollowUpFilter
        :theFilterData="complaintFollowUps.filterData"
        v-on:search="search($event)"
      />

      <ComplaintFollowUpAdd
        :complaint="complaintFollowUps.complaint"
        :complaintFollowUp="complaintFollowUps.complaintFollowUp"
        v-on:refresh="getAllComplaintFollowUps()"
        v-on:setComplaintFollowUpData="
          complaintFollowUps.complaintFollowUp.fillData($event)
        "
      />
      <ComplaintFollowUpUpdate
        :complaintFollowUp="complaintFollowUps.complaintFollowUp"
        v-on:refresh="getAllComplaintFollowUps()"
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
import ComplaintFollowUpAdd from "./components/ComplaintFollowUpAdd.vue";
import ComplaintFollowUpUpdate from "./components/ComplaintFollowUpUpdate.vue";
import ComplaintFollowUpCards from "./components/ComplaintFollowUpCards.vue";
import ComplaintFollowUpTable from "./components/ComplaintFollowUpTable.vue";
import ComplaintComponent from "./components/ComplaintComponent.vue";
import ComplaintFollowUpInfo from "./components/ComplaintFollowUpInfo.vue";
import ComplaintFollowUpDelete from "./components/ComplaintFollowUpDelete.vue";
import ComplaintFollowUpChangeActivationType from "./components/ComplaintFollowUpChangeActivationType.vue";
import ComplaintFollowUpFilter from "./components/ComplaintFollowUpFilter.vue";
import ComplaintFollowUps from "./../../../models/complaints/complaintFollowUps/ComplaintFollowUps";
import apiComplaintFollowUp from "./../../../api/complaintFollowUp/complaintFollowUps";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { COMPLAINT_STATUS_TYPE } from "./../../../utils/constantLists";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasComplaintFollowUpAdd,
  hasComplaintFollowUpViewActive,
  hasComplaintFollowUpViewArchive,
  hasComplaintFollowUpViewBlocked,
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
    ComplaintFollowUpAdd,
    ComplaintFollowUpUpdate,
    ComplaintFollowUpCards,
    ComplaintFollowUpTable,
    ComplaintComponent,
    ComplaintFollowUpInfo,
    ComplaintFollowUpDelete,
    ComplaintFollowUpChangeActivationType,
    ComplaintFollowUpFilter,
  },
  props: {
    complaintToken: {
      type: String,
    },
  },
  computed: {
    ableToAdd() {
      let check =
        checkPrivilege(hasComplaintFollowUpAdd()) &&
        this.complaintFollowUps.complaint.complaintStatusTypeToken !=
          COMPLAINT_STATUS_TYPE.Closed;
      return check;
    },
    hasData() {
      return this.complaintFollowUps.complaintFollowUpsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasComplaintFollowUpViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.complaintFollowUps.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasComplaintFollowUpViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.complaintFollowUps.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasComplaintFollowUpViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.complaintFollowUps.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      complaintFollowUps: new ComplaintFollowUps(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasComplaintFollowUpAdd,
    changePagination(pagination) {
      this.complaintFollowUps.filterData.fillData(pagination);
      this.getAllComplaintFollowUps();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("complaintFollowUps", data);
      this.complaintFollowUps.filterData.activationTypeTokens = data;
      this.getAllComplaintFollowUps();
    },
    search(data) {
      this.complaintFollowUps.filterData.fillData(data);
      this.getAllComplaintFollowUps();
    },
    async getAllComplaintFollowUps() {
      this.isLoading = true;
      try {
        this.complaintFollowUps.complaintFollowUpsData = [];

        const response = await apiComplaintFollowUp.getAll(
          this.complaintFollowUps.filterData
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
        this.complaintFollowUps.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    let complaintToken = "";
    if (this.complaintToken) {
      complaintToken = this.complaintToken;
    } else {
      complaintToken = this.$route.params.complaintToken;
    }

    this.complaintFollowUps.filterData.complaintToken = complaintToken;

    this.getAllComplaintFollowUps();
  },
};
</script>
<style scoped lang="scss">
.padding {
  padding: var(--app-content-gap);
}
</style>
