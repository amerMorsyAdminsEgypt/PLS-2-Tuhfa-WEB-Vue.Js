<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('sharedMediaFolders', $event)"
      :viewType="generalSetting.sharedMediaFolders.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.sharedMediaFolders.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('SharedMediaFolders.add')"
      :btnAddName="'SharedMediaFolderAdd'"
      :btnAddStatus="checkPrivilege(hasSharedMediaFolderAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
      :btnSharedTitle="$t('SharedMediaWithSpaceStorageMedias.add')"
      :btnSharedName="'SharedMediaWithSpaceStorageMediaAdd'"
      :btnSharedStatus="
        checkPrivilege(hasSharedMediaWithSpaceStorageMediaAdd())
      "
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <SharedMediaFolderTable
          v-if="generalSetting.sharedMediaFolders.viewType == VIEW_TYPES.table"
          v-on:setSharedMediaFolderData="
            sharedMediaFolders.sharedMediaFolder.fillData($event)
          "
          :sharedMediaFoldersData="sharedMediaFolders.sharedMediaFoldersData"
          :defaultImg="sharedMediaFolders.sharedMediaFolder.defaultImg"
          :filterData="sharedMediaFolders.filterData"
        />

        <SharedMediaFolderCards
          v-else-if="
            generalSetting.sharedMediaFolders.viewType == VIEW_TYPES.cards
          "
          v-on:setSharedMediaFolderData="
            sharedMediaFolders.sharedMediaFolder.fillData($event)
          "
          :sharedMediaFoldersData="sharedMediaFolders.sharedMediaFoldersData"
          :defaultImg="sharedMediaFolders.sharedMediaFolder.defaultImg"
          :filterData="sharedMediaFolders.filterData"
        />

        <ActionsData :actionsData="sharedMediaFolders.sharedMediaFolder" />
        <SharedMediaFolderInfo
          :sharedMediaFolder="sharedMediaFolders.sharedMediaFolder"
        />
        <SharedMediaFolderDelete
          :sharedMediaFolder="sharedMediaFolders.sharedMediaFolder"
          v-on:refresh="getAllSharedMediaFolders()"
        />
        <SharedMediaFolderChangeActivationType
          :sharedMediaFolder="sharedMediaFolders.sharedMediaFolder"
          v-on:refresh="getAllSharedMediaFolders()"
        />
        <CustomBottomSheetQRCode
          :refName="'SharedMediaFolderQRCode'"
          :code="sharedMediaFolders.sharedMediaFolder.fullCode"
          :codeTitle="$t('SharedMediaFolders.code')"
          :name="
            sharedMediaFolders.sharedMediaFolder.sharedMediaFolderNameCurrent
          "
          :nameTitle="$t('SharedMediaFolders.title')"
          :nameIcon="'sharedMediaFolders.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="sharedMediaFolders.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <SharedMediaFolderFilter
        :theFilterData="sharedMediaFolders.filterData"
        v-on:search="search($event)"
      />

      <SharedMediaFolderAdd
        :sharedMediaFolder="sharedMediaFolders.sharedMediaFolder"
        v-on:refresh="getAllSharedMediaFolders()"
      />
      <SharedMediaFolderUpdate
        :sharedMediaFolder="sharedMediaFolders.sharedMediaFolder"
        v-on:refresh="getAllSharedMediaFolders()"
      />
      <SharedMediaWithSpaceStorageMediaAdd />
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
import SharedMediaFolderAdd from "./components/SharedMediaFolderAdd.vue";
import SharedMediaFolderUpdate from "./components/SharedMediaFolderUpdate.vue";
import SharedMediaFolderCards from "./components/SharedMediaFolderCards.vue";
import SharedMediaFolderTable from "./components/SharedMediaFolderTable.vue";
import SharedMediaFolderInfo from "./components/SharedMediaFolderInfo.vue";
import SharedMediaFolderDelete from "./components/SharedMediaFolderDelete.vue";
import SharedMediaFolderChangeActivationType from "./components/SharedMediaFolderChangeActivationType.vue";
import SharedMediaFolderFilter from "./components/SharedMediaFolderFilter.vue";
import SharedMediaFolders from "./../../models/sharedMediaFolders/SharedMediaFolders";
import apiSharedMediaFolder from "./../../api/sharedMediaFolder";
import { getDialogOfActivationTypes } from "./../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { checkPrivilege, isDataExist } from "./../../utils/functions";
import {
  hasSharedMediaFolderAdd,
  hasSharedMediaWithSpaceStorageMediaAdd,
  hasSharedMediaFolderViewActive,
  hasSharedMediaFolderViewArchive,
  hasSharedMediaFolderViewBlocked,
} from "./../../utils/privilegeHelper";
import SharedMediaWithSpaceStorageMediaAdd from "./../sharedMediaWithSpaceStorageMedias/SharedMediaWithSpaceStorageMediaAdd.vue";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    SharedMediaFolderAdd,
    SharedMediaFolderUpdate,
    SharedMediaFolderCards,
    SharedMediaFolderTable,
    SharedMediaFolderInfo,
    SharedMediaFolderDelete,
    SharedMediaFolderChangeActivationType,
    SharedMediaFolderFilter,
    SharedMediaWithSpaceStorageMediaAdd,
  },
  computed: {
    hasData() {
      return this.sharedMediaFolders.sharedMediaFoldersData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasSharedMediaFolderViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.sharedMediaFolders.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSharedMediaFolderViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.sharedMediaFolders.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSharedMediaFolderViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.sharedMediaFolders.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      sharedMediaFolders: new SharedMediaFolders(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    isDataExist,
    hasSharedMediaFolderAdd,
    hasSharedMediaWithSpaceStorageMediaAdd,
    changePagination(pagination) {
      this.sharedMediaFolders.filterData.fillData(pagination);
      this.getAllSharedMediaFolders();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("sharedMediaFolders", data);
      this.sharedMediaFolders.filterData.activationTypeTokens = data;
      this.getAllSharedMediaFolders();
    },
    search(data) {
      this.sharedMediaFolders.filterData.fillData(data);
      this.getAllSharedMediaFolders();
    },
    async getAllSharedMediaFolders() {
      this.isLoading = true;
      try {
        this.sharedMediaFolders.sharedMediaFoldersData = [];
        const response = await apiSharedMediaFolder.getAll(
          this.sharedMediaFolders.filterData
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
        this.sharedMediaFolders.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllSharedMediaFolders();
  },
};
</script>
