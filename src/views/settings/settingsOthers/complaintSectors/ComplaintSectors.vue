<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('complaintSectors', $event)"
      :viewType="generalSetting.complaintSectors.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.complaintSectors.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :activationStatistics="complaintSectors.activationStatistics"
      :btnAddTitle="$t('ComplaintSectors.add')"
      :btnAddName="'ComplaintSectorAdd'"
      :btnAddStatus="checkPrivilege(hasComplaintSectorAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <ComplaintSectorTable
          v-if="generalSetting.complaintSectors.viewType == VIEW_TYPES.table"
          v-on:setComplaintSectorData="
            complaintSectors.complaintSector.fillData($event)
          "
          :complaintSectorsData="complaintSectors.complaintSectorsData"
          :defaultImg="complaintSectors.complaintSector.defaultImg"
          :filterData="complaintSectors.filterData"
        />

        <ComplaintSectorCards
          v-else-if="
            generalSetting.complaintSectors.viewType == VIEW_TYPES.cards
          "
          v-on:setComplaintSectorData="
            complaintSectors.complaintSector.fillData($event)
          "
          :complaintSectorsData="complaintSectors.complaintSectorsData"
          :defaultImg="complaintSectors.complaintSector.defaultImg"
          :filterData="complaintSectors.filterData"
        />

        <ActionsData :actionsData="complaintSectors.complaintSector" />
        <ComplaintSectorInfo
          :complaintSector="complaintSectors.complaintSector"
        />
        <ComplaintSectorDelete
          :complaintSector="complaintSectors.complaintSector"
          v-on:refresh="getAllComplaintSectors()"
        />
        <ComplaintSectorChangeActivationType
          :complaintSector="complaintSectors.complaintSector"
          v-on:refresh="getAllComplaintSectors()"
        />
        <CustomBottomSheetQRCode
          :refName="'ComplaintSectorQRCode'"
          :code="complaintSectors.complaintSector.fullCode"
          :codeTitle="$t('ComplaintSectors.code')"
          :name="complaintSectors.complaintSector.complaintSectorNameCurrent"
          :nameTitle="$t('ComplaintSectors.name')"
          :nameIcon="'complaintSectors.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="complaintSectors.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ComplaintSectorFilter
        :theFilterData="complaintSectors.filterData"
        v-on:search="search($event)"
      />

      <ComplaintSectorAdd
        :complaintSector="complaintSectors.complaintSector"
        v-on:refresh="getAllComplaintSectors()"
      />
      <ComplaintSectorUpdate
        :complaintSector="complaintSectors.complaintSector"
        v-on:refresh="getAllComplaintSectors()"
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
import ComplaintSectorAdd from "./components/ComplaintSectorAdd.vue";
import ComplaintSectorUpdate from "./components/ComplaintSectorUpdate.vue";
import ComplaintSectorCards from "./components/ComplaintSectorCards.vue";
import ComplaintSectorTable from "./components/ComplaintSectorTable.vue";
import ComplaintSectorInfo from "./components/ComplaintSectorInfo.vue";
import ComplaintSectorDelete from "./components/ComplaintSectorDelete.vue";
import ComplaintSectorChangeActivationType from "./components/ComplaintSectorChangeActivationType.vue";
import ComplaintSectorFilter from "./components/ComplaintSectorFilter.vue";
import ComplaintSectors from "./../../../../models/settings/settingsOthers/complaintSectors/ComplaintSectors";
import apiComplaintSector from "./../../../../api/settings/settingsOthers/complaintSectors";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasComplaintSectorAdd,
  hasComplaintSectorViewActive,
  hasComplaintSectorViewArchive,
  hasComplaintSectorViewBlocked,
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
    ComplaintSectorAdd,
    ComplaintSectorUpdate,
    ComplaintSectorCards,
    ComplaintSectorTable,
    ComplaintSectorInfo,
    ComplaintSectorDelete,
    ComplaintSectorChangeActivationType,
    ComplaintSectorFilter,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
    hasData() {
      return this.complaintSectors.complaintSectorsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasComplaintSectorViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.complaintSectors.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasComplaintSectorViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.complaintSectors.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasComplaintSectorViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.complaintSectors.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      complaintSectors: new ComplaintSectors(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasComplaintSectorAdd,
    changePagination(pagination) {
      this.complaintSectors.filterData.fillData(pagination);
      this.getAllComplaintSectors();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("complaintSectors", data);
      this.complaintSectors.filterData.activationTypeTokens = data;
      this.getAllComplaintSectors();
    },
    search(data) {
      this.complaintSectors.filterData.fillData(data);
      this.getAllComplaintSectors();
    },
    async getAllComplaintSectors() {
      this.isLoading = true;
      try {
        this.complaintSectors.complaintSectorsData = [];
        const response = await apiComplaintSector.getAll(
          this.complaintSectors.filterData
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
        this.complaintSectors.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllComplaintSectors();
  },
};
</script>
