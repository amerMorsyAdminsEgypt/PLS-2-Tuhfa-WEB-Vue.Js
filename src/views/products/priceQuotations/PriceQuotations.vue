<template>
  <PriceQuotationsComponent :key="tabNumber" :tabNumber="tabNumber" />
</template>

<script>
import PriceQuotationsComponent from "./PriceQuotationsComponent.vue";

export default {
  components: {
    PriceQuotationsComponent,
  },
  data() {
    return {
      tabNumber: "",
    };
  },
  methods: {
    updateTabNumber() {
      this.tabNumber = this.$route.meta.tabNumber;
    },
  },
  created() {
    this.updateTabNumber();
  },
  watch: {
    $route() {
      this.tabNumber = "";
      this.updateTabNumber();
    },
  },
};
</script>
