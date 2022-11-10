<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('socialStatuses', $event)"
      :viewType="generalSetting.socialStatuses.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.socialStatuses.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('SocialStatuses.add')"
      :btnAddName="'SocialStatuseAdd'"
      :btnAddStatus="checkPrivilege(hasSocialStatuseAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <SocialStatuseTable
          v-if="generalSetting.socialStatuses.viewType == VIEW_TYPES.table"
          v-on:setSocialStatuseData="
            socialStatuses.socialStatuse.fillData($event)
          "
          :socialStatusesData="socialStatuses.socialStatusesData"
          :defaultImg="socialStatuses.socialStatuse.defaultImg"
          :filterData="socialStatuses.filterData"
        />

        <SocialStatuseCards
          v-else-if="generalSetting.socialStatuses.viewType == VIEW_TYPES.cards"
          v-on:setSocialStatuseData="
            socialStatuses.socialStatuse.fillData($event)
          "
          :socialStatusesData="socialStatuses.socialStatusesData"
          :defaultImg="socialStatuses.socialStatuse.defaultImg"
          :filterData="socialStatuses.filterData"
        />

        <ActionsData :actionsData="socialStatuses.socialStatuse" />
        <SocialStatuseInfo :socialStatuse="socialStatuses.socialStatuse" />
        <SocialStatuseDelete
          :socialStatuse="socialStatuses.socialStatuse"
          v-on:refresh="getAllSocialStatuses()"
        />
        <SocialStatuseChangeActivationType
          :socialStatuse="socialStatuses.socialStatuse"
          v-on:refresh="getAllSocialStatuses()"
        />
        <CustomBottomSheetQRCode
          :refName="'SocialStatuseQRCode'"
          :code="socialStatuses.socialStatuse.fullCode"
          :codeTitle="$t('SocialStatuses.code')"
          :name="socialStatuses.socialStatuse.socialStatuseNameCurrent"
          :nameTitle="$t('SocialStatuses.name')"
          :nameIcon="'socialStatuses.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="socialStatuses.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <SocialStatuseFilter
        :theFilterData="socialStatuses.filterData"
        v-on:search="search($event)"
      />

      <SocialStatuseAdd
        :socialStatuse="socialStatuses.socialStatuse"
        v-on:refresh="getAllSocialStatuses()"
      />
      <SocialStatuseUpdate
        :socialStatuse="socialStatuses.socialStatuse"
        v-on:refresh="getAllSocialStatuses()"
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
import SocialStatuseAdd from "./components/SocialStatuseAdd.vue";
import SocialStatuseUpdate from "./components/SocialStatuseUpdate.vue";
import SocialStatuseCards from "./components/SocialStatuseCards.vue";
import SocialStatuseTable from "./components/SocialStatuseTable.vue";
import SocialStatuseInfo from "./components/SocialStatuseInfo.vue";
import SocialStatuseDelete from "./components/SocialStatuseDelete.vue";
import SocialStatuseChangeActivationType from "./components/SocialStatuseChangeActivationType.vue";
import SocialStatuseFilter from "./components/SocialStatuseFilter.vue";
import SocialStatuses from "./../../../../models/settings/settingsOthers/socialStatuses/SocialStatuses";
import apiSocialStatuse from "./../../../../api/settings/settingsOthers/socialStatuses";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasSocialStatuseAdd,
  hasSocialStatuseViewActive,
  hasSocialStatuseViewArchive,
  hasSocialStatuseViewBlocked,
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
    SocialStatuseAdd,
    SocialStatuseUpdate,
    SocialStatuseCards,
    SocialStatuseTable,
    SocialStatuseInfo,
    SocialStatuseDelete,
    SocialStatuseChangeActivationType,
    SocialStatuseFilter,
  },
  computed: {
    hasData() {
      return this.socialStatuses.socialStatusesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasSocialStatuseViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.socialStatuses.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSocialStatuseViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.socialStatuses.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSocialStatuseViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.socialStatuses.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      socialStatuses: new SocialStatuses(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasSocialStatuseAdd,
    changePagination(pagination) {
      this.socialStatuses.filterData.fillData(pagination);
      this.getAllSocialStatuses();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("socialStatuses", data);
      this.socialStatuses.filterData.activationTypeTokens = data;
      this.getAllSocialStatuses();
    },
    search(data) {
      this.socialStatuses.filterData.fillData(data);
      this.getAllSocialStatuses();
    },
    async getAllSocialStatuses() {
      this.isLoading = true;
      try {
        this.socialStatuses.socialStatusesData = [];
        const response = await apiSocialStatuse.getAll(
          this.socialStatuses.filterData
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
        this.socialStatuses.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllSocialStatuses();
  },
};
</script>
