<template>
  <div class="my-card">
    <PreLoader v-if="isLoading" />
    <span class="my-card-title">{{ reminderPlansDetailsMsg }}</span>

    <div v-if="reminderPlansDetailsData.length == 0" class="my-card-no-content">
      {{ $t("ReminderPlans.thereAreNoDetails") }}
    </div>
    <template v-else>
      <div
        class="my-card"
        v-for="(reminderPlan, index) in reminderPlansDetailsData"
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
          <TimeCounter
            :hourValue="reminderPlan.durationFromHours || 0"
            :minuteValue="reminderPlan.durationFromMinutes || 0"
            :secondValue="reminderPlan.durationFromSeconds || 0"
            @input="reminderPlan.reminderDurationFrom = $event.value"
            :className="'col-md-6'"
            :title="$t('ReminderPlans.durationFrom')"
            :imgName="'dateAndTime.svg'"
            :dayStatus="false"
          />
          <TimeCounter
            :hourValue="reminderPlan.durationToHours || 0"
            :minuteValue="reminderPlan.durationToMinutes || 0"
            :secondValue="reminderPlan.durationToSeconds || 0"
            @input="reminderPlan.reminderDurationTo = $event.value"
            :className="'col-md-6'"
            :title="$t('ReminderPlans.durationTo')"
            :imgName="'dateAndTime.svg'"
            :dayStatus="false"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-priorityTypeToken`"
            :value="reminderPlan.priorityTypeToken"
            :options="priorityTypeTokenOptions"
            v-on:changeValue="reminderPlan.priorityTypeToken = $event"
            :title="$t('PriorityTypes.select')"
            :imgName="'priorityTypes.svg'"
          />

          <TextArea
            :className="'col-md-6 '"
            :id="`${id}[${index}][reminderDescriptionAr]`"
            :value="reminderPlan.reminderDescriptionAr"
            v-on:changeValue="reminderPlan.reminderDescriptionAr = $event"
            :title="$t('ReminderPlans.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6 '"
            :id="`${id}[${index}][reminderDescriptionEn]`"
            :value="reminderPlan.reminderDescriptionEn"
            v-on:changeValue="reminderPlan.reminderDescriptionEn = $event"
            :title="$t('ReminderPlans.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6 '"
            :id="`${id}[${index}][reminderDescriptionUnd]`"
            :value="reminderPlan.reminderDescriptionUnd"
            v-on:changeValue="reminderPlan.reminderDescriptionUnd = $event"
            :title="$t('ReminderPlans.descriptionUnd')"
            :imgName="'description.svg'"
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
import TimeCounter from "./../../../../../components/general/TimeCounter.vue";
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import CustomSelectBox from "./../../../../../components/general/CustomSelectBox.vue";
import ReminderPlansDetailsData from "./../../../../../models/settings/settingsOthers/reminderPlans/ReminderPlansDetailsData";
import { getPriorityTypesDialog } from "./../../../../../utils/dialogsOfApi";
import { PRIORITY_SCOPE_TYPE_TOKENS } from "./../../../../../utils/constantLists";

export default {
  name: "ReminderPlansDetailsDataComponet",
  components: {
    TimeCounter,
    PreLoader,
    TextArea,
    CustomSelectBox,
  },
  data() {
    return {
      isLoading: false,
      priorityTypeTokenOptions: [],
    };
  },
  props: [
    "reminderPlansDetailsData",
    "reminderPlansDetailsMsg",
    "id",
    "durationTypeToken",
  ],
  computed: {},
  methods: {
    async getPriorityTypesDialog() {
      this.isLoading = true;
      let params = {
        priorityScopeTypeToken: PRIORITY_SCOPE_TYPE_TOKENS.Reminders,
      };
      this.priorityTypeTokenOptions = await getPriorityTypesDialog(params);
      this.isLoading = false;
    },

    addSlice() {
      this.reminderPlansDetailsData.push(
        new ReminderPlansDetailsData(this.durationTypeToken)
      );
    },
    removeSlice(index) {
      this.reminderPlansDetailsData.splice(index, 1);
    },
  },
  async created() {
    this.getPriorityTypesDialog();
  },
};
</script>
