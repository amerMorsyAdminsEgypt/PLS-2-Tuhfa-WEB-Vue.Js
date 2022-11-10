<template>
  <div>
    <router-link
      :to="{ name: DEFAULT_PAGES.notLoggedIn }"
      class="error-404-container"
    >
      <img src="@/assets/images/not-authenticated.svg" />
    </router-link>
  </div>
</template>

<script>
import { DEFAULT_PAGES } from "./../../utils/constants";

export default {
  data() {
    return {
      DEFAULT_PAGES,
    };
  },
  methods: {},
};
</script>
