<template>
  <div v-if="!showAsInfo">
    <div class="form-label-group">
      <star-rating
        class="form-control vue-star-rating-with-input"
        :show-rating="showRating"
        :max-rating="starsNumber"
        :increment="increment"
        :rtl="rtl"
        v-model="theValue"
      ></star-rating>
      <label :for="id">{{ title ? title : $t("notFound") }}</label>
      <img :src="require('@/assets/images/' + imgName)" />
    </div>
  </div>
  <div v-else>
    <star-rating
      class="vue-star-rating-with-info"
      :show-rating="showRating"
      :max-rating="starsNumber"
      :read-only="true"
      :increment="increment"
      :rtl="rtl"
      v-model="theValue"
    ></star-rating>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { getLanguage } from "@/utils/functions";
import { LANGUAGES } from "@/utils/constants";

export default {
  name: "CustomRatingStars",
  components: {
    StarRating,
  },
  data() {
    return {
      theValue: this.value,
      language: getLanguage(),
    };
  },
  computed: {
    rtl() {
      if (this.language == LANGUAGES.arEG) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {},
  props: {
    id: {
      type: String,
      default: "CustomRatingStars",
    },
    value: {
      default: 0,
    },
    title: {
      type: String,
      default: "title",
    },
    imgName: {
      type: String,
      default: "man.svg",
    },
    starsNumber: {
      type: Number,
      default: 5,
    },
    increment: {
      type: Number,
      default: 0.5,
    },
    showAsInfo: {
      type: Boolean,
      default: false,
    },
    showRating: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value: function (val) {
      this.theValue = val;
    },
    theValue: function (val) {
      if (this.value != val) this.$emit("changeValue", val);
    },
  },
  async created() {},
};
</script>

<style lang="scss"></style>
