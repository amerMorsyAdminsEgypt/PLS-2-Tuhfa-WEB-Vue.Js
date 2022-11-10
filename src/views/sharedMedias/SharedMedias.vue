<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('sharedMedias', $event)"
      :viewType="generalSetting.sharedMedias.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.sharedMedias.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('SharedMedias.add')"
      :btnAddName="'SharedMediaAdd'"
      :btnAddStatus="checkPrivilege(hasSharedMediaAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <b-tabs v-if="mediaTypesOptions">
        <b-tab
          v-for="(option, index) in mediaTypesOptions"
          :key="index"
          @click="filterByMediaType(option.itemToken)"
          :title-item-class="'custom-tab-outer-li tab-container-media'"
          :active="currentTab == option.currentTab ? true : false"
        >
          <template #title>
            <span v-b-popover.hover.bottomright="`${option.itemName}`">
              <img :src="`${option.itemImagePath}`" class="icon-tab" />
              <span>{{ option.itemName }}</span>
              <span class="badge badge-dark" style="margin-inline-start: 8px">
                {{ option.count }}
              </span>
            </span>
          </template>
        </b-tab>
      </b-tabs>
      <template v-if="hasData">
        <SharedMediaTable
          v-if="generalSetting.sharedMedias.viewType == VIEW_TYPES.table"
          v-on:setSharedMediaData="sharedMedias.sharedMedia.fillData($event)"
          :sharedMediasData="sharedMedias.sharedMediasData"
          :defaultImg="sharedMedias.sharedMedia.defaultImg"
          :filterData="sharedMedias.filterData"
        />

        <SharedMediaCards
          v-else-if="generalSetting.sharedMedias.viewType == VIEW_TYPES.cards"
          v-on:setSharedMediaData="sharedMedias.sharedMedia.fillData($event)"
          :sharedMediasData="sharedMedias.sharedMediasData"
          :defaultImg="sharedMedias.sharedMedia.defaultImg"
          :filterData="sharedMedias.filterData"
        />

        <ActionsData :actionsData="sharedMedias.sharedMedia" />
        <SharedMediaInfo :sharedMedia="sharedMedias.sharedMedia" />
        <SharedMediaDelete
          :sharedMedia="sharedMedias.sharedMedia"
          v-on:refresh="getAllSharedMedias()"
        />
        <SharedMediaChangeActivationType
          :sharedMedia="sharedMedias.sharedMedia"
          v-on:refresh="getAllSharedMedias()"
        />
        <CustomBottomSheetQRCode
          :refName="'SharedMediaQRCode'"
          :code="sharedMedias.sharedMedia.fullCode"
          :codeTitle="$t('SharedMedias.code')"
          :name="sharedMedias.sharedMedia.sharedMediaNameCurrent"
          :nameTitle="$t('SharedMedias.title')"
          :nameIcon="'sharedMedias.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="sharedMedias.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <SharedMediaFilter
        :theFilterData="sharedMedias.filterData"
        v-on:search="search($event)"
      />

      <SharedMediaAdd
        :sharedMedia="sharedMedias.sharedMedia"
        :sharedMediaFolderToken="sharedMediaFolderToken"
        v-on:refresh="getAllSharedMedias()"
      />
      <SharedMediaUpdate
        :sharedMedia="sharedMedias.sharedMedia"
        v-on:refresh="getAllSharedMedias()"
      />
      <SharedMediaWithSpaceStorageMediaUnshare
        :sharedMediaToken="sharedMedias.sharedMedia.sharedMediaToken"
        v-on:refresh="getAllSharedMedias()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../utils/constants";
import {
  ACTIVATION_TYPE,
  MEDIA_TYPE_TOKENS,
} from "./../../utils/constantLists";
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import SharedMediaAdd from "./components/SharedMediaAdd.vue";
import SharedMediaUpdate from "./components/SharedMediaUpdate.vue";
import SharedMediaCards from "./components/SharedMediaCards.vue";
import SharedMediaTable from "./components/SharedMediaTable.vue";
import SharedMediaInfo from "./components/SharedMediaInfo.vue";
import SharedMediaDelete from "./components/SharedMediaDelete.vue";
import SharedMediaChangeActivationType from "./components/SharedMediaChangeActivationType.vue";
import SharedMediaFilter from "./components/SharedMediaFilter.vue";
import SharedMediaWithSpaceStorageMediaUnshare from "./../sharedMediaWithSpaceStorageMedias/SharedMediaWithSpaceStorageMediaUnshare.vue";
import SharedMedias from "./../../models/sharedMedias/SharedMedias";
import apiSharedMedia from "./../../api/sharedMedia";
import { getDialogOfActivationTypes } from "./../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { checkPrivilege, isDataExist } from "./../../utils/functions";
import {
  hasSharedMediaAdd,
  hasSharedMediaViewActive,
  hasSharedMediaViewArchive,
  hasSharedMediaViewBlocked,
} from "./../../utils/privilegeHelper";
// tabs
import imgImage from "@/assets/images/photo.svg";
import imgVideo from "@/assets/images/video.svg";
import imgAudio from "@/assets/images/voice.svg";
import imgPdf from "@/assets/images/pdf.svg";
import imgExcel from "@/assets/images/excel.svg";
import imgWord from "@/assets/images/word.svg";
import imgPowerPoint from "@/assets/images/ppt.svg";
import imgOther from "@/assets/images/media.svg";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    SharedMediaAdd,
    SharedMediaUpdate,
    SharedMediaCards,
    SharedMediaTable,
    SharedMediaInfo,
    SharedMediaDelete,
    SharedMediaChangeActivationType,
    SharedMediaFilter,
    SharedMediaWithSpaceStorageMediaUnshare,
  },
  computed: {
    //#region tabs
    countImage() {
      return this.sharedMedias.sharedMediaStatistics.totalImageFilesCount;
    },
    countVideo() {
      return this.sharedMedias.sharedMediaStatistics.totalVideoFilesCount;
    },
    countAudio() {
      return this.sharedMedias.sharedMediaStatistics.totalAudioFilesCount;
    },
    countPdf() {
      return this.sharedMedias.sharedMediaStatistics.totalPdfFilesCount;
    },
    countExcel() {
      return this.sharedMedias.sharedMediaStatistics.totalExcelFilesCount;
    },
    countWord() {
      return this.sharedMedias.sharedMediaStatistics.totalWordFilesCount;
    },
    countPowerPoint() {
      return this.sharedMedias.sharedMediaStatistics.totalPowerPointFilesCount;
    },
    countOther() {
      return this.sharedMedias.sharedMediaStatistics.totalOtherFilesCount;
    },
    mediaTypesOptions() {
      let tabOptions = [];

      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.image,
        itemName: this.$t("MediaTypes.image"),
        itemImagePath: imgImage,
        currentTab: "image",
        count: this.countImage,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.video,
        itemName: this.$t("MediaTypes.video"),
        itemImagePath: imgVideo,
        currentTab: "video",
        count: this.countVideo,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.audio,
        itemName: this.$t("MediaTypes.audio"),
        itemImagePath: imgAudio,
        currentTab: "audio",
        count: this.countAudio,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.pdf,
        itemName: this.$t("MediaTypes.pdf"),
        itemImagePath: imgPdf,
        currentTab: "pdf",
        count: this.countPdf,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.excel,
        itemName: this.$t("MediaTypes.excel"),
        itemImagePath: imgExcel,
        currentTab: "excel",
        count: this.countExcel,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.word,
        itemName: this.$t("MediaTypes.word"),
        itemImagePath: imgWord,
        currentTab: "word",
        count: this.countWord,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.powerPoint,
        itemName: this.$t("MediaTypes.powerPoint"),
        itemImagePath: imgPowerPoint,
        currentTab: "powerPoint",
        count: this.countPowerPoint,
      });
      tabOptions.push({
        itemToken: MEDIA_TYPE_TOKENS.other,
        itemName: this.$t("MediaTypes.other"),
        itemImagePath: imgOther,
        currentTab: "other",
        count: this.countOther,
      });

      return tabOptions;
    },

    //#endregion tabs

    hasData() {
      return this.sharedMedias.sharedMediasData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasSharedMediaViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.sharedMedias.sharedMediaStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSharedMediaViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.sharedMedias.sharedMediaStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSharedMediaViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.sharedMedias.sharedMediaStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  props: {
    sharedMediaFolderToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentTab: "",
      sharedMedias: new SharedMedias(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    isDataExist,
    hasSharedMediaAdd,
    changePagination(pagination) {
      this.sharedMedias.filterData.fillData(pagination);
      this.getAllSharedMedias();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("sharedMedias", data);
      this.sharedMedias.filterData.activationTypeTokens = data;
      this.getAllSharedMedias();
    },
    search(data) {
      this.sharedMedias.filterData.fillData(data);
      this.getAllSharedMedias();
    },
    async getAllSharedMedias() {
      this.isLoading = true;
      try {
        this.sharedMedias.sharedMediasData = [];
        const response = await apiSharedMedia.getAll(
          this.sharedMedias.filterData
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
        this.sharedMedias.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    filterByMediaType(mediaTypeToken) {
      this.currentTab = mediaTypeToken;
      this.sharedMedias.filterData.sharedMediaFileTypeToken = mediaTypeToken;
      this.getAllSharedMedias();
    },
    setFilter() {
      this.sharedMedias.filterData.sharedMediaFolderToken =
        this.sharedMediaFolderToken;
      this.filterByMediaType(MEDIA_TYPE_TOKENS.image);
      // this.sharedMedias.filterData.sharedMediaFileTypeToken = this.currentTab;
    },
  },
  async created() {
    this.setFilter();
  },
};
</script>
