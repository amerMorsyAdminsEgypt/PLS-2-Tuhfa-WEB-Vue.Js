<template>
  <div class="my-card">
    <PreLoader v-if="isLoading" />
    <span class="my-card-title">{{ $t("Installments.dataScheduleTime") }}</span>

    <div
      v-if="installmentScheduleTimesInfoData.length == 0"
      class="my-card-no-content"
    >
      {{ $t("Installments.thereAreNoDetails") }}
    </div>
    <template v-else>
      <div
        class="my-card"
        v-for="(scheduleTime, index) in installmentScheduleTimesInfoData"
        :key="index"
      >
        <span class="my-card-title">{{ index + 1 }}</span>

        <span class="remove-slice-container">
          <button
            @click="removeSlice(index)"
            type="button"
            class="btn btn-remove-slice"
          >
            ×
          </button>
        </span>
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}[${index}][installmentBatchTypeToken]`"
            :value="scheduleTime.installmentBatchTypeToken"
            :options="installmentBatchTypeTokenOptions"
            v-on:changeValue="scheduleTime.installmentBatchTypeToken = $event"
            :title="$t('InstallmentBatchTypes.select')"
            :imgName="'installmentBatchTypes.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}[${index}][installmentMoney]`"
            :value="scheduleTime.installmentMoney"
            v-on:changeValue="scheduleTime.installmentMoney = $event"
            :title="$t('general.value')"
            :imgName="'money.svg'"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}[${index}][installmentDateTime]`"
            type="dateTime"
            :value="scheduleTime.installmentDateTime"
            :title="$t('actionsData.dateTime')"
            v-on:changeValue="
              scheduleTime.installmentDateTime = $event.dateTime
            "
            :language="language"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}[${index}][installmentNotes]`"
            :value="scheduleTime.installmentNotes"
            v-on:changeValue="scheduleTime.installmentNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>
    </template>

    <div class="add-slice-container">
      <button
        @click="addSlice"
        type="button"
        class="btn btn-add-slice"
        :title="$t('addSlice')"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import InstallmentScheduleTimesInfoData from "./../../../../models/joiningApplications/installments/InstallmentScheduleTimesInfoData";
import { getLanguage } from "@/utils/functions";

export default {
  name: "InstallmentScheduleTimesInfoDataComponet",
  components: {
    PreLoader,
    CustomInputFloat,
    CustomSelectBox,
    DateTimePicker,
    TextArea,
  },
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
    };
  },
  props: [
    "installmentScheduleTimesInfoData",
    "id",
    "installmentBatchTypeTokenOptions",
  ],
  computed: {},
  methods: {
    addSlice() {
      this.installmentScheduleTimesInfoData.push(
        new InstallmentScheduleTimesInfoData()
      );
    },
    removeSlice(index) {
      this.installmentScheduleTimesInfoData.splice(index, 1);
    },
  },
  async created() {},
};
</script>
