<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('simpleExamModels', $event)"
      :viewType="generalSetting.simpleExamModels.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.simpleExamModels.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('SimpleExamModels.add')"
      :btnAddName="'SimpleExamModelAdd'"
      :btnAddStatus="checkPrivilege(hasSimpleExamModelAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <SimpleExamModelTable
          v-if="generalSetting.simpleExamModels.viewType == VIEW_TYPES.table"
          v-on:setSimpleExamModelData="
            simpleExamModels.simpleExamModel.fillData($event);
            simpleExamModels.simpleExamModelModel.fillData($event);
          "
          :simpleExamModelsData="simpleExamModels.simpleExamModelsData"
          :defaultImg="simpleExamModels.simpleExamModel.defaultImg"
          :filterData="simpleExamModels.filterData"
        />

        <SimpleExamModelCards
          v-else-if="
            generalSetting.simpleExamModels.viewType == VIEW_TYPES.cards
          "
          v-on:setSimpleExamModelData="
            simpleExamModels.simpleExamModel.fillData($event);
            simpleExamModels.simpleExamModelModel.fillData($event);
          "
          :simpleExamModelsData="simpleExamModels.simpleExamModelsData"
          :defaultImg="simpleExamModels.simpleExamModel.defaultImg"
          :filterData="simpleExamModels.filterData"
        />

        <ActionsData :actionsData="simpleExamModels.simpleExamModel" />
        <SimpleExamModelInfo
          :simpleExamToken="
            simpleExamModels.simpleExamModel.simpleExamModelToken
          "
          v-on:ItemImageUpdate="
            itemType = $event.itemType;
            itemToken = $event.itemToken;
            canDeleteFile = $event.canDeleteFile;
          "
        />
        <!-- <ItemImageUpdate
          :itemType="itemType"
          :itemToken="itemToken"
          :canDeleteFile="canDeleteFile"
          v-on:getDetails="getDetails($event)"
        /> -->
        <SimpleExamModelDelete
          :simpleExamModel="simpleExamModels.simpleExamModel"
          v-on:refresh="getAllSimpleExamModels()"
        />
        <SimpleExamModelChangeActivationType
          :simpleExamModel="simpleExamModels.simpleExamModel"
          v-on:refresh="getAllSimpleExamModels()"
        />
        <CustomBottomSheetQRCode
          :refName="'SimpleExamModelQRCode'"
          :code="simpleExamModels.simpleExamModel.fullCode"
          :codeTitle="$t('SimpleExamModels.code')"
          :name="simpleExamModels.simpleExamModel.simpleExamModelTitleCurrent"
          :nameTitle="$t('SimpleExamModels.title')"
          :nameIcon="'SimpleExamModels.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="simpleExamModels.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <SimpleExamModelFilter
        :theFilterData="simpleExamModels.filterData"
        v-on:search="search($event)"
      />

      <SimpleExamModelAdd
        :simpleExamModel="simpleExamModels.simpleExamModelModel"
        v-on:refresh="getAllSimpleExamModels()"
      />
      <SimpleExamModelUpdate
        :simpleExamModel="simpleExamModels.simpleExamModelModel"
        v-on:refresh="getAllSimpleExamModels()"
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
import SimpleExamModelAdd from "./components/SimpleExamModelAdd.vue";
import SimpleExamModelUpdate from "./components/SimpleExamModelUpdate.vue";
import SimpleExamModelCards from "./components/SimpleExamModelCards.vue";
import SimpleExamModelTable from "./components/SimpleExamModelTable.vue";
import SimpleExamModelInfo from "./components/SimpleExamModelInfo.vue";
// import ItemImageUpdate from "./components/ItemImageUpdate.vue";
import SimpleExamModelDelete from "./components/SimpleExamModelDelete.vue";
import SimpleExamModelChangeActivationType from "./components/SimpleExamModelChangeActivationType.vue";
import SimpleExamModelFilter from "./components/SimpleExamModelFilter.vue";
import SimpleExamModels from "./../../../models/educational/simpleExamModels/SimpleExamModels";
import apiSimpleExamModel from "./../../../api/educational/simpleExamModels";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasSimpleExamModelAdd,
  hasSimpleExamModelViewActive,
  hasSimpleExamModelViewArchive,
  hasSimpleExamModelViewBlocked,
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
    SimpleExamModelAdd,
    SimpleExamModelUpdate,
    SimpleExamModelCards,
    SimpleExamModelTable,
    SimpleExamModelInfo,
    // ItemImageUpdate,
    SimpleExamModelDelete,
    SimpleExamModelChangeActivationType,
    SimpleExamModelFilter,
  },
  computed: {
    hasData() {
      return this.simpleExamModels.simpleExamModelsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasSimpleExamModelViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.simpleExamModels.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSimpleExamModelViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.simpleExamModels.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSimpleExamModelViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.simpleExamModels.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  props: {
    simpleExamModelToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // itemType: "",
      // itemToken: "",
      // canDeleteFile: "",
      simpleExamModels: new SimpleExamModels(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasSimpleExamModelAdd,
    changePagination(pagination) {
      this.simpleExamModels.filterData.fillData(pagination);
      this.getAllSimpleExamModels();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("simpleExamModels", data);
      this.simpleExamModels.filterData.activationTypeTokens = data;
      this.getAllSimpleExamModels();
    },
    search(data) {
      this.simpleExamModels.filterData.fillData(data);
      this.getAllSimpleExamModels();
    },

    async getAllSimpleExamModels() {
      this.isLoading = true;
      try {
        this.simpleExamModels.filterData.educationalCategoryDataInclude = true;
        this.simpleExamModels.filterData.simpleExamParagraphDataInclude = true;
        this.simpleExamModels.simpleExamModelsData = [];
        const response = await apiSimpleExamModel.getAll(
          this.simpleExamModels.filterData
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
        this.simpleExamModels.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.simpleExamModels.filterData.simpleExamModelToken =
      this.simpleExamModelToken;
    this.getAllSimpleExamModels();
  },
};
</script>
