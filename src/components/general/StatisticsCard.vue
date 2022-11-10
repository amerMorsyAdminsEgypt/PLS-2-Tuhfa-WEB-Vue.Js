<template>
  <div :class="className">
    <div class="statistics-new-card">
      <div class="statistics-new-card-content">
        <h2 class="statistics-new-card-number">{{ totalNumber }}</h2>
      </div>
      <div class="statistics-new-card-icon">
        <img v-if="icon" :src="require('@/assets/images/' + icon)" />
      </div>
      <div class="statistics-new-card-bar">
        <h3 class="statistics-new-card-title">
          {{ title || $t("notFound") }}
        </h3>
        <b-progress v-if="showPercentage" :title="percentage.title">
          <b-progress-bar
            :value="percentage.value"
            :label="percentage.title"
          ></b-progress-bar>
        </b-progress>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatisticsCard",
  props: {
    className: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    totalNumber: {
      type: String,
      default: "",
    },
    showPercentage: {
      type: Boolean,
      default: false,
    },
    percentage: {
      type: Object,
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  async created() {},
};
</script>

<style lang="scss"></style>
