<template>
  <b-modal
    id="EducationalGroupAttendanceDelete"
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
      <template v-if="educationalGroupAttendance.userInfoData">
        {{ $t("areYouSureToDeleteStart") }}
        <span class="co-red">{{
          `[${formateDateTimeLang(
            educationalGroupAttendance.attendFromDate,
            educationalGroupAttendance.attendFromTime
          )}] - [${formateDateTimeLang(
            educationalGroupAttendance.attendToDate,
            educationalGroupAttendance.attendToTime
          )}] - [${educationalGroupAttendance.userInfoData.userNameCurrent}]`
        }}</span>
        {{ $t("areYouSureToDeleteEnd") }}
      </template>
      <template v-else>{{ $t("areYouSureToDelete") }}</template>
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="deleteEducationalGroupAttendance"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('EducationalGroupAttendanceDelete')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import { STATUS } from "./../../../../utils/constants";
import { formateDateTimeLang } from "./../../../../utils/functions";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiEducationalGroupAttendance from "./../../../../api/educational/educationalGroupAttendances";
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
  props: ["educationalGroupAttendance"],
  methods: {
    async deleteEducationalGroupAttendance() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token:
            this.educationalGroupAttendance.educationalGroupAttendanceToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiEducationalGroupAttendance.finalDelete(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("EducationalGroupAttendanceDelete");
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
    formateDateTimeLang,
  },
};
</script>
