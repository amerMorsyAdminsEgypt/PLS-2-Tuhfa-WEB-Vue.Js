<template>
  <div class="">
    <DashboardNavbar
      :viewTypeStatus="false"
      :activationTypeStatus="false"
      :btnAddStatus="false"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <StudentScheduleExamTimeTable
          v-on:setStudentScheduleExamTimeData="
            studentScheduleExamTimes.studentScheduleExamTime.fillData($event)
          "
          :studentScheduleExamTimesData="
            studentScheduleExamTimes.studentScheduleExamTimesData
          "
          :defaultImg="
            studentScheduleExamTimes.studentScheduleExamTime.defaultImg
          "
          :filterData="studentScheduleExamTimes.filterData"
        />

        <ActionsData
          :actionsData="studentScheduleExamTimes.studentScheduleExamTime"
        />
        <StudentScheduleExamTimeInfo
          :studentScheduleExamTime="
            studentScheduleExamTimes.studentScheduleExamTime
          "
        />
        <StudentScheduleExamTimeReport
          :studentScheduleExamTime="
            studentScheduleExamTimes.studentScheduleExamTime
          "
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="studentScheduleExamTimes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <StudentScheduleExamTimeFilter
        :theFilterData="studentScheduleExamTimes.filterData"
        v-on:search="search($event)"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import StudentScheduleExamTimeTable from "./components/StudentScheduleExamTimeTable.vue";
import StudentScheduleExamTimeInfo from "./components/StudentScheduleExamTimeInfo.vue";
import StudentScheduleExamTimeReport from "./components/StudentScheduleExamTimeReport.vue";
import StudentScheduleExamTimeFilter from "./components/StudentScheduleExamTimeFilter.vue";
import StudentScheduleExamTimes from "./../../../models/educational/studentScheduleExamTimes/StudentScheduleExamTimes";
import apiStudentScheduleExamTime from "./../../../api/educational/studentScheduleExamTimes";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomPagination,
    StudentScheduleExamTimeTable,
    StudentScheduleExamTimeInfo,
    StudentScheduleExamTimeReport,
    StudentScheduleExamTimeFilter,
  },
  computed: {
    hasData() {
      return (
        this.studentScheduleExamTimes.studentScheduleExamTimesData.length != 0
      );
    },
  },
  data() {
    return {
      studentScheduleExamTimes: new StudentScheduleExamTimes(),
      VIEW_TYPES,
    };
  },
  props: {
    userToken: {
      type: String,
      default: "",
    },
    educationalGroupToken: {
      type: String,
      default: "",
    },
  },
  methods: {
    changePagination(pagination) {
      this.studentScheduleExamTimes.filterData.fillData(pagination);
      this.getAllStudentScheduleExamTimes();
    },
    search(data) {
      this.studentScheduleExamTimes.filterData.fillData(data);
      this.getAllStudentScheduleExamTimes();
    },
    async getAllStudentScheduleExamTimes() {
      this.isLoading = true;
      try {
        this.studentScheduleExamTimes.filterData.studentUserInfoDataInclude = true;
        this.studentScheduleExamTimes.filterData.simpleExamModelInfoDataInclude = true;
        this.studentScheduleExamTimes.filterData.studentScheduleExamTimeInfoDataInclude = true;
        this.studentScheduleExamTimes.filterData.educationalGroupInfoDataInclude = true;
        this.studentScheduleExamTimes.studentScheduleExamTimesData = [];
        const response = await apiStudentScheduleExamTime.getAll(
          this.studentScheduleExamTimes.filterData
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
        this.studentScheduleExamTimes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.studentScheduleExamTimes.filterData.studentUserToken = this.userToken;
    this.studentScheduleExamTimes.filterData.educationalGroupToken =
      this.educationalGroupToken;
    this.getAllStudentScheduleExamTimes();
  },
};
</script>
