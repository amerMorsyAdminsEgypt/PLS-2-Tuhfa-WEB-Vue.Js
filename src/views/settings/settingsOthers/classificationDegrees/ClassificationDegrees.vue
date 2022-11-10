<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('classificationDegrees', $event)"
      :viewType="generalSetting.classificationDegrees.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.classificationDegrees.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('ClassificationDegrees.add')"
      :btnAddName="'ClassificationDegreeAdd'"
      :btnAddStatus="checkPrivilege(hasClassificationDegreeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <ClassificationDegreeTable
          v-if="
            generalSetting.classificationDegrees.viewType == VIEW_TYPES.table
          "
          v-on:setClassificationDegreeData="
            classificationDegrees.classificationDegree.fillData($event)
          "
          :classificationDegreesData="
            classificationDegrees.classificationDegreesData
          "
          :defaultImg="classificationDegrees.classificationDegree.defaultImg"
          :filterData="classificationDegrees.filterData"
        />

        <ClassificationDegreeCards
          v-else-if="
            generalSetting.classificationDegrees.viewType == VIEW_TYPES.cards
          "
          v-on:setClassificationDegreeData="
            classificationDegrees.classificationDegree.fillData($event)
          "
          :classificationDegreesData="
            classificationDegrees.classificationDegreesData
          "
          :defaultImg="classificationDegrees.classificationDegree.defaultImg"
          :filterData="classificationDegrees.filterData"
        />

        <ActionsData
          :actionsData="classificationDegrees.classificationDegree"
        />
        <ClassificationDegreeInfo
          :classificationDegree="classificationDegrees.classificationDegree"
        />
        <ClassificationDegreeDelete
          :classificationDegree="classificationDegrees.classificationDegree"
          v-on:refresh="getAllClassificationDegrees()"
        />
        <ClassificationDegreeChangeActivationType
          :classificationDegree="classificationDegrees.classificationDegree"
          v-on:refresh="getAllClassificationDegrees()"
        />
        <CustomBottomSheetQRCode
          :refName="'ClassificationDegreeQRCode'"
          :code="classificationDegrees.classificationDegree.fullCode"
          :codeTitle="$t('ClassificationDegrees.code')"
          :name="
            classificationDegrees.classificationDegree
              .classificationDegreeNameCurrent
          "
          :nameTitle="$t('ClassificationDegrees.name')"
          :nameIcon="'classificationDegrees.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="classificationDegrees.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ClassificationDegreeFilter
        :theFilterData="classificationDegrees.filterData"
        v-on:search="search($event)"
      />

      <ClassificationDegreeAdd
        :classificationDegree="classificationDegrees.classificationDegree"
        v-on:refresh="getAllClassificationDegrees()"
      />
      <ClassificationDegreeUpdate
        :classificationDegree="classificationDegrees.classificationDegree"
        v-on:refresh="getAllClassificationDegrees()"
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
import ClassificationDegreeAdd from "./components/ClassificationDegreeAdd.vue";
import ClassificationDegreeUpdate from "./components/ClassificationDegreeUpdate.vue";
import ClassificationDegreeCards from "./components/ClassificationDegreeCards.vue";
import ClassificationDegreeTable from "./components/ClassificationDegreeTable.vue";
import ClassificationDegreeInfo from "./components/ClassificationDegreeInfo.vue";
import ClassificationDegreeDelete from "./components/ClassificationDegreeDelete.vue";
import ClassificationDegreeChangeActivationType from "./components/ClassificationDegreeChangeActivationType.vue";
import ClassificationDegreeFilter from "./components/ClassificationDegreeFilter.vue";
import ClassificationDegrees from "./../../../../models/settings/settingsOthers/classificationDegrees/ClassificationDegrees";
import apiClassificationDegree from "./../../../../api/settings/settingsOthers/classificationDegrees";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasClassificationDegreeAdd,
  hasClassificationDegreeViewActive,
  hasClassificationDegreeViewArchive,
  hasClassificationDegreeViewBlocked,
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
    ClassificationDegreeAdd,
    ClassificationDegreeUpdate,
    ClassificationDegreeCards,
    ClassificationDegreeTable,
    ClassificationDegreeInfo,
    ClassificationDegreeDelete,
    ClassificationDegreeChangeActivationType,
    ClassificationDegreeFilter,
  },
  computed: {
    hasData() {
      return this.classificationDegrees.classificationDegreesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasClassificationDegreeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.classificationDegrees.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClassificationDegreeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.classificationDegrees.activationStatistics.totalArchivedCount ||
          0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClassificationDegreeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.classificationDegrees.activationStatistics.totalBlockedCount ||
          0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      classificationDegrees: new ClassificationDegrees(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasClassificationDegreeAdd,
    changePagination(pagination) {
      this.classificationDegrees.filterData.fillData(pagination);
      this.getAllClassificationDegrees();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("classificationDegrees", data);
      this.classificationDegrees.filterData.activationTypeTokens = data;
      this.getAllClassificationDegrees();
    },
    search(data) {
      this.classificationDegrees.filterData.fillData(data);
      this.getAllClassificationDegrees();
    },
    async getAllClassificationDegrees() {
      this.isLoading = true;
      try {
        this.classificationDegrees.classificationDegreesData = [];
        const response = await apiClassificationDegree.getAll(
          this.classificationDegrees.filterData
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
        this.classificationDegrees.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllClassificationDegrees();
  },
};
</script>
