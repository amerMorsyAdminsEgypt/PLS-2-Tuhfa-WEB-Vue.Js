<template>
  <div class="">
    <DashboardNavbar />
    <PreLoader v-if="isLoading" />

    <div class="pagination-with-content">
      <template v-if="hasData">
        <GovernoratesTable
          v-if="generalSetting.governorates.viewType == 'table'"
          :governoratesData="governorates.governoratesData"
          :governorateData="governorates.governorate"
          v-on:setGovernorateData="governorates.governorate.fillData($event)"
          :defaultImg="governorates.governorate.defaultImg"
          :pagination="governorates.pagination"
        />
        <GovernoratesCards
          v-else
          :governoratesData="governorates.governoratesData"
          :governorateData="governorates.governorate"
          v-on:setGovernorateData="governorates.governorate.fillData($event)"
          :defaultImg="governorates.governorate.defaultImg"
          :pagination="governorates.pagination"
        />
        <ActionsData :actionsData="governorates.governorate" />
        <GovernorateInfo :governorate="governorates.governorate" />
        <GovernorateDelete
          :governorate="governorates.governorate"
          v-on:refresh="getAllGovernorates()"
        />
        <GovernorateQRCode :governorate="governorates.governorate" />
      </template>
      <template v-else>
        <ExceptionWithImg :msg="exceptionMsg" :image="exceptionImg" />
      </template>
      <CustomPagination
        v-if="!isLoading"
        :paginationData="governorates.pagination"
        v-on:changePagination="changePagination($event)"
      />
    </div>

    <GovernorateFloatBtns
      :theFilterData="governorates.filterData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import generalMixin from "@/utils/generalMixin";
import DashboardNavbar from "./../../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ActionsData from "@/components/general/ActionsData.vue";
import GovernoratesCards from "@/components/settings/settingsOthers/governorates/GovernoratesCards.vue";
import GovernoratesTable from "@/components/settings/settingsOthers/governorates/GovernoratesTable.vue";
import GovernorateQRCode from "@/components/settings/settingsOthers/governorates/GovernorateQRCode.vue";
import GovernorateInfo from "@/components/settings/settingsOthers/governorates/GovernorateInfo.vue";
import GovernorateDelete from "@/components/settings/settingsOthers/governorates/GovernorateDelete.vue";
import GovernorateFloatBtns from "@/components/settings/settingsOthers/governorates/GovernorateFloatBtns.vue";
import CustomPagination from "@/components/general/CustomPagination.vue";
import Governorates from "@/models/settings/settingsOthers/governorates/Governorates";
import generalSettingsMixin from "@/utils/generalSettingsMixin";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    GovernoratesCards,
    GovernoratesTable,
    GovernorateQRCode,
    GovernorateInfo,
    GovernorateDelete,
    GovernorateFloatBtns,
    CustomPagination,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
    hasData() {
      return (
        this.governorates.governoratesData != undefined &&
        this.governorates.governoratesData != 0
      );
    },
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: "illustrator-noData.svg",
      language: localStorage.getItem("userLanguage") || "ar-EG",
      governorates: new Governorates(),
    };
  },
  methods: {
    changePagination(pagination) {
      this.governorates.pagination.fillData(pagination);
      this.getAllGovernorates();
    },
    search(data) {
      this.governorates.filterData = data;
      this.governorates.governoratesData = [];
      this.getAllGovernorates();
    },
    async getAllGovernorates() {
      this.isLoading = true;
      try {
        this.governorates.governoratesData = [];
        const response = await this.governorates.governorate.getAllGovernorates(
          this.governorates.pagination,
          this.governorates.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.governorates.fillData(response.data);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
          this.governorates.fillData(response.data);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.governorates.fillData(response.data);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-something-wrong.svg";
        }
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = "illustrator-something-wrong.svg";
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllGovernorates();
  },
};
</script>
