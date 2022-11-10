<template>
  <CustomBottomSheet
    :refName="'EducationalScheduleTimePlaceReportFilter'"
    size="xl"
    :headerText="$t('Reports.educationalScheduleTimePlaceReport')"
    :headerIcon="icon"
    @opened="getDialogs()"
    @closed="filterReport.setInitialValue()"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`placeTypeToken`"
        :value="filterReport.placeTypeToken"
        :options="placeTypeTokenOptions"
        v-on:changeValue="filterReport.placeTypeToken = $event"
        :title="$t('Places.type')"
        :imgName="'type.svg'"
      />
      <BaseTree
        :key="filterReport.placeTypeToken"
        :placeTypeToken="placeTypeToken"
        :hierarchySystemTypeFilterToken="hierarchySystemTypeFilterTokenPlae"
        :treeModel="getTreeModelPlace"
        v-on:changeValue="baseTreeChanged($event)"
        :showParent="true"
        :filterParentDirect="true"
      />
      <CustomSelectBoxMultiple
        :className="'col-md-12'"
        :id="`employeeTokens`"
        :value="filterReport.employeeTokens"
        :options="employeeTokensOptions"
        v-on:changeValue="filterReport.employeeTokens = $event"
        :title="$t('employees.select')"
        :imgName="'employees.svg'"
        :returnArrayOfObjects="false"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`studentUserToken`"
        :value="filterReport.studentUserToken"
        :options="studentUserTokenOptions"
        v-on:changeValue="filterReport.studentUserToken = $event"
        :title="$t('students.select')"
        :imgName="'students.svg'"
      />
    </div>

    <BaseFilterReport
      :className="'row'"
      :id="`EducationalScheduleTimePlaceReportFilter`"
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
          closeBottomSheet('EducationalScheduleTimePlaceReportFilter')
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
import BaseTree from "@/components/general/BaseTree.vue";

import generalMixin from "@/utils/generalMixin";
import icon from "@/assets/images/installments.svg";
import { STATUS } from "@/utils/constants";
import { viewFileFromServer } from "@/utils/functions";

import EducationalScheduleTimes from "@/models/educational/educationalScheduleTimes/EducationalScheduleTimes";
import apiEducationalScheduleTime from "@/api/educational/educationalScheduleTimes";
import { getUsersDialog } from "@/utils/dialogsOfApi";
import { FILTER_REPORT_TYPES } from "./../../../utils/constants";
import { SYSTEM_TYPE, USER_TYPE } from "./../../../utils/constantLists";
import { getDialogOfPlaceType } from "./../../../utils/dialogsOfConstantsLists";

export default {
  mixins: [generalMixin],
  data() {
    return {
      icon,
      isAllDataLoaded: false,
      placeTokensOptions: [],
      employeeTokensOptions: [],
      studentUserTokenOptions: [],
      placeTypeTokenOptions: getDialogOfPlaceType() || [],
    };
  },
  components: {
    CustomBottomSheet,
    BaseFilterReport,
    CustomSelectBox,
    CustomSelectBoxMultiple,
    BaseTree,
  },
  props: {
    filterReport: {
      type: Object,
      default: () =>
        new EducationalScheduleTimes(FILTER_REPORT_TYPES.Place).filterReport,
    },
  },
  computed: {
    placeTypeToken() {
      return this.filterReport.placeTypeToken;
    },
    hierarchySystemTypeFilterTokenPlae() {
      return SYSTEM_TYPE.Place;
    },
    getTreeModelPlace() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.filterReport.systemComponentHierarchyTokenPlace,
        hierarchyTitle: this.$t("SystemComponentsHierarchies.selectPlace"),
        systemComponentToken: this.filterReport.systemComponentTokenPlace,
        componentTitle: this.$t("SystemComponents.selectPlace"),
        parentToken: this.filterReport.placeToken,
        parentTitle: this.$t("Places.selectParent"),
        parentImgName: "places.svg",
      };
      return treeModelObject;
    },
  },
  methods: {
    baseTreeChanged(data) {
      if (data.systemTypeToken == SYSTEM_TYPE.Place) {
        this.filterReport.systemComponentHierarchyTokenPlace =
          data.hierarchyToken;
        this.filterReport.systemComponentTokenPlace = data.componentToken;
        this.filterReport.placeToken = data.parentToken;
      }
    },
    async getDialogs() {
      if (!this.isAllDataLoaded) {
        await this.getEmployeesDialog();
        await this.getStudentsDialog();
        this.isAllDataLoaded = true;
      }
    },

    //#region dialogs

    async getEmployeesDialog() {
      this.$emit("isLoading", true);
      let params = {
        modelName: "employees",
        userTypeToken: USER_TYPE.Employee,
      };
      this.employeeTokensOptions = await getUsersDialog(params);
      this.$emit("isLoading", false);
    },

    async getStudentsDialog() {
      this.$emit("isLoading", true);
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.studentUserTokenOptions = await getUsersDialog(params);
      this.$emit("isLoading", false);
    },

    //#endregion dialogs

    async getReport() {
      this.$emit("isLoading", true);
      try {
        const response = await apiEducationalScheduleTime.getPlaceReport(
          this.filterReport
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalScheduleTimePlaceReportFilter");
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
