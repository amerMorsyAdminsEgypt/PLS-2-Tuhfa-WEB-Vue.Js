<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('colors', $event)"
      :viewType="generalSetting.colors.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.colors.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Colors.add')"
      :btnAddName="'ColorAdd'"
      :btnAddStatus="checkPrivilege(hasColorAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <ColorTable
          v-if="generalSetting.colors.viewType == VIEW_TYPES.table"
          v-on:setColorData="colors.color.fillData($event)"
          :colorsData="colors.colorsData"
          :defaultImg="colors.color.defaultImg"
          :filterData="colors.filterData"
        />

        <ColorCards
          v-else-if="generalSetting.colors.viewType == VIEW_TYPES.cards"
          v-on:setColorData="colors.color.fillData($event)"
          :colorsData="colors.colorsData"
          :defaultImg="colors.color.defaultImg"
          :filterData="colors.filterData"
        />

        <ActionsData :actionsData="colors.color" />
        <ColorInfo :color="colors.color" />
        <ColorDelete :color="colors.color" v-on:refresh="getAllColors()" />
        <ColorChangeActivationType
          :color="colors.color"
          v-on:refresh="getAllColors()"
        />
        <CustomBottomSheetQRCode
          :refName="'ColorQRCode'"
          :code="colors.color.fullCode"
          :codeTitle="$t('Colors.code')"
          :name="colors.color.colorNameCurrent"
          :nameTitle="$t('Colors.name')"
          :nameIcon="'colors.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="colors.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ColorFilter
        :theFilterData="colors.filterData"
        v-on:search="search($event)"
      />

      <ColorAdd :color="colors.color" v-on:refresh="getAllColors()" />
      <ColorUpdate :color="colors.color" v-on:refresh="getAllColors()" />
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
import ColorAdd from "./components/ColorAdd.vue";
import ColorUpdate from "./components/ColorUpdate.vue";
import ColorCards from "./components/ColorCards.vue";
import ColorTable from "./components/ColorTable.vue";
import ColorInfo from "./components/ColorInfo.vue";
import ColorDelete from "./components/ColorDelete.vue";
import ColorChangeActivationType from "./components/ColorChangeActivationType.vue";
import ColorFilter from "./components/ColorFilter.vue";
import Colors from "./../../../../models/settings/settingsOthers/colors/Colors";
import apiColor from "./../../../../api/settings/settingsOthers/colors";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasColorAdd,
  hasColorViewActive,
  hasColorViewArchive,
  hasColorViewBlocked,
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
    ColorAdd,
    ColorUpdate,
    ColorCards,
    ColorTable,
    ColorInfo,
    ColorDelete,
    ColorChangeActivationType,
    ColorFilter,
  },
  computed: {
    hasData() {
      return this.colors.colorsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasColorViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.colors.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasColorViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.colors.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasColorViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.colors.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      colors: new Colors(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasColorAdd,
    changePagination(pagination) {
      this.colors.filterData.fillData(pagination);
      this.getAllColors();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("colors", data);
      this.colors.filterData.activationTypeTokens = data;
      this.getAllColors();
    },
    search(data) {
      this.colors.filterData.fillData(data);
      this.getAllColors();
    },
    async getAllColors() {
      this.isLoading = true;
      try {
        this.colors.colorsData = [];
        const response = await apiColor.getAll(this.colors.filterData);
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
        this.colors.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllColors();
  },
};
</script>
