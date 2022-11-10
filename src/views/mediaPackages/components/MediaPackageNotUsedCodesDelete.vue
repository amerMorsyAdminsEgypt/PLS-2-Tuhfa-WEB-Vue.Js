<template>
  <b-modal id="MediaPackageNotUsedCodesDelete" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>
    <h4 class="text-center">
      {{ $t("areYouSureToDeleteMediaPackageNotUsedCodesStart") }}
      <span class="co-red">{{ mediaPackage.mediaPackageNameCurrent }}</span>
      {{ $t("areYouSureToDeleteEnd") }}
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="deleteMediaPackageCodeNotUsedCodes"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('MediaPackageNotUsedCodesDelete')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiMediaPackageCode from "./../../../api/mediaPackageCode";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
  },
  data() {
    return {};
  },
  props: ["mediaPackage"],
  methods: {
    async deleteMediaPackageCodeNotUsedCodes() {
      this.isLoading = true;
      try {
        let token = {
          mediaPackageToken: this.mediaPackage.mediaPackageToken,
        };
        let formData = objectToFormData(token);
        const response = await apiMediaPackageCode.deleteNotUsedCodes(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("MediaPackageNotUsedCodesDelete");
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
