<template>
  <SystemComponentsComponent
    :key="systemTypeToken"
    v-if="hasData"
    :systemTypeToken="systemTypeToken"
    :modelName="modelName"
  />
</template>

<script>
import SystemComponentsComponent from "./SystemComponentsComponent.vue";

import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    SystemComponentsComponent,
  },
  computed: {
    hasData() {
      return this.systemTypeToken && this.modelName ? true : false;
    },
  },
  props: {
    userToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      systemTypeToken: "",
      modelName: "",
    };
  },
  methods: {
    async updateSystemTypeToken() {
      this.systemTypeToken = this.$route.meta.systemTypeToken;
    },
    async updateModelName() {
      this.modelName = this.$route.meta.modelName;
    },
  },
  async created() {
    await this.updateSystemTypeToken();
    await this.updateModelName();
  },
  watch: {
    async $route() {
      this.systemTypeToken = "";
      this.modelName = "";
      await this.updateSystemTypeToken();
      await this.updateModelName();
    },
  },
};
</script>
