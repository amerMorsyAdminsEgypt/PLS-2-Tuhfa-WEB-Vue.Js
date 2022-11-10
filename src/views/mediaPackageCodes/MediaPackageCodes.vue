<template>
  <div class="">
    <DashboardNavbar
      :btnAddTitle="$t('add')"
      :btnAddName="'MediaPackageCodeAdd'"
      :btnAddStatus="checkPrivilege(hasMediaPackageCodeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <template>
          <div class="padding">
            <b-button
              v-b-toggle.MediaPackagesData
              class="btn btn-lg btn-collapse"
            >
              {{ $t("MediaPackages.data") }}
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </b-button>
            <b-collapse id="MediaPackagesData">
              <div class="my-card">
                <MediaPackageTable
                  v-on:setMediaPackageData="
                    mediaPackageCodes.mediaPackageCode.mediaPackageInfoData.fillData(
                      $event
                    )
                  "
                  :mediaPackagesData="[mediaPackage]"
                  :defaultImg="mediaPackage.defaultImg"
                  :filterData="mediaPackageCodes.filterData"
                  :showOtherActions="false"
                />
                <MediaPackageNotUsedCodesDelete
                  :mediaPackage="
                    mediaPackageCodes.mediaPackageCode.mediaPackageInfoData
                  "
                  v-on:refresh="getAllMediaPackageCodes()"
                />
              </div>
            </b-collapse>
          </div>
        </template>
        <MediaPackageCodeTable
          v-on:setMediaPackageCodeData="
            mediaPackageCodes.mediaPackageCode.fillData($event)
          "
          v-on:subscribeInMediaPackage="
            mediaPackageCodes.mediaPackageCode.fillDataToSubscribeInMediaPackage(
              $event
            )
          "
          :mediaPackageCodesData="mediaPackageCodes.mediaPackageCodesData"
          :defaultImg="mediaPackageCodes.mediaPackageCode.defaultImg"
          :filterData="mediaPackageCodes.filterData"
        />

        <ActionsData :actionsData="mediaPackageCodes.mediaPackageCode" />
        <MediaPackageCodeInfo
          :mediaPackageCode="mediaPackageCodes.mediaPackageCode"
        />

        <MediaPackageCodeDelete
          :mediaPackageCode="mediaPackageCodes.mediaPackageCode"
          v-on:refresh="getAllMediaPackageCodes()"
        />

        <CustomBottomSheetQRCode
          :refName="'MediaPackageCodeQRCode'"
          :code="mediaPackageCodes.mediaPackageCode.mediaPackageKey"
          :codeTitle="$t('general.key')"
          :name="mediaPackageCodes.mediaPackageCode.mediaPackageCode"
          :nameTitle="$t('general.code')"
          :nameIcon="'mediaPackageCodes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="mediaPackageCodes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <MediaPackageCodeFilter
        :theFilterData="mediaPackageCodes.filterData"
        v-on:search="search($event)"
      />

      <MediaPackageCodeAdd
        :mediaPackageCode="mediaPackageCodes.mediaPackageCode"
        :mediaPackageToken="mediaPackageToken"
        v-on:refresh="getAllMediaPackageCodes()"
      />
      <!-- <SubscribeInMediaPackage
        :subscribeInMediaPackage="
          mediaPackageCodes.mediaPackageCode.subscribeInMediaPackage
        "
      /> -->
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../utils/constants";
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import MediaPackageCodeAdd from "./components/MediaPackageCodeAdd.vue";
import MediaPackageCodeTable from "./components/MediaPackageCodeTable.vue";
import MediaPackageNotUsedCodesDelete from "./../mediaPackages/components/MediaPackageNotUsedCodesDelete.vue";
import MediaPackageCodeInfo from "./components/MediaPackageCodeInfo.vue";
import MediaPackageCodeDelete from "./components/MediaPackageCodeDelete.vue";
import MediaPackageCodeFilter from "./components/MediaPackageCodeFilter.vue";
import MediaPackage from "./../../models/mediaPackages/MediaPackage";
import MediaPackageTable from "./../mediaPackages/components/MediaPackageTable.vue";
import MediaPackageCodes from "./../../models/mediaPackageCodes/MediaPackageCodes";
import apiMediaPackageCode from "./../../api/mediaPackageCode";
import { getDialogOfActivationTypes } from "./../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { checkPrivilege, isDataExist } from "./../../utils/functions";
import { hasMediaPackageCodeAdd } from "./../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    MediaPackageCodeAdd,
    // SubscribeInMediaPackage,
    MediaPackageCodeTable,
    MediaPackageNotUsedCodesDelete,
    MediaPackageCodeInfo,
    MediaPackageCodeDelete,
    MediaPackageCodeFilter,
    MediaPackageTable,
  },
  props: ["mediaPackageToken"],
  computed: {
    hasData() {
      return this.mediaPackageCodes.mediaPackageCodesData.length != 0;
    },
  },
  data() {
    return {
      mediaPackageCodes: new MediaPackageCodes(),
      mediaPackage: new MediaPackage(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    isDataExist,
    hasMediaPackageCodeAdd,

    changePagination(pagination) {
      this.mediaPackageCodes.filterData.fillData(pagination);
      this.getAllMediaPackageCodes();
    },

    search(data) {
      this.mediaPackageCodes.filterData.fillData(data);
      this.getAllMediaPackageCodes();
    },
    async getAllMediaPackageCodes() {
      this.isLoading = true;
      try {
        this.mediaPackageCodes.mediaPackageCodesData = [];
        const response = await apiMediaPackageCode.getAll(
          this.mediaPackageCodes.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.mediaPackage.fillData(
            response.data.mediaPackageCodesData[0].mediaPackageInfoData
          );
          this.mediaPackageCodes.fillData(response.data);
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
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.mediaPackageCodes.filterData.mediaPackageToken =
      this.mediaPackageToken;
    this.getAllMediaPackageCodes();
  },
};
</script>
<style scoped lang="scss">
.padding {
  padding: var(--app-content-gap);
}
</style>
