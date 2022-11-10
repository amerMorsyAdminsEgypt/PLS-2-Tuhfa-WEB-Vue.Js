<template>
  <div class="">
    <DashboardNavbar />
    <PreLoader v-if="isLoading" />

    <GovernorateForm
      v-if="!isLoading"
      :governorate="governorate"
      v-on:addOrUpdateGovernorate="addOrUpdateGovernorate()"
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
import GovernorateForm from "@/components/settings/settingsOthers/governorates/GovernorateForm.vue";
import Governorate from "@/models/settings/settingsOthers/governorates/Governorate";

export default {
  mixins: [generalMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    GovernorateForm,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
  },
  data() {
    return {
      isLoading: false,
      language: localStorage.getItem("userLanguage") || "ar-EG",
      governorate: new Governorate(),
    };
  },
  props: ["governorateToken"],
  methods: {
    async addOrUpdateGovernorate() {
      this.isLoading = true;
      try {
        const response = await this.governorate.addOrUpdateGovernorate();
        if (response.data.status == STATUS.SUCCESS) {
          this.governorate.setInitialValue();
          this.showMsg(response.data.msg, true);
          this.$router.push({ name: "Governorates" }).catch(() => {});
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
    async getGovernorateDetails() {
      this.isLoading = true;
      this.governorate.governorateToken = this.governorateToken;
      try {
        let response = await this.governorate.getGovernorateDetails();
        if (response.data.status == STATUS.SUCCESS) {
          this.governorate.fillData(response.data.governorate);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
          this.$router.push({ name: "Governorates" }).catch(() => {});
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.$router.push({ name: "Governorates" }).catch(() => {});
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getGovernorateDetails();
  },
};
</script>
