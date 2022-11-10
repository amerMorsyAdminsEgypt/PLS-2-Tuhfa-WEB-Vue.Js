<template>
  <div>
    <b-alert show dismissible :variant="alert.type">
      <h6 class="alert-content">{{ alert.message }}</h6>
    </b-alert>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["alert"],
  data() {
    return {
      dismissSecs: 5,
      timeout: null,
    };
  },
  methods: {
    ...mapActions(["removeAlert"]),
  },
  created() {
    this.timeout = setTimeout(() => {
      this.removeAlert(this.alert);
    }, this.dismissSecs * 1000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>
