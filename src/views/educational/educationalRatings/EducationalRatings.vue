<template>
  <EducationalRatingsComponent
    :key="educationalRatingTypeToken"
    :educationalCategoryToken="educationalCategoryToken"
    :educationalGroupToken="educationalGroupToken"
    :educationalScheduleTimeToken="educationalScheduleTimeToken"
  />
</template>

<script>
import EducationalRatingsComponent from "./EducationalRatingsComponent";

export default {
  components: {
    EducationalRatingsComponent,
  },
  props: [
    "educationalCategoryToken",
    "educationalGroupToken",
    "educationalScheduleTimeToken",
  ],
  data() {
    return {};
  },
  computed: {
    educationalRatingTypeToken() {
      return this.$route.meta.educationalRatingTypeToken;
    },
  },
};
</script>
