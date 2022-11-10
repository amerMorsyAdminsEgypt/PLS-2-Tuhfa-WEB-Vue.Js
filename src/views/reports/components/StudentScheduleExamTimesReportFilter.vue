<template>
  <CustomBottomSheet
    :refName="'StudentScheduleExamTimesReportFilter'"
    size="xl"
    :headerText="$t('Reports.studentScheduleExamTimesReport')"
    :headerIcon="icon"
    @opened="getDialogs"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`studentUserToken`"
        :value="users.filterData.studentUserToken"
        :options="userTokenOptions"
        v-on:changeValue="
          users.filterData.studentUserToken = $event;
          getEducationalGroupsDialog();
          getEducationalJoiningApplicationsDialog();
        "
        :title="$t('students.select')"
        :imgName="'students.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`educationalGroupToken`"
        :value="users.filterData.educationalGroupToken"
        :options="educationalGroupTokenOptions"
        v-on:changeValue="users.filterData.educationalGroupToken = $event"
        :title="$t('EducationalGroups.select')"
        :imgName="'EducationalGroups.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`educationalJoiningApplicationToken`"
        :value="users.filterData.educationalJoiningApplicationToken"
        :options="educationalJoiningApplicationTokenOptions"
        v-on:changeValue="
          users.filterData.educationalJoiningApplicationToken = $event
        "
        :title="$t('EducationalJoiningApplications.select')"
        :imgName="'EducationalJoiningApplications.svg'"
      />

      <CustomInput
        :className="'col-md-12'"
        :id="`sendTo`"
        :value="users.filterData.sendTo"
        v-on:changeValue="users.filterData.sendTo = $event"
        :title="$t('Reports.sendTo')"
        :imgName="'email.svg'"
      />
    </div>

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="getReport">
        <img
          src="@/assets/images/check-icon.svg"
          :title="$t('Reports.print')"
        />
      </div>
      <div
        @click.prevent="
          closeBottomSheet('StudentScheduleExamTimesReportFilter')
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
import icon from "@/assets/images/StudentScheduleExamTimes.svg";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import generalMixin from "@/utils/generalMixin";
import { STATUS } from "@/utils/constants";
import Users from "@/models/users/Users";
import apiUser from "@/api/user";
import { getLanguage, viewFileFromServer } from "@/utils/functions";
import {
  getUsersDialog,
  getEducationalGroupsDialog,
  getEducationalJoiningApplicationsDialog,
} from "@/utils/dialogsOfApi";
import { USER_TYPE } from "@/utils/constantLists";

export default {
  mixins: [generalMixin],
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
      users: new Users("students"),
      icon,
      userTokenOptions: [],
      educationalGroupTokenOptions: [],
      educationalJoiningApplicationTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomInput,
  },
  props: {
    studentUserToken: {
      type: String,
      default: "",
    },
  },
  methods: {
    async getDialogs() {
      this.users.setInitialValue("students");
      if (this.studentUserToken) {
        this.users.filterData.studentUserToken = this.studentUserToken;
      }
      this.getStudentsDialog();
      this.getEducationalGroupsDialog();
      this.getEducationalJoiningApplicationsDialog();
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
    async getEducationalGroupsDialog() {
      this.$emit("isLoading", true);
      let params = {
        studentUserToken: this.users.filterData.studentUserToken,
      };
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog(
        params
      );
      this.$emit("isLoading", false);
    },
    async getEducationalJoiningApplicationsDialog() {
      this.$emit("isLoading", true);
      let params = {
        userStudentToken: this.users.filterData.studentUserToken,
      };
      this.educationalJoiningApplicationTokenOptions =
        await getEducationalJoiningApplicationsDialog(params);
      this.$emit("isLoading", false);
    },

    async getReport() {
      this.$emit("isLoading", true);
      this.users.filterData.userTypeToken = USER_TYPE.Student;
      try {
        const response = await apiUser.getReport(this.users.filterData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("StudentScheduleExamTimesReportFilter");
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
