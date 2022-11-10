<template>
  <div class="">
    <DashboardNavbar
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.followInterests.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('FollowInterests.add')"
      :btnAddName="'FollowInterestAdd'"
      :btnAddStatus="checkPrivilege(hasFollowInterestAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <FollowInterestTable
          v-on:setFollowInterestData="
            followInterests.followInterest.fillData($event)
          "
          :followInterestsData="followInterests.followInterestsData"
          :defaultImg="followInterests.followInterest.defaultImg"
          :filterData="followInterests.filterData"
        />

        <ActionsData :actionsData="followInterests.followInterest" />
        <FollowInterestInfo :followInterest="followInterests.followInterest" />
        <FollowInterestDelete
          :followInterest="followInterests.followInterest"
          v-on:refresh="getAllFollowInterests()"
        />
        <FollowInterestChangeActivationType
          :followInterest="followInterests.followInterest"
          v-on:refresh="getAllFollowInterests()"
        />
        <CustomBottomSheetQRCode
          :refName="'FollowInterestQRCode'"
          :code="followInterests.followInterest.fullCode"
          :codeTitle="$t('FollowInterests.code')"
          :name="followInterests.followInterest.followInterestNameCurrent"
          :nameTitle="$t('FollowInterests.name')"
          :nameIcon="'followInterests.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="followInterests.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <FollowInterestFilter
        :theFilterData="followInterests.filterData"
        v-on:search="search($event)"
      />

      <FollowInterestAdd
        :followInterest="followInterests.followInterestModel"
        v-on:refresh="getAllFollowInterests()"
        :userToken="userToken"
      />
      <!-- <FollowInterestUpdate
        :followInterest="followInterests.followInterest"
        v-on:refresh="getAllFollowInterests()"
      /> -->
    </div>
  </div>
</template>

<script>
import { STATUS } from "./../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../utils/constantLists";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import FollowInterestAdd from "./components/FollowInterestAdd.vue";
// import FollowInterestUpdate from "./components/FollowInterestUpdate.vue";
import FollowInterestTable from "./components/FollowInterestTable.vue";
import FollowInterestInfo from "./components/FollowInterestInfo.vue";
import FollowInterestDelete from "./components/FollowInterestDelete.vue";
import FollowInterestChangeActivationType from "./components/FollowInterestChangeActivationType.vue";
import FollowInterestFilter from "./components/FollowInterestFilter.vue";
import FollowInterests from "./../../../models/followUps/followInterests/FollowInterests";
import apiFollowInterest from "./../../../api/followUps/followInterests";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasFollowInterestAdd,
  hasFollowInterestViewActive,
  hasFollowInterestViewArchive,
  hasFollowInterestViewBlocked,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    FollowInterestAdd,
    // FollowInterestUpdate,
    FollowInterestTable,
    FollowInterestInfo,
    FollowInterestDelete,
    FollowInterestChangeActivationType,
    FollowInterestFilter,
  },
  props: {
    userToken: { type: String, default: "" },
    userSysteamInterestToken: { type: String, default: "" },
    userOtherInterestToken: { type: String, default: "" },
  },
  computed: {
    hasData() {
      return this.followInterests.followInterestsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasFollowInterestViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.followInterests.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasFollowInterestViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.followInterests.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasFollowInterestViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.followInterests.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      followInterests: new FollowInterests(),
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasFollowInterestAdd,
    changePagination(pagination) {
      this.followInterests.filterData.fillData(pagination);
      this.getAllFollowInterests();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("followInterests", data);
      this.followInterests.filterData.activationTypeTokens = data;
      this.getAllFollowInterests();
    },
    search(data) {
      this.followInterests.filterData.fillData(data);
      this.getAllFollowInterests();
    },
    async getAllFollowInterests() {
      this.isLoading = true;
      try {
        this.followInterests.followInterestsData = [];
        const response = await apiFollowInterest.getAll(
          this.followInterests.filterData
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
        this.followInterests.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.followInterests.filterData.userToken = this.userToken;
    this.followInterests.filterData.userSysteamInterestToken =
      this.userSysteamInterestToken;
    this.followInterests.filterData.userOtherInterestToken =
      this.userOtherInterestToken;
    this.getAllFollowInterests();
  },
};
</script>
