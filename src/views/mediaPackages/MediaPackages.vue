<template>
  <div class="">
    <DashboardNavbar
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.mediaPackages.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('MediaPackages.add')"
      :btnAddName="'MediaPackageAdd'"
      :btnAddStatus="checkPrivilege(hasMediaPackageAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <MediaPackageTable
          v-on:setMediaPackageData="mediaPackages.mediaPackage.fillData($event)"
          :mediaPackagesData="mediaPackages.mediaPackagesData"
          :defaultImg="mediaPackages.mediaPackage.defaultImg"
          :filterData="mediaPackages.filterData"
        />

        <ActionsData :actionsData="mediaPackages.mediaPackage" />

        <MediaPackageDelete
          :mediaPackage="mediaPackages.mediaPackage"
          v-on:refresh="getAllMediaPackages()"
        />

        <MediaPackageChangeActivationType
          :mediaPackage="mediaPackages.mediaPackage"
          v-on:refresh="getAllMediaPackages()"
        />
        <CustomBottomSheetQRCode
          :refName="'MediaPackageQRCode'"
          :code="mediaPackages.mediaPackage.fullCode"
          :codeTitle="$t('MediaPackages.code')"
          :name="mediaPackages.mediaPackage.mediaPackageNameCurrent"
          :nameTitle="$t('MediaPackages.name')"
          :nameIcon="'mediaPackages.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="mediaPackages.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <MediaPackageFilter
        :theFilterData="mediaPackages.filterData"
        v-on:search="search($event)"
      />

      <MediaPackageAdd
        :mediaPackage="mediaPackages.mediaPackage"
        v-on:refresh="getAllMediaPackages()"
      />
      <MediaPackageUpdate
        :mediaPackageToken="mediaPackages.mediaPackage.mediaPackageToken"
        v-on:refresh="getAllMediaPackages()"
      />
      <MediaPackageMedia
        :mediaPackageMediaReloadStatus="mediaPackageMediaReloadStatus"
        :mediaPackageToken="mediaPackages.mediaPackage.mediaPackageToken"
        v-on:setSharedMediaData="setSharedMediaData($event)"
        v-on:setSharedMedia="setSharedMedia($event)"
      />
      <SharedMediaInfo :sharedMedia="sharedMedia" />

      <MediaPackageNotUsedCodesDelete
        :mediaPackage="mediaPackages.mediaPackage"
        v-on:refresh="getAllMediaPackages()"
      />

      <SharedMediaMediaPackageChangeActivationType
        :sharedMedia="sharedMedia"
        v-on:refresh="
          mediaPackageMediaReloadStatus = !mediaPackageMediaReloadStatus
        "
      />
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
import MediaPackageAdd from "./components/MediaPackageAdd.vue";
import MediaPackageUpdate from "./components/MediaPackageUpdate.vue";
import MediaPackageMedia from "./components/MediaPackageMedia.vue";
import MediaPackageTable from "./components/MediaPackageTable.vue";
import MediaPackageDelete from "./components/MediaPackageDelete.vue";
import MediaPackageNotUsedCodesDelete from "./components/MediaPackageNotUsedCodesDelete.vue";
import MediaPackageChangeActivationType from "./components/MediaPackageChangeActivationType.vue";
import SharedMediaMediaPackageChangeActivationType from "./components/SharedMediaMediaPackageChangeActivationType.vue";
import MediaPackageFilter from "./components/MediaPackageFilter.vue";
import SharedMediaInfo from "./../sharedMedias/components/SharedMediaInfo.vue";
//import MediaPackageCodesFilter from "./../reports/components/MediaPackageCodesFilter.vue";
// import SharedMedia from "./../../models/sharedMedias/SharedMedia";
import MediaPackages from "./../../models/mediaPackages/MediaPackages";
import apiMediaPackage from "./../../api/mediaPackage";
import { getDialogOfActivationTypes } from "./../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { checkPrivilege, isDataExist } from "./../../utils/functions";
import {
  hasMediaPackageAdd,
  hasMediaPackageViewActive,
  hasMediaPackageViewArchive,
  hasMediaPackageViewBlocked,
} from "./../../utils/privilegeHelper";
import sharedMediaIcon from "@/assets/images/sharedMedias.svg";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    MediaPackageAdd,
    MediaPackageUpdate,
    MediaPackageMedia,
    MediaPackageTable,
    MediaPackageDelete,
    MediaPackageChangeActivationType,
    SharedMediaMediaPackageChangeActivationType,
    MediaPackageFilter,
    SharedMediaInfo,
    // MediaPackageCodesFilter,
    MediaPackageNotUsedCodesDelete,
  },
  computed: {
    hasData() {
      return this.mediaPackages.mediaPackagesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasMediaPackageViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.mediaPackages.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMediaPackageViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.mediaPackages.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMediaPackageViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.mediaPackages.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      mediaPackageMediaReloadStatus: false,
      mediaPackages: new MediaPackages(),
      sharedMedia: { icon: sharedMediaIcon },
      sharedMediaIcon,
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    isDataExist,
    hasMediaPackageAdd,
    setSharedMediaData(data) {
      let sharedMedia = {
        ...data.sharedMediaData,
        icon: this.sharedMediaIcon,
      };
      this.sharedMedia = sharedMedia;
    },
    setSharedMedia(data) {
      this.sharedMedia = data;
    },
    changePagination(pagination) {
      this.mediaPackages.filterData.fillData(pagination);
      this.getAllMediaPackages();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("mediaPackages", data);
      this.mediaPackages.filterData.activationTypeTokens = data;
      this.getAllMediaPackages();
    },
    search(data) {
      this.mediaPackages.filterData.fillData(data);
      this.getAllMediaPackages();
    },
    async getAllMediaPackages() {
      this.isLoading = true;
      try {
        this.mediaPackages.mediaPackagesData = [];
        const response = await apiMediaPackage.getAll(
          this.mediaPackages.filterData
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

        this.mediaPackages.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllMediaPackages();
  },
};
</script>
