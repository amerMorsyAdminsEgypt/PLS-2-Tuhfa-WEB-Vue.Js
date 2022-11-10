<template>
  <CustomBottomSheet
    :refName="'ReminderPlanInfo'"
    size="xl"
    :headerText="$t('ReminderPlans.data')"
    :headerIcon="reminderPlan.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminderPlan.fullCode"
        :title="$t('ReminderPlans.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminderPlan.reminderPlanNameAr"
        :title="$t('ReminderPlans.nameAr')"
        :imgName="'reminderPlans.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminderPlan.reminderPlanNameEn"
        :title="$t('ReminderPlans.nameEn')"
        :imgName="'reminderPlans.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminderPlan.reminderPlanNameUnd"
        :title="$t('ReminderPlans.nameUnd')"
        :imgName="'reminderPlans.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminderPlan.reminderPlanDescriptionAr"
        :title="$t('ReminderPlans.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminderPlan.reminderPlanDescriptionEn"
        :title="$t('ReminderPlans.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminderPlan.reminderPlanDescriptionUnd"
        :title="$t('ReminderPlans.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminderPlan.reminderPlanNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          isDataExist(
            reminderPlan.priorityTypeInfoBeforeTimeData.priorityTypeNameCurrent
          )
        "
        :title="$t('ReminderPlans.priorityTypeBeforeTime')"
        :imgName="'priorityTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          isDataExist(
            reminderPlan.priorityTypeInfoOnTimeData.priorityTypeNameCurrent
          )
        "
        :title="$t('ReminderPlans.priorityTypeOnTime')"
        :imgName="'priorityTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          isDataExist(
            reminderPlan.priorityTypeInfoAfterTimeData.priorityTypeNameCurrent
          )
        "
        :title="$t('ReminderPlans.priorityTypeAfterTime')"
        :imgName="'priorityTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          reminderPlan.reminderPlanActivationStatus
            ? $t('activeStatus')
            : $t('disActiveStatus')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />
    </div>
    <div
      class="my-card row"
      v-if="reminderPlan.reminderPlansDetailsDataBeforeTime.length"
    >
      <span class="my-card-title">{{
        $t("ReminderPlans.detailsBeforeTime")
      }}</span>
      <table class="my-table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("PriorityTypes.name") }}</th>
            <th>{{ $t("ReminderPlans.durationFrom") }}</th>
            <th>{{ $t("ReminderPlans.durationTo") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              type, index
            ) in reminderPlan.reminderPlansDetailsDataBeforeTime"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{
                isDataExist(type.priorityTypeInfoData.priorityTypeNameCurrent)
              }}
            </td>
            <td>
              {{ isDataExist(type.reminderDurationFrom) }}
            </td>
            <td>
              {{ isDataExist(type.reminderDurationTo) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="my-card row"
      v-if="reminderPlan.reminderPlansDetailsDataAfterTime.length"
    >
      <span class="my-card-title">{{
        $t("ReminderPlans.detailsAfterTime")
      }}</span>
      <table class="my-table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("PriorityTypes.name") }}</th>
            <th>{{ $t("ReminderPlans.durationFrom") }}</th>
            <th>{{ $t("ReminderPlans.durationTo") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              type, index
            ) in reminderPlan.reminderPlansDetailsDataAfterTime"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{
                isDataExist(type.priorityTypeInfoData.priorityTypeNameCurrent)
              }}
            </td>
            <td>
              {{ isDataExist(type.reminderDurationFrom) }}
            </td>
            <td>
              {{ isDataExist(type.reminderDurationTo) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../../components/general/DataLabelGroup.vue";
import { isDataExist } from "../../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["reminderPlan"],
  methods: {
    isDataExist,
  },
};
</script>
