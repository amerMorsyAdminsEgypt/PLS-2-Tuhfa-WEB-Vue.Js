<template>
  <div class="">
    <DashboardNavbar />
    <PreLoader v-if="isLoading" />

    <div class="app-content">
      <div class="reports-cards">
        <div
          v-if="checkPrivilege(hasKnownMethodReport())"
          class="reports-card"
          @click="openBottomSheet('knownMethodsFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/knownMethods.svg" />
            <h4>{{ $t("Reports.knownMethods") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasReligionReport())"
          class="reports-card"
          @click="openBottomSheet('ReligionsFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/religions.svg" />
            <h4>{{ $t("Reports.religions") }}</h4>
          </div>
        </div>

        <div
          v-if="checkPrivilege(hasInstallmentReport())"
          class="reports-card"
          @click="openBottomSheet('InstallmentScheduleTimesFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/installments.svg" />
            <h4>{{ $t("Reports.installmentScheduleTimes") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasQualificationReport())"
          class="reports-card"
          @click="openBottomSheet('UserQualificationsFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/UserQualifications.svg" />
            <h4>{{ $t("Reports.userQualifications") }}</h4>
          </div>
        </div>

        <!-- #region EducationalJoiningApplication -->
        <div
          v-if="checkPrivilege(hasEducationalJoiningApplicationReport())"
          @click="
            statementStatus = true;
            openBottomSheet('EducationalJoiningApplicationReportFilter');
          "
          class="reports-card"
        >
          <div class="flex">
            <img src="@/assets/images/statement.svg" />
            <h4>{{ $t("EducationalCategories.getStatement") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasEducationalJoiningApplicationReport())"
          @click="
            statementStatus = false;
            openBottomSheet('EducationalJoiningApplicationReportFilter');
          "
          class="reports-card"
        >
          <div class="flex">
            <img src="@/assets/images/EducationalJoiningApplications.svg" />
            <h4>{{ $t("Reports.EducationalJoiningApplications") }}</h4>
          </div>
        </div>
        <!-- #endregion EducationalJoiningApplication -->

        <div
          v-if="checkPrivilege(hasGroupScheduleExamReport())"
          @click="
            statementStatus = false;
            openBottomSheet('GroupScheduleExamReportFilter');
          "
          class="reports-card"
        >
          <div class="flex">
            <img src="@/assets/images/SimpleExamModels.svg" />
            <h4>{{ $t("Reports.GroupScheduleExams") }}</h4>
          </div>
        </div>

        <div
          v-if="checkPrivilege(hasComplaintReport())"
          class="reports-card"
          @click="openBottomSheet('ComplaintReportFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/complaints.svg" />
            <h4>{{ $t("Reports.complaints") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasStudentScheduleExamTimeReport())"
          class="reports-card"
          @click="openBottomSheet('StudentScheduleExamTimesReportFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/GroupScheduleExams.svg" />
            <h4>{{ $t("Reports.studentScheduleExamTimesReport") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasEducationalScheduleTimeReport())"
          class="reports-card"
          @click="openBottomSheet('EducationalScheduleTimePlaceReportFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/places.svg" />
            <h4>{{ $t("Reports.educationalScheduleTimePlaceReport") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasEducationalScheduleTimeReport())"
          class="reports-card"
          @click="openBottomSheet('EducationalScheduleTimeGroupReportFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/EducationalScheduleTimes.svg" />
            <h4>{{ $t("Reports.educationalScheduleTimeReport") }}</h4>
          </div>
        </div>

        <div
          v-if="checkPrivilege(hasEducationalScheduleTimeReport())"
          class="reports-card"
          @click="
            openBottomSheet('EducationalScheduleTimeEmployeeReportFilter')
          "
        >
          <div class="flex">
            <img src="@/assets/images/employees.svg" />
            <h4>{{ $t("Reports.educationalScheduleTimeEmployeeReport") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasEducationalScheduleTimeReport())"
          class="reports-card"
          @click="openBottomSheet('EducationalScheduleTimeStudentReportFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/students.svg" />
            <h4>{{ $t("Reports.educationalScheduleTimeStudentReport") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasEducationalScheduleTimeReport())"
          class="reports-card"
          @click="openBottomSheet('EducationalScheduleTimeReportFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/attendance.svg" />
            <h4>{{ $t("Reports.educationalScheduleTimesReport") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasEducationalScheduleTimeReport())"
          class="reports-card"
          @click="openBottomSheet('EducationalScheduleTimeNameReportFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/users.svg" />
            <h4>{{ $t("Reports.educationalScheduleTimeNamesReport") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasAccountTransactionReport())"
          class="reports-card"
          @click="openBottomSheet('AccountTransactionReportFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/accountTransactions.svg" />
            <h4>{{ $t("Reports.accountTransactionsReport") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasStudentCardIdReport())"
          class="reports-card"
          @click="openBottomSheet('StudentCardIdsReportFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/cards.svg" />
            <h4>{{ $t("Reports.studentCardIdsReport") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasMediaPackageCodeReport())"
          class="reports-card"
          @click="openBottomSheet('MediaPackageCodesFilter')"
        >
          <div class="flex">
            <img src="@/assets/images/mediaPackageCodes.svg" />
            <h4>{{ $t("Reports.mediaPackageCodes") }}</h4>
          </div>
        </div>
        <!-- 
        <div
          v-if="checkPrivilege(hasStoreItemReport())"
          class="reports-card"
          @click="openBottomSheet('StoreItemReport')"
        >
          <div class="flex">
            <img src="@/assets/images/StoreItems.svg" />
            <h4>{{ $t("Reports.StoreItemsReport") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasPriceQuotationReport())"
          class="reports-card"
          @click="openBottomSheet('PriceQuotationReport')"
        >
          <div class="flex">
            <img src="@/assets/images/PriceQuotations.svg" />
            <h4>{{ $t("Reports.PriceQuotationsReport") }}</h4>
          </div>
        </div>
        <div
          v-if="checkPrivilege(hasPriceQuotationJobOrderReport())"
          class="reports-card"
          @click="openBottomSheet('PriceQuotationJobOrderReport')"
        >
          <div class="flex">
            <img src="@/assets/images/PriceQuotationJobOrders.svg" />
            <h4>{{ $t("Reports.PriceQuotationJobOrdersReport") }}</h4>
          </div>
        </div> -->
      </div>

      <KnownMethodsFilter v-on:isLoading="isLoading = $event" />
      <ReligionsFilter v-on:isLoading="isLoading = $event" />

      <MediaPackageCodesFilter v-on:isLoading="isLoading = $event" />

      <InstallmentScheduleTimesFilter v-on:isLoading="isLoading = $event" />
      <UserQualificationsFilter v-on:isLoading="isLoading = $event" />

      <EducationalJoiningApplicationReportFilter
        :statementStatus="statementStatus"
        v-on:isLoading="isLoading = $event"
      />
      <GroupScheduleExamReportFilter v-on:isLoading="isLoading = $event" />

      <ComplaintReportFilter v-on:isLoading="isLoading = $event" />
      <StudentScheduleExamTimesReportFilter
        v-on:isLoading="isLoading = $event"
      />

      <EducationalScheduleTimePlaceReportFilter
        v-on:isLoading="isLoading = $event"
      />
      <EducationalScheduleTimeGroupReportFilter
        v-on:isLoading="isLoading = $event"
      />
      <EducationalScheduleTimeEmployeeReportFilter
        v-on:isLoading="isLoading = $event"
      />
      <EducationalScheduleTimeStudentReportFilter
        v-on:isLoading="isLoading = $event"
      />
      <EducationalScheduleTimeReportFilter
        v-on:isLoading="isLoading = $event"
      />
      <EducationalScheduleTimeNameReportFilter
        v-on:isLoading="isLoading = $event"
      />
      <AccountTransactionReportFilter v-on:isLoading="isLoading = $event" />

      <StudentCardIdsReportFilter v-on:isLoading="isLoading = $event" />

      <!-- <StoreItemReport v-on:isLoading="isLoading = $event" />
      <PriceQuotationReport v-on:isLoading="isLoading = $event" />
      <PriceQuotationJobOrderReport v-on:isLoading="isLoading = $event" /> -->
    </div>
  </div>
</template>

<script>
import DashboardNavbar from "@/layouts/components/DashboardNavbar.vue";
import PreLoader from "@/components/general/PreLoader.vue";
import KnownMethodsFilter from "./components/KnownMethodsFilter.vue";
import ReligionsFilter from "./components/ReligionsFilter.vue";
import MediaPackageCodesFilter from "./components/MediaPackageCodesFilter.vue";
import InstallmentScheduleTimesFilter from "./components/InstallmentScheduleTimesFilter.vue";
import UserQualificationsFilter from "./components/UserQualificationsFilter.vue";
import EducationalJoiningApplicationReportFilter from "./components/EducationalJoiningApplicationReportFilter.vue";
import GroupScheduleExamReportFilter from "./components/GroupScheduleExamReportFilter.vue";
import ComplaintReportFilter from "./components/ComplaintReportFilter.vue";
import StudentScheduleExamTimesReportFilter from "./components/StudentScheduleExamTimesReportFilter.vue";
import EducationalScheduleTimeGroupReportFilter from "./components/EducationalScheduleTimeGroupReportFilter.vue";
import EducationalScheduleTimePlaceReportFilter from "./components/EducationalScheduleTimePlaceReportFilter.vue";
import EducationalScheduleTimeEmployeeReportFilter from "./components/EducationalScheduleTimeEmployeeReportFilter.vue";
import EducationalScheduleTimeStudentReportFilter from "./components/EducationalScheduleTimeStudentReportFilter.vue";
import EducationalScheduleTimeReportFilter from "./components/EducationalScheduleTimeReportFilter.vue";
import EducationalScheduleTimeNameReportFilter from "./components/EducationalScheduleTimeNameReportFilter.vue";
import AccountTransactionReportFilter from "./components/AccountTransactionReportFilter.vue";
import StudentCardIdsReportFilter from "./components/StudentCardIdsReportFilter.vue";
// import StoreItemReport from "./components/StoreItemReport.vue";
// import PriceQuotationReport from "./components/PriceQuotationReport.vue";
// import PriceQuotationJobOrderReport from "./components/PriceQuotationJobOrderReport.vue";
import generalMixin from "@/utils/generalMixin";
import { checkPrivilege } from "@/utils/functions";
import {
  hasKnownMethodReport,
  hasReligionReport,
  hasInstallmentReport,
  hasQualificationReport,
  hasEducationalJoiningApplicationReport,
  hasGroupScheduleExamReport,
  hasComplaintReport,
  hasStudentScheduleExamTimeReport,
  hasEducationalScheduleTimeReport,
  hasAccountTransactionReport,
  hasStudentCardIdReport,
  hasStoreItemReport,
  hasPriceQuotationReport,
  hasPriceQuotationJobOrderReport,
  hasMediaPackageCodeReport,
} from "./../..//utils/privilegeHelper";

export default {
  components: {
    DashboardNavbar,
    PreLoader,
    KnownMethodsFilter,
    ReligionsFilter,
    MediaPackageCodesFilter,
    InstallmentScheduleTimesFilter,
    UserQualificationsFilter,
    EducationalJoiningApplicationReportFilter,
    GroupScheduleExamReportFilter,
    ComplaintReportFilter,
    StudentScheduleExamTimesReportFilter,
    EducationalScheduleTimeGroupReportFilter,
    EducationalScheduleTimePlaceReportFilter,
    EducationalScheduleTimeEmployeeReportFilter,
    EducationalScheduleTimeStudentReportFilter,
    EducationalScheduleTimeReportFilter,
    EducationalScheduleTimeNameReportFilter,
    AccountTransactionReportFilter,
    StudentCardIdsReportFilter,
    // StoreItemReport,
    // PriceQuotationReport,
    // PriceQuotationJobOrderReport,
  },
  mixins: [generalMixin],
  data() {
    return {
      statementStatus: false,
    };
  },
  methods: {
    checkPrivilege,
    hasKnownMethodReport,
    hasReligionReport,
    hasInstallmentReport,
    hasQualificationReport,
    hasEducationalJoiningApplicationReport,
    hasGroupScheduleExamReport,
    hasComplaintReport,
    hasStudentScheduleExamTimeReport,
    hasEducationalScheduleTimeReport,
    hasAccountTransactionReport,
    hasStudentCardIdReport,
    hasStoreItemReport,
    hasPriceQuotationReport,
    hasPriceQuotationJobOrderReport,
    hasMediaPackageCodeReport,
  },
  computed: {},
};
</script>
<style lang="css">
.hover {
  cursor: pointer;
}
.flex {
  display: flex;
  align-content: center;
  align-items: center;
}
</style>
