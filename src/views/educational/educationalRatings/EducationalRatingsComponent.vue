<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('educationalRatings', $event)"
      :viewType="generalSetting.educationalRatings.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.educationalRatings.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('EducationalRatings.add')"
      :btnAddName="'EducationalRatingAdd'"
      :btnAddStatus="checkPrivilege(hasEducationalRatingAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <EducationalRatingTable
          v-if="generalSetting.educationalRatings.viewType == VIEW_TYPES.table"
          v-on:setEducationalRatingData="
            educationalRatings.educationalRating.fillData($event)
          "
          :educationalRatingsData="educationalRatings.educationalRatingsData"
          :defaultImg="educationalRatings.educationalRating.defaultImg"
          :filterData="educationalRatings.filterData"
        />

        <EducationalRatingCards
          v-else-if="
            generalSetting.educationalRatings.viewType == VIEW_TYPES.cards
          "
          v-on:setEducationalRatingData="
            educationalRatings.educationalRating.fillData($event)
          "
          :educationalRatingsData="educationalRatings.educationalRatingsData"
          :defaultImg="educationalRatings.educationalRating.defaultImg"
          :filterData="educationalRatings.filterData"
        />

        <ActionsData :actionsData="educationalRatings.educationalRating" />
        <EducationalRatingInfo
          :educationalRating="educationalRatings.educationalRating"
        />
        <EducationalRatingDelete
          :educationalRating="educationalRatings.educationalRating"
          v-on:refresh="getAllEducationalRatings()"
        />
        <EducationalRatingChangeActivationType
          :educationalRating="educationalRatings.educationalRating"
          v-on:refresh="getAllEducationalRatings()"
        />
        <CustomBottomSheetQRCode
          :refName="'EducationalRatingQRCode'"
          :code="educationalRatings.educationalRating.fullCode"
          :codeTitle="$t('EducationalRatings.code')"
          :name="
            educationalRatings.educationalRating.educationalRatingNameCurrent
          "
          :nameTitle="$t('EducationalRatings.title')"
          :nameIcon="'educationalRatings.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="educationalRatings.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <EducationalRatingFilter
        :theFilterData="educationalRatings.filterData"
        v-on:search="search($event)"
      />

      <EducationalRatingAdd
        :educationalRating="educationalRatings.educationalRating"
        :filterData="educationalRatings.filterData"
        v-on:refresh="getAllEducationalRatings()"
      />
      <EducationalRatingUpdate
        :educationalRating="educationalRatings.educationalRating"
        v-on:refresh="getAllEducationalRatings()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../utils/constantLists";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import EducationalRatingAdd from "./components/EducationalRatingAdd.vue";
import EducationalRatingUpdate from "./components/EducationalRatingUpdate.vue";
import EducationalRatingCards from "./components/EducationalRatingCards.vue";
import EducationalRatingTable from "./components/EducationalRatingTable.vue";
import EducationalRatingInfo from "./components/EducationalRatingInfo.vue";
import EducationalRatingDelete from "./components/EducationalRatingDelete.vue";
import EducationalRatingChangeActivationType from "./components/EducationalRatingChangeActivationType.vue";
import EducationalRatingFilter from "./components/EducationalRatingFilter.vue";
import EducationalRatings from "./../../../models/educational/educationalRatings/EducationalRatings";
import apiEducationalRating from "./../../../api/educational/educationalRatings";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasEducationalRatingAdd,
  hasEducationalRatingViewActive,
  hasEducationalRatingViewArchive,
  hasEducationalRatingViewBlocked,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  props: [
    "educationalCategoryToken",
    "educationalGroupToken",
    "educationalScheduleTimeToken",
  ],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    EducationalRatingAdd,
    EducationalRatingUpdate,
    EducationalRatingCards,
    EducationalRatingTable,
    EducationalRatingInfo,
    EducationalRatingDelete,
    EducationalRatingChangeActivationType,
    EducationalRatingFilter,
  },
  computed: {
    hasData() {
      return this.educationalRatings.educationalRatingsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasEducationalRatingViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.educationalRatings.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEducationalRatingViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.educationalRatings.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEducationalRatingViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.educationalRatings.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      educationalRatings: new EducationalRatings(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasEducationalRatingAdd,
    changePagination(pagination) {
      this.educationalRatings.filterData.fillData(pagination);
      this.getAllEducationalRatings();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("educationalRatings", data);
      this.educationalRatings.filterData.activationTypeTokens = data;
      this.getAllEducationalRatings();
    },
    search(data) {
      this.educationalRatings.filterData.fillData(data);
      this.getAllEducationalRatings();
    },
    async getAllEducationalRatings() {
      this.isLoading = true;
      try {
        this.educationalRatings.educationalRatingsData = [];
        const response = await apiEducationalRating.getAll(
          this.educationalRatings.filterData
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
        this.educationalRatings.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    setFilter() {
      this.educationalRatings.filterData.educationalRatingTypeToken =
        this.$route.meta.educationalRatingTypeToken;

      let educationalCategoryToken = "";
      let educationalGroupToken = "";
      let educationalScheduleTimeToken = "";

      if (this.educationalCategoryToken) {
        educationalCategoryToken = this.educationalCategoryToken;
      } else {
        educationalCategoryToken = this.$route.params.educationalCategoryToken;
      }
      if (this.educationalGroupToken) {
        educationalGroupToken = this.educationalGroupToken;
      } else {
        educationalGroupToken = this.$route.params.educationalGroupToken;
      }
      if (this.educationalScheduleTimeToken) {
        educationalScheduleTimeToken = this.educationalScheduleTimeToken;
      } else {
        educationalScheduleTimeToken =
          this.$route.params.educationalScheduleTimeToken;
      }
      this.educationalRatings.filterData.educationalCategoryToken =
        educationalCategoryToken;
      this.educationalRatings.filterData.educationalGroupToken =
        educationalGroupToken;
      this.educationalRatings.filterData.educationalScheduleTimeToken =
        educationalScheduleTimeToken;
    },
  },
  async created() {
    await this.setFilter();
    this.getAllEducationalRatings();
  },
};
</script>
