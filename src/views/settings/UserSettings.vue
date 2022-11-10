<template>
  <div class="">
    <DashboardNavbar />
    <div class="app-content pagination-with-content">
      <UserSettingsTabs
        :key="userTypeTokenData"
        :userTypeToken="userTypeTokenData"
      />
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import UserSettingsTabs from "./UserSettingsTabs.vue";

export default {
  components: {
    DashboardNavbar,
    UserSettingsTabs,
  },
  props: {
    userTypeToken: {
      type: String,
      default: "",
    },
  },
  computed: {},
  data() {
    return {
      userTypeTokenData: "",
    };
  },
  methods: {
    async updateUsertypeToken() {
      this.userTypeTokenData =
        this.userTypeToken || this.$route.meta.userTypeToken;
    },
  },
  async created() {
    await this.updateUsertypeToken();
  },
  watch: {
    async $route() {
      this.userTypeTokenData = "";
      await this.updateUsertypeToken();
    },
  },
};
</script>
