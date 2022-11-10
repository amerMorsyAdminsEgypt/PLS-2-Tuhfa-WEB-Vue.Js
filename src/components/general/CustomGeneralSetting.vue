<template>
  <div class="d-flex flex-wrap justify-content-end">
    <PreLoader v-if="isLoading" />

    <button
      v-if="viewType == 'cards'"
      type="button"
      class="btn btn-outline-info m-2"
      @click="displayAsTable()"
    >
      {{ $t("general.viewAsTable") }}
    </button>
    <button
      v-if="viewType == 'table'"
      type="button"
      class="btn btn-outline-info m-2"
      @click="displayAsCards()"
    >
      {{ $t("general.viewAsCards") }}
    </button>

    <CustomSelectBox
      :className="'col-3'"
      :id="'sortTokens'"
      :value="activationType"
      :options="activationTypesTokenOptions"
      v-on:changeValue="updateActivationType($event)"
      :title="$t('general.selectActivationType')"
      :imgName="'changeActivationType.svg'"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "@/components/general/PreLoader.vue";
import generalMixin from "@/utils/generalMixin";
import { setDataMultiLang } from "@/utils/functions";
import { ACTIVATION_TYPE } from "@/utils/constantLists";

import CustomSelectBox from "@/components/general/CustomSelectBox.vue";

export default {
  name: "CustomGeneralSetting",
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomSelectBox,
  },
  data() {
    return {
      isLoading: false,
      activationType: this.activationTypeToken,
      activationTypesTokenOptions: [],
    };
  },
  computed: {
    ...mapGetters(["constantsListsData"]),
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    viewType: {
      type: String,
      default: "table",
    },
    activationTypeToken: {
      type: String,
      default: "",
    },
  },
  watch: {},
  methods: {
    async getDialogOfActivationTypes() {
      this.isLoading = true;
      this.activationTypesTokenOptions = [];
      let activationTypes = this.constantsListsData.listActivationType;
      if (activationTypes.length) {
        for (let item in activationTypes) {
          this.activationTypesTokenOptions.push({
            value: activationTypes[item]["itemToken"],
            text: setDataMultiLang(
              this.language,
              activationTypes[item]["itemNameAr"],
              activationTypes[item]["itemNameEn"]
            ),
          });
        }
      }
      this.isLoading = false;
    },
    displayAsTable() {
      this.$emit("displayAsTable");
    },
    displayAsCards() {
      this.$emit("displayAsCards");
    },
    updateActivationType(token) {
      if (token) {
        this.activationType = token;
        this.$emit("updateActivationType", token);
      } else {
        this.activationType = ACTIVATION_TYPE.default;
        this.$emit("updateActivationType", this.activationType);
      }
    },
  },
  async created() {
    this.getDialogOfActivationTypes();
  },
};
</script>

<style lang="scss" scoped></style>
