<template>
  <div class="">
    <DashboardNavbar
      :viewTypeStatus="false"
      :activationTypeStatus="false"
      :btnAddTitle="$t('EducationalScheduleTimes.add')"
      :btnAddName="'EducationalScheduleTimeAdd'"
      :btnAddStatus="checkPrivilege(hasEducationalScheduleTimeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <EducationalScheduleTimeTable
          v-on:setEducationalScheduleTimeData="
            educationalScheduleTimes.educationalScheduleTime.fillData($event);
            educationalScheduleTimes.educationalScheduleTimeModel.fillDataForUpdate(
              $event
            );
            educationalScheduleTimes.filterReport.educationalGroupToken =
              $event.educationalGroupToken;

            filterReportAttendance.educationalGroupToken =
              $event.educationalGroupToken;
          "
          :educationalScheduleTimesData="
            educationalScheduleTimes.educationalScheduleTimesData
          "
          :defaultImg="
            educationalScheduleTimes.educationalScheduleTime.defaultImg
          "
          :filterData="educationalScheduleTimes.filterData"
        />

        <EducationalScheduleTimeGroupReportFilter
          :filterReport="educationalScheduleTimes.filterReport"
          v-on:isLoading="isLoading = $event"
        />

        <EducationalScheduleTimeReportFilter
          :filterReport="filterReportAttendance"
          v-on:isLoading="isLoading = $event"
        />
        <EducationalScheduleTimeNameReportFilter
          :filterReport="filterReportAttendance"
          v-on:isLoading="isLoading = $event"
        />

        <ActionsData
          :actionsData="educationalScheduleTimes.educationalScheduleTime"
        />
        <EducationalScheduleTimeInfo
          :educationalScheduleTime="
            educationalScheduleTimes.educationalScheduleTime
          "
        />
        <EducationalScheduleTimeDelete
          :educationalScheduleTime="
            educationalScheduleTimes.educationalScheduleTime
          "
          v-on:refresh="getAllEducationalScheduleTimes()"
        />
        <CustomBottomSheetQRCode
          :refName="'EducationalScheduleTimeQRCode'"
          :code="educationalScheduleTimes.educationalScheduleTime.fullCode"
          :codeTitle="$t('EducationalScheduleTimes.code')"
          :name="
            educationalScheduleTimes.educationalScheduleTime
              .educationalScheduleTimeNameCurrent
          "
          :nameTitle="$t('EducationalScheduleTimes.name')"
          :nameIcon="'EducationalScheduleTimes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="educationalScheduleTimes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <EducationalScheduleTimeFilter
        :theFilterData="educationalScheduleTimes.filterData"
        v-on:search="search($event)"
      />

      <EducationalScheduleTimeAdd
        :educationalScheduleTime="
          educationalScheduleTimes.educationalScheduleTimeModel
        "
        :filterEnquiry="educationalScheduleTimes.filterEnquiry"
        v-on:refresh="getAllEducationalScheduleTimes()"
      />
      <EducationalScheduleTimeUpdate
        :educationalScheduleTime="
          educationalScheduleTimes.educationalScheduleTimeModel
        "
        v-on:refresh="getAllEducationalScheduleTimes()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS } from "./../../../utils/constants";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import EducationalScheduleTimeGroupReportFilter from "./../../../views/reports/components/EducationalScheduleTimeGroupReportFilter.vue";
import EducationalScheduleTimeReportFilter from "./../../../views/reports/components/EducationalScheduleTimeReportFilter.vue";
import EducationalScheduleTimeNameReportFilter from "./../../../views/reports/components/EducationalScheduleTimeNameReportFilter.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import EducationalScheduleTimeAdd from "./components/EducationalScheduleTimeAdd.vue";
import EducationalScheduleTimeUpdate from "./components/EducationalScheduleTimeUpdate.vue";
import EducationalScheduleTimeTable from "./components/EducationalScheduleTimeTable.vue";
import EducationalScheduleTimeInfo from "./components/EducationalScheduleTimeInfo.vue";
import EducationalScheduleTimeDelete from "./components/EducationalScheduleTimeDelete.vue";
import EducationalScheduleTimeFilter from "./components/EducationalScheduleTimeFilter.vue";
import EducationalScheduleTimes from "./../../../models/educational/educationalScheduleTimes/EducationalScheduleTimes";
import apiEducationalScheduleTime from "./../../../api/educational/educationalScheduleTimes";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import { hasEducationalScheduleTimeAdd } from "./../../../utils/privilegeHelper";
import { FILTER_REPORT_TYPES } from "./../../../utils/constants";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    EducationalScheduleTimeGroupReportFilter,
    EducationalScheduleTimeReportFilter,
    EducationalScheduleTimeNameReportFilter,
    CustomPagination,
    EducationalScheduleTimeAdd,
    EducationalScheduleTimeUpdate,
    EducationalScheduleTimeTable,
    EducationalScheduleTimeInfo,
    EducationalScheduleTimeDelete,
    EducationalScheduleTimeFilter,
  },
  computed: {
    hasData() {
      return (
        this.educationalScheduleTimes.educationalScheduleTimesData.length != 0
      );
    },
  },
  data() {
    return {
      filterReportAttendance: new EducationalScheduleTimes(
        FILTER_REPORT_TYPES.Attendance
      ).filterReport,
      educationalScheduleTimes: new EducationalScheduleTimes(),
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      educationalGroupToken: this.$route.params.educationalGroupToken,
    };
  },
  methods: {
    checkPrivilege,
    hasEducationalScheduleTimeAdd,
    changePagination(pagination) {
      this.educationalScheduleTimes.filterData.fillData(pagination);
      this.getAllEducationalScheduleTimes();
    },
    search(data) {
      this.educationalScheduleTimes.filterData.fillData(data);
      this.getAllEducationalScheduleTimes();
    },
    async getAllEducationalScheduleTimes() {
      this.isLoading = true;
      try {
        this.educationalScheduleTimes.filterData.placeInfoDataInclude = true;
        this.educationalScheduleTimes.filterData.educationalGroupInfoDataInclude = true;
        this.educationalScheduleTimes.filterData.employeesDataInclude = true;
        this.educationalScheduleTimes.filterData.studentsDataInclude = true;
        this.educationalScheduleTimes.educationalScheduleTimesData = [];
        const response = await apiEducationalScheduleTime.getAll(
          this.educationalScheduleTimes.filterData
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
        this.educationalScheduleTimes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.educationalScheduleTimes.filterData.educationalGroupTokens = [
      this.educationalGroupToken,
    ];
    this.getAllEducationalScheduleTimes();
  },
};
</script>
