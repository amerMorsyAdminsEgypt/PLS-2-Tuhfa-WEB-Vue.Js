<template>
  <b-modal
    :id="`ConfirmCloseSheet-${bottomSheetName}`"
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
    <h4 class="text-center">
      {{ $t("bottomSheet.areYouSureToLeave") }}
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="
          closeBottomSheet(bottomSheetName);
          $bvModal.hide(`ConfirmCloseSheet-${bottomSheetName}`);
        "
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide(`ConfirmCloseSheet-${bottomSheetName}`)"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import generalMixin from "./../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  // props: ["userValidSetting"],
  props: {
    bottomSheetName: {
      type: String,
      default: "",
    },
  },
  methods: {
    // async deleteUserValidSetting() {
    // },
  },
};
</script>
