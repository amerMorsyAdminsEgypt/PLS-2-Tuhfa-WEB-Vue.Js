<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('newsCategories', $event)"
      :viewType="generalSetting.newsCategories.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.newsCategories.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :activationStatistics="newsCategories.activationStatistics"
      :btnAddTitle="$t('NewsCategories.add')"
      :btnAddName="'NewsCategoryAdd'"
      :btnAddStatus="checkPrivilege(hasNewsCategoryAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <NewsCategoryTable
          v-if="generalSetting.newsCategories.viewType == VIEW_TYPES.table"
          v-on:setNewsCategoryData="
            newsCategories.newsCategory.fillData($event)
          "
          :newsCategoriesData="newsCategories.newsCategoriesData"
          :defaultImg="newsCategories.newsCategory.defaultImg"
          :filterData="newsCategories.filterData"
        />

        <NewsCategoryCards
          v-else-if="generalSetting.newsCategories.viewType == VIEW_TYPES.cards"
          v-on:setNewsCategoryData="
            newsCategories.newsCategory.fillData($event)
          "
          :newsCategoriesData="newsCategories.newsCategoriesData"
          :defaultImg="newsCategories.newsCategory.defaultImg"
          :filterData="newsCategories.filterData"
        />

        <ActionsData :actionsData="newsCategories.newsCategory" />
        <NewsCategoryInfo :newsCategory="newsCategories.newsCategory" />
        <NewsCategoryDelete
          :newsCategory="newsCategories.newsCategory"
          v-on:refresh="getAllNewsCategories()"
        />
        <NewsCategoryChangeActivationType
          :newsCategory="newsCategories.newsCategory"
          v-on:refresh="getAllNewsCategories()"
        />
        <CustomBottomSheetQRCode
          :refName="'NewsCategoryQRCode'"
          :code="newsCategories.newsCategory.fullCode"
          :codeTitle="$t('NewsCategories.code')"
          :name="newsCategories.newsCategory.newsCategoryNameCurrent"
          :nameTitle="$t('NewsCategories.name')"
          :nameIcon="'newsCategories.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="newsCategories.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <NewsCategoryFilter
        :theFilterData="newsCategories.filterData"
        v-on:search="search($event)"
      />

      <NewsCategoryAdd
        :newsCategory="newsCategories.newsCategory"
        v-on:refresh="getAllNewsCategories()"
      />
      <NewsCategoryUpdate
        :newsCategory="newsCategories.newsCategory"
        v-on:refresh="getAllNewsCategories()"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { STATUS, VIEW_TYPES } from "./../../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../../utils/constantLists";
import DashboardNavbar from "./../../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../../components/general/CustomPagination.vue";
import NewsCategoryAdd from "./components/NewsCategoryAdd.vue";
import NewsCategoryUpdate from "./components/NewsCategoryUpdate.vue";
import NewsCategoryCards from "./components/NewsCategoryCards.vue";
import NewsCategoryTable from "./components/NewsCategoryTable.vue";
import NewsCategoryInfo from "./components/NewsCategoryInfo.vue";
import NewsCategoryDelete from "./components/NewsCategoryDelete.vue";
import NewsCategoryChangeActivationType from "./components/NewsCategoryChangeActivationType.vue";
import NewsCategoryFilter from "./components/NewsCategoryFilter.vue";
import NewsCategories from "./../../../../models/settings/settingsOthers/newsCategories/NewsCategories";
import apiNewsCategory from "./../../../../api/settings/settingsOthers/newsCategories";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasNewsCategoryAdd,
  hasNewsCategoryViewActive,
  hasNewsCategoryViewArchive,
  hasNewsCategoryViewBlocked,
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
    NewsCategoryAdd,
    NewsCategoryUpdate,
    NewsCategoryCards,
    NewsCategoryTable,
    NewsCategoryInfo,
    NewsCategoryDelete,
    NewsCategoryChangeActivationType,
    NewsCategoryFilter,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
    hasData() {
      return this.newsCategories.newsCategoriesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasNewsCategoryViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.newsCategories.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasNewsCategoryViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.newsCategories.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasNewsCategoryViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.newsCategories.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      newsCategories: new NewsCategories(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasNewsCategoryAdd,
    changePagination(pagination) {
      this.newsCategories.filterData.fillData(pagination);
      this.getAllNewsCategories();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("newsCategories", data);
      this.newsCategories.filterData.activationTypeTokens = data;
      this.getAllNewsCategories();
    },
    search(data) {
      this.newsCategories.filterData.fillData(data);
      this.getAllNewsCategories();
    },
    async getAllNewsCategories() {
      this.isLoading = true;
      try {
        this.newsCategories.newsCategoriesData = [];
        const response = await apiNewsCategory.getAll(
          this.newsCategories.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.newsCategories.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllNewsCategories();
  },
};
</script>
