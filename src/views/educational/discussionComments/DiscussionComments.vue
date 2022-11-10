<template>
  <div class="">
    <DashboardNavbar
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.discussionComments.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('DiscussionComments.add')"
      :btnAddName="'DiscussionCommentAdd'"
      :btnAddStatus="checkPrivilege(hasDiscussionCommentAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <div v-if="hasDiscussion" class="statistics">
        <b-button v-b-toggle.DiscussionData class="btn btn-lg btn-collapse">
          {{ $t("Discussions.data") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse id="DiscussionData">
          <div class="row my-card">
            <DataLabelGroup
              :className="'col-md-6'"
              :value="discussions.discussion.fullCode"
              :title="$t('Discussions.code')"
              :imgName="'code.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="discussions.discussion.discussionTitleCurrent"
              :title="$t('Discussions.title')"
              :imgName="'discussions.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="discussions.discussion.discussionTypeNameCurrent"
              :title="$t('general.type')"
              :imgName="'type.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                discussions.discussion.discussionClosedStateTypeNameCurrent
              "
              :title="$t('general.state')"
              :imgName="'type.svg'"
            />
          </div>
        </b-collapse>
      </div>
      <ExceptionWithImg
        v-if="exceptionMsgDetails"
        :msg="exceptionMsgDetails"
        :image="exceptionImg"
      />

      <template v-if="hasData">
        <div class="custom-cards">
          <CustomCommentView
            v-for="(item, index) in treeData"
            :key="index"
            v-on:emitDataInternalAction="
              discussionComments.discussionComment.fillData($event);
              react();
            "
            v-on:emitData="
              discussionComments.discussionComment.fillData($event)
            "
            :treeData="item"
          />
        </div>

        <ActionsData :actionsData="discussionComments.discussionComment" />

        <DiscussionCommentDelete
          :discussionComment="discussionComments.discussionComment"
          v-on:refresh="getAllDiscussionComments()"
        />
        <DiscussionCommentChangeActivationType
          :discussionComment="discussionComments.discussionComment"
          v-on:refresh="getAllDiscussionComments()"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="discussionComments.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <DiscussionCommentFilter
        :theFilterData="discussionComments.filterData"
        v-on:search="search($event)"
      />

      <DiscussionCommentAdd
        :discussionComment="discussionComments.discussionComment"
        :filterData="discussionComments.filterData"
        v-on:refresh="getAllDiscussionComments()"
      />
      <DiscussionCommentUpdate
        :discussionComment="discussionComments.discussionComment"
        v-on:refresh="getAllDiscussionComments()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../utils/constantLists";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import DataLabelGroup from "./../../../components/general/DataLabelGroup.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import CustomCommentView from "./components/CustomCommentView.vue";
import DiscussionCommentAdd from "./components/DiscussionCommentAdd.vue";
import DiscussionCommentUpdate from "./components/DiscussionCommentUpdate.vue";
import DiscussionCommentDelete from "./components/DiscussionCommentDelete.vue";
import DiscussionCommentChangeActivationType from "./components/DiscussionCommentChangeActivationType.vue";
import DiscussionCommentFilter from "./components/DiscussionCommentFilter.vue";
import DiscussionComments from "./../../../models/educational/discussionComments/DiscussionComments";
import DiscussionCommentTree from "./../../../models/educational/discussionComments/DiscussionCommentTree";
import apiDiscussionComment from "./../../../api/educational/discussionComments";
import apiDiscussionCommentReact from "./../../../api/educational/discussionCommentReacts";
import Discussions from "./../../../models/educational/discussions/Discussions";
import apiDiscussion from "./../../../api/educational/discussions";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege, objectToFormData } from "./../../../utils/functions";
import {
  hasDiscussionCommentAdd,
  hasDiscussionCommentViewActive,
  hasDiscussionCommentViewArchive,
  hasDiscussionCommentViewBlocked,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    DataLabelGroup,
    CustomCommentView,
    ExceptionWithImg,
    ActionsData,
    CustomPagination,
    DiscussionCommentAdd,
    DiscussionCommentUpdate,
    DiscussionCommentDelete,
    DiscussionCommentChangeActivationType,

    DiscussionCommentFilter,
  },
  computed: {
    hasDiscussion() {
      return this.discussions.discussion.discussionToken ? true : false;
    },

    hasData() {
      return this.discussionComments.discussionCommentsData.length != 0;
    },
    treeData: function () {
      return this.discussionComments.discussionCommentsData.map(
        (item) => new DiscussionCommentTree(item)
      );
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasDiscussionCommentViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.discussionComments.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasDiscussionCommentViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.discussionComments.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasDiscussionCommentViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.discussionComments.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      exceptionMsgDetails: null,
      discussionComments: new DiscussionComments(),
      discussions: new Discussions(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  props: {
    educationalGroupToken: {
      type: String,
      default: "",
    },
    discussionToken: {
      type: String,
      default: "",
    },
    parentDiscussionCommentToken: {
      type: String,
      default: "",
    },
  },
  methods: {
    checkPrivilege,
    objectToFormData,
    hasDiscussionCommentAdd,
    changePagination(pagination) {
      this.discussionComments.filterData.fillData(pagination);
      this.getAllDiscussionComments();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("discussionComments", data);
      this.discussionComments.filterData.activationTypeTokens = data;
      this.getAllDiscussionComments();
    },
    search(data) {
      this.discussionComments.filterData.fillData(data);
      this.getAllDiscussionComments();
    },

    async react() {
      this.isLoading = true;
      let params = {
        discussionCommentToken:
          this.discussionComments.discussionComment.discussionCommentToken,
        reactTypeToken:
          this.discussionComments.discussionComment.reactTypeToken,
      };

      let formData = objectToFormData(params);
      try {
        const response = await apiDiscussionCommentReact.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          await this.setFilter();
          this.getAllDiscussionComments();
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async getAllDiscussionComments() {
      this.isLoading = true;
      try {
        this.discussionComments.discussionCommentsData = [];
        this.discussionComments.filterData.parentDiscussionCommentInfoDataInclude = true;
        this.discussionComments.filterData.discussionInfoDataInclude = true;
        this.discussionComments.filterData.discussionCommentMentionUserDataInclude = true;

        const response = await apiDiscussionComment.getAll(
          this.discussionComments.filterData
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
        this.discussionComments.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },

    async getDetailsOfDiscussion() {
      this.isLoading = true;
      try {
        let filter = { token: this.discussionToken };
        const response = await apiDiscussion.getDetails(filter);
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsgDetails = null;
        } else if (response.data.status == STATUS.NO_INTERNET) {
          this.exceptionMsgDetails = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsgDetails = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsgDetails = response.data.msg;
          this.exceptionImg = null;
        }
        this.discussions.discussion.fillData(response.data.discussion);
      } catch (error) {
        this.exceptionMsgDetails = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },

    setFilter() {
      this.discussionComments.filterData.educationalGroupToken =
        this.educationalGroupToken;
      this.discussionComments.filterData.discussionToken = this.discussionToken;
      this.discussionComments.filterData.parentDiscussionCommentToken =
        this.parentDiscussionCommentToken;
    },
  },
  async created() {
    await this.setFilter();
    await this.getDetailsOfDiscussion();
    this.getAllDiscussionComments();
  },
};
</script>
