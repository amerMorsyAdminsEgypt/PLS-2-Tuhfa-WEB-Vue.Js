<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('complaints', $event)"
      :viewType="generalSetting.complaints.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.complaints.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Complaints.add')"
      :btnAddName="'ComplaintAdd'"
      :btnAddStatus="checkPrivilege(hasComplaintAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <ComplaintTable
          v-if="generalSetting.complaints.viewType == VIEW_TYPES.table"
          v-on:setComplaintData="
            complaints.complaint.fillData($event);
            complaints.filterData.token = $event.complaintToken;
          "
          :complaintsData="complaints.complaintsData"
          :defaultImg="complaints.complaint.defaultImg"
          :filterData="complaints.filterData"
        />

        <ComplaintCards
          v-else-if="generalSetting.complaints.viewType == VIEW_TYPES.cards"
          v-on:setComplaintData="
            complaints.complaint.fillData($event);
            complaints.filterData.token = $event.complaintToken;
          "
          :complaintsData="complaints.complaintsData"
          :defaultImg="complaints.complaint.defaultImg"
          :filterData="complaints.filterData"
        />
        <ComplaintReportFilter
          v-on:isLoading="isLoading = $event"
          :complainingPersonUserToken="
            complaints.complaint.complainingPersonUserToken
          "
          :token="complaints.complaint.complaintToken"
        />

        <ActionsData :actionsData="complaints.complaint" />
        <ComplaintInfo :complaint="complaints.complaint" />
        <ComplaintDelete
          :complaint="complaints.complaint"
          v-on:refresh="getAllComplaints()"
        />
        <ComplaintClose
          :complaint="complaints.complaint"
          v-on:refresh="getAllComplaints()"
        />
        <ComplaintChangeActivationType
          :complaint="complaints.complaint"
          v-on:refresh="getAllComplaints()"
        />
        <CustomBottomSheetQRCode
          :refName="'ComplaintQRCode'"
          :code="complaints.complaint.fullCode"
          :codeTitle="$t('Complaints.code')"
          :name="complaints.complaint.complaintTitleCurrent"
          :nameTitle="$t('Complaints.title')"
          :nameIcon="'complaints.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="complaints.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ComplaintFilter
        :theFilterData="complaints.filterData"
        v-on:search="search($event)"
      />

      <ComplaintAdd
        :complaint="complaints.complaint"
        v-on:refresh="getAllComplaints()"
      />
      <ComplaintUpdate
        :complaint="complaints.complaint"
        v-on:refresh="getAllComplaints()"
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
import ComplaintAdd from "./components/ComplaintAdd.vue";
import ComplaintUpdate from "./components/ComplaintUpdate.vue";
import ComplaintCards from "./components/ComplaintCards.vue";
import ComplaintTable from "./components/ComplaintTable.vue";
import ComplaintInfo from "./components/ComplaintInfo.vue";
import ComplaintDelete from "./components/ComplaintDelete.vue";
import ComplaintClose from "./components/ComplaintClose.vue";
import ComplaintChangeActivationType from "./components/ComplaintChangeActivationType.vue";
import ComplaintReportFilter from "./../../reports/components/ComplaintReportFilter.vue";
import ComplaintFilter from "./components/ComplaintFilter.vue";
import Complaints from "./../../../models/complaints/complaints/Complaints";
import apiComplaint from "./../../../api/complaint/complaints";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasComplaintAdd,
  hasComplaintViewActive,
  hasComplaintViewArchive,
  hasComplaintViewBlocked,
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
    ComplaintAdd,
    ComplaintUpdate,
    ComplaintCards,
    ComplaintTable,
    ComplaintInfo,
    ComplaintDelete,
    ComplaintClose,
    ComplaintChangeActivationType,
    ComplaintReportFilter,
    ComplaintFilter,
  },
  computed: {
    hasData() {
      return this.complaints.complaintsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasComplaintViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.complaints.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasComplaintViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.complaints.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasComplaintViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.complaints.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      complaints: new Complaints(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasComplaintAdd,
    changePagination(pagination) {
      this.complaints.filterData.fillData(pagination);
      this.getAllComplaints();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("complaints", data);
      this.complaints.filterData.activationTypeTokens = data;
      this.getAllComplaints();
    },
    search(data) {
      this.complaints.filterData.fillData(data);
      this.getAllComplaints();
    },
    async getAllComplaints() {
      this.isLoading = true;
      try {
        this.complaints.complaintsData = [];
        const response = await apiComplaint.getAll(this.complaints.filterData);
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
        this.complaints.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllComplaints();
  },
};
</script>
