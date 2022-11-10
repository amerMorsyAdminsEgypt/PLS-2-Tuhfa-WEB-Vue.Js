<template>
  <b-modal id="ExpensesTypeDelete" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>
    <h4 class="text-center">
      {{ $t("areYouSureToDeleteStart") }}
      <span class="co-red">{{ expensesType.expensesTypeNameCurrent }}</span>
      {{ $t("areYouSureToDeleteEnd") }}
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="deleteExpensesType"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('ExpensesTypeDelete')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiExpensesType from "./../../../../../api/settings/settingsOthers/expensesTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
  },
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  props: ["expensesType"],
  methods: {
    async deleteExpensesType() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token: this.expensesType.expensesTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiExpensesType.finalDelete(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("ExpensesTypeDelete");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
};
</script>
