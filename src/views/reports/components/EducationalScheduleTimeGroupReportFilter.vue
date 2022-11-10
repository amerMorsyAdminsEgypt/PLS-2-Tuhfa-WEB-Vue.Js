<template>
  <CustomBottomSheet
    :refName="'EducationalScheduleTimeGroupReportFilter'"
    size="xl"
    :headerText="$t('Reports.educationalScheduleTimeReport')"
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
        v-on:changeValue="filterReport.employeeTokens = $event"
        :title="$t('lecturers.select')"
        :imgName="'lecturers.svg'"
        :returnArrayOfObjects="false"
      />
      <!-- child -->
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`studentUserToken`"
        :value="filterReport.studentUserToken"
        :options="studentUserTokenOptions"
        v-on:changeValue="filterReport.studentUserToken = $event"
        :title="$t('students.select')"
        :imgName="'students.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`placeTypeToken-EducationalScheduleTimeGroupReportFilter`"
        :value="filterReport.placeTypeToken"
        :options="placeTypeTokenOptions"
        v-on:changeValue="
          filterReport.placeTypeToken = $event;
          getPlacesDialog();
        "
        :title="$t('Places.type')"
        :imgName="'type.svg'"
      />
      <!-- child -->
      <CustomSelectBoxMultiple
        :key="filterReport.placeTypeToken"
        :className="'col-md-12'"
        :id="`placeTokens`"
        :value="filterReport.placeTokens"
        :options="placeTokensOptions"
        v-on:changeValue="filterReport.placeTokens = $event"
        :title="$t('Places.select')"
        :imgName="'places.svg'"
        :returnArrayOfObjects="false"
      />
    </div>

    <BaseFilterReport
      :className="'row'"
      :id="`EducationalScheduleTimeGroupReportFilter`"
      :filterReport="filterReport"
      v-on:changeValue="filterReport.fillData($event)"
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
          closeBottomSheet('EducationalScheduleTimeGroupReportFilter')
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
  getPlacesDialog,
} from "@/utils/dialogsOfApi";
import { FILTER_REPORT_TYPES } from "./../../../utils/constants";
import { getDialogOfPlaceType } from "./../../../utils/dialogsOfConstantsLists";

export default {
  mixins: [generalMixin],
  data() {
    return {
      icon,
      isAllDataLoaded: false,
      educationalGroupTokenOptions: [],
      employeeTokensOptions: [],
      studentUserTokenOptions: [],
      placeTypeTokenOptions: getDialogOfPlaceType() || [],
      placeTokensOptions: [],
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
        new EducationalScheduleTimes(FILTER_REPORT_TYPES.Group).filterReport,
    },
  },
  methods: {
    async getDialogs() {
      if (!this.isAllDataLoaded) {
        await this.getEducationalGroupsDialog();
        await this.getEducationalGroupEmployeesDialog();
        await this.getEducationalGroupStudentsDialog();
        await this.getPlacesDialog();
        this.isAllDataLoaded = true;
      }
    },

    //#region dialogs
    async getEducationalGroupsDialog() {
      this.$emit("isLoading", true);
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog();
      this.$emit("isLoading", false);
    },

    async getEducationalGroupEmployeesDialog() {
      this.$emit("isLoading", true);
      this.employeeTokensOptions = [];
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
      this.studentUserTokenOptions = [];
      let params = {
        educationalGroupToken: this.filterReport.educationalGroupToken,
      };
      this.studentUserTokenOptions = await getEducationalGroupStudentsDialog(
        params
      );
      this.$emit("isLoading", false);
    },

    async getPlacesDialog() {
      this.$emit("isLoading", true);
      let params = { placeTypeToken: this.filterReport.placeTypeToken };
      this.placeTokensOptions = await getPlacesDialog(params);
      this.$emit("isLoading", false);
    },
    //#endregion dialogs

    async getReport() {
      this.$emit("isLoading", true);
      try {
        const response = await apiEducationalScheduleTime.getGroupReport(
          this.filterReport
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalScheduleTimeGroupReportFilter");
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
