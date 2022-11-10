<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('interestFollowUps', $event)"
      :viewType="generalSetting.interestFollowUps.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.interestFollowUps.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('InterestFollowUps.add')"
      :btnAddName="'InterestFollowUpAdd'"
      :btnAddStatus="checkPrivilege(hasInterestFollowUpAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="interestData">
        <div class="statistics">
          <b-button v-b-toggle.interestData class="btn btn-lg btn-collapse">
            {{ $t("Interests.data") }}
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </b-button>
          <b-collapse id="interestData">
            <div class="row my-card">
              <InterestTable
                :showActions="false"
                :interestsData="[interestData]"
                :defaultImg="interests.interest.defaultImg"
                :filterData="interests.filterData"
              />
            </div>
          </b-collapse>
        </div>
      </template>
      <template v-if="hasData">
        <InterestFollowUpTable
          v-if="generalSetting.interestFollowUps.viewType == VIEW_TYPES.table"
          v-on:setInterestFollowUpData="
            interestFollowUps.interestFollowUp.fillData($event)
          "
          :interestFollowUpsData="interestFollowUps.interestFollowUpsData"
          :defaultImg="interestFollowUps.interestFollowUp.defaultImg"
          :filterData="interestFollowUps.filterData"
        />

        <InterestFollowUpCards
          v-else-if="
            generalSetting.interestFollowUps.viewType == VIEW_TYPES.cards
          "
          v-on:setInterestFollowUpData="
            interestFollowUps.interestFollowUp.fillData($event)
          "
          :interestFollowUpsData="interestFollowUps.interestFollowUpsData"
          :defaultImg="interestFollowUps.interestFollowUp.defaultImg"
          :filterData="interestFollowUps.filterData"
        />

        <ActionsData :actionsData="interestFollowUps.interestFollowUp" />
        <InterestFollowUpInfo
          :interestFollowUp="interestFollowUps.interestFollowUp"
        />
        <InterestFollowUpDelete
          :interestFollowUp="interestFollowUps.interestFollowUp"
          v-on:refresh="getAllInterestFollowUps()"
        />
        <InterestFollowUpChangeActivationType
          :interestFollowUp="interestFollowUps.interestFollowUp"
          v-on:refresh="getAllInterestFollowUps()"
        />
        <CustomBottomSheetQRCode
          :refName="'InterestFollowUpQRCode'"
          :code="interestFollowUps.interestFollowUp.fullCode"
          :codeTitle="$t('InterestFollowUps.code')"
          :name="
            interestFollowUps.interestFollowUp.interestFollowUpTitleCurrent
          "
          :nameTitle="$t('InterestFollowUps.title')"
          :nameIcon="'interestFollowUps.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="interestFollowUps.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <InterestFollowUpFilter
        :theFilterData="interestFollowUps.filterData"
        v-on:search="search($event)"
      />

      <InterestFollowUpAdd
        :interestFollowUp="interestFollowUps.interestFollowUp"
        v-on:refresh="getAllInterestFollowUps()"
      />
      <InterestFollowUpUpdate
        :interestFollowUp="interestFollowUps.interestFollowUp"
        v-on:refresh="getAllInterestFollowUps()"
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
import InterestFollowUpAdd from "./components/InterestFollowUpAdd.vue";
import InterestFollowUpUpdate from "./components/InterestFollowUpUpdate.vue";
import InterestFollowUpCards from "./components/InterestFollowUpCards.vue";
import InterestFollowUpTable from "./components/InterestFollowUpTable.vue";
import InterestFollowUpInfo from "./components/InterestFollowUpInfo.vue";
import InterestFollowUpDelete from "./components/InterestFollowUpDelete.vue";
import InterestFollowUpChangeActivationType from "./components/InterestFollowUpChangeActivationType.vue";
import InterestFollowUpFilter from "./components/InterestFollowUpFilter.vue";
import InterestFollowUps from "./../../../models/followUps/interestFollowUps/InterestFollowUps";
import apiInterestFollowUp from "./../../../api/followUps/interestFollowUps";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import { FOLLOW_UP_TYPE_TOKENS } from "./../../../utils/constantLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasInterestFollowUpAdd,
  hasInterestFollowUpViewActive,
  hasInterestFollowUpViewArchive,
  hasInterestFollowUpViewBlocked,
} from "./../../../utils/privilegeHelper";
import apiInterest from "./../../../api/followUps/interests";
import Interests from "./../../../models/followUps/interests/Interests";
import InterestTable from "./../../../views/followUps/interests/components/InterestTable.vue";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    InterestFollowUpAdd,
    InterestFollowUpUpdate,
    InterestFollowUpCards,
    InterestFollowUpTable,
    InterestFollowUpInfo,
    InterestFollowUpDelete,
    InterestFollowUpChangeActivationType,
    InterestFollowUpFilter,
    InterestTable,
  },
  computed: {
    hasData() {
      return this.interestFollowUps.interestFollowUpsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasInterestFollowUpViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.interestFollowUps.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasInterestFollowUpViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.interestFollowUps.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasInterestFollowUpViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.interestFollowUps.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      interestFollowUps: new InterestFollowUps(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      interests: new Interests(),
      interestData: {},
    };
  },
  props: {
    interestToken: {
      type: String,
      default: "",
    },
    mainToken: {
      type: String,
      default: "",
    },
    followUpTypeToken: {
      type: String,
      default: "",
    },
  },
  methods: {
    checkPrivilege,
    hasInterestFollowUpAdd,
    changePagination(pagination) {
      this.interestFollowUps.filterData.fillData(pagination);
      this.getAllInterestFollowUps();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("interestFollowUps", data);
      this.interestFollowUps.filterData.activationTypeTokens = data;
      this.getAllInterestFollowUps();
    },
    search(data) {
      this.interestFollowUps.filterData.fillData(data);
      this.getAllInterestFollowUps();
    },
    async getAllInterestFollowUps() {
      this.isLoading = true;
      try {
        this.interestFollowUps.interestFollowUpsData = [];
        const response = await apiInterestFollowUp.getAll(
          this.interestFollowUps.filterData
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
        this.interestFollowUps.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async getInterestDetails() {
      this.isLoading = true;
      let token = this.interestToken || this.$route.params.interestToken;
      if (token) {
        try {
          this.interestData = {};
          this.interests.filterData.token = token;
          const response = await apiInterest.getDetails(
            this.interests.filterData
          );
          if (response.data.status == STATUS.SUCCESS) {
            this.exceptionMsg = null;
            this.interestData = response.data.interest;
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
        } catch (error) {
          this.exceptionMsg = this.$t("errorCatch");
          this.exceptionImg = null;
        }
      } else {
        this.$router.push({ name: "Interests" }).catch(() => {});
      }
      this.isLoading = false;
    },
    async setFilter() {
      let mainToken = this.mainToken || this.$route.params.mainToken;
      let followUpTypeToken =
        this.followUpTypeToken || this.$route.params.followUpTypeToken;

      if (mainToken && followUpTypeToken) {
        switch (followUpTypeToken) {
          case FOLLOW_UP_TYPE_TOKENS.EducationalCategoryInterest:
            this.interestFollowUps.filterData.educationalCategoryInterestToken =
              mainToken;
            break;
          case FOLLOW_UP_TYPE_TOKENS.EducationalCategoryOtherInterest:
            this.interestFollowUps.filterData.educationalCategoryOtherInterestToken =
              mainToken;
            break;
          default:
            break;
        }
      } else {
        this.$router.push({ name: "Interests" }).catch(() => {});
      }
    },
    async setInterstModelIntial() {
      this.interestFollowUps.interestFollowUp.mainToken = this.mainToken;
      this.interestFollowUps.interestFollowUp.followUpTypeToken =
        this.followUpTypeToken;
    },
  },
  async created() {
    await this.getInterestDetails();
    await this.setFilter();
    await this.setInterstModelIntial();
    this.getAllInterestFollowUps();
  },
};
</script>
