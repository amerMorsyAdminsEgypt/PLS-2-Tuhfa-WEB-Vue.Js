<template>
  <div
    :class="
      className +
      (!withOutDesign ? ' form-label-group' : '') +
      (errors.length == 0 ? '' : ' form-group--error')
    "
  >
    <input
      :name="id"
      :id="id"
      type="text"
      v-model="theValue"
      class="form-control"
      @keypress="isFloat($event)"
      @paste="handlePaste($event)"
      placeholder=" "
      :maxlength="maxlength"
    />
    <label v-if="!withOutDesign" :for="id">{{
      title ? title : $t("notFound")
    }}</label>
    <img v-if="!withOutDesign" :src="require('@/assets/images/' + imgName)" />
    <img
      v-if="isSync"
      @click="emitGetLocation()"
      :title="$t('general.getLocation')"
      class="location-pin-icon"
      :src="require('@/assets/images/location-pin.svg')"
    />
    <span class="error" v-for="(error, index) in errors" :key="index">
      {{ error }}
    </span>
  </div>
</template>

<script>
import { numberToEn } from "./../../utils/functions";
import { isValidFloat } from "./../../utils/validationHelper";

export default {
  name: "CustomInputFloat",
  data() {
    return {
      theValue: this.value,
    };
  },
  methods: {
    emitGetLocation() {
      this.$emit("getLocation", "");
    },
    isFloat($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      // only allow number and one dot
      if (
        (keyCode < 48 || keyCode > 57) &&
        (keyCode !== 46 || this.value.toString().indexOf(".") != -1)
      ) {
        // 46 is dot
        $event.preventDefault();
      }

      // restrict to 2 decimal places
      // if (
      //   this.value != null &&
      //   this.value.indexOf(".") > -1 &&
      //   this.value.split(".")[1].length > this.digitsNumAfterDot
      // ) {
      //   $event.preventDefault();
      // }
    },
    handlePaste(e) {
      let char = (e.clipboardData || window.clipboardData).getData("text");
      if (isValidFloat(numberToEn(char))) return true;
      else e.preventDefault();
    },
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "textarea",
    },
    value: {
      default: "",
    },
    title: {
      type: String,
      default: "title",
    },
    imgName: {
      type: String,
      default: "man.svg",
    },
    maxlength: {
      type: Number,
      default: 1000000,
    },
    digitsNumAfterDot: {
      type: Number,
      default: 4,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    withOutDesign: {
      type: Boolean,
      default: false,
    },
    isSync: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value: function (val) {
      this.theValue = numberToEn(val);
    },
    theValue: function (val) {
      if (this.value != val) this.$emit("changeValue", numberToEn(val));
    },
  },
  async created() {},
};
</script>
