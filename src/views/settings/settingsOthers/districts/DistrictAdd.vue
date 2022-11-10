<template>
  <div class="">
    <DashboardNavbar />
    <PreLoader v-if="isLoading" />

    <DistrictForm
      v-if="!isLoading"
      :district="district"
      v-on:addOrUpdateDistrict="addOrUpdateDistrict()"
      :submitName="$t('add')"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import generalMixin from "@/utils/generalMixin";
import DashboardNavbar from "./../../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "@/components/general/PreLoader.vue";
import { STATUS } from "@/utils/constants";
import DistrictForm from "@/components/settings/settingsOthers/districts/DistrictForm.vue";
import District from "@/models/settings/settingsOthers/districts/District";

export default {
  mixins: [generalMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    DistrictForm,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
  },
  data() {
    return {
      isLoading: false,
      language: localStorage.getItem("userLanguage") || "ar-EG",
      district: new District(),
    };
  },
  methods: {
    async addOrUpdateDistrict() {
      this.isLoading = true;
      try {
        const response = await this.district.addOrUpdateDistrict();
        if (response.data.status == STATUS.SUCCESS) {
          this.district.setInitialValue();
          this.showMsg(response.data.msg, true);
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
  },
  async created() {},
};
</script>
