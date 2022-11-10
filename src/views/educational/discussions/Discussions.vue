<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('discussions', $event)"
      :viewType="generalSetting.discussions.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.discussions.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Discussions.add')"
      :btnAddName="'DiscussionAdd'"
      :btnAddStatus="checkPrivilege(hasDiscussionAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <DiscussionTable
          v-if="generalSetting.discussions.viewType == VIEW_TYPES.table"
          v-on:setDiscussionData="discussions.discussion.fillData($event)"
          :discussionsData="discussions.discussionsData"
          :defaultImg="discussions.discussion.defaultImg"
          :filterData="discussions.filterData"
        />

        <DiscussionCards
          v-else-if="generalSetting.discussions.viewType == VIEW_TYPES.cards"
          v-on:setDiscussionData="discussions.discussion.fillData($event)"
          :discussionsData="discussions.discussionsData"
          :defaultImg="discussions.discussion.defaultImg"
          :filterData="discussions.filterData"
        />

        <ActionsData :actionsData="discussions.discussion" />
        <DiscussionInfo :discussion="discussions.discussion" />
        <DiscussionDelete
          :discussion="discussions.discussion"
          v-on:refresh="getAllDiscussions()"
        />
        <DiscussionChangeActivationType
          :discussion="discussions.discussion"
          v-on:refresh="getAllDiscussions()"
        />
        <DiscussionChangeCloseState
          :discussion="discussions.discussion"
          v-on:refresh="getAllDiscussions()"
        />
        <CustomBottomSheetQRCode
          :refName="'DiscussionQRCode'"
          :code="discussions.discussion.fullCode"
          :codeTitle="$t('Discussions.code')"
          :name="discussions.discussion.discussionTitleCurrent"
          :nameTitle="$t('Discussions.title')"
          :nameIcon="'discussions.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="discussions.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <DiscussionFilter
        :theFilterData="discussions.filterData"
        v-on:search="search($event)"
      />

      <DiscussionAdd
        :discussion="discussions.discussion"
        :discussionTypeToken="discussionTypeToken"
        :mainToken="mainToken"
        v-on:refresh="getAllDiscussions()"
      />
      <DiscussionUpdate
        :discussion="discussions.discussion"
        v-on:refresh="getAllDiscussions()"
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
import DiscussionAdd from "./components/DiscussionAdd.vue";
import DiscussionUpdate from "./components/DiscussionUpdate.vue";
import DiscussionCards from "./components/DiscussionCards.vue";
import DiscussionTable from "./components/DiscussionTable.vue";
import DiscussionInfo from "./components/DiscussionInfo.vue";
import DiscussionDelete from "./components/DiscussionDelete.vue";
import DiscussionChangeActivationType from "./components/DiscussionChangeActivationType.vue";
import DiscussionChangeCloseState from "./components/DiscussionChangeCloseState.vue";
import DiscussionFilter from "./components/DiscussionFilter.vue";
import Discussions from "./../../../models/educational/discussions/Discussions";
import apiDiscussion from "./../../../api/educational/discussions";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasDiscussionAdd,
  hasDiscussionViewActive,
  hasDiscussionViewArchive,
  hasDiscussionViewBlocked,
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
    DiscussionAdd,
    DiscussionUpdate,
    DiscussionCards,
    DiscussionTable,
    DiscussionInfo,
    DiscussionDelete,
    DiscussionChangeActivationType,
    DiscussionChangeCloseState,
    DiscussionFilter,
  },
  computed: {
    hasData() {
      return this.discussions.discussionsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasDiscussionViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.discussions.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasDiscussionViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.discussions.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasDiscussionViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.discussions.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      discussions: new Discussions(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  props: {
    discussionTypeToken: {
      type: String,
      default: "",
    },
    mainToken: {
      type: String,
      default: "",
    },
    educationalGroupToken: {
      type: String,
      default: "",
    },
  },
  methods: {
    checkPrivilege,
    hasDiscussionAdd,
    changePagination(pagination) {
      this.discussions.filterData.fillData(pagination);
      this.getAllDiscussions();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("discussions", data);
      this.discussions.filterData.activationTypeTokens = data;
      this.getAllDiscussions();
    },
    search(data) {
      this.discussions.filterData.fillData(data);
      this.getAllDiscussions();
    },
    async getAllDiscussions() {
      this.isLoading = true;
      try {
        this.discussions.discussionsData = [];
        const response = await apiDiscussion.getAll(
          this.discussions.filterData
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
        this.discussions.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    setFilter() {
      this.discussions.filterData.discussionTypeToken =
        this.discussionTypeToken;
      this.discussions.filterData.mainToken = this.mainToken;
      this.discussions.filterData.educationalGroupToken =
        this.educationalGroupToken;

      this.discussions.discussion.discussionTypeToken =
        this.discussionTypeToken;
      this.discussions.discussion.mainToken = this.mainToken;
    },
  },
  async created() {
    this.setFilter();
    this.getAllDiscussions();
  },
};
</script>
