<template>
  <div class="">
    <DashboardNavbar
      :viewTypeStatus="false"
      :activationTypeStatus="false"
      :btnAddTitle="$t('EducationalGroupAttendances.add')"
      :btnAddName="'EducationalGroupAttendanceAdd'"
      :btnAddStatus="checkPrivilege(hasEducationalGroupAttendanceAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <b-tabs v-if="tabsOptions">
        <b-tab
          v-for="(option, index) in tabsOptions"
          :key="index"
          @click="filterByUserTypeType(option.value)"
          :title-item-class="'custom-tab-outer-li tab-container-media'"
        >
          <template #title>
            <span v-b-popover.hover.bottom="`${option.text}`">
              <!-- <b-badge variant="danger" class="count-notifications">{{
                option.count
              }}</b-badge> -->
              <img :src="option.image" class="icon-tab" />
              <span>{{ option.text }}</span>
            </span>
          </template>
        </b-tab>
      </b-tabs>

      <template v-if="hasData">
        <EducationalGroupAttendanceTable
          v-on:setEducationalGroupAttendanceData="
            educationalGroupAttendances.educationalGroupAttendance.fillData(
              $event
            );
            educationalGroupAttendances.educationalGroupAttendanceModel.fillData(
              $event
            );
            educationalGroupAttendances.educationalGroupAttendanceModelUpdate.fillData(
              $event
            );
          "
          :educationalGroupAttendancesData="
            educationalGroupAttendances.educationalGroupAttendancesData
          "
          :defaultImg="
            educationalGroupAttendances.educationalGroupAttendance.defaultImg
          "
          :filterData="educationalGroupAttendances.filterData"
        />

        <ActionsData
          :actionsData="educationalGroupAttendances.educationalGroupAttendance"
        />
        <EducationalGroupAttendanceInfo
          :educationalGroupAttendance="
            educationalGroupAttendances.educationalGroupAttendance
          "
        />
        <EducationalGroupAttendanceDelete
          :educationalGroupAttendance="
            educationalGroupAttendances.educationalGroupAttendance
          "
          v-on:refresh="getAllEducationalGroupAttendances()"
        />
        <CustomBottomSheetQRCode
          :refName="'EducationalGroupAttendanceQRCode'"
          :code="
            educationalGroupAttendances.educationalGroupAttendance.fullCode
          "
          :codeTitle="$t('EducationalGroupAttendances.code')"
          :name="`[${formateDateTimeLang(
            educationalGroupAttendances.educationalGroupAttendance
              .attendFromDate,
            educationalGroupAttendances.educationalGroupAttendance
              .attendFromTime
          )}] - [${formateDateTimeLang(
            educationalGroupAttendances.educationalGroupAttendance.attendToDate,
            educationalGroupAttendances.educationalGroupAttendance.attendToTime
          )}] - [${
            educationalGroupAttendances.educationalGroupAttendance.userInfoData
              .userNameCurrent
          }]`"
          :nameTitle="$t('EducationalGroupAttendances.name')"
          :nameIcon="'EducationalGroupAttendances.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="educationalGroupAttendances.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <EducationalGroupAttendanceFilter
        :theFilterData="educationalGroupAttendances.filterData"
        v-on:search="search($event)"
      />

      <EducationalGroupAttendanceAdd
        :educationalGroupAttendance="
          educationalGroupAttendances.educationalGroupAttendanceModel
        "
        v-on:refresh="getAllEducationalGroupAttendances()"
      />
      <EducationalGroupAttendanceUpdate
        :educationalGroupAttendance="
          educationalGroupAttendances.educationalGroupAttendanceModelUpdate
        "
        v-on:refresh="getAllEducationalGroupAttendances()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS } from "./../../../utils/constants";
import { USER_TYPE } from "./../../../utils/constantLists";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import EducationalGroupAttendanceAdd from "./components/EducationalGroupAttendanceAdd.vue";
import EducationalGroupAttendanceUpdate from "./components/EducationalGroupAttendanceUpdate.vue";
import EducationalGroupAttendanceTable from "./components/EducationalGroupAttendanceTable.vue";
import EducationalGroupAttendanceInfo from "./components/EducationalGroupAttendanceInfo.vue";
import EducationalGroupAttendanceDelete from "./components/EducationalGroupAttendanceDelete.vue";
import EducationalGroupAttendanceFilter from "./components/EducationalGroupAttendanceFilter.vue";
import EducationalGroupAttendances from "./../../../models/educational/educationalGroupAttendances/EducationalGroupAttendances";
import apiEducationalGroupAttendance from "./../../../api/educational/educationalGroupAttendances";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import {
  checkPrivilege,
  formateDateTimeLang,
} from "./../../../utils/functions";
import { hasEducationalGroupAttendanceAdd } from "./../../../utils/privilegeHelper";
import employeesImg from "@/assets/images/employees.svg";
import studentsImg from "@/assets/images/students.svg";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    EducationalGroupAttendanceAdd,
    EducationalGroupAttendanceUpdate,
    EducationalGroupAttendanceTable,
    EducationalGroupAttendanceInfo,
    EducationalGroupAttendanceDelete,
    EducationalGroupAttendanceFilter,
  },
  computed: {
    hasData() {
      return (
        this.educationalGroupAttendances.educationalGroupAttendancesData
          .length != 0
      );
    },
    tabsOptions() {
      return [
        {
          text: this.$t("employees.modelName"),
          value: USER_TYPE.Employee,
          image: employeesImg,
        },
        {
          text: this.$t("students.modelName"),
          value: USER_TYPE.Student,
          image: studentsImg,
        },
      ];
    },
  },
  props: {
    educationalGroupToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      educationalGroupAttendances: new EducationalGroupAttendances(),
    };
  },
  methods: {
    checkPrivilege,
    formateDateTimeLang,
    hasEducationalGroupAttendanceAdd,
    changePagination(pagination) {
      this.educationalGroupAttendances.filterData.fillData(pagination);
      this.getAllEducationalGroupAttendances();
    },
    search(data) {
      this.educationalGroupAttendances.filterData.fillData(data);
      this.getAllEducationalGroupAttendances();
    },
    async getAllEducationalGroupAttendances() {
      this.isLoading = true;
      try {
        this.educationalGroupAttendances.filterData.userInfoDataInclude = true;
        this.educationalGroupAttendances.filterData.educationalScheduleTimeInfoDataInclude = true;
        this.educationalGroupAttendances.filterData.alternativeEducationalScheduleTimeInfoDataInclude = true;
        this.educationalGroupAttendances.educationalGroupAttendancesData = [];
        const response = await apiEducationalGroupAttendance.getAll(
          this.educationalGroupAttendances.filterData
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
        this.educationalGroupAttendances.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    filterByUserTypeType(userTypeToken) {
      this.educationalGroupAttendances.filterData.userTypeToken = userTypeToken;
      this.getAllEducationalGroupAttendances();
    },
  },
  async created() {
    this.educationalGroupAttendances.filterData.educationalGroupToken =
      this.educationalGroupToken;
    this.educationalGroupAttendances.filterData.userTypeToken =
      this.tabsOptions[0].value;
    this.getAllEducationalGroupAttendances();
  },
};
</script>
