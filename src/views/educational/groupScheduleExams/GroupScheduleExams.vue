<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('groupScheduleExams', $event)"
      :viewType="generalSetting.groupScheduleExams.viewType"
      :viewTypeStatus="true"
      :activationTypeStatus="false"
      :btnAddTitle="$t('GroupScheduleExams.add')"
      :btnAddName="'GroupScheduleExamAdd'"
      :btnAddStatus="checkPrivilege(hasGroupScheduleExamAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <GroupScheduleExamTable
          v-if="generalSetting.groupScheduleExams.viewType == VIEW_TYPES.table"
          v-on:setGroupScheduleExamData="
            groupScheduleExams.groupScheduleExam.fillData($event);
            groupScheduleExams.groupScheduleExamReport.fillData($event);
          "
          :groupScheduleExamsData="groupScheduleExams.groupScheduleExamsData"
          :defaultImg="groupScheduleExams.groupScheduleExam.defaultImg"
          :filterData="groupScheduleExams.filterData"
        />

        <GroupScheduleExamCards
          v-else-if="
            generalSetting.groupScheduleExams.viewType == VIEW_TYPES.cards
          "
          v-on:setGroupScheduleExamData="
            groupScheduleExams.groupScheduleExam.fillData($event);
            groupScheduleExams.groupScheduleExamReport.fillData($event);
          "
          :groupScheduleExamsData="groupScheduleExams.groupScheduleExamsData"
          :defaultImg="groupScheduleExams.groupScheduleExam.defaultImg"
          :filterData="groupScheduleExams.filterData"
        />

        <ActionsData :actionsData="groupScheduleExams.groupScheduleExam" />
        <!-- <GroupScheduleExamReport
          :groupScheduleExam="groupScheduleExams.groupScheduleExamReport"
        /> -->
        <GroupScheduleExamReportFilter
          :token="groupScheduleExams.groupScheduleExamReport.token"
          v-on:isLoading="isLoading = $event"
        />

        <GroupScheduleExamInfo
          :groupScheduleExam="groupScheduleExams.groupScheduleExam"
        />
        <GroupScheduleExamDelete
          :groupScheduleExam="groupScheduleExams.groupScheduleExam"
          v-on:refresh="getAllGroupScheduleExams()"
        />
        <CustomBottomSheetQRCode
          :refName="'GroupScheduleExamQRCode'"
          :code="groupScheduleExams.groupScheduleExam.fullCode"
          :codeTitle="$t('GroupScheduleExams.code')"
          :name="
            groupScheduleExams.groupScheduleExam.simpleExamModelInfoData
              .simpleExamModelTitleCurrent
          "
          :nameTitle="$t('GroupScheduleExams.name')"
          :nameIcon="'GroupScheduleExams.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="groupScheduleExams.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <GroupScheduleExamFilter
        :theFilterData="groupScheduleExams.filterData"
        v-on:search="search($event)"
      />

      <GroupScheduleExamAdd
        :groupScheduleExam="groupScheduleExams.groupScheduleExam"
        v-on:refresh="getAllGroupScheduleExams()"
      />
      <GroupScheduleExamUpdate
        :groupScheduleExam="groupScheduleExams.groupScheduleExam"
        v-on:refresh="getAllGroupScheduleExams()"
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
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import GroupScheduleExamAdd from "./components/GroupScheduleExamAdd.vue";
import GroupScheduleExamUpdate from "./components/GroupScheduleExamUpdate.vue";
import GroupScheduleExamCards from "./components/GroupScheduleExamCards.vue";
import GroupScheduleExamTable from "./components/GroupScheduleExamTable.vue";
// import GroupScheduleExamReport from "./components/GroupScheduleExamReport.vue";
import GroupScheduleExamReportFilter from "./../../reports/components/GroupScheduleExamReportFilter.vue";
import GroupScheduleExamInfo from "./components/GroupScheduleExamInfo.vue";
import GroupScheduleExamDelete from "./components/GroupScheduleExamDelete.vue";
import GroupScheduleExamFilter from "./components/GroupScheduleExamFilter.vue";
import GroupScheduleExams from "./../../../models/educational/groupScheduleExams/GroupScheduleExams";
import apiGroupScheduleExam from "./../../../api/educational/groupScheduleExams";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import { hasGroupScheduleExamAdd } from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    GroupScheduleExamAdd,
    GroupScheduleExamUpdate,
    GroupScheduleExamCards,
    GroupScheduleExamTable,
    // GroupScheduleExamReport,
    GroupScheduleExamReportFilter,
    GroupScheduleExamInfo,
    GroupScheduleExamDelete,
    GroupScheduleExamFilter,
  },
  computed: {
    hasData() {
      return this.groupScheduleExams.groupScheduleExamsData.length != 0;
    },
  },
  data() {
    return {
      groupScheduleExams: new GroupScheduleExams(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      educationalGroupToken: this.$route.params.educationalGroupToken,
    };
  },
  methods: {
    checkPrivilege,
    hasGroupScheduleExamAdd,
    changePagination(pagination) {
      this.groupScheduleExams.filterData.fillData(pagination);
      this.getAllGroupScheduleExams();
    },
    search(data) {
      this.groupScheduleExams.filterData.fillData(data);
      this.getAllGroupScheduleExams();
    },
    async getAllGroupScheduleExams() {
      this.isLoading = true;
      try {
        this.groupScheduleExams.filterData.educationalGroupInfoDataInclude = true;
        this.groupScheduleExams.filterData.simpleExamModelInfoDataInclude = true;
        this.groupScheduleExams.filterData.educationalCategoryInfoDataInclude = true;
        this.groupScheduleExams.groupScheduleExamsData = [];
        const response = await apiGroupScheduleExam.getAll(
          this.groupScheduleExams.filterData
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
        this.groupScheduleExams.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.groupScheduleExams.filterData.educationalGroupToken =
      this.educationalGroupToken;
    this.getAllGroupScheduleExams();
  },
};
</script>
