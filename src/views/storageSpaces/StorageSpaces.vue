<template>
  <StorageSpacesComponent :key="storageSpaceTypeToken" v-if="hasData" />
</template>

<script>
import StorageSpacesComponent from "./StorageSpacesComponent.vue";

import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    StorageSpacesComponent,
  },
  computed: {
    hasData() {
      return this.storageSpaceTypeToken && this.modelName ? true : false;
    },
  },
  data() {
    return {
      storageSpaceTypeToken: "",
      modelName: "",
    };
  },
  methods: {
    updateModelName() {
      this.modelName = this.$route.meta.modelName;
    },
    updateStorageSpaceTypeToken() {
      this.storageSpaceTypeToken = this.$route.meta.storageSpaceTypeToken;
    },
  },
  created() {
    this.updateStorageSpaceTypeToken();
    this.updateModelName();
  },
  watch: {
    $route() {
      this.storageSpaceTypeToken = "";
      this.modelName = "";
      this.updateStorageSpaceTypeToken();
      this.updateModelName();
    },
  },
};
</script>
