<template>
  <div class="">
    <DashboardNavbar />
    <PreLoader v-if="isLoading" />

    <GovernorateForm
      v-if="!isLoading"
      :governorate="governorate"
      v-on:addOrUpdateGovernorate="addOrUpdateGovernorate()"
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
  methods: {
    async addOrUpdateGovernorate() {
      this.isLoading = true;
      try {
        const response = await this.governorate.addOrUpdateGovernorate();
        if (response.data.status == STATUS.SUCCESS) {
          this.governorate.setInitialValue();
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
