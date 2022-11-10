<template>
  <div class="">
    <DashboardNavbar />
    <PreLoader v-if="isLoading" />

    <CityForm
      v-if="!isLoading"
      :city="city"
      v-on:addOrUpdateCity="addOrUpdateCity()"
      :submitName="$t('edit')"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import generalMixin from "@/utils/generalMixin";
import DashboardNavbar from "./../../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "@/components/general/PreLoader.vue";
import { STATUS } from "@/utils/constants";
import CityForm from "@/components/settings/settingsOthers/cities/CityForm.vue";
import City from "@/models/settings/settingsOthers/cities/City";

export default {
  mixins: [generalMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    CityForm,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
  },
  data() {
    return {
      isLoading: false,
      language: localStorage.getItem("userLanguage") || "ar-EG",
      city: new City(),
    };
  },
  props: ["cityToken"],
  methods: {
    async addOrUpdateCity() {
      this.isLoading = true;
      try {
        const response = await this.city.addOrUpdateCity();
        if (response.data.status == STATUS.SUCCESS) {
          this.city.setInitialValue();
          this.showMsg(response.data.msg, true);
          this.$router.push({ name: "Cities" }).catch(() => {});
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async getCityDetails() {
      this.isLoading = true;
      this.city.cityToken = this.cityToken;
      try {
        let response = await this.city.getCityDetails();
        if (response.data.status == STATUS.SUCCESS) {
          this.city.fillData(response.data.city);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
          this.$router.push({ name: "Cities" }).catch(() => {});
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.$router.push({ name: "Cities" }).catch(() => {});
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getCityDetails();
  },
};
</script>
