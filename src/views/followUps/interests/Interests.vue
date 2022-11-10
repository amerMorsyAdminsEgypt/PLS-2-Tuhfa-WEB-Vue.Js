<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('interests', $event)"
      :viewType="generalSetting.interests.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.interests.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Interests.add')"
      :btnAddName="'InterestAdd'"
      :btnAddStatus="checkPrivilege(hasInterestAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <InterestTable
          v-if="generalSetting.interests.viewType == VIEW_TYPES.table"
          v-on:setInterestData="interests.interest.fillData($event)"
          :interestsData="interests.interestsData"
          :defaultImg="interests.interest.defaultImg"
          :filterData="interests.filterData"
        />

        <InterestCards
          v-else-if="generalSetting.interests.viewType == VIEW_TYPES.cards"
          v-on:setInterestData="interests.interest.fillData($event)"
          :interestsData="interests.interestsData"
          :defaultImg="interests.interest.defaultImg"
          :filterData="interests.filterData"
        />

        <ActionsData :actionsData="interests.interest" />
        <InterestInfo :interest="interests.interest" />
        <InterestDelete
          :interest="interests.interest"
          v-on:refresh="getAllInterests()"
        />
        <InterestChangeActivationType
          :interest="interests.interest"
          v-on:refresh="getAllInterests()"
        />
        <CustomBottomSheetQRCode
          :refName="'InterestQRCode'"
          :code="interests.interest.fullCode"
          :codeTitle="$t('Interests.code')"
          :name="interests.interest.interestTitleCurrent"
          :nameTitle="$t('Interests.title')"
          :nameIcon="'interests.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="interests.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <InterestFilter
        :theFilterData="interests.filterData"
        v-on:search="search($event)"
      />

      <InterestAdd
        :interest="interests.interest"
        v-on:refresh="getAllInterests()"
      />
      <InterestUpdate
        :interest="interests.interest"
        v-on:refresh="getAllInterests()"
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
import InterestAdd from "./components/InterestAdd.vue";
import InterestUpdate from "./components/InterestUpdate.vue";
import InterestCards from "./components/InterestCards.vue";
import InterestTable from "./components/InterestTable.vue";
import InterestInfo from "./components/InterestInfo.vue";
import InterestDelete from "./components/InterestDelete.vue";
import InterestChangeActivationType from "./components/InterestChangeActivationType.vue";
import InterestFilter from "./components/InterestFilter.vue";
import Interests from "./../../../models/followUps/interests/Interests";
import apiInterest from "./../../../api/followUps/interests";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasInterestAdd,
  hasInterestViewActive,
  hasInterestViewArchive,
  hasInterestViewBlocked,
} from "./../../../utils/privilegeHelper";
import InterestFollowUps from "./../../../models/followUps/interestFollowUps/InterestFollowUps";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    InterestAdd,
    InterestUpdate,
    InterestCards,
    InterestTable,
    InterestInfo,
    InterestDelete,
    InterestChangeActivationType,
    InterestFilter,
  },
  computed: {
    hasData() {
      return this.interests.interestsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasInterestViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.interests.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasInterestViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.interests.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasInterestViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.interests.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      interests: new Interests(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      interestFollowUps: new InterestFollowUps(),
    };
  },
  methods: {
    checkPrivilege,
    hasInterestAdd,
    changePagination(pagination) {
      this.interests.filterData.fillData(pagination);
      this.getAllInterests();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("interests", data);
      this.interests.filterData.activationTypeTokens = data;
      this.getAllInterests();
    },
    search(data) {
      this.interests.filterData.fillData(data);
      this.getAllInterests();
    },
    async getAllInterests() {
      this.isLoading = true;
      try {
        this.interests.interestsData = [];
        const response = await apiInterest.getAll(this.interests.filterData);
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
        this.interests.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllInterests();
  },
};
</script>
