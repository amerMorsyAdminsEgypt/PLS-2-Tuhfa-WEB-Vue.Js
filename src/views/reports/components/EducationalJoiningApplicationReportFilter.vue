<template>
  <CustomBottomSheet
    :refName="'EducationalJoiningApplicationReportFilter'"
    size="xl"
    :headerText="
      statementStatus
        ? $t('EducationalCategories.getStatement')
        : $t('Reports.EducationalJoiningApplications')
    "
    :headerIcon="
      statementStatus
        ? iconStatement
        : educationalJoiningApplications.educationalJoiningApplication.icon
    "
    @opened="getDialogs"
  >
    <div class="row">
      <template v-if="!token">
        <CustomSelectBox
          :className="'col-md-12'"
          :id="`userStudentToken`"
          :value="educationalJoiningApplications.filterData.userStudentToken"
          :options="userTokenOptions"
          v-on:changeValue="
            educationalJoiningApplications.filterData.userStudentToken = $event;
            getEducationalJoiningApplicationsDialog();
          "
          :title="$t('students.select')"
          :imgName="'students.svg'"
        />
        <CustomSelectBox
          :className="'col-md-12'"
          :id="`educationalPeriodToken`"
          :value="
            educationalJoiningApplications.filterData.educationalPeriodToken
          "
          :options="educationalPeriodTokenOptions"
          v-on:changeValue="
            educationalJoiningApplications.filterData.educationalPeriodToken =
              $event;
            getEducationalJoiningApplicationsDialog();
          "
          :title="$t('EducationalPeriods.select')"
          :imgName="'educationalPeriods.svg'"
        />
        <CustomSelectBox
          :className="'col-md-12'"
          :id="`educationalCategoryToken`"
          :value="
            educationalJoiningApplications.filterData.educationalCategoryToken
          "
          :options="educationalCategoryTokenOptions"
          v-on:changeValue="
            educationalJoiningApplications.filterData.educationalCategoryToken =
              $event;
            getEducationalJoiningApplicationsDialog();
          "
          :title="$t('EducationalCategories.select')"
          :imgName="'EducationalCategories.svg'"
        />

        <CustomSelectBox
          :className="'col-md-12'"
          :id="'token'"
          :value="educationalJoiningApplications.filterData.token"
          :options="educationalJoiningApplicationTokenOptions"
          v-on:changeValue="
            educationalJoiningApplications.filterData.token = $event
          "
          :title="$t('EducationalJoiningApplications.select')"
          :imgName="'EducationalJoiningApplications.svg'"
        />
      </template>

      <CustomInput
        :className="'col-md-12'"
        :id="`sendTo`"
        :value="educationalJoiningApplications.filterData.sendTo"
        v-on:changeValue="
          educationalJoiningApplications.filterData.sendTo = $event
        "
        :title="$t('Reports.sendTo')"
        :imgName="'email.svg'"
      />
    </div>

    <div class="form-actions">
      <div
        v-if="statementStatus"
        class="icon-submit"
        @click.prevent="getStatementReport"
      >
        <img
          src="@/assets/images/check-icon.svg"
          :title="$t('Reports.print')"
        />
      </div>
      <div v-else class="icon-submit" @click.prevent="getReport">
        <img
          src="@/assets/images/check-icon.svg"
          :title="$t('Reports.print')"
        />
      </div>

      <div
        @click.prevent="
          closeBottomSheet('EducationalJoiningApplicationReportFilter')
        "
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import generalMixin from "./../../../utils/generalMixin";
import iconStatement from "@/assets/images/statement.svg";
import { STATUS } from "./../../../utils/constants";
import EducationalJoiningApplications from "./../../../models/educational/educationalJoiningApplications/EducationalJoiningApplications";
import apiEducationalJoiningApplication from "./../../../api/educational/educationalJoiningApplications";
import { viewFileFromServer } from "./../../../utils/functions";
import {
  getUsersDialog,
  getEducationalPeriodsDialog,
  getEducationalCategoriesDialog,
  getEducationalJoiningApplicationsDialog,
} from "./../../../utils/dialogsOfApi";
import { USER_TYPE } from "./../../../utils/constantLists";

export default {
  mixins: [generalMixin],
  data() {
    return {
      isLoading: false,
      bottomSheetOpened: false,
      educationalJoiningApplications: new EducationalJoiningApplications(),
      iconStatement,
      userTokenOptions: [],
      educationalPeriodTokenOptions: [],
      educationalCategoryTokenOptions: [],
      educationalJoiningApplicationTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomInput,
  },
  props: {
    token: {
      type: String,
      default: "",
    },
    statementStatus: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async getDialogs() {
      if (this.token) {
        this.educationalJoiningApplications.filterData.token = this.token;
      } else {
        if (!this.bottomSheetOpened) {
          this.getStudentsDialog();
          this.getEducationalPeriodsDialog();
          this.getEducationalCategoriesDialog();
          this.getEducationalJoiningApplicationsDialog();
        }
      }
      this.bottomSheetOpened = true;
    },

    async getStudentsDialog() {
      this.$emit("isLoading", true);
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.$emit("isLoading", false);
    },
    async getEducationalPeriodsDialog() {
      this.$emit("isLoading", true);
      this.educationalPeriodTokenOptions = await getEducationalPeriodsDialog();
      this.$emit("isLoading", false);
    },
    async getEducationalCategoriesDialog() {
      this.$emit("isLoading", true);
      this.educationalCategoryTokenOptions =
        await getEducationalCategoriesDialog();
      this.$emit("isLoading", false);
    },

    async getEducationalJoiningApplicationsDialog() {
      this.$emit("isLoading", true);
      let params = {
        userStudentToken:
          this.educationalJoiningApplications.filterData.userStudentToken,
        educationalPeriodToken:
          this.educationalJoiningApplications.filterData.educationalPeriodToken,
        educationalCategoryToken:
          this.educationalJoiningApplications.filterData
            .educationalCategoryToken,
      };
      this.educationalJoiningApplicationTokenOptions =
        await getEducationalJoiningApplicationsDialog(params);
      this.$emit("isLoading", false);
    },

    async getReport() {
      this.$emit("isLoading", true);
      try {
        const response = await apiEducationalJoiningApplication.getReport(
          this.educationalJoiningApplications.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalJoiningApplicationReportFilter");
          viewFileFromServer(response.data.reportPath);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch") + error);
      }
      this.$emit("isLoading", false);
    },
    async getStatementReport() {
      this.$emit("isLoading", true);
      try {
        const response = await apiEducationalJoiningApplication.getStatement(
          this.educationalJoiningApplications.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalJoiningApplicationReportFilter");
          viewFileFromServer(response.data.reportPath);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch") + error);
      }
      this.$emit("isLoading", false);
    },
  },
};
</script>
