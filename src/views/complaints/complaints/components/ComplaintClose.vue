<template>
  <b-modal id="ComplaintClose" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>
    <h4 class="text-center">
      {{ $t("areYouSureToCloseStart") }}
      <span class="co-red">{{ complaint.complaintTitleCurrent }}</span>
      {{ $t("areYouSureToCloseEnd") }}
    </h4>
    <div class="row">
      <TextArea
        :className="'col-md-12'"
        :id="`closedNotes`"
        :value="complaint.closedNotes"
        v-on:changeValue="complaint.closedNotes = $event"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="closeComplaint"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('ComplaintClose')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiComplaint from "./../../../../api/complaint/complaints";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    TextArea,
  },
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  props: ["complaint"],
  methods: {
    async closeComplaint() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token: this.complaint.complaintToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiComplaint.close(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("ComplaintClose");
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
