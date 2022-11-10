<template>
  <b-modal id="SystemComponentsHierarchyDelete" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>
    <h4 class="text-center">
      {{ $t("areYouSureToDeleteStart") }}
      <span class="co-red">{{
        systemComponentsHierarchy.systemComponentsHierarchyNameCurrent
      }}</span>
      {{ $t("areYouSureToDeleteEnd") }}
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="deleteSystemComponentsHierarchy"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('SystemComponentsHierarchyDelete')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiSystemComponentsHierarchy from "./../../../../api/systemComponentsHierarchy";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
  },
  data() {
    return {
      model: {},
    };
  },
  props: ["systemComponentsHierarchy"],
  methods: {
    async deleteSystemComponentsHierarchy() {
      this.isLoading = true;
      try {
        this.model = {
          token: this.systemComponentsHierarchy.systemComponentsHierarchyToken,
          systemTypeToken: this.systemComponentsHierarchy.systemTypeToken,
        };
        let formData = objectToFormData(this.model);
        const response = await apiSystemComponentsHierarchy.finalDelete(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("SystemComponentsHierarchyDelete");
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
