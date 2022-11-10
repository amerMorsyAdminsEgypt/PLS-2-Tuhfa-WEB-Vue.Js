<template>
  <UserLoginCodeComponent
    v-if="hasData"
    :key="userTypeToken"
    :userTypeToken="userTypeToken"
    :modelName="modelName"
    :userToken="userToken"
  />
</template>
<script>
import UserLoginCodeComponent from "./UserLoginCodeComponent.vue";

export default {
  components: {
    UserLoginCodeComponent,
  },

  data() {
    return {
      userTypeToken: "",
      modelName: "",
      userToken: "",
    };
  },
  computed: {
    hasData() {
      return this.userTypeToken && this.modelName ? true : false;
    },
  },
  methods: {
    async updateUsertypeToken() {
      this.userTypeToken = this.$route.meta.userTypeToken;
    },
    async updateModelName() {
      this.modelName = this.$route.meta.modelName;
    },
    async updateUserToken() {
      this.userToken = this.$route.params.userToken ?? "";
    },
  },
  async created() {
    await this.updateUsertypeToken();
    await this.updateModelName();
    await this.updateUserToken();
  },
  watch: {
    async $route() {
      this.userTypeToken = "";
      this.modelName = "";
      this.userToken = "";
      await this.updateUsertypeToken();
      await this.updateModelName();
      await this.updateUserToken();
    },
  },
};
</script>
