<template>
  <b-modal id="CertificateDelete" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>
    <h4 class="text-center">
      {{ $t("areYouSureToDeleteStart") }}
      <span class="co-red">{{ certificate.certificateNameCurrent }}</span>
      {{ $t("areYouSureToDeleteEnd") }}
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="deleteCertificate"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('CertificateDelete')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import generalMixin from "@/utils/generalMixin";
import PreLoader from "@/components/general/PreLoader.vue";
import { STATUS } from "@/utils/constants";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
  },
  data() {
    return {
      isLoading: false,
    };
  },
  props: ["certificate"],
  methods: {
    async deleteCertificate() {
      this.isLoading = true;
      try {
        let response = await this.certificate.deleteCertificate();
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("CertificateDelete");
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
