<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('qualifications', $event)"
      :viewType="generalSetting.qualifications.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.qualifications.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Qualifications.add')"
      :btnAddName="'QualificationAdd'"
      :btnAddStatus="checkPrivilege(hasQualificationAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <QualificationTable
          v-if="generalSetting.qualifications.viewType == VIEW_TYPES.table"
          v-on:setQualificationData="
            qualifications.qualification.fillData($event)
          "
          :qualificationsData="qualifications.qualificationsData"
          :defaultImg="qualifications.qualification.defaultImg"
          :filterData="qualifications.filterData"
        />

        <QualificationCards
          v-else-if="generalSetting.qualifications.viewType == VIEW_TYPES.cards"
          v-on:setQualificationData="
            qualifications.qualification.fillData($event)
          "
          :qualificationsData="qualifications.qualificationsData"
          :defaultImg="qualifications.qualification.defaultImg"
          :filterData="qualifications.filterData"
        />

        <ActionsData :actionsData="qualifications.qualification" />
        <QualificationInfo :qualification="qualifications.qualification" />
        <QualificationDelete
          :qualification="qualifications.qualification"
          v-on:refresh="getAllQualifications()"
        />
        <QualificationChangeActivationType
          :qualification="qualifications.qualification"
          v-on:refresh="getAllQualifications()"
        />
        <CustomBottomSheetQRCode
          :refName="'QualificationQRCode'"
          :code="qualifications.qualification.fullCode"
          :codeTitle="$t('Qualifications.code')"
          :name="qualifications.qualification.qualificationNameCurrent"
          :nameTitle="$t('Qualifications.name')"
          :nameIcon="'qualifications.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="qualifications.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <QualificationFilter
        :theFilterData="qualifications.filterData"
        v-on:search="search($event)"
      />

      <QualificationAdd
        :qualification="qualifications.qualification"
        v-on:refresh="getAllQualifications()"
      />
      <QualificationUpdate
        :qualification="qualifications.qualification"
        v-on:refresh="getAllQualifications()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../../utils/constantLists";
import DashboardNavbar from "./../../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../../components/general/CustomPagination.vue";
import QualificationAdd from "./components/QualificationAdd.vue";
import QualificationUpdate from "./components/QualificationUpdate.vue";
import QualificationCards from "./components/QualificationCards.vue";
import QualificationTable from "./components/QualificationTable.vue";
import QualificationInfo from "./components/QualificationInfo.vue";
import QualificationDelete from "./components/QualificationDelete.vue";
import QualificationChangeActivationType from "./components/QualificationChangeActivationType.vue";
import QualificationFilter from "./components/QualificationFilter.vue";
import Qualifications from "./../../../../models/settings/settingsOthers/qualifications/Qualifications";
import apiQualification from "./../../../../api/settings/settingsOthers/qualifications";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasQualificationAdd,
  hasQualificationViewActive,
  hasQualificationViewArchive,
  hasQualificationViewBlocked,
} from "./../../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    QualificationAdd,
    QualificationUpdate,
    QualificationCards,
    QualificationTable,
    QualificationInfo,
    QualificationDelete,
    QualificationChangeActivationType,
    QualificationFilter,
  },
  computed: {
    hasData() {
      return this.qualifications.qualificationsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasQualificationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.qualifications.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasQualificationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.qualifications.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasQualificationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.qualifications.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      qualifications: new Qualifications(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasQualificationAdd,
    changePagination(pagination) {
      this.qualifications.filterData.fillData(pagination);
      this.getAllQualifications();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("qualifications", data);
      this.qualifications.filterData.activationTypeTokens = data;
      this.getAllQualifications();
    },
    search(data) {
      this.qualifications.filterData.fillData(data);
      this.getAllQualifications();
    },
    async getAllQualifications() {
      this.isLoading = true;
      try {
        this.qualifications.qualificationsData = [];
        const response = await apiQualification.getAll(
          this.qualifications.filterData
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
        this.qualifications.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllQualifications();
  },
};
</script>
