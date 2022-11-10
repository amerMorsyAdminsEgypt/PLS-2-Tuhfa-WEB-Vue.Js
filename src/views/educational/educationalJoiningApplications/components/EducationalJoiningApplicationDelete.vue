<template>
  <b-modal
    id="EducationalJoiningApplicationDelete"
    scrollable
    centered
    hide-footer
  >
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
        educationalJoiningApplication.educationalJoiningApplicationNameCurrent
      }}</span>
      {{ $t("areYouSureToDeleteEnd") }}
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="deleteEducationalJoiningApplication"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('EducationalJoiningApplicationDelete')"
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
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiEducationalJoiningApplication from "./../../../../api/educational/educationalJoiningApplications";
import generalMixin from "./../../../../utils/generalMixin";

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
  props: ["educationalJoiningApplication"],
  methods: {
    async deleteEducationalJoiningApplication() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token:
            this.educationalJoiningApplication
              .educationalJoiningApplicationToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiEducationalJoiningApplication.finalDelete(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("EducationalJoiningApplicationDelete");
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
