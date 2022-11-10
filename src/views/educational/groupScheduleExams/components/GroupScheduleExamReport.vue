<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      :refName="'GroupScheduleExamReport'"
      size="md"
      :headerText="$t('general.print')"
      :headerIcon="groupScheduleExam.icon"
    >
      <div class="row">
        <CustomInput
          :className="'col-md-12'"
          :id="`sendTo`"
          :value="groupScheduleExam.sendTo"
          v-on:changeValue="groupScheduleExam.sendTo = $event"
          :title="$t('email')"
          :imgName="'email.svg'"
        />
        <CustomCheckbox
          :className="'col-md-12'"
          :value="groupScheduleExam.isModelAnswers"
          v-on:changeValue="groupScheduleExam.isModelAnswers = $event"
          :title="$t('GroupScheduleExams.answers')"
        />
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="getReport()"
        >
          {{ $t("viewAndSend") }}
        </button>
        <button
          class="btn btn-cancel"
          @click.prevent="closeBottomSheet('GroupScheduleExamReport')"
        >
          {{ $t("cancel") }}
        </button>
      </div>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import { STATUS } from "./../../../../utils/constants";
import { viewFileFromServer } from "./../../../../utils/functions";
import apiGroupScheduleExams from "./../../../../api/educational/groupScheduleExams";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    CustomInput,
    CustomCheckbox,
  },
  props: ["groupScheduleExam"],
  methods: {
    async getReport() {
      this.isLoading = true;
      try {
        const response = await apiGroupScheduleExams.getReport(
          this.groupScheduleExam
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("GroupScheduleExamReport");
          viewFileFromServer(response.data.reportPath);
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        console.log(e);
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
};
</script>
