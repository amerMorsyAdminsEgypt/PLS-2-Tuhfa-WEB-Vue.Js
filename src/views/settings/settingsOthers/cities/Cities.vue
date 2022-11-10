<template>
  <div class="">
    <DashboardNavbar />
    <PreLoader v-if="isLoading" />

    <div class="pagination-with-content">
      <template v-if="hasData">
        <CitiesTable
          v-if="generalSetting.cities.viewType == 'table'"
          :citiesData="cities.citiesData"
          :cityData="cities.city"
          v-on:setCityData="cities.city.fillData($event)"
          :defaultImg="cities.city.defaultImg"
          :pagination="cities.pagination"
        />

        <CitiesCards
          v-else
          :citiesData="cities.citiesData"
          :cityData="cities.city"
          v-on:setCityData="cities.city.fillData($event)"
          :defaultImg="cities.city.defaultImg"
          :pagination="cities.pagination"
        />

        <ActionsData :actionsData="cities.city" />
        <CityInfo :city="cities.city" />
        <CityDelete :city="cities.city" v-on:refresh="getAllCities()" />
        <CityQRCode :city="cities.city" />
      </template>
      <template v-else>
        <ExceptionWithImg :msg="exceptionMsg" :image="exceptionImg" />
      </template>
      <CustomPagination
        v-if="!isLoading"
        :paginationData="cities.pagination"
        v-on:changePagination="changePagination($event)"
      />
    </div>

    <CityFloatBtns
      :theFilterData="cities.filterData"
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
import CitiesCards from "@/components/settings/settingsOthers/cities/CitiesCards.vue";
import CitiesTable from "@/components/settings/settingsOthers/cities/CitiesTable.vue";
import CityQRCode from "@/components/settings/settingsOthers/cities/CityQRCode.vue";
import CityInfo from "@/components/settings/settingsOthers/cities/CityInfo.vue";
import CityDelete from "@/components/settings/settingsOthers/cities/CityDelete.vue";
import CityFloatBtns from "@/components/settings/settingsOthers/cities/CityFloatBtns.vue";
import CustomPagination from "@/components/general/CustomPagination.vue";
import Cities from "@/models/settings/settingsOthers/cities/Cities";
import generalSettingsMixin from "@/utils/generalSettingsMixin";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CitiesCards,
    CitiesTable,
    CityQRCode,
    CityInfo,
    CityDelete,
    CityFloatBtns,
    CustomPagination,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
    hasData() {
      return this.cities.citiesData != undefined && this.cities.citiesData != 0;
    },
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: "illustrator-noData.svg",
      language: localStorage.getItem("userLanguage") || "ar-EG",
      cities: new Cities(),
    };
  },
  methods: {
    changePagination(pagination) {
      this.cities.pagination.fillData(pagination);
      this.getAllCities();
    },
    search(data) {
      this.cities.filterData = data;
      this.cities.citiesData = [];
      this.getAllCities();
    },
    async getAllCities() {
      this.isLoading = true;
      try {
        this.cities.citiesData = [];
        const response = await this.cities.city.getAllCities(
          this.cities.pagination,
          this.cities.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.cities.fillData(response.data);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
          this.cities.fillData(response.data);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.cities.fillData(response.data);
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
    this.getAllCities();
  },
};
</script>
