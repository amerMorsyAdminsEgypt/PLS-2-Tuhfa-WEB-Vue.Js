<template>
  <CustomBottomSheet
    :refName="'EducationalScheduleTimeEmployeeReportFilter'"
    size="xl"
    :headerText="$t('Reports.educationalScheduleTimeEmployeeReport')"
    :headerIcon="icon"
    @opened="getDialogs()"
    @closed="filterReport.setInitialValue()"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`employeeUserToken`"
        :value="filterReport.employeeUserToken"
        :options="employeeUserTokenOptions"
        v-on:changeValue="filterReport.employeeUserToken = $event"
        :title="$t('lecturers.select')"
        :imgName="'lecturers.svg'"
      />
      <CustomSelectBoxMultiple
        :className="'col-md-12'"
        :id="`educationalGroupTokens`"
        :value="filterReport.educationalGroupTokens"
        :options="educationalGroupTokensOptions"
        v-on:changeValue="filterReport.educationalGroupTokens = $event"
        :title="$t('EducationalGroups.select')"
        :imgName="'EducationalGroups.svg'"
        :returnArrayOfObjects="false"
      />
      <CustomSelectBoxMultiple
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
      :id="`EducationalScheduleTimeEmployeeReportFilter`"
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
          closeBottomSheet('EducationalScheduleTimeEmployeeReportFilter')
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
  getUsersDialog,
  getPlacesDialog,
} from "@/utils/dialogsOfApi";
import { FILTER_REPORT_TYPES } from "./../../../utils/constants";
import {
  USER_TYPE,
  USER_ACTIVITY_TYPE_TOKEN,
  PLACE_TYPE_TOKENS,
} from "./../../../utils/constantLists";

export default {
  mixins: [generalMixin],
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
        new EducationalScheduleTimes(FILTER_REPORT_TYPES.Employee).filterReport,
    },
  },
  computed: {},
  data() {
    return {
      icon,
      isAllDataLoaded: false,
      employeeUserTokenOptions: [],
      educationalGroupTokensOptions: [],
      placeTokensOptions: [],
      placeTypeToken: PLACE_TYPE_TOKENS.Employee,
    };
  },
  methods: {
    async getDialogs() {
      if (!this.isAllDataLoaded) {
        await this.getEmployeesDialog();
        await this.getEducationalGroupsDialog();
        await this.getPlacesDialog();
        this.isAllDataLoaded = true;
      }
    },

    //#region dialogs
    async getEmployeesDialog() {
      this.$emit("isLoading", true);
      let params = {
        modelName: "employees",
        userTypeToken: USER_TYPE.Employee,
        userActivityTypeToken: USER_ACTIVITY_TYPE_TOKEN.Lecturer,
      };
      this.employeeUserTokenOptions = await getUsersDialog(params);
      this.$emit("isLoading", false);
    },
    async getEducationalGroupsDialog() {
      this.$emit("isLoading", true);
      this.educationalGroupTokensOptions = await getEducationalGroupsDialog();
      this.$emit("isLoading", false);
    },
    async getPlacesDialog() {
      this.$emit("isLoading", true);
      let params = { placeTypeToken: this.placeTypeToken };
      this.placeTokensOptions = await getPlacesDialog(params);
      this.$emit("isLoading", false);
    },

    //#endregion dialogs

    async getReport() {
      this.$emit("isLoading", true);
      try {
        const response = await apiEducationalScheduleTime.getEmployeeReport(
          this.filterReport
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalScheduleTimeEmployeeReportFilter");
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
