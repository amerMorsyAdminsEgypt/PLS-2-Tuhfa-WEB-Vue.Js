<template>
  <PlacesComponent
    v-if="hasData"
    :key="placeTypeToken"
    :placeTypeToken="placeTypeToken"
    :modelName="modelName"
    :parentPlaceToken="parentPlaceToken"
  />
</template>

<script>
import PlacesComponent from "./PlacesComponent.vue";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    PlacesComponent,
  },
  computed: {
    hasData() {
      return this.placeTypeToken && this.modelName ? true : false;
    },
  },
  props: {
    parentPlaceToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      placeTypeToken: "",
      modelName: "",
    };
  },
  methods: {
    async updatePlacetypeToken() {
      this.placeTypeToken = this.$route.meta.placeTypeToken;
    },
    async updateModelName() {
      this.modelName = this.$route.meta.modelName;
    },
  },
  async created() {
    await this.updatePlacetypeToken();
    await this.updateModelName();
  },
  watch: {
    async $route() {
      this.placeTypeToken = "";
      this.modelName = "";
      await this.updatePlacetypeToken();
      await this.updateModelName();
    },
  },
};
</script>
