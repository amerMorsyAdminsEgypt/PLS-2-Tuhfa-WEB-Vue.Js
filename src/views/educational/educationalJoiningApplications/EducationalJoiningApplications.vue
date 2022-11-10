<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="
        updateViewType('educationalJoiningApplications', $event)
      "
      :viewType="generalSetting.educationalJoiningApplications.viewType"
      :viewTypeStatus="false"
      :activationTypeStatus="false"
      :btnAddTitle="$t('EducationalJoiningApplications.add')"
      :btnAddName="'EducationalJoiningApplicationAdd'"
      :btnAddStatus="checkPrivilege(hasEducationalJoiningApplicationAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <EducationalJoiningApplicationTabs
        :educationalJoiningApplicationsStatistics="
          educationalJoiningApplications.educationalJoiningApplicationsStatistics
        "
        :theFilterData="educationalJoiningApplications.filterData"
        v-on:search="search($event)"
        v-on:currentTabUpdated="currentTab = $event"
      />

      <template v-if="hasData">
        <EducationalJoiningApplicationTable
          v-if="
            generalSetting.educationalJoiningApplications.viewType ==
            VIEW_TYPES.table
          "
          v-on:setEducationalJoiningApplicationData="
            educationalJoiningApplications.educationalJoiningApplication.fillData(
              $event
            )
          "
          :educationalJoiningApplicationsData="
            educationalJoiningApplications.educationalJoiningApplicationsData
          "
          :defaultImg="
            educationalJoiningApplications.educationalJoiningApplication
              .defaultImg
          "
          :filterData="educationalJoiningApplications.filterData"
          :currentTab="currentTab"
          v-on:statementStatus="statementStatus = $event"
        />

        <EducationalJoiningApplicationCards
          v-else-if="
            generalSetting.educationalJoiningApplications.viewType ==
            VIEW_TYPES.cards
          "
          v-on:setEducationalJoiningApplicationData="
            educationalJoiningApplications.educationalJoiningApplication.fillData(
              $event
            )
          "
          :educationalJoiningApplicationsData="
            educationalJoiningApplications.educationalJoiningApplicationsData
          "
          :defaultImg="
            educationalJoiningApplications.educationalJoiningApplication
              .defaultImg
          "
          :filterData="educationalJoiningApplications.filterData"
        />

        <ActionsData
          :actionsData="
            educationalJoiningApplications.educationalJoiningApplication
          "
        />
        <EducationalJoiningApplicationInfo
          :educationalJoiningApplication="
            educationalJoiningApplications.educationalJoiningApplication
          "
        />
        <EducationalJoiningApplicationDelete
          :educationalJoiningApplication="
            educationalJoiningApplications.educationalJoiningApplication
          "
          v-on:refresh="getAllEducationalJoiningApplications()"
        />

        <EducationalJoiningApplicationChangeApproveAccepted
          :educationalJoiningApplication="
            educationalJoiningApplications.educationalJoiningApplication
          "
          v-on:refresh="getAllEducationalJoiningApplications()"
          v-on:isLoading="isLoading = $event"
        />
        <EducationalJoiningApplicationChangeApproveRejected
          :educationalJoiningApplication="
            educationalJoiningApplications.educationalJoiningApplication
          "
          v-on:refresh="getAllEducationalJoiningApplications()"
          v-on:isLoading="isLoading = $event"
        />
        <CustomBottomSheetQRCode
          :refName="'EducationalJoiningApplicationQRCode'"
          :code="
            educationalJoiningApplications.educationalJoiningApplication
              .fullCode
          "
          :codeTitle="$t('EducationalJoiningApplications.code')"
          :name="
            educationalJoiningApplications.educationalJoiningApplication
              .educationalJoiningApplicationNameCurrent
          "
          :nameTitle="$t('EducationalJoiningApplications.name')"
          :nameIcon="'EducationalJoiningApplications.svg'"
        />

        <EducationalJoiningApplicationReportFilter
          :token="
            educationalJoiningApplications.educationalJoiningApplication
              .educationalJoiningApplicationToken
          "
          :statementStatus="statementStatus"
          v-on:isLoading="isLoading = $event"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="educationalJoiningApplications.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <EducationalJoiningApplicationFilter
        :theFilterData="educationalJoiningApplications.filterData"
        v-on:search="search($event)"
      />

      <EducationalJoiningApplicationAdd
        :educationalJoiningApplication="
          educationalJoiningApplications.educationalJoiningApplication
        "
        v-on:refresh="getAllEducationalJoiningApplications()"
      />
      <EducationalJoiningApplicationUpdate
        :educationalJoiningApplication="
          educationalJoiningApplications.educationalJoiningApplication
        "
        v-on:refresh="getAllEducationalJoiningApplications()"
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
import EducationalJoiningApplicationAdd from "./components/EducationalJoiningApplicationAdd.vue";
import EducationalJoiningApplicationUpdate from "./components/EducationalJoiningApplicationUpdate.vue";
import EducationalJoiningApplicationTabs from "./components/EducationalJoiningApplicationTabs.vue";
import EducationalJoiningApplicationCards from "./components/EducationalJoiningApplicationCards.vue";
import EducationalJoiningApplicationTable from "./components/EducationalJoiningApplicationTable.vue";
import EducationalJoiningApplicationInfo from "./components/EducationalJoiningApplicationInfo.vue";
import EducationalJoiningApplicationDelete from "./components/EducationalJoiningApplicationDelete.vue";
import EducationalJoiningApplicationChangeApproveAccepted from "./components/EducationalJoiningApplicationChangeApproveAccepted.vue";
import EducationalJoiningApplicationChangeApproveRejected from "./components/EducationalJoiningApplicationChangeApproveRejected.vue";
import EducationalJoiningApplicationFilter from "./components/EducationalJoiningApplicationFilter.vue";
import EducationalJoiningApplicationReportFilter from "./../../reports/components/EducationalJoiningApplicationReportFilter.vue";
import EducationalJoiningApplications from "./../../../models/educational/educationalJoiningApplications/EducationalJoiningApplications";
import apiEducationalJoiningApplication from "./../../../api/educational/educationalJoiningApplications";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import { hasEducationalJoiningApplicationAdd } from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  props: {
    userStudentToken: {
      type: String,
      default: "",
    },
    educationalPeriodToken: {
      type: String,
      default: "",
    },
    educationalCategoryToken: {
      type: String,
      default: "",
    },
  },
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    EducationalJoiningApplicationAdd,
    EducationalJoiningApplicationUpdate,
    EducationalJoiningApplicationTabs,
    EducationalJoiningApplicationCards,
    EducationalJoiningApplicationTable,
    EducationalJoiningApplicationInfo,
    EducationalJoiningApplicationDelete,
    EducationalJoiningApplicationChangeApproveAccepted,
    EducationalJoiningApplicationChangeApproveRejected,
    EducationalJoiningApplicationFilter,
    EducationalJoiningApplicationReportFilter,
  },
  computed: {
    hasData() {
      return (
        this.educationalJoiningApplications.educationalJoiningApplicationsData
          .length != 0
      );
    },
  },
  data() {
    return {
      educationalJoiningApplications: new EducationalJoiningApplications(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      currentTab: "",
      statementStatus: false,
    };
  },
  methods: {
    checkPrivilege,
    hasEducationalJoiningApplicationAdd,
    changePagination(pagination) {
      this.educationalJoiningApplications.filterData.fillData(pagination);
      this.getAllEducationalJoiningApplications();
    },

    search(data) {
      this.educationalJoiningApplications.filterData.fillData(data);
      this.getAllEducationalJoiningApplications();
    },
    async getAllEducationalJoiningApplications() {
      this.isLoading = true;
      try {
        this.educationalJoiningApplications.filterData.educationalCategoryInfoDataInclude = true;
        this.educationalJoiningApplications.filterData.educationalPeriodInfoDataInclude = true;
        this.educationalJoiningApplications.filterData.priceListInfoDataInclude = true;
        this.educationalJoiningApplications.filterData.userStudentInfoDataInclude = true;
        this.educationalJoiningApplications.educationalJoiningApplicationsData =
          [];
        const response = await apiEducationalJoiningApplication.getAll(
          this.educationalJoiningApplications.filterData
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
        this.educationalJoiningApplications.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    setFilter() {
      let userStudentToken =
        this.userStudentToken || this.$route.params.userStudentToken;

      let educationalPeriodToken =
        this.educationalPeriodToken ||
        this.$route.params.educationalPeriodToken;

      let educationalCategoryToken =
        this.educationalCategoryToken ||
        this.$route.params.educationalCategoryToken;

      this.educationalJoiningApplications.filterData.userStudentToken =
        userStudentToken;

      this.educationalJoiningApplications.filterData.educationalPeriodToken =
        educationalPeriodToken;

      this.educationalJoiningApplications.filterData.educationalCategoryToken =
        educationalCategoryToken;
    },
  },
  async created() {
    await this.setFilter();
    this.getAllEducationalJoiningApplications();
  },
};
</script>
