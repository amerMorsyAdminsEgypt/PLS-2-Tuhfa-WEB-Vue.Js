<template>
  <EstablishmentRoleComponent
    v-if="hasData"
    :key="userTypeToken"
    :userTypeToken="userTypeToken"
    :modelName="modelName"
  />
</template>
<script>
import EstablishmentRoleComponent from "./EstablishmentRoleComponent.vue";

export default {
  components: {
    EstablishmentRoleComponent,
  },
  props: {},
  data() {
    return {
      userTypeToken: "",
      modelName: "",
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
  },
  async created() {
    await this.updateUsertypeToken();
    await this.updateModelName();
  },
  watch: {
    async $route() {
      this.userTypeToken = "";
      this.modelName = "";
      await this.updateUsertypeToken();
      await this.updateModelName();
    },
  },
};
</script>
