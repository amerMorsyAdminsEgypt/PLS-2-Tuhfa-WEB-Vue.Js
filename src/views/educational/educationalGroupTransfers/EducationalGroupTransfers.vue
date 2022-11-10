<template>
  <div class="">
    <DashboardNavbar
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <EducationalGroupTransferTable
          v-on:setEducationalGroupTransferData="
            educationalGroupTransfers.educationalGroupTransfer.fillData($event)
          "
          :educationalGroupTransfersData="
            educationalGroupTransfers.educationalGroupTransfersData
          "
          :defaultImg="
            educationalGroupTransfers.educationalGroupTransfer.defaultImg
          "
          :filterData="educationalGroupTransfers.filterData"
        />

        <ActionsData
          :actionsData="educationalGroupTransfers.educationalGroupTransfer"
        />
        <EducationalGroupTransferInfo
          :educationalGroupTransfer="
            educationalGroupTransfers.educationalGroupTransfer
          "
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="educationalGroupTransfers.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <EducationalGroupTransferFilter
        :theFilterData="educationalGroupTransfers.filterData"
        v-on:search="search($event)"
      />
    </div>
  </div>
</template>

<script>
import { STATUS } from "./../../../utils/constants";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import EducationalGroupTransferTable from "./components/EducationalGroupTransferTable.vue";
import EducationalGroupTransferInfo from "./components/EducationalGroupTransferInfo.vue";
import EducationalGroupTransferFilter from "./components/EducationalGroupTransferFilter.vue";
import EducationalGroupTransfers from "./../../../models/educational/educationalGroupTransfers/EducationalGroupTransfers";
import apiEducationalGroupTransfer from "./../../../api/educational/educationalGroupTransfers";
import generalMixin from "./../../../utils/generalMixin";
import { checkPrivilege } from "./../../../utils/functions";
import { hasEducationalGroupTransferAdd } from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomPagination,
    EducationalGroupTransferTable,
    EducationalGroupTransferInfo,
    EducationalGroupTransferFilter,
  },
  computed: {
    hasData() {
      return (
        this.educationalGroupTransfers.educationalGroupTransfersData.length != 0
      );
    },
  },
  props: {
    educationalGroupToken: {
      type: String,
      default: "",
    },
    educationalCategoryToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      educationalGroupTransfers: new EducationalGroupTransfers(),
    };
  },
  methods: {
    checkPrivilege,
    hasEducationalGroupTransferAdd,
    changePagination(pagination) {
      this.educationalGroupTransfers.filterData.fillData(pagination);
      this.getAllEducationalGroupTransfers();
    },

    search(data) {
      this.educationalGroupTransfers.filterData.fillData(data);
      this.getAllEducationalGroupTransfers();
    },
    async getAllEducationalGroupTransfers() {
      this.isLoading = true;
      try {
        this.educationalGroupTransfers.educationalGroupTransfersData = [];
        const response = await apiEducationalGroupTransfer.getAll(
          this.educationalGroupTransfers.filterData
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
        this.educationalGroupTransfers.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllEducationalGroupTransfers();
  },
};
</script>
