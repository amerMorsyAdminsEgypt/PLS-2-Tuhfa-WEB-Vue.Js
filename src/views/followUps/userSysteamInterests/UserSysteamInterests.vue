<template>
  <div class="">
    <DashboardNavbar
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.userSysteamInterests.activationTypeTokens
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
      <UserInterestsTabs :userToken="userToken" />

      <template v-if="hasData">
        <UserSysteamInterestTable
          v-on:setUserSysteamInterestData="
            userSysteamInterests.userSysteamInterest.fillData($event)
          "
          :userSysteamInterestsData="
            userSysteamInterests.userSysteamInterestsData
          "
          :defaultImg="userSysteamInterests.userSysteamInterest.defaultImg"
          :filterData="userSysteamInterests.filterData"
        />

        <ActionsData :actionsData="userSysteamInterests.userSysteamInterest" />
        <UserSysteamInterestInfo
          :userSysteamInterest="userSysteamInterests.userSysteamInterest"
        />
        <UserSysteamInterestDelete
          :userSysteamInterest="userSysteamInterests.userSysteamInterest"
          v-on:refresh="getAllUserSysteamInterests()"
        />
        <UserSysteamInterestChangeActivationType
          :userSysteamInterest="userSysteamInterests.userSysteamInterest"
          v-on:refresh="getAllUserSysteamInterests()"
        />
        <CustomBottomSheetQRCode
          :refName="'UserSysteamInterestQRCode'"
          :code="userSysteamInterests.userSysteamInterest.fullCode"
          :codeTitle="$t('UserSysteamInterests.code')"
          :name="
            userSysteamInterests.userSysteamInterest
              .userSysteamInterestNameCurrent
          "
          :nameTitle="$t('UserSysteamInterests.name')"
          :nameIcon="'UserSysteamOtherInterests.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="userSysteamInterests.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <UserSysteamInterestFilter
        :theFilterData="userSysteamInterests.filterData"
        v-on:search="search($event)"
      />

      <!-- <UserSysteamInterestAdd
        :userSysteamInterest="userSysteamInterests.userSysteamInterestModel"
        v-on:refresh="getAllUserSysteamInterests()"
      /> -->
      <!-- <UserSysteamInterestUpdate
        :userSysteamInterest="userSysteamInterests.userSysteamInterest"
        v-on:refresh="getAllUserSysteamInterests()"
      /> -->
      <FollowInterestAdd
        :followInterest="followInterestModel"
        v-on:refresh="getAllUserSysteamInterests()"
        :userToken="userToken"
      />
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
import UserInterestsTabs from "./../userInterests/components/UserInterestsTabs.vue";
// import UserSysteamInterestAdd from "./components/UserSysteamInterestAdd.vue";
// import UserSysteamInterestUpdate from "./components/UserSysteamInterestUpdate.vue";
import FollowInterestAdd from "./../followInterests/components/FollowInterestAdd.vue";
import UserSysteamInterestTable from "./components/UserSysteamInterestTable.vue";
import UserSysteamInterestInfo from "./components/UserSysteamInterestInfo.vue";
import UserSysteamInterestDelete from "./components/UserSysteamInterestDelete.vue";
import UserSysteamInterestChangeActivationType from "./components/UserSysteamInterestChangeActivationType.vue";
import UserSysteamInterestFilter from "./components/UserSysteamInterestFilter.vue";
import UserSysteamInterests from "./../../../models/followUps/userSysteamInterests/UserSysteamInterests";
import apiUserSysteamInterest from "./../../../api/followUps/userSysteamInterests";
import FollowInterestModel from "./../../../models/followUps/followInterests/FollowInterestModel";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  // hasUserSysteamInterestAdd,
  hasFollowInterestAdd,
  hasUserSysteamInterestViewActive,
  hasUserSysteamInterestViewArchive,
  hasUserSysteamInterestViewBlocked,
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
    UserInterestsTabs,
    // UserSysteamInterestAdd,
    // UserSysteamInterestUpdate,
    FollowInterestAdd,
    UserSysteamInterestTable,
    UserSysteamInterestInfo,
    UserSysteamInterestDelete,
    UserSysteamInterestChangeActivationType,
    UserSysteamInterestFilter,
  },
  props: { userToken: { type: String, default: "" } },
  computed: {
    hasData() {
      return this.userSysteamInterests.userSysteamInterestsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasUserSysteamInterestViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userSysteamInterests.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasUserSysteamInterestViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userSysteamInterests.activationStatistics.totalArchivedCount ||
          0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasUserSysteamInterestViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userSysteamInterests.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      userSysteamInterests: new UserSysteamInterests(),
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      followInterestModel: new FollowInterestModel(),
    };
  },
  methods: {
    checkPrivilege,
    // hasUserSysteamInterestAdd,
    hasFollowInterestAdd,
    changePagination(pagination) {
      this.userSysteamInterests.filterData.fillData(pagination);
      this.getAllUserSysteamInterests();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("userSysteamInterests", data);
      this.userSysteamInterests.filterData.activationTypeTokens = data;
      this.getAllUserSysteamInterests();
    },
    search(data) {
      this.userSysteamInterests.filterData.fillData(data);
      this.getAllUserSysteamInterests();
    },
    async getAllUserSysteamInterests() {
      this.isLoading = true;
      try {
        this.userSysteamInterests.userSysteamInterestsData = [];
        const response = await apiUserSysteamInterest.getAll(
          this.userSysteamInterests.filterData
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
        this.userSysteamInterests.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.userSysteamInterests.filterData.userToken = this.userToken;
    this.getAllUserSysteamInterests();
  },
};
</script>
