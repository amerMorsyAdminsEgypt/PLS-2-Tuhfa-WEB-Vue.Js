<template>
  <b-modal
    :id="`EducationalGroupChooseAddType`"
    scrollable
    centered
    hide-footer
  >
    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>
    <div class="row">
      <CustomRadio
        :className="'col-md-12'"
        :id="`addType`"
        :value="addType"
        :options="addTypeOptions"
        v-on:changeValue="addType = $event"
        :title="$t('EducationalGroups.add')"
        :imgName="`EducationalGroups.svg`"
      />
    </div>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="response()"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('EducationalGroupChooseAddType')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import CustomRadio from "./../../../../components/general/CustomRadio.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomRadio,
  },
  props: {},
  data() {
    return {
      addType: 1,
      addTypeOptions: [
        {
          value: 1,
          text: this.$t("EducationalGroups.addWithoutTime"),
        },
        {
          value: 2,
          text: this.$t("EducationalGroups.addWithTime"),
        },
      ],
    };
  },
  methods: {
    response() {
      this.$bvModal.hide(`EducationalGroupChooseAddType`);
      let addTypeText = "";
      switch (this.addType) {
        case 1:
        default:
          addTypeText = "addWithoutTime";

          break;
        case 2:
          addTypeText = "addWithTime";

          break;
      }
      this.$emit("addType", addTypeText);
    },
  },
};
</script>
