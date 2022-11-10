<template>
  <!-- :key="isRefreshed" -->
  <PlaceUsersComponent
    v-if="hasData"
    :isPlaceMain="isPlaceMain"
    :isUserMain="isUserMain"
    :placeTypeToken="placeTypeToken"
    :placeToken="placeToken"
    :placeModelName="placeModelName"
    :userTypeToken="userTypeToken"
    :userToken="userToken"
    :userModelName="userModelName"
  />
</template>

<script>
import PlaceUsersComponent from "./PlaceUsersComponent.vue";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    PlaceUsersComponent,
  },
  props: {
    placeTypeToken: {
      type: String,
      default: "",
    },
    placeToken: {
      type: String,
      default: "",
    },
    placeModelName: {
      type: String,
      default: "",
    },
    userTypeToken: {
      type: String,
      default: "",
    },
    userToken: {
      type: String,
      default: "",
    },
    userModelName: {
      type: String,
      default: "",
    },
  },
  computed: {
    isPlaceMain() {
      return this.placeTypeToken.trim() && this.placeToken.trim()
        ? true
        : false;
    },
    isUserMain() {
      return this.userTypeToken.trim() && this.userToken.trim() ? true : false;
    },
    hasData() {
      return this.isPlaceMain || this.isUserMain ? true : false;
    },
  },

  data() {
    return {
      isRefreshed: false,
    };
  },
  methods: {},
  async created() {},
  watch: {
    async $route() {
      this.isRefreshed != this.isRefreshed;
    },
  },
};
</script>
