<template>
  <div class="">
    <DashboardNavbar
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.userOtherInterests.activationTypeTokens
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
        <UserOtherInterestTable
          v-on:setUserOtherInterestData="
            userOtherInterests.userOtherInterest.fillData($event)
          "
          :userOtherInterestsData="userOtherInterests.userOtherInterestsData"
          :defaultImg="userOtherInterests.userOtherInterest.defaultImg"
          :filterData="userOtherInterests.filterData"
        />

        <ActionsData :actionsData="userOtherInterests.userOtherInterest" />
        <UserOtherInterestInfo
          :userOtherInterest="userOtherInterests.userOtherInterest"
        />
        <UserOtherInterestDelete
          :userOtherInterest="userOtherInterests.userOtherInterest"
          v-on:refresh="getAllUserOtherInterests()"
        />
        <UserOtherInterestChangeActivationType
          :userOtherInterest="userOtherInterests.userOtherInterest"
          v-on:refresh="getAllUserOtherInterests()"
        />
        <CustomBottomSheetQRCode
          :refName="'UserOtherInterestQRCode'"
          :code="userOtherInterests.userOtherInterest.fullCode"
          :codeTitle="$t('UserOtherInterests.code')"
          :name="
            userOtherInterests.userOtherInterest.userOtherInterestNameCurrent
          "
          :nameTitle="$t('UserOtherInterests.name')"
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
        :paginationData="userOtherInterests.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <UserOtherInterestFilter
        :theFilterData="userOtherInterests.filterData"
        v-on:search="search($event)"
      />

      <!-- <UserOtherInterestAdd
        :userOtherInterest="userOtherInterests.userOtherInterestModel"
        v-on:refresh="getAllUserOtherInterests()"
      /> -->
      <!-- <UserOtherInterestUpdate
        :userOtherInterest="userOtherInterests.userOtherInterest"
        v-on:refresh="getAllUserOtherInterests()"
      /> -->
      <FollowInterestAdd
        :followInterest="followInterestModel"
        v-on:refresh="getAllUserOtherInterests()"
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
// import UserOtherInterestAdd from "./components/UserOtherInterestAdd.vue";
// import UserOtherInterestUpdate from "./components/UserOtherInterestUpdate.vue";
import FollowInterestAdd from "./../followInterests/components/FollowInterestAdd.vue";
import UserOtherInterestTable from "./components/UserOtherInterestTable.vue";
import UserOtherInterestInfo from "./components/UserOtherInterestInfo.vue";
import UserOtherInterestDelete from "./components/UserOtherInterestDelete.vue";
import UserOtherInterestChangeActivationType from "./components/UserOtherInterestChangeActivationType.vue";
import UserOtherInterestFilter from "./components/UserOtherInterestFilter.vue";
import UserOtherInterests from "./../../../models/followUps/userOtherInterests/UserOtherInterests";
import apiUserOtherInterest from "./../../../api/followUps/userOtherInterests";
import FollowInterestModel from "./../../../models/followUps/followInterests/FollowInterestModel";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  // hasUserSysteamInterestAdd,
  hasFollowInterestAdd,
  hasUserOtherInterestViewActive,
  hasUserOtherInterestViewArchive,
  hasUserOtherInterestViewBlocked,
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
    // UserOtherInterestAdd,
    // UserOtherInterestUpdate,
    FollowInterestAdd,
    UserOtherInterestTable,
    UserOtherInterestInfo,
    UserOtherInterestDelete,
    UserOtherInterestChangeActivationType,
    UserOtherInterestFilter,
  },
  props: { userToken: { type: String, default: "" } },
  computed: {
    hasData() {
      return this.userOtherInterests.userOtherInterestsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasUserOtherInterestViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userOtherInterests.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasUserOtherInterestViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userOtherInterests.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasUserOtherInterestViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userOtherInterests.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      userOtherInterests: new UserOtherInterests(),
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      followInterestModel: new FollowInterestModel(),
    };
  },
  methods: {
    checkPrivilege,
    // hasUserSysteamInterestAdd,
    hasFollowInterestAdd,
    changePagination(pagination) {
      this.userOtherInterests.filterData.fillData(pagination);
      this.getAllUserOtherInterests();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("userOtherInterests", data);
      this.userOtherInterests.filterData.activationTypeTokens = data;
      this.getAllUserOtherInterests();
    },
    search(data) {
      this.userOtherInterests.filterData.fillData(data);
      this.getAllUserOtherInterests();
    },
    async getAllUserOtherInterests() {
      this.isLoading = true;
      try {
        this.userOtherInterests.userOtherInterestsData = [];
        const response = await apiUserOtherInterest.getAll(
          this.userOtherInterests.filterData
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
        this.userOtherInterests.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.userOtherInterests.filterData.userToken = this.userToken;
    this.getAllUserOtherInterests();
  },
};
</script>
