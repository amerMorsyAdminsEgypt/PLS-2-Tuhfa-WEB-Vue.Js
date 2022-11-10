<template>
  <b-modal
    :id="`ConfirmClearData-${dialogName}`"
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
      {{ $t("areYouSureToClearFormData") }}
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="response('yes')"
      >
        {{ $t("clear") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="response('no')"
      >
        {{ $t("no") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-leave"
        @click.prevent="response('leave')"
      >
        {{ $t("general.leave") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import generalMixin from "./../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  props: {
    dialogName: {
      type: String,
      default: "",
    },
  },
  methods: {
    response(data) {
      this.$bvModal.hide(`ConfirmClearData-${this.dialogName}`);
      this.$emit("response", data);
    },
  },
};
</script>
