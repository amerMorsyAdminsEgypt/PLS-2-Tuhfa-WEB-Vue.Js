<template>
  <CustomBottomSheet
    :refName="'EducationalScheduleTimeNameReportFilter'"
    size="xl"
    :headerText="$t('Reports.educationalScheduleTimeNamesReport')"
    :headerIcon="icon"
    @opened="getDialogs()"
    @closed="filterReport.setInitialValue()"
  >
    <div class="row">
      <!-- parent -->
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`educationalGroupToken`"
        :value="filterReport.educationalGroupToken"
        :options="educationalGroupTokenOptions"
        v-on:changeValue="
          filterReport.educationalGroupToken = $event;
          getEducationalGroupEmployeesDialog();
          getEducationalGroupStudentsDialog();
          getEducationalGroupPlacesDialog();
          filterMaster();
        "
        :title="$t('EducationalGroups.select')"
        :imgName="'EducationalGroups.svg'"
      />
      <!-- child -->
      <CustomSelectBoxMultiple
        :className="'col-md-12'"
        :id="`employeeTokens`"
        :value="filterReport.employeeTokens"
        :options="employeeTokensOptions"
        v-on:changeValue="
          filterReport.employeeTokens = $event;
          filterMaster();
        "
        :title="$t('employees.select')"
        :imgName="'employees.svg'"
        :returnArrayOfObjects="false"
      />
      <CustomSelectBoxMultiple
        :className="'col-md-12'"
        :id="`studentTokens`"
        :value="filterReport.studentTokens"
        :options="studentTokensOptions"
        v-on:changeValue="
          filterReport.studentTokens = $event;
          filterMaster();
        "
        :title="$t('students.select')"
        :imgName="'students.svg'"
        :returnArrayOfObjects="false"
      />
      <!-- child -->
      <!-- child -->
      <CustomSelectBoxMultiple
        :className="'col-md-12'"
        :id="`placeTokens`"
        :value="filterReport.placeTokens"
        :options="placeTokensOptions"
        v-on:changeValue="
          filterReport.placeTokens = $event;
          filterMaster();
        "
        :title="$t('Places.select')"
        :imgName="'places.svg'"
        :returnArrayOfObjects="false"
      />
      <!-- master -->
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`educationalScheduleTimeToken`"
        :value="filterReport.educationalScheduleTimeToken"
        :options="educationalScheduleTimeTokenOptions"
        v-on:changeValue="filterReport.educationalScheduleTimeToken = $event"
        :title="$t('EducationalScheduleTimes.select')"
        :imgName="'EducationalScheduleTimes.svg'"
      />
    </div>

    <BaseFilterReport
      :className="'row'"
      :id="`EducationalScheduleTimeNameReportFilter`"
      :filterReport="filterReport"
      v-on:changeValue="
        filterReport.fillData($event);
        filterMaster();
      "
    />

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="getReport">
        <img
          src="@/assets/images/check-icon.svg"
          :title="$t('Reports.print')"
        />
      </div>
      <div
        @click.prevent="
          closeBottomSheet('EducationalScheduleTimeNameReportFilter')
        "
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import BaseFilterReport from "@/components/general/BaseFilterReport.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomSelectBoxMultiple from "@/components/general/CustomSelectBoxMultiple.vue";

import generalMixin from "@/utils/generalMixin";
import icon from "@/assets/images/installments.svg";
import { STATUS } from "@/utils/constants";
import { viewFileFromServer } from "@/utils/functions";

import EducationalScheduleTimes from "@/models/educational/educationalScheduleTimes/EducationalScheduleTimes";
import apiEducationalScheduleTime from "@/api/educational/educationalScheduleTimes";
import {
  getEducationalGroupsDialog,
  getEducationalGroupEmployeesDialog,
  getEducationalGroupStudentsDialog,
  getEducationalGroupPlacesDialog,
  getEducationalScheduleTimesDialogCustomized,
} from "./../../../utils/dialogsOfApi";
import { FILTER_REPORT_TYPES } from "./../../../utils/constants";

export default {
  mixins: [generalMixin],
  data() {
    return {
      icon,
      isAllDataLoaded: false,
      educationalGroupTokenOptions: [],
      employeeTokensOptions: [],
      studentTokensOptions: [],
      placeTokensOptions: [],
      educationalScheduleTimeTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    BaseFilterReport,
    CustomSelectBox,
    CustomSelectBoxMultiple,
  },
  props: {
    filterReport: {
      type: Object,
      default: () =>
        new EducationalScheduleTimes(FILTER_REPORT_TYPES.Attendance)
          .filterReport,
    },
  },
  methods: {
    async getDialogs() {
      if (!this.isAllDataLoaded) {
        await this.getEducationalGroupsDialog();
        await this.getEducationalGroupEmployeesDialog();
        await this.getEducationalGroupStudentsDialog();
        await this.getEducationalGroupPlacesDialog();
        await this.getEducationalScheduleTimesDialog();
        this.isAllDataLoaded = true;
      }
    },
    async filterMaster() {
      await this.getEducationalScheduleTimesDialog();
    },

    //#region dialogs
    async getEducationalGroupsDialog() {
      this.$emit("isLoading", true);
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog();
      this.$emit("isLoading", false);
    },

    async getEducationalGroupEmployeesDialog() {
      this.$emit("isLoading", true);
      let params = {
        educationalGroupToken: this.filterReport.educationalGroupToken,
      };
      this.employeeTokensOptions = await getEducationalGroupEmployeesDialog(
        params
      );

      this.$emit("isLoading", false);
    },

    async getEducationalGroupStudentsDialog() {
      this.$emit("isLoading", true);
      let params = {
        educationalGroupToken: this.filterReport.educationalGroupToken,
      };
      this.studentTokensOptions = await getEducationalGroupStudentsDialog(
        params
      );
      this.$emit("isLoading", false);
    },

    async getEducationalGroupPlacesDialog() {
      this.$emit("isLoading", true);
      let params = {
        educationalGroupToken: this.filterReport.educationalGroupToken,
      };
      this.placeTokensOptions = await getEducationalGroupPlacesDialog(params);
      this.$emit("isLoading", false);
    },

    async getEducationalScheduleTimesDialog() {
      this.$emit("isLoading", true);
      let params = {
        educationalGroupTokens: [this.filterReport.educationalGroupToken],
        employeeTokens: this.filterReport.employeeTokens,
        studentTokens: this.filterReport.studentTokens,
        placeTokens: this.filterReport.placeTokens,
        systemComponentHierarchyToken:
          this.filterReport.systemComponentHierarchyToken,
        systemComponentToken: this.filterReport.systemComponentToken,
        educationalCategoryToken: this.filterReport.educationalCategoryToken,
        textSearch: this.filterReport.textSearch,
        dateTimeFromStartSearch: this.filterReport.dateTimeFromStartSearch,
        dateTimeFromEndSearch: this.filterReport.dateTimeFromEndSearch,
        dateTimeToStartSearch: this.filterReport.dateTimeToStartSearch,
        dateTimeToEndSearch: this.filterReport.dateTimeToEndSearch,
      };
      this.educationalScheduleTimeTokenOptions =
        await getEducationalScheduleTimesDialogCustomized(params);
      this.$emit("isLoading", false);
    },
    //#endregion dialogs

    async getReport() {
      this.$emit("isLoading", true);
      try {
        let params = {
          educationalScheduleTimeToken:
            this.filterReport.educationalScheduleTimeToken,
          sendTo: this.filterReport.sendTo,
        };
        const response = await apiEducationalScheduleTime.getNamesReport(
          params
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalScheduleTimeNameReportFilter");
          viewFileFromServer(response.data.reportPath);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.$emit("isLoading", false);
    },
    async created() {},
  },
};
</script>
