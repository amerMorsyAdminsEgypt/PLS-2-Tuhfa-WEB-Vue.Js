<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('bodyParts', $event)"
      :viewType="generalSetting.bodyParts.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.bodyParts.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('BodyParts.add')"
      :btnAddName="'BodyPartAdd'"
      :btnAddStatus="checkPrivilege(hasBodyPartAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <BodyPartTabs />

      <template v-if="hasData">
        <BodyPartTable
          v-if="generalSetting.bodyParts.viewType == VIEW_TYPES.table"
          v-on:setBodyPartData="bodyParts.bodyPart.fillData($event)"
          :bodyPartsData="bodyParts.bodyPartsData"
          :defaultImg="bodyParts.bodyPart.defaultImg"
          :filterData="bodyParts.filterData"
        />

        <BodyPartCards
          v-else-if="generalSetting.bodyParts.viewType == VIEW_TYPES.cards"
          v-on:setBodyPartData="bodyParts.bodyPart.fillData($event)"
          :bodyPartsData="bodyParts.bodyPartsData"
          :defaultImg="bodyParts.bodyPart.defaultImg"
          :filterData="bodyParts.filterData"
        />

        <ActionsData :actionsData="bodyParts.bodyPart" />
        <BodyPartInfo :bodyPart="bodyParts.bodyPart" />
        <BodyPartDelete
          :bodyPart="bodyParts.bodyPart"
          v-on:refresh="getAllBodyParts()"
        />
        <BodyPartChangeActivationType
          :bodyPart="bodyParts.bodyPart"
          v-on:refresh="getAllBodyParts()"
        />
        <CustomBottomSheetQRCode
          :refName="'BodyPartQRCode'"
          :code="bodyParts.bodyPart.fullCode"
          :codeTitle="$t('BodyParts.code')"
          :name="bodyParts.bodyPart.bodyPartNameCurrent"
          :nameTitle="$t('BodyParts.name')"
          :nameIcon="'bodyParts.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="bodyParts.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <BodyPartFilter
        :theFilterData="bodyParts.filterData"
        v-on:search="search($event)"
      />

      <BodyPartAdd
        :bodyPart="bodyParts.bodyPart"
        v-on:refresh="getAllBodyParts()"
      />
      <BodyPartUpdate
        :bodyPart="bodyParts.bodyPart"
        v-on:refresh="getAllBodyParts()"
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
import BodyPartAdd from "./components/BodyPartAdd.vue";
import BodyPartUpdate from "./components/BodyPartUpdate.vue";
import BodyPartCards from "./components/BodyPartCards.vue";
import BodyPartTable from "./components/BodyPartTable.vue";
import BodyPartTabs from "./components/BodyPartTabs.vue";
import BodyPartInfo from "./components/BodyPartInfo.vue";
import BodyPartDelete from "./components/BodyPartDelete.vue";
import BodyPartChangeActivationType from "./components/BodyPartChangeActivationType.vue";
import BodyPartFilter from "./components/BodyPartFilter.vue";
import BodyParts from "./../../../../models/settings/settingsOthers/bodyParts/BodyParts";
import apiBodyPart from "./../../../../api/settings/settingsOthers/bodyParts";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasBodyPartAdd,
  hasBodyPartViewActive,
  hasBodyPartViewArchive,
  hasBodyPartViewBlocked,
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
    BodyPartAdd,
    BodyPartUpdate,
    BodyPartCards,
    BodyPartTable,
    BodyPartTabs,
    BodyPartInfo,
    BodyPartDelete,
    BodyPartChangeActivationType,
    BodyPartFilter,
  },
  computed: {
    hasData() {
      return this.bodyParts.bodyPartsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasBodyPartViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.bodyParts.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasBodyPartViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.bodyParts.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasBodyPartViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.bodyParts.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  props: {
    parentBodyPartToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      bodyParts: new BodyParts(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasBodyPartAdd,
    changePagination(pagination) {
      this.bodyParts.filterData.fillData(pagination);
      this.getAllBodyParts();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("bodyParts", data);
      this.bodyParts.filterData.activationTypeTokens = data;
      this.getAllBodyParts();
    },
    search(data) {
      this.bodyParts.filterData.fillData(data);
      this.getAllBodyParts();
    },
    async getAllBodyParts() {
      this.isLoading = true;
      try {
        this.bodyParts.bodyPartsData = [];
        this.bodyParts.filterData.parentBodyPartToken =
          this.parentBodyPartToken;
        this.bodyParts.filterData.getOnlyParentBodyParts = this
          .parentBodyPartToken
          ? false
          : true;

        const response = await apiBodyPart.getAll(this.bodyParts.filterData);
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
        this.bodyParts.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  watch: {
    parentBodyPartToken: function () {
      this.getAllBodyParts();
    },
  },
  async created() {
    this.getAllBodyParts();
  },
};
</script>
