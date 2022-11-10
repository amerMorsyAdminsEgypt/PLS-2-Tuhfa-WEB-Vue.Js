<template>
  <div class="">
    <DashboardNavbar />
    <PreLoader v-if="isLoading" />

    <div class="pagination-with-content">
      <template v-if="hasData">
        <DistrictsTable
          v-if="generalSetting.districts.viewType == 'table'"
          :districtsData="districts.districtsData"
          :districtData="districts.district"
          v-on:setDistrictData="districts.district.fillData($event)"
          :defaultImg="districts.district.defaultImg"
          :pagination="districts.pagination"
        />

        <DistrictsCards
          v-else
          :districtsData="districts.districtsData"
          :districtData="districts.district"
          v-on:setDistrictData="districts.district.fillData($event)"
          :defaultImg="districts.district.defaultImg"
          :pagination="districts.pagination"
        />

        <ActionsData :actionsData="districts.district" />
        <DistrictInfo :district="districts.district" />
        <DistrictDelete
          :district="districts.district"
          v-on:refresh="getAllDistricts()"
        />
        <DistrictQRCode :district="districts.district" />
      </template>
      <template v-else>
        <ExceptionWithImg :msg="exceptionMsg" :image="exceptionImg" />
      </template>
      <CustomPagination
        v-if="!isLoading"
        :paginationData="districts.pagination"
        v-on:changePagination="changePagination($event)"
      />
    </div>

    <DistrictFloatBtns
      :theFilterData="districts.filterData"
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
import DistrictsCards from "@/components/settings/settingsOthers/districts/DistrictsCards.vue";
import DistrictsTable from "@/components/settings/settingsOthers/districts/DistrictsTable.vue";
import DistrictQRCode from "@/components/settings/settingsOthers/districts/DistrictQRCode.vue";
import DistrictInfo from "@/components/settings/settingsOthers/districts/DistrictInfo.vue";
import DistrictDelete from "@/components/settings/settingsOthers/districts/DistrictDelete.vue";
import DistrictFloatBtns from "@/components/settings/settingsOthers/districts/DistrictFloatBtns.vue";
import CustomPagination from "@/components/general/CustomPagination.vue";
import Districts from "@/models/settings/settingsOthers/districts/Districts";
import generalSettingsMixin from "@/utils/generalSettingsMixin";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    DistrictsCards,
    DistrictsTable,
    DistrictQRCode,
    DistrictInfo,
    DistrictDelete,
    DistrictFloatBtns,
    CustomPagination,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
    hasData() {
      return (
        this.districts.districtsData != undefined &&
        this.districts.districtsData != 0
      );
    },
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: "illustrator-noData.svg",
      language: localStorage.getItem("userLanguage") || "ar-EG",
      districts: new Districts(),
    };
  },
  methods: {
    changePagination(pagination) {
      this.districts.pagination.fillData(pagination);
      this.getAllDistricts();
    },
    search(data) {
      this.districts.filterData = data;
      this.districts.districtsData = [];
      this.getAllDistricts();
    },
    async getAllDistricts() {
      this.isLoading = true;
      try {
        this.districts.districtsData = [];
        const response = await this.districts.district.getAllDistricts(
          this.districts.pagination,
          this.districts.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.districts.fillData(response.data);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
          this.districts.fillData(response.data);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.districts.fillData(response.data);
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
    this.getAllDistricts();
  },
};
</script>
