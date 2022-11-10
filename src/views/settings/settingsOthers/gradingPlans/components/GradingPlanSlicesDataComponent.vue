<template>
  <div class="my-card">
    <span class="my-card-title">{{ gradingPlanSlicesMsg }}</span>

    <div v-if="gradingPlanSlicesData.length == 0" class="my-card-no-content">
      {{ $t("GradingPlans.thereAreNoDetails") }}
    </div>
    <template v-else>
      <div
        class="my-card"
        v-for="(gradingPlanSlice, index) in gradingPlanSlicesData"
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
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}[${index}][degreeFrom]`"
            :value="gradingPlanSlice.degreeFrom"
            v-on:changeValue="gradingPlanSlice.degreeFrom = $event"
            :title="$t('GradingPlans.degreeFrom')"
            :imgName="'number.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}[${index}][degreeTo]`"
            :value="gradingPlanSlice.degreeTo"
            v-on:changeValue="gradingPlanSlice.degreeTo = $event"
            :title="$t('GradingPlans.degreeTo')"
            :imgName="'number.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}[${index}][degreeNameAr]`"
            :value="gradingPlanSlice.degreeNameAr"
            v-on:changeValue="gradingPlanSlice.degreeNameAr = $event"
            :title="$t('GradingPlans.degreeNameAr')"
            :imgName="'GradingPlans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}[${index}][degreeNameEn]`"
            :value="gradingPlanSlice.degreeNameEn"
            v-on:changeValue="gradingPlanSlice.degreeNameEn = $event"
            :title="$t('GradingPlans.degreeNameEn')"
            :imgName="'GradingPlans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}[${index}][degreeNameUnd]`"
            :value="gradingPlanSlice.degreeNameUnd"
            v-on:changeValue="gradingPlanSlice.degreeNameUnd = $event"
            :title="$t('GradingPlans.degreeNameUnd')"
            :imgName="'GradingPlans.svg'"
          />
          <TextArea
            :className="'col-md-6 '"
            :id="`${id}[${index}][degreeNotes]`"
            :value="gradingPlanSlice.degreeNotes"
            v-on:changeValue="gradingPlanSlice.degreeNotes = $event"
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
import CustomInput from "./../../../../../components/general/CustomInput.vue";
import CustomInputFloat from "./../../../../../components/general/CustomInputFloat.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";

import GradingPlanSlicesData from "./../../../../../models/settings/settingsOthers/gradingPlans/GradingPlanSlicesData";

export default {
  name: "GradingPlanSlicesDataComponent",
  components: {
    CustomInput,
    CustomInputFloat,
    TextArea,
  },
  data() {
    return {
      isLoading: false,
      priorityTypeTokenOptions: [],
    };
  },
  props: ["gradingPlanSlicesData", "gradingPlanSlicesMsg", "id"],
  computed: {},
  methods: {
    addSlice() {
      this.gradingPlanSlicesData.push(new GradingPlanSlicesData());
    },
    removeSlice(index) {
      this.gradingPlanSlicesData.splice(index, 1);
    },
  },
  async created() {},
};
</script>
