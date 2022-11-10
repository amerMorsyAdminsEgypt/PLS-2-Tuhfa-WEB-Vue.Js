<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('newss', $event)"
      :viewType="generalSetting.newss.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.newss.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Newss.add')"
      :btnAddName="'NewsAdd'"
      :btnAddStatus="checkPrivilege(hasNewsAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <NewsTable
          v-if="generalSetting.newss.viewType == VIEW_TYPES.table"
          v-on:setNewsData="newss.news.fillData($event)"
          :newssData="newss.newssData"
          :defaultImg="newss.news.defaultImg"
          :filterData="newss.filterData"
        />

        <NewsCards
          v-else-if="generalSetting.newss.viewType == VIEW_TYPES.cards"
          v-on:setNewsData="newss.news.fillData($event)"
          :newssData="newss.newssData"
          :defaultImg="newss.news.defaultImg"
          :filterData="newss.filterData"
        />

        <ActionsData :actionsData="newss.news" />
        <NewsInfo :news="newss.news" />
        <NewsDelete :news="newss.news" v-on:refresh="getAllNewss()" />
        <NewsChangeActivationType
          :news="newss.news"
          v-on:refresh="getAllNewss()"
        />
        <CustomBottomSheetQRCode
          :refName="'NewsQRCode'"
          :code="newss.news.fullCode"
          :codeTitle="$t('Newss.code')"
          :name="newss.news.newsTitleCurrent"
          :nameTitle="$t('Newss.title')"
          :nameIcon="'news.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="newss.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <NewsFilter
        :theFilterData="newss.filterData"
        v-on:search="search($event)"
      />

      <NewsAdd :news="newss.news" v-on:refresh="getAllNewss()" />
      <NewsUpdate :news="newss.news" v-on:refresh="getAllNewss()" />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../utils/constants";
import { ACTIVATION_TYPE } from "./../../utils/constantLists";
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import NewsAdd from "./components/NewsAdd.vue";
import NewsUpdate from "./components/NewsUpdate.vue";
import NewsCards from "./components/NewsCards.vue";
import NewsTable from "./components/NewsTable.vue";
import NewsInfo from "./components/NewsInfo.vue";
import NewsDelete from "./components/NewsDelete.vue";
import NewsChangeActivationType from "./components/NewsChangeActivationType.vue";
import NewsFilter from "./components/NewsFilter.vue";
import Newss from "./../../models/newss/Newss";
import apiNews from "./../../api/news";
import { getDialogOfActivationTypes } from "./../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../utils/functions";
import {
  hasNewsAdd,
  hasNewsViewActive,
  hasNewsViewArchive,
  hasNewsViewBlocked,
} from "./../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    NewsAdd,
    NewsUpdate,
    NewsCards,
    NewsTable,
    NewsInfo,
    NewsDelete,
    NewsChangeActivationType,
    NewsFilter,
  },
  computed: {
    hasData() {
      return this.newss.newssData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasNewsViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.newss.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasNewsViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.newss.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasNewsViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.newss.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      newss: new Newss(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasNewsAdd,
    changePagination(pagination) {
      this.newss.filterData.fillData(pagination);
      this.getAllNewss();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("newss", data);
      this.newss.filterData.activationTypeTokens = data;
      this.getAllNewss();
    },
    search(data) {
      this.newss.filterData.fillData(data);
      this.getAllNewss();
    },
    async getAllNewss() {
      this.isLoading = true;
      try {
        this.newss.newssData = [];
        const response = await apiNews.getAll(this.newss.filterData);
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
        this.newss.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllNewss();
  },
};
</script>
