<template>
  <div class="alerts-list">
    <AlertMessage v-for="alert in alerts" :key="alert.id" :alert="alert" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AlertMessage from "./AlertMessage.vue";

export default {
  components: {
    AlertMessage,
  },
  computed: {
    ...mapGetters(["alerts"]),
  },
};
</script>
